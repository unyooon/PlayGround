from app.utils.llm_clients import LLMClient


class Summarizer:
    def __init__(self, llm_provider: str = "openai"):
        self.llm_client = LLMClient(provider=llm_provider)

    def summarize(self, text: str) -> str:
        prompt = f"次の文章を10文字程度で要約してください。できるだけ重要なキーワードを含めてください。\n\n文章: \"{
            text}\""
        summary = self.llm_client.generate_text(prompt, max_tokens=20)

        if len(summary) > 20:
            # 要約が長すぎる場合は短くする
            summary = summary[:20] + "..."
        elif len(summary) == 0:
            # 要約が空の場合は元のタイトルを返す
            summary = text[:20] + "..."
        return summary.strip()
