# MONDEY backend

The MONDEY backend is a FastAPI application that provides a RESTful API for the MONDEY project.

## Installation

```bash
pip install -e .[tests]
```

## Use

To start a local development server:

```bash
mondey-backend --reload
```

To see the available options (which all just forward to uvicorn options of the same name):

```bash
mondey-backend --help
```

The swagger UI will then be available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Tests

```bash
pytest
```
