# 📄 Fayl: digiworlduz/backend/admin_api/models/user_sessions.py
# 🎯 Maqsad: Har bir login qilgan qurilma uchun alohida session tracking qilish – refresh tokenlar, IP, device va vaqti bilan
# 🧱 Texnologiyalar: FastAPI + SQLModel (ORM) asosida session boshqaruvi

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from datetime import datetime
import uuid

if TYPE_CHECKING:
    from .user import User

class UserSession(SQLModel, table=True):
    """
    Har bir foydalanuvchi login qilganda, ushbu jadvalda alohida session saqlanadi.
    Maqsad: refresh token rotation, qurilma sessioni kuzatuvi, log out, device accesslarni boshqarish
    """
    __tablename__ = "user_sessions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", index=True)

    user_agent: Optional[str] = Field(default=None, description="Qurilmaning User-Agent qiymati")
    ip_address: Optional[str] = Field(default=None, description="Foydalanuvchi IP manzili")
    device_name: Optional[str] = Field(default=None, description="Aniqlangan qurilma nomi")
    device_type: Optional[str] = Field(default=None, description="Qurilma turi: mobile, desktop, tablet va h.k.")

    refresh_token: Optional[str] = Field(default=None, description="Hozirgi sessiyaga tegishli refresh token")
    is_active: bool = Field(default=True, description="Session hozir faolmi yoki log out qilinganmi")
    revoked_at: Optional[datetime] = Field(default=None, description="Agar token rotation yoki logout bo‘lsa, qachon bekor qilingan")

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional["User"] = Relationship(back_populates="sessions")

    def deactivate(self):
        """Log out yoki session tugashi uchun sessionni passivlashtirish"""
        self.is_active = False
        self.revoked_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
