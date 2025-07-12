# 📄 Fayl: digiworlduz/backend/admin_api/models/user.py
# 🎯 Maqsad: Admin user model – email, parol, admin flag, rol va sessionlar bilan bog‘lanish

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import uuid

from .user_sessions import UserSession

class User(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    is_admin: bool = True
    role: str = "owner"  # owner, manager, editor va h.k

    # 🔐 2FA bilan bog‘liq maydonlar
    two_factor_enabled: bool = False  # Foydalanuvchi 2FA ni yoqqanmi
    two_factor_secret: Optional[str] = None  # TOTP uchun Base32 secret

    sessions: List[UserSession] = Relationship(back_populates="user")
