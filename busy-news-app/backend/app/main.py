from fastapi import FastAPI
from app.routers import news
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="News Summarization API",
    description="複数のLLMを使用してニュースを収集・要約するAPIサービス",
    version="1.0.0"
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じて許可するオリジンを指定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news.router)
