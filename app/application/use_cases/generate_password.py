from app.domain.services.password_generator_service import (
    PasswordGeneratorService
)


class GeneratePasswordUseCase:

    def __init__(self):
        self.service = PasswordGeneratorService()

    def execute(
        self,
        length: int,
        use_symbols: bool,
        use_numbers: bool
    ):

        password = self.service.generate(
            length,
            use_symbols,
            use_numbers
        )

        return {"password": password}