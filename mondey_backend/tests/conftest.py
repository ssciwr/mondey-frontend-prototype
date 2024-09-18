from __future__ import annotations

import pytest
from fastapi.testclient import TestClient
from mondey_backend.dependencies import get_session
from mondey_backend.main import app
from mondey_backend.models.milestones import MilestoneGroup
from mondey_backend.models.milestones import MilestoneGroupText
from sqlmodel import Session
from sqlmodel import SQLModel
from sqlmodel import create_engine
from sqlmodel.pool import StaticPool


@pytest.fixture
def session():
    # use a new in-memory SQLite database for each test
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        echo=True,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture
def session_with_db(session: Session):
    session.add(MilestoneGroup(order=2, image=None))
    session.add(MilestoneGroupText(group_id=1, lang="de", title="t1", desc="d1"))
    session.add(MilestoneGroupText(group_id=1, lang="en", title="t2", desc="d2"))
    session.add(MilestoneGroup(order=1, image=None))
    session.add(MilestoneGroupText(group_id=2, lang="de", title="t3", desc="d3"))
    session.add(MilestoneGroupText(group_id=2, lang="en", title="t4", desc="d4"))
    session.add(MilestoneGroupText(group_id=2, lang="fr", title="t5", desc="d5"))
    session.commit()
    return session


@pytest.fixture
def client(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


@pytest.fixture
def client_with_db(session_with_db: Session):
    def get_session_override():
        return session_with_db

    app.dependency_overrides[get_session] = get_session_override

    client_with_db = TestClient(app)
    yield client_with_db
    app.dependency_overrides.clear()
