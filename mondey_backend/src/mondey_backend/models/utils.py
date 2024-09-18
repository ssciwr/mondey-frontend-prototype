from __future__ import annotations

from sqlalchemy import String
from sqlalchemy.orm import relationship
from sqlmodel import Field
from sqlmodel import Relationship


def back_populates(name: str):
    # Workaround for "please state the generic argument using an annotation" sqlalchemy error
    # https://github.com/fastapi/sqlmodel/discussions/771#discussioncomment-10326074
    return Relationship(sa_relationship=relationship(back_populates=name))


def fixed_length_string_field(max_length: int, **kwargs):
    # bug in sqlmodel - max_length doesn't propagate to actual sqlalchemy column, so we explicitly set sa_type
    # https://github.com/fastapi/sqlmodel/discussions/746
    return Field(max_length=max_length, sa_type=String(max_length), **kwargs)  # type: ignore
