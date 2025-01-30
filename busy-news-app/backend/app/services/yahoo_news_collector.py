import requests
from bs4 import BeautifulSoup


class YahooNewsCollector:
    def collect_news(self):
        news_data = []
        url = "https://news.yahoo.co.jp/topics/top-picks"

        # ページネーションの処理
        for page in range(1, 2):  # 1ページ目から1ページ目まで
            response = requests.get(f"{url}?page={page}")
            soup = BeautifulSoup(response.text, 'html.parser')
            articles = soup.select('ul.newsFeed_list li')
            for article in articles:
                if article.find('div', class_='sc-1vavpvu-1 hTcwJL') is not None:
                    continue  # PR記事はスキップ
                link_element = article.find('a')
                pickup_link = link_element['href'] if link_element else "ピックアップリンクが取得できませんでした"
                title_element = article.find(
                    'div', class_='sc-3ls169-0 dHAJpi')
                title = title_element.text if title_element else "タイトルが取得できませんでした"

                if pickup_link.startswith("http"):
                    pickup_article_response = requests.get(pickup_link)
                    pickup_article = BeautifulSoup(
                        pickup_article_response.text, 'html.parser')
                    article_link = pickup_article.find(
                        'a', class_='sc-gdv5m1-9 bxbqJP')
                    link = article_link['href'] if article_link else "リンクが取得できませんでした"
                else:
                    continue  # 次のループに進む

                if link.startswith("http"):
                    article_response = requests.get(link)
                    article_soup = BeautifulSoup(
                        article_response.text, 'html.parser')
                    content_element = article_soup.find(
                        'div', class_='article_body highLightSearchTarget')
                    content = content_element.get_text() if content_element else "内容が取得できませんでした"
                    image = article_soup.find(
                        'img')['src'] if article_soup.find('img') else None

                    news_data.append({
                        "title": title,
                        "link": link,
                        "content": content,
                        "image": image
                    })
        return news_data
