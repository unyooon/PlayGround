from app.services.news_collector import NewsCollector
from app.services.summarizer import Summarizer
from app.models.database import NewsDB
from app.schemas.news import NewsCreate
from typing import List
import asyncio
from app.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


class NewsAgent:
    def __init__(self, db: AsyncSession):
        self.collector = NewsCollector()
        self.summarizer = Summarizer()
        self.db = db

    async def collect_and_summarize(self) -> List[NewsCreate]:
        news_list = self.collector.collect_news()
        tasks = []
        for news in news_list:
            tasks.append(self._summarize_and_save(news))

        await asyncio.gather(*tasks)
        return news_list

    async def _summarize_and_save(self, news):
        summary = self.summarizer.summarize(news.content)
        news_data = NewsCreate(
            title=news.title,
            content=news.content,
            summary=summary,
            url=news.url,
            published_at=news.published_at,
            source=news.source
        )

        # 重複チェック
        existing_news = await self.db.execute(
            select(NewsDB).where(NewsDB.url == news.url)
        )
        if existing_news.scalar_one_or_none() is None:
            news_db = NewsDB(**news_data.dict())
            self.db.add(news_db)
            await self.db.commit()
