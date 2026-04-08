from fastapi import FastAPI
from app.api.routers.password_router import router as password_router
from app.api.routers.passphrase_router import router as passphrase_router
from app.api.routers.auth_router import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.infrastructure.database.base import Base
from app.infrastructure.database.session import engine

# Automatically create all tables (SQLite)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Password Security Service",
    version="1.0"
)

# ✅ CORS (مهم باش frontend يهدر مع backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # تقدر تبدلها لاحقًا
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Password Security API running"}

# Routers
app.include_router(password_router)
app.include_router(passphrase_router)
app.include_router(auth_router)