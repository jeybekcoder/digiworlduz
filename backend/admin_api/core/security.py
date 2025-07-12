# 📄 Fayl: digiworlduz/backend/admin_api/core/security.py
# 🎯 Maqsad: Parolni xashlash, tekshirish va JWT token yaratish uchun funksiyalar

from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

# 🔐 Parol xashlash uchun sozlamalar
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "digiworlduz-admin-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 kun

# 🔑 Parolni xashlash

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# 🔍 Parolni tekshirish

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# 🧾 JWT token yaratish

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
