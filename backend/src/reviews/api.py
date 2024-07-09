from fastapi import APIRouter, status

from src.reviews.schemas import Reviews
from src.reviews.services import get_recommended_dishes

recommendations_router = APIRouter(tags=['recommendations'])


@recommendations_router.post('/recommendations/', status_code=status.HTTP_200_OK)
async def recommendations(reviews_list: Reviews):
    return get_recommended_dishes(reviews_list.reviews)
