from fastapi import APIRouter, Query

from app.schemas.password_schema import PassphraseResponse
from app.application.use_cases.generate_passphrase import (
    GeneratePassphraseUseCase
)

router = APIRouter(prefix="/passphrase", tags=["Passphrase"])


@router.get("/generate", response_model=PassphraseResponse)
def generate_passphrase(
    words: int = Query(4, ge=3, le=10)
):

    use_case = GeneratePassphraseUseCase()

    result = use_case.execute(words)

    return result