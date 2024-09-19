from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Annotated

import click
import uvicorn
from fastapi import Depends
from fastapi import FastAPI

from .databases.milestones import create_database
from .databases.users import User
from .databases.users import create_user_db_and_tables
from .routers import admin
from .routers import auth
from .routers import milestones
from .routers import users
from .users import current_active_user


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    await create_user_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan, title="MONDEY API")
app.include_router(milestones.router)
app.include_router(admin.router)
app.include_router(users.router)
app.include_router(auth.router)


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
