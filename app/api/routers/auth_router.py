from fastapi import APIRouter

from app.schemas.auth_schema import (
    TwoFASetupResponse,
    TwoFAVerifyRequest,
    TwoFAVerifyResponse
)

from app.application.use_cases.setup_2fa import Setup2FAUseCase
from app.application.use_cases.verify_2fa import Verify2FAUseCase


router = APIRouter(prefix="/2fa", tags=["Two Factor"])


@router.post("/setup", response_model=TwoFASetupResponse)
def setup_2fa():

    use_case = Setup2FAUseCase()

    return use_case.execute()


@router.post("/verify", response_model=TwoFAVerifyResponse)
def verify_2fa(request: TwoFAVerifyRequest):

    use_case = Verify2FAUseCase()

    return use_case.execute(request.secret, request.code)