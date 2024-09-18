from fastapi.testclient import TestClient


def test_get_milestone_groups(client_with_db: TestClient):
    response = client_with_db.get("/milestone-groups/")
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


def test_get_milestone_group(client_with_db: TestClient):
    response = client_with_db.get("/milestone-groups/2")
    assert response.status_code == 200
    assert response.json() == {
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


def test_get_milestone_group_invalid_id(client: TestClient):
    response = client.get("/milestone-group/2")
    assert response.status_code == 404
