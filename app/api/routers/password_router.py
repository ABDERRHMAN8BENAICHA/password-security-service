from fastapi import APIRouter

from app.schemas.password_schema import (
    PasswordCheckRequest,
    PasswordCheckResponse
)

from app.application.use_cases.check_password_strength import (
    CheckPasswordStrengthUseCase
)

from fastapi import Query
from app.application.use_cases.generate_password import (
    GeneratePasswordUseCase
)

from app.schemas.password_schema import PasswordGenerateResponse

from app.application.use_cases.check_breach import CheckBreachUseCase
from app.schemas.password_schema import BreachCheckResponse


router = APIRouter(prefix="/password", tags=["Password"])


@router.post("/check", response_model=PasswordCheckResponse)
def check_password_strength(request: PasswordCheckRequest):

    use_case = CheckPasswordStrengthUseCase()

    result = use_case.execute(request.password)

    return result

@router.get("/generate", response_model=PasswordGenerateResponse)
def generate_password(
    length: int = Query(12, ge=8, le=64),
    symbols: bool = True,
    numbers: bool = True
):

    use_case = GeneratePasswordUseCase()

    result = use_case.execute(length, symbols, numbers)

    return result


@router.post("/breach-check", response_model=BreachCheckResponse)
def breach_check(request: PasswordCheckRequest):

    use_case = CheckBreachUseCase()

    return use_case.execute(request.password)