from fastapi import FastAPI
from app.api.routers.password_router import router as password_router
from app.api.routers.passphrase_router import router as passphrase_router
from app.api.routers.auth_router import router as auth_router


app = FastAPI(
    title="Password Security Service",
    version="1.0"
)


@app.get("/")
def root():
    return {"message": "Password Security API running"}


app.include_router(password_router)
app.include_router(passphrase_router)
app.include_router(auth_router)