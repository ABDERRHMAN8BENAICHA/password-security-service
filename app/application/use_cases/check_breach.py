from app.domain.services.breach_check_service import (
    BreachCheckService
)


class CheckBreachUseCase:

    def __init__(self):
        self.service = BreachCheckService()

    def execute(self, password: str):

        return self.service.check(password)