from fastapi.testclient import TestClient


def test_post_language(admin_client: TestClient):
    response = admin_client.post("/admin/language/", json={"lang": "es"})
    assert response.status_code == 200
    assert response.json() == {"id": 4, "lang": "es"}


def test_delete_language(admin_client: TestClient):
    response = admin_client.delete("/admin/language/2")
    assert response.status_code == 200
    assert admin_client.get("/languages").json() == {"1": "de", "3": "fr"}


def test_get_milestone_groups(admin_client: TestClient):
    response = admin_client.get("/admin/milestone-groups/")
    assert response.status_code == 200
    assert len(response.json()) == 2
    group1, group2 = response.json()
    assert group1 == {
        "id": 2,
        "order": 1,
        "text": {
            "1": {
                "group_id": 2,
                "lang_id": 1,
                "title": "t3",
                "desc": "d3",
            },
            "2": {
                "group_id": 2,
                "lang_id": 2,
                "title": "t4",
                "desc": "d4",
            },
            "3": {
                "group_id": 2,
                "lang_id": 3,
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
            "1": {
                "group_id": 1,
                "lang_id": 1,
                "title": "t1",
                "desc": "d1",
            },
            "2": {
                "group_id": 1,
                "lang_id": 2,
                "title": "t2",
                "desc": "d2",
            },
        },
        "milestones": [],
    }


def test_post_milestone_group(admin_client: TestClient):
    response = admin_client.post("/admin/milestone-group/")
    assert response.status_code == 200
    assert response.json() == {
        "id": 3,
        "order": 0,
        "text": {
            "1": {
                "group_id": 3,
                "lang_id": 1,
                "title": "",
                "desc": "",
            },
            "2": {
                "group_id": 3,
                "lang_id": 2,
                "title": "",
                "desc": "",
            },
            "3": {
                "group_id": 3,
                "lang_id": 3,
                "title": "",
                "desc": "",
            },
        },
        "milestones": [],
    }


def test_patch_milestone_groups(admin_client: TestClient):
    data = admin_client.get("/admin/milestone-groups").json()[0]
    data["order"] = 6
    data["text"]["1"]["title"] = "asdsd"
    data["text"]["1"]["desc"] = "12xzascdasdf"
    data["text"]["2"]["title"] = "asqwdreqweqw"
    data["text"]["2"]["desc"] = "th567"
    response = admin_client.patch("/admin/milestone-group", json=data)
    assert response.status_code == 200
    assert response.json() == data


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
