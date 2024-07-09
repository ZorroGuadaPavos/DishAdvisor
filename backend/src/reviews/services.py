from openai import OpenAI

from ..core.config import settings
from .schemas import Review


def get_recommended_dishes(reviews: list[Review]):
    client = OpenAI(api_key=settings.OPENAPI_API_KEY)
    reviews_str = ', '.join([f'Rating: {review.rating}, Comment: {review.text}' for review in reviews])
    response = client.chat.completions.create(
        model=settings.OPENAPI_MODEL,
        messages=[
            {
                'role': 'system',
                'content': settings.OPENAPI_PROMPT,
            },
            {
                'role': 'user',
                'content': reviews_str,
            },
        ],
        temperature=0.5,
        max_tokens=64,
        top_p=1,
    )
    return response.choices[0].message.content
