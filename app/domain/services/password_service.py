def check_strength(password: str):
    if len(password) < 6:
        return "weak"
    elif len(password) < 10:
        return "medium"
    return "strong"


def is_breached(password: str):
    common = ["123456", "password", "admin"]
    return password in common