from fastapi import APIRouter, HTTPException, status

from src.reviews.schemas import Reviews
from src.reviews.services import get_recommended_dishes

recommendations_router = APIRouter()


@recommendations_router.post('/', status_code=status.HTTP_200_OK)
async def recommendations(reviews_list: Reviews):
    if not reviews_list.reviews:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='No reviews provided')
    return get_recommended_dishes(reviews_list.reviews)
