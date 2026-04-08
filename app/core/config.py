from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./password_security.db"
    SECRET_KEY: str = "super_secret_for_jwt_tokens_should_be_in_env_file"

    class Config:
        env_file = ".env"

settings = Settings()