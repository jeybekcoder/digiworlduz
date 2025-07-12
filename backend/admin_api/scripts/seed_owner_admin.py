# 📄 Fayl: digiworlduz/backend/admin_api/scripts/seed_owner_admin.py
# 🎯 Maqsad: Dastlabki owner user yaratish – to‘liq huquqli superadmin (ROLE: owner)

from sqlmodel import Session
from ..db import engine
from ..models.user import User
from ..core.security import get_password_hash

# ✅ OWNER foydalanuvchi maʼlumotlari
owner = User(
    email="mrjeybek@outlook.com",
    hashed_password=get_password_hash("JBKTeam2001!2008"),
    is_admin=True,
    role="owner"  # bu maydon modelda mavjud bo‘lishi kerak
)

with Session(engine) as session:
    session.add(owner)
    session.commit()

print("✅ OWNER user yaratildi: mrjeybek@outlook.com / JBKTeam2001!2008")
