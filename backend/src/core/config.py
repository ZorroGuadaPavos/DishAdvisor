from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPENAPI_API_KEY: str
    OPENAPI_MODEL: str
    OPENAPI_PROMPT: str
    model_config = SettingsConfigDict(env_file='.env')


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
