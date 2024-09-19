from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Annotated

import click
import uvicorn
from fastapi import Depends
from fastapi import FastAPI

from .database import create_database
from .db import User
from .db import create_db_and_tables
from .routers import admin
from .routers import milestones
from .schemas import UserCreate
from .schemas import UserRead
from .schemas import UserUpdate
from .users import auth_backend
from .users import current_active_user
from .users import fastapi_users


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    await create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan, title="MONDEY API")
app.include_router(milestones.router)
app.include_router(admin.router)
app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)


@app.get("/authenticated-route")
async def authenticated_route(user: Annotated[User, Depends(current_active_user)]):
    return {"message": f"Hello {user.email}!"}


@click.command()
@click.option("--host", default="localhost", show_default=True)
@click.option("--port", default=8000, show_default=True)
@click.option(
    "--reload",
    is_flag=True,
    help="Enable auto-reload for local development",
    default=False,
    show_default=True,
)
@click.option(
    "--log-level",
    default="info",
    type=click.Choice(
        ["trace", "debug", "info", "warning", "error", "critical"], case_sensitive=False
    ),
    help="Log level",
    show_default=True,
    show_choices=True,
)
@click.option(
    "--workers", help="Number of worker processes", default=1, show_default=True
)
def main(host: str, port: int, reload: bool, log_level: str, workers: int):
    uvicorn.run(
        "mondey_backend.main:app",
        host=host,
        port=port,
        reload=reload,
        log_level=log_level,
        workers=workers,
    )


if __name__ == "__main__":
    main()
