from __future__ import annotations

from fastapi import APIRouter
from fastapi import HTTPException
from sqlmodel import col
from sqlmodel import select

from ..dependencies import AdminDep
from ..dependencies import SessionDep
from ..models.milestones import Milestone
from ..models.milestones import MilestoneCreate
from ..models.milestones import MilestoneGroup
from ..models.milestones import MilestoneGroupAdmin
from ..models.milestones import MilestoneGroupCreate
from ..models.milestones import MilestoneGroupPublic
from ..models.milestones import MilestoneGroupText
from ..models.milestones import MilestoneGroupTextCreate
from ..models.milestones import MilestoneGroupUpdate
from ..models.milestones import MilestonePublic
from ..models.milestones import MilestoneUpdate

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[AdminDep])


@router.post("/milestones/", response_model=MilestonePublic)
def create_milestone(session: SessionDep, milestone: MilestoneCreate):
    db_milestone = Milestone.model_validate(milestone)
    session.add(db_milestone)
    session.commit()
    session.refresh(db_milestone)
    return db_milestone


@router.patch("/milestones/{milestone_id}", response_model=MilestonePublic)
def update_milestone(
    session: SessionDep,
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


@router.delete("/milestones/{milestone_id}")
def delete_milestone(session: SessionDep, milestone_id: int):
    milestone = session.get(Milestone, milestone_id)
    if not milestone:
        raise HTTPException(status_code=404, detail="milestone not found")
    session.delete(milestone)
    session.commit()
    return {"ok": True}


@router.post("/milestone-groups/", response_model=MilestoneGroupPublic)
def create_milestone_group(
    session: SessionDep,
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


@router.get("/milestone-groups/", response_model=list[MilestoneGroupAdmin])
def get_admin_milestone_groups(session: SessionDep):
    milestone_groups = session.exec(
        select(MilestoneGroup).order_by(col(MilestoneGroup.order))
    ).all()
    return milestone_groups


@router.patch(
    "/milestone-groups/{milestone_group_id}", response_model=MilestoneGroupPublic
)
def update_milestone_group(
    session: SessionDep,
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


@router.delete("/milestone-groups/{milestone_group_id}")
def delete_milestone_group(session: SessionDep, milestone_group_id: int):
    milestone_group = session.get(MilestoneGroup, milestone_group_id)
    if not milestone_group:
        raise HTTPException(status_code=404, detail="milestone_group not found")
    session.delete(milestone_group)
    session.commit()
    return {"ok": True}
