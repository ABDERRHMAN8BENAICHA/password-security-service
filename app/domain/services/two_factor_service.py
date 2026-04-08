import pyotp


class TwoFactorService:

    def generate_secret(self):

        secret = pyotp.random_base32()

        totp = pyotp.TOTP(secret)

        otp_uri = totp.provisioning_uri(
            name="user@example.com",
            issuer_name="PasswordSecurityService"
        )

        return secret, otp_uri

    def verify_code(self, secret: str, code: str):

        totp = pyotp.TOTP(secret)
        
        # Allow for time drift (valid for current, previous, and next 30-second window)
        return totp.verify(code, valid_window=1)