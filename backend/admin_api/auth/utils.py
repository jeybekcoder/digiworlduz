# 📄 Fayl: digiworlduz/backend/admin_api/auth/utils.py
# 🎯 Maqsad: JWT access va refresh tokenlar yaratish uchun utility funksiyalar
# 🔐 Texnologiyalar: PyJWT, secrets, datetime, best-practice JWT claimlar

import jwt
from datetime import datetime, timedelta
from typing import Literal
import uuid

from ..config import get_settings

settings = get_settings()

# 🧾 Access yoki Refresh token yaratish funksiyasi
def create_jwt_token(
    user_id: str,
    token_type: Literal["access", "refresh"] = "access"
) -> str:
    now = datetime.utcnow()
    expire = now + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES if token_type == "access" else 60 * 24 * settings.REFRESH_TOKEN_EXPIRE_DAYS
    )

    payload = {
        "sub": str(user_id),          # foydalanuvchi ID
        "jti": str(uuid.uuid4()),     # token ID
        "type": token_type,           # access yoki refresh
        "iat": now,
        "nbf": now,
        "exp": expire,
        "iss": "digiworlduz",
        "aud": "admin"
    }

    encoded_jwt = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt
