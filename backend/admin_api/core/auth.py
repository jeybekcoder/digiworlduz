# 📄 Fayl: digiworlduz/backend/admin_api/core/auth.py
# 🎯 Maqsad: JWT tokenni tekshiruvchi dependency – admin userni aniqlaydi yoki xatolik qaytaradi

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import Session, select
from ..db import get_session
from ..models.user import User
from ..core.security import SECRET_KEY, ALGORITHM

# 📥 Token frontenddan "Authorization: Bearer <TOKEN>" orqali keladi
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admin/login")

# 🔐 Tokenni tekshiradi va userni qaytaradi
def get_current_admin_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Kirish uchun to‘g‘ri token talab qilinadi",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = session.exec(select(User).where(User.id == user_id)).first()
    if user is None or not user.is_admin:
        raise credentials_exception

    return user
