# 📄 Fayl: digiworlduz/backend/admin_api/main.py
# 🎯 Maqsad: Admin panel uchun mustaqil FastAPI ilovasi (faqat admin endpointlar)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, SQLModel
from .api.auth import router as auth_router
from .db import engine
from .models.user import User
from .core.security import get_password_hash

app = FastAPI(title="DigiWorldUZ Admin API", version="1.0")

# 🌐 CORS sozlamalari
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # kerak bo‘lsa frontend domen bilan cheklang
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔐 Auth endpointlar
app.include_router(auth_router, prefix="/admin", tags=["Admin Auth"])

# ⚙️ Loyihani ishga tushirishda: jadval yaratish + OWNER userni yaratish
@app.on_event("startup")
def on_startup():
    # 1. Jadval(lar)ni yaratish
    SQLModel.metadata.create_all(engine)

    # 2. OWNER foydalanuvchini yaratish
    with Session(engine) as session:
        existing = session.exec(select(User).where(User.email == "mrjeybek@outlook.com")).first()
        if not existing:
            owner = User(
                email="mrjeybek@outlook.com",
                hashed_password=get_password_hash("JBKTeam2001!2008"),
                is_admin=True,
                role="owner"
            )
            session.add(owner)
            session.commit()
            print("[OK] Owner user yaratildi.")
        else:
            print("[INFO] Owner user allaqachon mavjud.")

# ✅ Status
@app.get("/")
def root():
    return {"message": "Admin API ishga tushdi"}
