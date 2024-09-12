from __future__ import annotations

from sqlmodel import Field, SQLModel, Relationship

class MilestoneGroupBase(SQLModel):
    title: str
    image: str
    description: str
    order: int

class MilestoneGroup(MilestoneGroupBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    milestones: list["Milestone"] = Relationship(back_populates="group")

class MilestoneGroupCreate(MilestoneGroupBase, table=True):
    pass

class MilestoneGroupPublic(MilestoneGroupBase):
    id: int

class MilestoneBase(SQLModel):
    group_id: int | None = Field(default=None, foreign_key="milestonegroup.id")
    order: int
    image: str
    title: str
    description: str
    help: str

class Milestone(MilestoneBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    group: MilestoneGroup = Relationship(back_populates="milestones")

class MilestoneCreate(MilestoneBase):
    pass

class MilestonePublic(MilestoneBase):
    id: int
