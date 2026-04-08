from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.auth_schema import (
    TwoFASetupResponse,
    TwoFAVerifyRequest,
    TwoFAVerifyResponse
)
from app.application.use_cases.setup_2fa import Setup2FAUseCase
from app.application.use_cases.verify_2fa import Verify2FAUseCase
from app.infrastructure.database.session import get_db
from app.infrastructure.security.jwt_service import get_current_user
from app.infrastructure.database.models import User

router = APIRouter(prefix="/2fa", tags=["Two Factor"])

@router.post("/setup", response_model=TwoFASetupResponse)
def setup_2fa(user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    use_case = Setup2FAUseCase()
    resp = use_case.execute()

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.two_factor_secret = resp["secret"]
    db.commit()

    return resp

@router.post("/verify", response_model=TwoFAVerifyResponse)
def verify_2fa(request: TwoFAVerifyRequest, user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.two_factor_secret:
        raise HTTPException(status_code=400, detail="2FA not setup for this user")

    use_case = Verify2FAUseCase()
    resp = use_case.execute(user.two_factor_secret, request.code)

    if resp["valid"]:
        user.two_factor_enabled = True
        db.commit()

    return resp