from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi import Query
from sqlmodel import Session
from sqlmodel import select

from .database import create_database
from .database import engine
from .models import Milestone
from .models import MilestoneCreate
from .models import MilestoneGroup
from .models import MilestoneGroupAdmin
from .models import MilestoneGroupCreate
from .models import MilestoneGroupPublic
from .models import MilestoneGroupText
from .models import MilestoneGroupTextCreate
from .models import MilestoneGroupUpdate
from .models import MilestonePublic
from .models import MilestoneUpdate


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    yield


def get_session():
    with Session(engine) as session:
        yield session


app = FastAPI(lifespan=lifespan)


@app.post("/milestones/", response_model=MilestonePublic)
def create_milestone(
    session: Annotated[Session, Depends(get_session)], milestone: MilestoneCreate
):
    db_milestone = Milestone.model_validate(milestone)
    session.add(db_milestone)
    session.commit()
    session.refresh(db_milestone)
    return db_milestone


@app.get("/milestones/", response_model=list[MilestonePublic])
def read_milestones(
    session: Annotated[Session, Depends(get_session)],
    offset: int = 0,
    limit: int = Query(default=100, le=100),
):
    milestones = session.exec(select(Milestone).offset(offset).limit(limit)).all()
    return milestones


@app.get("/milestones/{milestone_id}", response_model=MilestonePublic)
def read_milestone(
    session: Annotated[Session, Depends(get_session)], milestone_id: int
):
    milestone = session.get(Milestone, milestone_id)
    if not milestone:
        raise HTTPException(
            status_code=404, detail=f"Milestone with id {milestone_id} not found"
        )
    return milestone


@app.patch("/milestones/{milestone_id}", response_model=MilestonePublic)
def update_milestone(
    session: Annotated[Session, Depends(get_session)],
    milestone_id: int,
    milestone: MilestoneUpdate,
):
    db_milestone = session.get(Milestone, milestone_id)
    if not db_milestone:
        raise HTTPException(status_code=404, detail="milestone not found")
    milestone_data = milestone.model_dump(exclude_unset=True)
    for key, value in milestone_data.items():
        setattr(db_milestone, key, value)
    session.add(db_milestone)
    session.commit()
    session.refresh(db_milestone)
    return db_milestone


@app.delete("/milestones/{milestone_id}")
def delete_milestone(
    session: Annotated[Session, Depends(get_session)], milestone_id: int
):
    milestone = session.get(Milestone, milestone_id)
    if not milestone:
        raise HTTPException(status_code=404, detail="milestone not found")
    session.delete(milestone)
    session.commit()
    return {"ok": True}


@app.post("/milestone-groups/", response_model=MilestoneGroupPublic)
def create_milestone_group(
    session: Annotated[Session, Depends(get_session)],
    group: MilestoneGroupCreate,
    text: list[MilestoneGroupTextCreate],
):
    db_milestone_group = MilestoneGroup.model_validate(group)
    session.add(db_milestone_group)
    session.commit()
    session.refresh(db_milestone_group)
    for milestone_group_text in text:
        db_milestone_group_text = MilestoneGroupText.model_validate(
            milestone_group_text, update={"group_id": db_milestone_group.id}
        )
        session.add(db_milestone_group_text)
    session.commit()
    return db_milestone_group


@app.get("/milestone-groups/", response_model=list[MilestoneGroupPublic])
def get_milestone_groups(session: Annotated[Session, Depends(get_session)]):
    milestone_groups = session.exec(
        select(MilestoneGroup).order_by(MilestoneGroup.order)
    ).all()
    return milestone_groups


@app.get("/admin/milestone-groups/", response_model=list[MilestoneGroupAdmin])
def get_admin_milestone_groups(session: Annotated[Session, Depends(get_session)]):
    milestone_groups = session.exec(
        select(MilestoneGroup).order_by(MilestoneGroup.order)
    ).all()
    return milestone_groups


@app.get("/milestone-groups/{milestone_group_id}", response_model=MilestoneGroupPublic)
def read_milestone_group(
    session: Annotated[Session, Depends(get_session)], milestone_group_id: int
):
    milestone_group = session.get(MilestoneGroup, milestone_group_id)
    if not milestone_group:
        raise HTTPException(
            status_code=404,
            detail=f"MilestoneGroup with id {milestone_group_id} not found",
        )
    return milestone_group


@app.patch(
    "/milestone-groups/{milestone_group_id}", response_model=MilestoneGroupPublic
)
def update_milestone_group(
    session: Annotated[Session, Depends(get_session)],
    milestone_group_id: int,
    milestone_group: MilestoneGroupUpdate,
):
    db_milestone_group = session.get(MilestoneGroup, milestone_group_id)
    if not db_milestone_group:
        raise HTTPException(status_code=404, detail="milestone_group not found")
    milestone_group_data = milestone_group.model_dump(exclude_unset=True)
    for key, value in milestone_group_data.items():
        setattr(db_milestone_group, key, value)
    session.add(db_milestone_group)
    session.commit()
    session.refresh(db_milestone_group)
    return db_milestone_group


@app.delete("/milestone-groups/{milestone_group_id}")
def delete_milestone_group(
    session: Annotated[Session, Depends(get_session)], milestone_group_id: int
):
    milestone_group = session.get(MilestoneGroup, milestone_group_id)
    if not milestone_group:
        raise HTTPException(status_code=404, detail="milestone_group not found")
    session.delete(milestone_group)
    session.commit()
    return {"ok": True}
