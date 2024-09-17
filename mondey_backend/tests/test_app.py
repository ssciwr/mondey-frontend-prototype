from fastapi.testclient import TestClient
from mondey_backend.models import MilestoneGroup
from mondey_backend.models import MilestoneGroupText
from sqlmodel import Session


def test_post_milestone_groups(client: TestClient):
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


def add_milestone_groups(session: Session):
    session.add(MilestoneGroup(order=2, image=None))
    session.add(MilestoneGroupText(group_id=1, lang="de", title="t1", desc="d1"))
    session.add(MilestoneGroupText(group_id=1, lang="en", title="t2", desc="d2"))
    session.add(MilestoneGroup(order=1, image=None))
    session.add(MilestoneGroupText(group_id=2, lang="de", title="t3", desc="d3"))
    session.add(MilestoneGroupText(group_id=2, lang="en", title="t4", desc="d4"))
    session.add(MilestoneGroupText(group_id=2, lang="fr", title="t5", desc="d5"))
    session.commit()


def test_get_milestone_groups(session: Session, client: TestClient):
    add_milestone_groups(session)
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


def test_get_admin_milestone_groups(session: Session, client: TestClient):
    add_milestone_groups(session)
    response = client.get("/admin/milestone-groups/")
    assert response.status_code == 200
    assert len(response.json()) == 2
    group1, group2 = response.json()
    assert group1 == {
        "id": 2,
        "order": 1,
        "image": None,
        "text": {
            "de": {"id": 3, "group_id": 2, "lang": "de", "title": "t3", "desc": "d3"},
            "en": {"id": 4, "group_id": 2, "lang": "en", "title": "t4", "desc": "d4"},
            "fr": {
                "id": 5,
                "group_id": 2,
                "lang": "fr",
                "title": "t5",
                "desc": "d5",
            },
        },
        "milestones": [],
    }
    assert group2 == {
        "id": 1,
        "order": 2,
        "image": None,
        "text": {
            "de": {"id": 1, "group_id": 1, "lang": "de", "title": "t1", "desc": "d1"},
            "en": {"id": 2, "group_id": 1, "lang": "en", "title": "t2", "desc": "d2"},
        },
        "milestones": [],
    }
