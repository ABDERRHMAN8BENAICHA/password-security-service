from app.domain.services.password_strength_service import PasswordStrengthService


class CheckPasswordStrengthUseCase:

    def __init__(self):
        self.service = PasswordStrengthService()

    def execute(self, password: str):

        result = self.service.check_strength(password)

        return result