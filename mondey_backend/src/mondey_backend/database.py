from __future__ import annotations

from sqlmodel import SQLModel
from sqlmodel import create_engine

from . import MONDEY_DATABASE_PATH

engine = create_engine(
    f"sqlite:///{MONDEY_DATABASE_PATH}/mondey.db",
    connect_args={"check_same_thread": False},
)


def create_database():
    SQLModel.metadata.create_all(engine)
