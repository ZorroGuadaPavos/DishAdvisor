from functools import lru_cache
from typing import Annotated, Any

from pydantic import AnyUrl, BeforeValidator
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith('['):
        return [i.strip() for i in v.split(',')]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    API_V1_STR: str = '/api/v1'
    BACKEND_CORS_ORIGINS: Annotated[list[AnyUrl] | str, BeforeValidator(parse_cors)] = []
    OPENAPI_API_KEY: str
    OPENAPI_MODEL: str
    OPENAPI_PROMPT: str
    model_config = SettingsConfigDict(env_file='.env')


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
