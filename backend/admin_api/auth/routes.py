# 📄 Fayl: digiworlduz/backend/admin_api/auth/routes.py
# 🎯 Maqsad: Admin panel uchun login endpoint – email + parol orqali tizimga kirish, tokenlar va session yaratish
# 🛡 Texnologiyalar: FastAPI, SQLModel, JWT, password hashing, session tracking

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from passlib.context import CryptContext
from datetime import datetime, timedelta
import uuid
import secrets

from ..db.session import get_session
from ..models.user import User
from ..models.user_sessions import UserSession
from .schemas import LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["Auth"])

# 🔐 Parolni hash qilish uchun context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🔑 Token generator (simple)
def create_access_token(user_id: str) -> str:
    return secrets.token_urlsafe(32)

def create_refresh_token() -> str:
    return secrets.token_urlsafe(64)

# 📥 Login endpoint
@router.post("/login", response_model=LoginResponse)
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

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token()

    user_agent = request.headers.get("user-agent")
    ip = request.client.host

    new_session = UserSession(
        user_id=user.id,
        user_agent=user_agent,
        ip_address=ip,
        device_name="",  # Agar frontenddan kelsa aniqlash mumkin
        device_type="",  # future uchun
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
