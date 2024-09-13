from __future__ import annotations

from typing import Annotated
from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlmodel import Session, select

from .models import (
    Milestone,
    MilestoneGroup,
    MilestoneGroupPublic,
    MilestoneGroupCreate,
    MilestoneCreate,
    MilestonePublic,
)
from .database import engine, create_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    yield


def get_session():
    with Session(engine) as session:
        yield session


app = FastAPI(lifespan=lifespan)


@app.post("/milestone-groups/", response_model=MilestoneGroupPublic)
def create_milestone_group(
    session: Annotated[Session, Depends(get_session)],
    milestone_group_create: MilestoneGroupCreate,
):
    milestone_group = MilestoneGroup.model_validate(milestone_group_create)
    session.add(milestone_group)
    session.commit()
    session.refresh(milestone_group)
    return milestone_group


@app.get("/milestone-groups/", response_model=list[MilestoneGroupPublic])
def read_milestone_groups(session: Annotated[Session, Depends(get_session)]):
    milestone_groups = session.exec(select(MilestoneGroup)).all()
    return milestone_groups


@app.post("/milestones/", response_model=MilestonePublic)
def create_milestone(
    session: Annotated[Session, Depends(get_session)], milestone_create: MilestoneCreate
):
    milestone = Milestone.model_validate(milestone_create)
    session.add(milestone)
    session.commit()
    session.refresh(milestone)
    return milestone


@app.get("/milestones/", response_model=list[MilestonePublic])
def read_milestones(session: Annotated[Session, Depends(get_session)]):
    milestones = session.exec(select(Milestone)).all()
    return milestones
