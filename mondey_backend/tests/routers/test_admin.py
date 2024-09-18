from fastapi.testclient import TestClient


def test_post_milestone_groups(client: TestClient):
    data = {
        "group": {"image": None},
        "text": [
            {"lang": "en", "title": "title1", "desc": "desc1"},
            {"lang": "de", "title": "title2", "desc": "desc2"},
        ],
    }
    response = client.post("/admin/milestone-groups/", json=data)
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "order": 0,
        "image": None,
        "text": {
            "en": {"title": "title1", "desc": "desc1"},
            "de": {"title": "title2", "desc": "desc2"},
        },
        "milestones": [],
    }


def test_get_milestone_groups(client_with_db: TestClient):
    response = client_with_db.get("/admin/milestone-groups/")
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


def test_admin_delete_milestone_group(client_with_db: TestClient):
    assert client_with_db.get("/milestone-groups/2").status_code == 200
    response = client_with_db.delete("/admin/milestone-groups/2")
    assert response.status_code == 200
    assert client_with_db.get("/milestone-groups/2").status_code == 404


def test_admin_delete_milestone_group_invalid_id(client_with_db: TestClient):
    response = client_with_db.delete("/admin/milestone-groups/692")
    assert response.status_code == 404
