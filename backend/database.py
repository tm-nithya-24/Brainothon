import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv()

# Use DATABASE_URL from .env if available, fallback to SQLite
# Replace 'postgresql://' with 'postgresql+asyncpg://' for SQLAlchemy async support
raw_url = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./sql_app.db")
if raw_url.startswith("postgresql://"):
    raw_url = raw_url.replace("postgresql://", "postgresql+asyncpg://", 1)

SQLALCHEMY_DATABASE_URL = raw_url

# Only use check_same_thread for SQLite
connect_args = {"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}

engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=connect_args
)
SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)

Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session
