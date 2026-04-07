import secrets
from pathlib import Path


class PassphraseService:

    def __init__(self):

        wordlist_path = Path(
            "app/infrastructure/security/wordlist.txt"
        )

        with open(wordlist_path) as f:
            self.words = f.read().splitlines()

    def generate(self, num_words: int = 4):

        selected = [
            secrets.choice(self.words)
            for _ in range(num_words)
        ]

        passphrase = "-".join(selected)

        return passphrase