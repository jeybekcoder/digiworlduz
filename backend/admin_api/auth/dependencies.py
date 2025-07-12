# 📄 Fayl: digiworlduz/backend/admin_api/auth/dependencies.py
# 🎯 Maqsad: JWT access token orqali foydalanuvchini aniqlash (auth guard funksiyalar)
# 🛡 Texnologiyalar: FastAPI, PyJWT, Depends, Pydantic, SQLModel

from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
import jwt
from jwt import PyJWTError
from datetime import datetime

from ..db.session import get_session
from ..models.user import User
from .utils import JWT_SECRET_KEY, JWT_ALGORITHM

# 🔐 Token bearer schema
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# 📥 Access tokenni tekshirish va foydalanuvchini olish
def decode_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Token noto‘g‘ri yoki muddati o‘tgan")

# 🔐 JWT dan foydalanuvchini aniqlash
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(get_session)
) -> User:
    payload = decode_token(token)
    user_id: str = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Token noto‘g‘ri (user_id yo‘q)")

    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401, detail="Foydalanuvchi topilmadi")

    return user

# 🔐 Faqat adminlar uchun (middleware sifatida ishlaydi)
async def get_current_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Ruxsat yo‘q (admin emas)")
    return current_user
