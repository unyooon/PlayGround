from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional


class NewsBase(BaseModel):
    title: str
    content: str
    url: HttpUrl
    published_at: datetime
    source: str


class NewsCreate(NewsBase):
    summary: str


class News(NewsBase):
    id: int
    summary: str

    class Config:
        orm_mode = True
