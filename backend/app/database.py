from __future__ import annotations

from sqlmodel import create_engine, SQLModel

engine = create_engine(
    "sqlite:///milestones.db", echo=True, connect_args={"check_same_thread": False}
)


def create_database():
    SQLModel.metadata.create_all(engine)
