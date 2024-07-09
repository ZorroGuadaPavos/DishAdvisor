from fastapi import APIRouter

from ..reviews.api import recommendations_router

router = APIRouter(prefix='/v1')
router.include_router(recommendations_router)
