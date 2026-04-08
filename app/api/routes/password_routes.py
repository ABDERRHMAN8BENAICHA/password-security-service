from fastapi import APIRouter
from pydantic import BaseModel
from app.application.use_cases.check_password import execute

router = APIRouter()

class PasswordRequest(BaseModel):
    password: str

@router.post("/check")
def check(data: PasswordRequest):
    return execute(data.password)