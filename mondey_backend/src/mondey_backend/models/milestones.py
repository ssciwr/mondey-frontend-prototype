from __future__ import annotations

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import attribute_keyed_dict
from sqlalchemy.orm import relationship
from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from .utils import back_populates
from .utils import fixed_length_string_field

# Note: models with relationships are defined in the same file to
# avoid the weird hacks required to make relationships work across files


class Language(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    lang: str = fixed_length_string_field(2, index=True)


class LanguageCreate(SQLModel):
    lang: str = fixed_length_string_field(2, index=True)


## MilestoneGroupText


class MilestoneGroupTextBase(SQLModel):
    title: str = ""
    desc: str = ""


class MilestoneGroupText(MilestoneGroupTextBase, table=True):
    group_id: int | None = Field(
        default=None, foreign_key="milestonegroup.id", primary_key=True
    )
    lang_id: int | None = Field(
        default=None, foreign_key="language.id", primary_key=True
    )


class MilestoneGroupTextCreate(MilestoneGroupTextBase):
    group_id: int
    lang_id: int


class MilestoneGroupTextPublic(MilestoneGroupTextBase):
    pass


## MilestoneGroup


class MilestoneGroup(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    order: int
    text: Mapped[dict[int, MilestoneGroupText]] = Relationship(
        sa_relationship=relationship(
            collection_class=attribute_keyed_dict("lang_id"),
            cascade="all, delete-orphan",
        )
    )
    milestones: Mapped[list[Milestone]] = back_populates("group")


class MilestoneGroupPublic(SQLModel):
    id: int
    text: dict[int, MilestoneGroupTextPublic] = {}
    milestones: list[MilestonePublic] = []


class MilestoneGroupAdmin(SQLModel):
    id: int
    order: int
    text: dict[int, MilestoneGroupText] = {}
    milestones: list[Milestone] = []


## MilestoneText


class MilestoneTextBase(SQLModel):
    name: str
    desc: str
    observation: str
    help: str


class MilestoneText(MilestoneTextBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    milestone_id: int | None = Field(
        default=None, foreign_key="milestone.id", index=True
    )
    lang: str = fixed_length_string_field(2, index=True)


class MilestoneTextCreate(MilestoneTextBase):
    lang: str = fixed_length_string_field(2, index=True)


class MilestoneTextPublic(MilestoneTextBase):
    pass


## Milestone


class MilestoneBase(SQLModel):
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


## MilestoneImage


class MilestoneImageBase(SQLModel):
    image: str
    milestone_id: int | None = Field(default=None, foreign_key="milestone.id")
    approved: bool = False


class MilestoneImage(MilestoneImageBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    milestone: Milestone | None = back_populates("images")


class MilestoneImagePublic(MilestoneImageBase):
    id: int


class MilestoneImageCreate(MilestoneImageBase):
    pass


## MilestoneAnswer


# class MilestoneAnswer(SQLModel, table=True):
#     milestone_id: int | None = Field(default=None, foreign_key="milestone.id")
#     user_id: int | None = Field(default=None, foreign_key="user.id")
#     created_at: datetime.datetime = Field(
#         default_factory=datetime.datetime.now,
#     )
#     answer: int
