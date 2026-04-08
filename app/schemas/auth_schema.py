from pydantic import BaseModel

class TwoFASetupResponse(BaseModel):
    secret: str
    otp_uri: str

class TwoFAVerifyRequest(BaseModel):
    code: str

class TwoFAVerifyResponse(BaseModel):
    valid: bool