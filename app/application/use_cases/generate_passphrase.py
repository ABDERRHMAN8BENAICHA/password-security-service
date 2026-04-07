from app.domain.services.passphrase_service import (
    PassphraseService
)


class GeneratePassphraseUseCase:

    def __init__(self):
        self.service = PassphraseService()

    def execute(self, words: int):

        phrase = self.service.generate(words)

        return {"passphrase": phrase}