import requests
import json
from apscheduler.schedulers.background import BackgroundScheduler
from bs4 import BeautifulSoup
# YahooNewsCollectorのインポートを追加
from app.services.yahoo_news_collector import YahooNewsCollector

# ニュース収集と要約生成のバッチ処理


class NewsBatchService:
    def __init__(self):
        self.scheduler = BackgroundScheduler()
        self.scheduler.add_job(
            self.collect_and_summarize_news, 'interval', hours=3)
        self.scheduler.start()

    def collect_and_summarize_news(self):
        print("ニュース収集を開始します...")
        news_data = self.collect_news()
        self.save_news_to_json(news_data)

    def collect_news(self):
        collector = YahooNewsCollector()  # YahooNewsCollectorのインスタンスを作成
        news_data = collector.collect_news()  # YahooNewsCollectorのcollect_newsメソッドを呼び出す
        return news_data  # news_dataを返すように修正

    def save_news_to_json(self, news_data):
        with open('news_data.json', 'w', encoding='utf-8') as f:
            json.dump(news_data, f, ensure_ascii=False, indent=4)
        print("ニュースデータをnews_data.jsonに保存しました。")


if __name__ == "__main__":
    news_service = NewsBatchService()
    news_service.collect_and_summarize_news()  # 関数を呼び出す
