# 📄 Fayl: digiworlduz/backend/admin_api/auth/logout.py
# 🎯 Maqsad: Foydalanuvchini tizimdan chiqish (logout) – sessionni passivlashtirish
# 🔐 Texnologiyalar: FastAPI, SQLModel, JWT

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from ..db.session import get_session
from ..models.user_sessions import UserSession
from .dependencies import get_current_user
from ..models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])

# 🔐 Logout endpoint
@router.post("/logout")
async def logout(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    # Foydalanuvchining eng oxirgi faol sessiyasini topamiz
    query = select(UserSession).where(
        UserSession.user_id == current_user.id,
        UserSession.is_active == True
    ).order_by(UserSession.created_at.desc())

    result = await session.execute(query)
    latest_session = result.scalars().first()

    if not latest_session:
        raise HTTPException(status_code=404, detail="Aktiv sessiya topilmadi")

    latest_session.deactivate()
    session.add(latest_session)
    await session.commit()

    return {"message": "Foydalanuvchi tizimdan chiqdi ✅"}
