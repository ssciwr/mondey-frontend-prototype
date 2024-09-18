from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Annotated

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


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", log_level="info")
