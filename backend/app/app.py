from __future__ import annotations

from fastapi import FastAPI
from contextlib import asynccontextmanager
from sqlmodel import Session, select

from .models import Milestone, MilestoneGroup, MilestoneCreate, MilestonePublic
from .database import engine, create_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    yield

app = FastAPI(lifespan=lifespan)


@app.post("/milestones/", response_model=MilestonePublic)
def create_milestone(milestone_create: MilestoneCreate):
    with Session(engine) as session:
        milestone = Milestone.model_validate(milestone_create)
        session.add(milestone)
        session.commit()
        session.refresh(milestone)
        return milestone


@app.get("/milestones/", response_model=list[MilestonePublic])
def read_milestones():
    with Session(engine) as session:
        milestones = session.exec(select(Milestone)).all()
        return milestones