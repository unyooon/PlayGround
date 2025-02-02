from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional


class News(BaseModel):
    title: str
    content: str
    url: HttpUrl
    published_at: datetime
    source: str


class NewsInDB(News):
    id: Optional[int] = None
    summary: Optional[str] = None
