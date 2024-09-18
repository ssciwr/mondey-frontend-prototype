from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI

from .database import create_database
from .routers import admin
from .routers import milestones


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(milestones.router)
app.include_router(admin.router)
