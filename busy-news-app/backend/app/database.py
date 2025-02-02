from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings

DATABASE_URL = settings.DATABASE_URL  # "sqlite+aiosqlite:///./test.db" など

engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # ログ出力。必要に応じてFalseにしてください。
)

async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


async def get_db():
    async with async_session() as session:
        yield session
