from pydantic import BaseModel


class PasswordCheckRequest(BaseModel):
    password: str


class PasswordCheckResponse(BaseModel):
    score: int
    strength: str
    feedback: list[str]

class PasswordGenerateResponse(BaseModel):
    password: str

class PassphraseResponse(BaseModel):
    passphrase: str

class BreachCheckResponse(BaseModel):
    breached: bool
    count: int