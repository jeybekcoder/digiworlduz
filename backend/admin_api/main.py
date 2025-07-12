# 📄 Fayl: digiworlduz/backend/admin_api/main.py
# 🎯 Maqsad: FastAPI ilovasini ishga tushirish, routerlarni ulash, CORS sozlash
# 🚀 Entry point fayl – admin API uchun

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth.routes import router as auth_router
from .auth.logout import router as logout_router
from .api.users import router as users_router  # ✅ Yangi qo‘shildi

app = FastAPI(title="DigiWorldUZ Admin API", version="1.0.0")

# 🌐 CORS sozlamalari (kerakli domenlarni yozing prod uchun)
origins = [
    "http://localhost:3001",  # frontend admin panel porti
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 Routerlarni ulash
app.include_router(auth_router)
app.include_router(logout_router)
app.include_router(users_router)  # ✅ Qo‘shildi

# 🩺 Root test endpoint
@app.get("/")
async def root():
    return {"message": "DigiWorldUZ Admin API ishlayapti ✅"}
