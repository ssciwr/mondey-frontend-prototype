import pytest


@pytest.mark.parametrize("client_type", ["user_client", "admin_client"])
class TestMilestones:
    def test_get_languages(self, client_type: str, request: pytest.FixtureRequest):
        client = request.getfixturevalue(client_type)
        response = client.get("/languages/")
        assert response.status_code == 200
        assert response.json() == {"1": "de", "2": "en", "3": "fr"}

    def test_get_milestone_groups(
        self, client_type: str, request: pytest.FixtureRequest
    ):
        client = request.getfixturevalue(client_type)
        response = client.get("/milestone-groups/")
        assert response.status_code == 200
        assert len(response.json()) == 2
        group1, group2 = response.json()
        assert group1 == {
            "id": 2,
            "text": {
                "1": {"title": "t3", "desc": "d3"},
                "2": {"title": "t4", "desc": "d4"},
                "3": {"title": "t5", "desc": "d5"},
            },
            "milestones": [],
        }
        assert group2 == {
            "id": 1,
            "text": {
                "1": {"title": "t1", "desc": "d1"},
                "2": {"title": "t2", "desc": "d2"},
            },
            "milestones": [],
        }

    def test_get_milestone_group(
        self, client_type: str, request: pytest.FixtureRequest
    ):
        client = request.getfixturevalue(client_type)
        response = client.get("/milestone-groups/2")
        assert response.status_code == 200
        assert response.json() == {
            "id": 2,
            "text": {
                "1": {"title": "t3", "desc": "d3"},
                "2": {"title": "t4", "desc": "d4"},
                "3": {"title": "t5", "desc": "d5"},
            },
            "milestones": [],
        }

    def test_get_milestone_group_invalid_id(
        self, client_type: str, request: pytest.FixtureRequest
    ):
        client = request.getfixturevalue(client_type)
        response = client.get("/milestone-group/2")
        assert response.status_code == 404
