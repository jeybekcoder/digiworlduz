# 📄 Fayl: digiworlduz/backend/admin_api/auth/schemas.py
# 🎯 Maqsad: Auth endpointlar uchun Pydantic modellar – login request va token javob
# 🧱 Texnologiyalar: FastAPI, Pydantic

from pydantic import BaseModel, EmailStr, Field

# 📥 Login so‘rov (request)
class LoginRequest(BaseModel):
    email: EmailStr = Field(..., example="admin@digiworld.uz")
    password: str = Field(..., min_length=6, example="admin123")

# 📤 Login javob (response)
class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
