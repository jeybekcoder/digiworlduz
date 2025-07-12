# 📄 Fayl: digiworlduz/backend/admin_api/db.py
# 🎯 Maqsad: Admin API uchun ma’lumotlar bazasi ulanishi (SQLModel engine + sessiya)

from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./admin.db"  # vaqtincha, keyin PostgreSQL ga o‘tkaziladi

engine = create_engine(DATABASE_URL, echo=False)

def get_session():
    with Session(engine) as session:
        yield session

# 🛠 Dastlabki yaratish (boshqa joyda chaqiriladi)
def init_db():
    SQLModel.metadata.create_all(engine)
