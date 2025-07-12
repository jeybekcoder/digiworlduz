# 📄 Fayl: digiworlduz/backend/admin_api/db/init_db.py
# 🎯 Maqsad: Barcha model (shu jumladan user_sessions) jadvallarini yaratish uchun init fayl
# 🧱 Texnologiyalar: SQLModel + FastAPI + Async SQLAlchemy engine

from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine

from ..models import user  # relative import orqali
from ..models import user_sessions  # relative import orqali

DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5432/digiworlduz"
engine = create_async_engine(DATABASE_URL, echo=True)

# ⚙️ Init function – jadvallarni yaratish uchun
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    print("✅ [init_db] Barcha jadvallar yaratildi.")