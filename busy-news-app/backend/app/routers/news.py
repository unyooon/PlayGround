from fastapi import APIRouter, Depends
from app.services.agent import NewsAgent
from app.schemas.news import News
from typing import List
from app.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/news",
    tags=["news"]
)


@router.get("/summarize", response_model=List[News])
async def get_summarized_news(db: AsyncSession = Depends(get_db)):
    agent = NewsAgent(db)
    await agent.collect_and_summarize()
    # データベースからニュースを取得して返す
    result = await db.execute(select(NewsDB))
    news_list = result.scalars().all()
    return news_list
