# 📄 Fayl: digiworlduz/backend/admin_api/core/permissions.py
# 🎯 Maqsad: Role-based access control – owner, editor, manager rollarga kirishni cheklash
# 🔐 Texnologiyalar: FastAPI Depends, Custom Exception

from fastapi import Depends, HTTPException, status
from .auth import get_current_admin_user
from ..models.user import User

# ✅ Faqat "owner" roli uchun
async def only_owner(user: User = Depends(get_current_admin_user)) -> User:
    if user.role != "owner":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bu amal faqat owner uchun ruxsat etilgan."
        )
    return user

# ✅ Faqat "editor" roli uchun (masalan: kontentga oid endpointlar)
async def only_editor(user: User = Depends(get_current_admin_user)) -> User:
    if user.role != "editor":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bu amal faqat editor uchun ruxsat etilgan."
        )
    return user

# ✅ Agar kerak bo‘lsa: manager va boshqa rollar ham shu uslubda qo‘shiladi
