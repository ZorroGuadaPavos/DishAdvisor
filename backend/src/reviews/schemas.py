from pydantic import BaseModel


class Review(BaseModel):
    rating: int
    text: str


class Reviews(BaseModel):
    reviews: list[Review]
