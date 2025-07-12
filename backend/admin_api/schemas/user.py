# 📄 Fayl: digiworlduz/backend/admin_api/schemas/user.py
# 🎯 Maqsad: Admin panel uchun foydalanuvchi CRUD endpointlariga mos Pydantic modellar
# 🧱 Texnologiyalar: FastAPI, Pydantic

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import uuid

# 📥 Foydalanuvchi yaratish uchun schema (admin)
class UserCreate(BaseModel):
    email: EmailStr = Field(..., example="admin@digiworld.uz")
    password: str = Field(..., min_length=6, example="admin123")
    is_admin: bool = True
    role: str = Field(default="manager")

# 📝 Foydalanuvchi yangilash uchun schema (parolsiz)
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    is_admin: Optional[bool] = None
    role: Optional[str] = None

# 📤 Foydalanuvchini qaytarish uchun schema (response)
class UserRead(BaseModel):
    id: uuid.UUID
    email: EmailStr
    is_admin: bool
    role: str

    class Config:
        orm_mode = True
