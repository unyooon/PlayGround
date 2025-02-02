from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class NewsDB(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    content = Column(Text)
    summary = Column(String(255))
    url = Column(String(255))
    published_at = Column(DateTime)
    source = Column(String(255))
