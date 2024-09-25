from __future__ import annotations

import logging

from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import UploadFile
from sqlmodel import col
from sqlmodel import select

from ..dependencies import AdminDep
from ..dependencies import SessionDep
from ..models.milestones import Language
from ..models.milestones import LanguageCreate
from ..models.milestones import Milestone
from ..models.milestones import MilestoneCreate
from ..models.milestones import MilestoneGroup
from ..models.milestones import MilestoneGroupAdmin
from ..models.milestones import MilestoneGroupText
from ..models.milestones import MilestonePublic
from ..models.milestones import MilestoneUpdate

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[AdminDep])


@router.post("/language/", response_model=Language)
def create_language(session: SessionDep, language: LanguageCreate):
    db_language = Language.model_validate(language)
    session.add(db_language)
    session.commit()
    session.refresh(db_language)
    return db_language


@router.delete("/language/{language_id}", response_model=Language)
def delete_language(session: SessionDep, language_id: str):
    language = session.get(Language, language_id)
    if not language:
        raise HTTPException(status_code=404, detail="language not found")
    session.delete(language)
    session.commit()
    return {"ok": True}


@router.get("/milestone-groups/", response_model=list[MilestoneGroupAdmin])
def get_milestone_groups(session: SessionDep):
    milestone_groups = session.exec(
        select(MilestoneGroup).order_by(col(MilestoneGroup.order))
    ).all()
    return milestone_groups


@router.post("/milestone-group/", response_model=MilestoneGroupAdmin)
def create_milestone_group(session: SessionDep):
    db_milestone_group = MilestoneGroup(order=0, image=None)
    session.add(db_milestone_group)
    session.commit()
    session.refresh(db_milestone_group)
    for language in session.exec(select(Language)).all():
        session.add(
            MilestoneGroupText(
                group_id=db_milestone_group.id, lang_id=language.id, title="", desc=""
            )
        )
    session.commit()
    session.refresh(db_milestone_group)
    return db_milestone_group


@router.patch("/milestone-group", response_model=MilestoneGroupAdmin)
def update_milestone_group(
    session: SessionDep,
    milestone_group: MilestoneGroupAdmin,
):
    db_milestone_group = session.get(MilestoneGroup, milestone_group.id)
    if not db_milestone_group:
        raise HTTPException(status_code=404, detail="milestone_group not found")
    for key, value in milestone_group.model_dump(
        exclude={"text", "milestones"}
    ).items():
        setattr(db_milestone_group, key, value)
    for text in milestone_group.text.values():
        db_milestone_group_text = session.get(
            MilestoneGroupText, (text.group_id, text.lang_id)
        )
        if not db_milestone_group_text:
            db_milestone_group_text = text
        else:
            for key, value in text.model_dump().items():
                setattr(db_milestone_group_text, key, value)
        session.add(db_milestone_group_text)
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


@router.post("/upload-milestone-group-image/{milestone_group_id}")
async def upload_milestone_group_image(
    session: SessionDep, milestone_group_id: int, file: UploadFile
):
    milestone_group = session.get(MilestoneGroup, milestone_group_id)
    filename = f"static/milestone_group_{milestone_group_id}.jpg"
    if not milestone_group:
        raise HTTPException(status_code=404, detail="milestone_group not found")
    try:
        contents = file.file.read()
        with open(filename, "wb") as f:
            f.write(contents)
    except Exception as e:
        logging.exception(e)
        raise HTTPException(status_code=404, detail="Error uploading file") from e
    finally:
        file.file.close()
    return {"filename": filename}


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
