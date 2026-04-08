from app.domain.services.password_service import check_strength, is_breached

def execute(password: str):
    return {
        "breached": is_breached(password),
        "strength": check_strength(password)
    }