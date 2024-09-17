# MONDEY backend

The MONDEY backend is a FastAPI application that provides a RESTful API for the MONDEY project.

## Installation

```pycon
pip install -e .[tests]
```

## Use

To start a local dev server for testing purposes:

```bash
uvicorn mondey_backend:app --reload
```

The swagger UI will then be available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Tests

```pycon
pytest
```
