from fastapi.testclient import TestClient
from mondey_backend.models import MilestoneGroup
from mondey_backend.models import MilestoneGroupText
from sqlmodel import Session


def test_create_milestone_group(client: TestClient):
    data = {
        "group": {"image": None},
        "text": [
            {"lang": "en", "title": "title1", "desc": "desc1"},
            {"lang": "de", "title": "title2", "desc": "desc2"},
        ],
    }
    response = client.post("/milestone-groups/", json=data)
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "order": None,
        "image": None,
        "text": {
            "en": {"title": "title1", "desc": "desc1"},
            "de": {"title": "title2", "desc": "desc2"},
        },
        "milestones": [],
    }


def test_read_milestone_groups(session: Session, client: TestClient):
    session.add(MilestoneGroup(order=2, image=None))
    session.add(MilestoneGroupText(group_id=1, lang="de", title="t1", desc="d1"))
    session.add(MilestoneGroupText(group_id=1, lang="en", title="t2", desc="d2"))
    session.add(MilestoneGroup(order=1, image=None))
    session.add(MilestoneGroupText(group_id=2, lang="de", title="t3", desc="d3"))
    session.add(MilestoneGroupText(group_id=2, lang="en", title="t4", desc="d4"))
    session.add(MilestoneGroupText(group_id=2, lang="fr", title="t5", desc="d5"))
    session.commit()
    response = client.get("/milestone-groups/")
    assert response.status_code == 200
    assert len(response.json()) == 2
    group1, group2 = response.json()
    assert group1 == {
        "id": 2,
        "order": 1,
        "image": None,
        "text": {
            "de": {"title": "t3", "desc": "d3"},
            "en": {"title": "t4", "desc": "d4"},
            "fr": {"title": "t5", "desc": "d5"},
        },
        "milestones": [],
    }
    assert group2 == {
        "id": 1,
        "order": 2,
        "image": None,
        "text": {
            "de": {"title": "t1", "desc": "d1"},
            "en": {"title": "t2", "desc": "d2"},
        },
        "milestones": [],
    }
