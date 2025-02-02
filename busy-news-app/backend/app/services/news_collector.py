import feedparser
from typing import List
from app.models.news import News
from datetime import datetime
import pytz


class NewsCollector:
    def __init__(self):
        self.sources = [
            {
                "name": "Yahooニュース - トップ",
                "url": "https://news.yahoo.co.jp/rss/topics/top-picks.xml "
            },
            # 他のニュースフィードを追加可能
        ]

    def collect_news(self) -> List[News]:
        news_list = []
        for source in self.sources:
            feed = feedparser.parse(source["url"])
            entries = feed.entries[:50]  # 各フィードから最大50件の記事を取得

            for entry in entries:
                published_at = self._parse_published_date(entry.published)

                news = News(
                    title=entry.title,
                    content=entry.description,
                    url=entry.link,
                    published_at=published_at,
                    source=source["name"]
                )
                news_list.append(news)
        return news_list

    def _parse_published_date(self, published_str: str) -> datetime:
        # 日付文字列をdatetimeオブジェクトに変換
        from dateutil.parser import parse
        dt = parse(published_str)
        # 日本時間に変換
        dt = dt.astimezone(pytz.timezone('Asia/Tokyo'))
        return dt
