import secrets
import string


class PasswordGeneratorService:

    def generate(
        self,
        length: int = 12,
        use_symbols: bool = True,
        use_numbers: bool = True
    ):

        alphabet = string.ascii_letters

        if use_numbers:
            alphabet += string.digits

        if use_symbols:
            alphabet += "!@#$%^&*()"

        password = "".join(
            secrets.choice(alphabet) for _ in range(length)
        )

        return password