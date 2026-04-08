from sqlalchemy import Column, String, Boolean
import uuid

from app.infrastructure.database.base import Base

class User(Base):
    __tablename__ = "users"

    # Using String for generic UUID storage in SQLite
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    email = Column(String, unique=True, index=True)

    password_hash = Column(String)

    two_factor_enabled = Column(Boolean, default=False)
    two_factor_secret = Column(String, nullable=True) # Real 2FA storage