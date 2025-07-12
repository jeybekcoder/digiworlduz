# 📄 Fayl: digiworlduz/backend/admin_api/auth/routes.py
# 🎯 Maqsad: Admin panel uchun login, profil va token refresh endpointlari – JWT asosida ishlash
# 🛡 Texnologiyalar: FastAPI, SQLModel, JWT, session tracking, rate-limiting, TOTP 2FA

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from passlib.context import CryptContext
from datetime import datetime, timedelta
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import uuid
import secrets
import pyotp
import base64
import qrcode
from io import BytesIO

from ..db.session import get_session
from ..models.user import User
from ..models.user_sessions import UserSession
from .schemas import LoginRequest, LoginResponse
from .dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

# 🔐 Parolni hash qilish uchun context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🔒 Rate Limiter (5 marta / 60 soniya)
limiter = Limiter(key_func=get_remote_address)

# 🔑 Token generator (simple)
def create_access_token(user_id: str) -> str:
    return secrets.token_urlsafe(32)

def create_refresh_token() -> str:
    return secrets.token_urlsafe(64)

# 📥 Login (bosqich 1) – faqat parolni tekshiradi, 2FA talab qiladi
@router.post("/login")
@limiter.limit("5/minute")
async def login(
    request: Request,
    body: LoginRequest,
    session: AsyncSession = Depends(get_session)
):
    query = select(User).where(User.email == body.email)
    result = await session.execute(query)
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=400, detail="Email noto‘g‘ri")

    if not pwd_context.verify(body.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Parol noto‘g‘ri")

    if not user.two_factor_enabled:
        raise HTTPException(status_code=403, detail="2FA yoqilmagan – administratorga murojaat qiling")

    return {"user_id": user.id, "message": "Parol to‘g‘ri. Iltimos, 2FA kodni yuboring."}

# ✅ 2FA bosqichi – TOTP kodni tekshiradi va tokenlarni qaytaradi
@router.post("/verify-2fa", response_model=LoginResponse)
async def verify_2fa(
    request: Request,
    session: AsyncSession = Depends(get_session)
):
    body = await request.json()
    user_id = body.get("user_id")
    code = body.get("code")

    if not user_id or not code:
        raise HTTPException(status_code=400, detail="user_id va code majburiy")

    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user or not user.two_factor_secret:
        raise HTTPException(status_code=404, detail="Foydalanuvchi yoki 2FA topilmadi")

    totp = pyotp.TOTP(user.two_factor_secret)
    if not totp.verify(code, valid_window=1):
        raise HTTPException(status_code=401, detail="2FA kodi noto‘g‘ri")

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token()

    user_agent = request.headers.get("user-agent")
    ip = request.client.host

    new_session = UserSession(
        user_id=user.id,
        user_agent=user_agent,
        ip_address=ip,
        device_name="",
        device_type="",
        refresh_token=refresh_token,
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    session.add(new_session)
    await session.commit()

    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )

# 🆕 2FA ni yoqish uchun endpoint – QR code va secret qaytaradi
@router.post("/enable-2fa")
async def enable_2fa(
    request: Request,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    # 1. Yangi secret yaratamiz
    secret = pyotp.random_base32()

    # 2. TOTP URI yaratamiz
    uri = pyotp.totp.TOTP(secret).provisioning_uri(name=current_user.email, issuer_name="DigiWorldUZ")

    # 3. QR Code yaratamiz
    qr = qrcode.make(uri)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    img_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    # 4. Userni yangilaymiz
    current_user.two_factor_secret = secret
    current_user.two_factor_enabled = True
    session.add(current_user)
    await session.commit()

    return {
        "message": "2FA yoqildi",
        "secret": secret,
        "otpauth_url": uri,
        "qrcode_base64": img_base64
    }

# 🔄 Refresh access token endpoint (ROTATION bilan)
@router.post("/refresh", response_model=LoginResponse)
async def refresh_token(
    request: Request,
    session: AsyncSession = Depends(get_session)
):
    body = await request.json()
    old_refresh_token = body.get("refresh_token")

    if not old_refresh_token:
        raise HTTPException(status_code=400, detail="Refresh token topilmadi")

    query = select(UserSession).where(
        UserSession.refresh_token == old_refresh_token,
        UserSession.is_active == True,
        UserSession.revoked_at == None
    )
    result = await session.execute(query)
    db_session = result.scalar_one_or_none()

    if not db_session:
        raise HTTPException(status_code=401, detail="Refresh token yaroqsiz yoki muddati o'tgan")

    query = select(User).where(User.id == db_session.user_id)
    user_result = await session.execute(query)
    user = user_result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="Foydalanuvchi topilmadi")

    db_session.is_active = False
    db_session.revoked_at = datetime.utcnow()
    db_session.updated_at = datetime.utcnow()

    new_access_token = create_access_token(user.id)
    new_refresh_token = create_refresh_token()

    user_agent = request.headers.get("user-agent")
    ip = request.client.host

    new_session = UserSession(
        user_id=user.id,
        user_agent=user_agent,
        ip_address=ip,
        device_name="",
        device_type="",
        refresh_token=new_refresh_token,
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    session.add(db_session)
    session.add(new_session)
    await session.commit()

    return LoginResponse(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        token_type="bearer"
    )

# 👤 Foydalanuvchining profilini olish (token orqali)
@router.get("/me", response_model=User)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
