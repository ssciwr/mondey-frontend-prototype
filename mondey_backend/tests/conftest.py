from __future__ import annotations

import pytest
from fastapi.testclient import TestClient
from mondey_backend.app import app
from mondey_backend.app import get_session
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
def client(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
