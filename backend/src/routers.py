from fastapi import APIRouter

from src.reviews.api import recommendations_router

api_router = APIRouter()

api_router.include_router(recommendations_router, prefix='/recommendations', tags=['recommendations'])
