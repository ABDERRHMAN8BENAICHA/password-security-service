from app.domain.services.two_factor_service import TwoFactorService


class Setup2FAUseCase:

    def __init__(self):
        self.service = TwoFactorService()

    def execute(self):

        secret, uri = self.service.generate_secret()

        return {
            "secret": secret,
            "otp_uri": uri
        }