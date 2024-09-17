from __future__ import annotations

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel


def back_populates(name: str):
    # Workaround for "please state the generic argument using an annotation" sqlalchemy error
    # https://github.com/fastapi/sqlmodel/discussions/771#discussioncomment-10326074
    return Relationship(sa_relationship=relationship(back_populates=name))


class MilestoneGroupBase(SQLModel):
    name: str
    description: str
    image: str


class MilestoneGroup(MilestoneGroupBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    milestones: Mapped[list[Milestone]] = back_populates("group")


class MilestoneGroupCreate(MilestoneGroupBase):
    pass


class MilestoneGroupPublic(MilestoneGroupBase):
    id: int


class MilestoneGroupUpdate(SQLModel):
    name: str | None = None
    description: str | None = None
    image: str | None = None


class MilestoneBase(SQLModel):
    name: str
    description: str
    observation: str
    help: str
    order: int
    group_id: int | None = Field(default=None, foreign_key="milestonegroup.id")


class Milestone(MilestoneBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    group: MilestoneGroup | None = back_populates("milestones")
    images: Mapped[list[MilestoneImage]] = back_populates("milestone")


class MilestonePublic(MilestoneBase):
    id: int


class MilestoneCreate(MilestoneBase):
    pass


class MilestoneUpdate(SQLModel):
    name: str | None = None
    description: str | None = None
    howto: str | None = None
    help: str | None = None
    order: int | None = None
    group_id: int | None = None


class MilestoneImageBase(SQLModel):
    image: str
    milestone_id: int | None = Field(default=None, foreign_key="milestone.id")
    approved: bool = False


class MilestoneImage(MilestoneImageBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    milestone: Milestone | None = back_populates("images")


class MilestoneImagePublic(MilestoneImageBase):
    id: int


class MilestoneImageCreate(MilestoneBase):
    pass
