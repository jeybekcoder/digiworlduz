# 📄 Fayl: digiworlduz/backend/admin_api/api/auth.py
# 🎯 Maqsad: Admin panel uchun alohida JWT login va profil olish API (web frontend bilan aralashmasligi uchun)

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from ..db import get_session
from ..models.user import User
from ..core.security import verify_password, create_access_token
from ..core.auth import get_current_admin_user

router = APIRouter()

@router.post("/login")
def admin_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    user = session.exec(select(User).where(User.email == form_data.username)).first()

    if not user or not user.is_admin:
        raise HTTPException(status_code=403, detail="Ruxsat etilmagan foydalanuvchi.")

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Email yoki parol noto‘g‘ri.")

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_admin_profile(user: User = Depends(get_current_admin_user)):
    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "is_admin": user.is_admin
    }
