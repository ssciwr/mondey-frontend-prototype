from __future__ import annotations

import pytest
from fastapi.testclient import TestClient
from mondey_backend.dependencies import current_active_superuser
from mondey_backend.dependencies import current_active_user
from mondey_backend.dependencies import get_session
from mondey_backend.main import app
from mondey_backend.models.milestones import Language
from mondey_backend.models.milestones import MilestoneGroup
from mondey_backend.models.milestones import MilestoneGroupText
from mondey_backend.models.users import UserRead
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
        echo=False,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        # add some test data to the database
        session.add(Language(lang="de"))
        session.add(Language(lang="en"))
        session.add(Language(lang="fr"))
        session.add(MilestoneGroup(order=2))
        session.add(MilestoneGroupText(group_id=1, lang_id=1, title="t1", desc="d1"))
        session.add(MilestoneGroupText(group_id=1, lang_id=2, title="t2", desc="d2"))
        session.add(MilestoneGroup(order=1))
        session.add(MilestoneGroupText(group_id=2, lang_id=1, title="t3", desc="d3"))
        session.add(MilestoneGroupText(group_id=2, lang_id=2, title="t4", desc="d4"))
        session.add(MilestoneGroupText(group_id=2, lang_id=3, title="t5", desc="d5"))
        session.commit()
        yield session


@pytest.fixture
def admin():
    UserRead(
        id=1,
        email="admin@mondey.de",
        is_active=True,
        is_superuser=True,
        is_verified=True,
    )


@pytest.fixture
def user():
    UserRead(
        id=2,
        email="user@mondey.de",
        is_active=True,
        is_superuser=False,
        is_verified=True,
    )


@pytest.fixture
def user_client(session: Session, user: UserRead):
    app.dependency_overrides[get_session] = lambda: session
    app.dependency_overrides[current_active_user] = lambda: user
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


@pytest.fixture
def admin_client(session: Session, admin: UserRead):
    app.dependency_overrides[get_session] = lambda: session
    app.dependency_overrides[current_active_superuser] = lambda: admin
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
