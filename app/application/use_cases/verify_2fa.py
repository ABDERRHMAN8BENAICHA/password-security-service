from app.domain.services.two_factor_service import TwoFactorService


class Verify2FAUseCase:

    def __init__(self):
        self.service = TwoFactorService()

    def execute(self, secret: str, code: str):

        valid = self.service.verify_code(secret, code)

        return {"valid": valid}