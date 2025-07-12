# 📄 Fayl: digiworlduz/backend/admin_api/api/users.py
# 🎯 Maqsad: Admin panelda foydalanuvchilarni CRUD qilish (GET, POST, PUT, DELETE)
# 🔐 Faqat adminlar uchun protected route – signup yo‘q, faqat adminlar yangi user qo‘shadi

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
import uuid

from ..db.session import get_session
from ..models.user import User
from ..models.user_sessions import UserSession
from ..core.auth import get_current_admin_user
from ..core.security import get_password_hash
from ..schemas.user import UserCreate, UserUpdate, UserRead

router = APIRouter(prefix="/users", tags=["Users"])

# 🔽 Barcha foydalanuvchilarni olish
@router.get("/", response_model=list[UserRead])
async def get_users(
    session: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_admin_user)
):
    result = await session.execute(select(User))
    return result.scalars().all()

# 🔼 Yangi foydalanuvchi yaratish (faqat adminlar uchun, signup yo‘q)
@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(
    body: UserCreate,
    session: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_admin_user)
):
    user = User(
        email=body.email,
        hashed_password=get_password_hash(body.password),
        is_admin=body.is_admin,
        role=body.role
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

# 📝 Foydalanuvchini yangilash
@router.put("/{user_id}", response_model=UserRead)
async def update_user(
    user_id: uuid.UUID,
    body: UserUpdate,
    session: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_admin_user)
):
    result = await session.execute(select(User).where(User.id == str(user_id)))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="Foydalanuvchi topilmadi")

    if body.email is not None:
        user.email = body.email
    if body.is_admin is not None:
        user.is_admin = body.is_admin
    if body.role is not None:
        user.role = body.role

    await session.commit()
    await session.refresh(user)
    return user

# ❌ Foydalanuvchini o‘chirish
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_admin_user)
):
    result = await session.execute(select(User).where(User.id == str(user_id)))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="Foydalanuvchi topilmadi")

    await session.delete(user)
    await session.commit()

# 🚫 Barcha sessiyalarni majburan yopish (faqat adminlar uchun)
@router.post("/{user_id}/revoke-sessions", status_code=200)
async def revoke_all_sessions(
    user_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_admin_user)
):
    result = await session.execute(select(User).where(User.id == str(user_id)))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="Foydalanuvchi topilmadi")

    session_query = select(UserSession).where(UserSession.user_id == user.id, UserSession.is_active == True)
    session_result = await session.execute(session_query)
    sessions = session_result.scalars().all()

    for s in sessions:
        s.deactivate()
        session.add(s)

    await session.commit()
    return {"message": f"{len(sessions)} ta sessiya bekor qilindi."}
