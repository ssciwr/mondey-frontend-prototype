from fastapi.testclient import TestClient


def test_get_milestone_groups(admin_client: TestClient):
    response = admin_client.get("/admin/milestone-groups/")
    assert response.status_code == 200
    assert len(response.json()) == 2
    group1, group2 = response.json()
    assert group1 == {
        "id": 2,
        "order": 1,
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
        "text": {
            "de": {"id": 1, "group_id": 1, "lang": "de", "title": "t1", "desc": "d1"},
            "en": {"id": 2, "group_id": 1, "lang": "en", "title": "t2", "desc": "d2"},
        },
        "milestones": [],
    }


def test_post_milestone_groups(admin_client: TestClient):
    data = {
        "group": {"order": 0},
        "text": [
            {"lang": "en", "title": "title1", "desc": "desc1"},
            {"lang": "de", "title": "title2", "desc": "desc2"},
        ],
    }
    response = admin_client.post("/admin/milestone-groups/", json=data)
    assert response.status_code == 200
    assert response.json() == {
        "id": 3,
        "order": 0,
        "text": {
            "en": {
                "id": 6,
                "lang": "en",
                "group_id": 3,
                "title": "title1",
                "desc": "desc1",
            },
            "de": {
                "id": 7,
                "lang": "de",
                "group_id": 3,
                "title": "title2",
                "desc": "desc2",
            },
        },
        "milestones": [],
    }


def test_patch_milestone_groups(admin_client: TestClient):
    data = {
        "order": 3,
    }
    response = admin_client.patch("/admin/milestone-groups/1", json=data)
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "order": 3,
        "text": {
            "de": {"id": 1, "group_id": 1, "lang": "de", "title": "t1", "desc": "d1"},
            "en": {"id": 2, "group_id": 1, "lang": "en", "title": "t2", "desc": "d2"},
        },
        "milestones": [],
    }


def test_admin_delete_milestone_group(admin_client: TestClient):
    assert admin_client.get("/milestone-groups/2").status_code == 200
    response = admin_client.delete("/admin/milestone-groups/2")
    assert response.status_code == 200
    assert admin_client.get("/milestone-groups/2").status_code == 404


def test_admin_delete_milestone_group_invalid_group_id(admin_client: TestClient):
    response = admin_client.delete("/admin/milestone-groups/692")
    assert response.status_code == 404


def test_admin_delete_milestone_group_invalid_admin_user(user_client: TestClient):
    response = user_client.delete("/admin/milestone-groups/2")
    assert response.status_code == 401
