from __future__ import annotations

from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import attribute_keyed_dict
from sqlalchemy.orm import relationship
from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel


def back_populates(name: str) -> Relationship:
    # Workaround for "please state the generic argument using an annotation" sqlalchemy error
    # https://github.com/fastapi/sqlmodel/discussions/771#discussioncomment-10326074
    return Relationship(sa_relationship=relationship(back_populates=name))


def fixed_length_string_field(max_length: int, **kwargs) -> Field:
    # bug in sqlmodel - max_length doesn't propagate to actual sqlalchemy column, so we explicitly set sa_type
    # https://github.com/fastapi/sqlmodel/discussions/746
    return Field(max_length=max_length, sa_type=String(max_length), **kwargs)


class MilestoneGroupText(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    group_id: int | None = Field(
        default=None, foreign_key="milestonegroup.id", index=True
    )
    lang: str = fixed_length_string_field(2, index=True)
    title: str
    desc: str


class MilestoneGroupTextCreate(SQLModel):
    lang: str
    title: str
    desc: str


class MilestoneGroupTextPublic(SQLModel):
    title: str
    desc: str


class MilestoneGroupBase(SQLModel):
    order: int | None = None
    image: str | None = None


class MilestoneGroup(MilestoneGroupBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    text: Mapped[dict[str, MilestoneGroupText]] = Relationship(
        sa_relationship=relationship(
            collection_class=attribute_keyed_dict("lang"), cascade="all, delete-orphan"
        )
    )
    milestones: Mapped[list[Milestone]] = back_populates("group")


class MilestoneGroupCreate(MilestoneGroupBase):
    pass


class MilestoneGroupPublic(MilestoneGroupBase):
    id: int
    text: dict[str, MilestoneGroupTextPublic] = {}
    milestones: list[MilestonePublic] = []


class MilestoneGroupUpdate(SQLModel):
    name: str | None = None
    desc: str | None = None
    image: str | None = None


class MilestoneBase(SQLModel):
    name: str
    desc: str
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
    desc: str | None = None
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
