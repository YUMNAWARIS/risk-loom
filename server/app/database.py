from __future__ import annotations

import os
from typing import Generator

from pathlib import Path
from dotenv import load_dotenv, find_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session


# Load environment variables from a .env file if present, robust to CWD
# 1) Load from current working directory if available
load_dotenv()
# 2) Also try loading from the project server directory alongside this file
server_env = (Path(__file__).resolve().parents[1] / ".env").as_posix()
load_dotenv(dotenv_path=server_env, override=False)
# 3) Finally, try auto-discovery
discovered = find_dotenv(usecwd=True)
if discovered:
    load_dotenv(discovered, override=False)


DATABASE_URL: str = os.getenv(
    "DATABASE_URL", "postgresql://risk-loom:risk-loom@localhost:5432/risk-loom"
)


# Create SQLAlchemy engine and session factory
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a database session and ensures cleanup."""
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


