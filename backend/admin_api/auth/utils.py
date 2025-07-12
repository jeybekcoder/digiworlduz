# 📄 Fayl: digiworlduz/backend/admin_api/auth/utils.py
# 🎯 Maqsad: JWT access va refresh tokenlar yaratish uchun utility funksiyalar
# 🔐 Texnologiyalar: PyJWT, secrets, datetime, best-practice JWT claimlar

import jwt
from datetime import datetime, timedelta
from typing import Literal
import uuid

# 🔐 JWT sozlamalari
JWT_SECRET_KEY = "your-secret-key"  # .env fayldan olish tavsiya etiladi
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 30
ISSUER = "digiworlduz"
AUDIENCE = "admin"

# 🧾 Access yoki Refresh token yaratish funksiyasi
def create_jwt_token(
    user_id: str,
    token_type: Literal["access", "refresh"] = "access"
) -> str:
    now = datetime.utcnow()
    expire = now + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES if token_type == "access" else 60 * 24 * REFRESH_TOKEN_EXPIRE_DAYS
    )

    payload = {
        "sub": str(user_id),          # foydalanuvchi ID
        "jti": str(uuid.uuid4()),     # token ID
        "type": token_type,           # access yoki refresh
        "iat": now,
        "nbf": now,
        "exp": expire,
        "iss": ISSUER,
        "aud": AUDIENCE
    }

    encoded_jwt = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt
