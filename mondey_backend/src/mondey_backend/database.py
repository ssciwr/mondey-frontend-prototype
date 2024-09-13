from __future__ import annotations

from sqlmodel import SQLModel
from sqlmodel import create_engine

engine = create_engine("sqlite:///mondey.db", connect_args={"check_same_thread": False})


def create_database():
    SQLModel.metadata.create_all(engine)
