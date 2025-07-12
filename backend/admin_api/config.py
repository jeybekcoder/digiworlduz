# 📄 Fayl: digiworlduz/backend/admin_api/config.py
# 🎯 Maqsad: Maxfiy sozlamalar va konfiguratsiyalarni `.env` fayldan o‘qish
# 🔐 Texnologiyalar: Pydantic Settings, dotenv

from pydantic import BaseSettings, Field
from functools import lru_cache

class Settings(BaseSettings):
    JWT_SECRET_KEY: str = Field(..., env="JWT_SECRET_KEY")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    DATABASE_URL: str = Field(..., env="DATABASE_URL")

    class Config:
        env_file = ".env"

# 🔁 Cached sozlamalar obyektini olish
@lru_cache()
def get_settings() -> Settings:
    return Settings()
