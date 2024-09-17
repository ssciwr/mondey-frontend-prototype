from fastapi.testclient import TestClient


def add_data(client: TestClient):
    client.post(
        "/milestone-groups/",
        json={"name": "Group1", "description": "desc1", "image": "img1.jpg"},
    )
    client.post(
        "/milestones/",
        json={
            "name": "Milestone1",
            "description": "desc1",
            "observation": "observation1",
            "help": "help1",
            "order": 1,
            "group_id": 1,
        },
    )
    client.post(
        "/milestones/",
        json={
            "name": "Milestone2",
            "description": "desc2",
            "observation": "observation2",
            "help": "help2",
            "order": 2,
            "group_id": 1,
        },
    )


def test_create_milestone_group(client: TestClient):
    data = {"name": "Grobmotorik", "description": "desc", "image": "img1.jpg"}
    response = client.post("/milestone-groups/", json=data)
    assert response.status_code == 200
    assert response.json() == {"id": 1, **data}


def test_create_milestone(client: TestClient):
    data = {
        "name": "Grobmotorik",
        "description": "desc",
        "observation": "blah",
        "help": "help",
        "order": 1,
        "group_id": 1,
    }
    response = client.post("/milestones/", json=data)
    assert response.status_code == 200
    assert response.json() == {"id": 1, **data}
