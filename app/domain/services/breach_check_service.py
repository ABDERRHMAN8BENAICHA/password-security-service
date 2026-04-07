import hashlib
import requests


class BreachCheckService:

    API_URL = "https://api.pwnedpasswords.com/range/"

    def check(self, password: str):

        sha1 = hashlib.sha1(password.encode()).hexdigest().upper()

        prefix = sha1[:5]
        suffix = sha1[5:]

        response = requests.get(self.API_URL + prefix)

        hashes = response.text.splitlines()

        for h in hashes:

            hash_suffix, count = h.split(":")

            if hash_suffix == suffix:

                return {
                    "breached": True,
                    "count": int(count)
                }

        return {
            "breached": False,
            "count": 0
        }