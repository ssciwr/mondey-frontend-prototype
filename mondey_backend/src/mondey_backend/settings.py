from __future__ import annotations

import secrets

from pydantic_settings import BaseSettings
from pydantic_settings import SettingsConfigDict


class AppSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    SECRET: str = secrets.token_urlsafe(64)
    USER_DATABASE_PATH: str = "users.db"
    MILESTONE_DATABASE_PATH: str = "milestones.db"
    STATIC_FILES_PATH: str = "static"
    ENABLE_CORS: bool = False
    HOST: str = "localhost"
    PORT: int = 8000
    RELOAD: bool = False
    LOG_LEVEL: str = "info"


app_settings = AppSettings()
