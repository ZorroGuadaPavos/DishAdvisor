from contextlib import asynccontextmanager

from fastapi import FastAPI

from .api import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.include_router(router)
    yield


app = FastAPI(lifespan=lifespan)
