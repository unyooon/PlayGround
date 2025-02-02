from pydantic import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    VERTEXAI_API_KEY: str
    NEWS_API_KEY: str  # ニュース収集に使用するAPIキー

    class Config:
        env_file = ".env"


settings = Settings()
