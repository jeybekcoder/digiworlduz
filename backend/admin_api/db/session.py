# 📄 Fayl: digiworlduz/backend/admin_api/db/session.py
# 🎯 Maqsad: Barcha FastAPI routerlarida foydalaniladigan `AsyncSession` dependency
# 🧱 Texnologiyalar: FastAPI + SQLModel + SQLAlchemy

from sqlmodel import SQLModel, Session
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import sessionmaker
from collections.abc import AsyncGenerator  # ✅ MUHIM!
import os

# 📦 Engine import (init_db bilan mos bo‘lishi kerak)
DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5432/digiworlduz"
engine = create_async_engine(DATABASE_URL, echo=False)

# 🔄 Async sessionmaker yaratish
async_session = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# 📥 FastAPI uchun dependency
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session