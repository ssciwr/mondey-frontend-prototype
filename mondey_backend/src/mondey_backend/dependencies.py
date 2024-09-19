from __future__ import annotations

from typing import Annotated

from fastapi import Depends
from sqlmodel import Session

from .databases.milestones import engine as milestones_engine


def get_session():
    with Session(milestones_engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
