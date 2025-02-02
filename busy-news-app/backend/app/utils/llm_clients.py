import openai
# VertexAIのクライアントが必要であればインポート

from app.config import settings


class LLMClient:
    def __init__(self, provider: str = "openai"):
        self.provider = provider

        if self.provider == "openai":
            openai.api_key = settings.OPENAI_API_KEY
            # 必要に応じてモデル名やその他のパラメータを設定
            self.model_name = settings.OPENAI_MODEL_NAME or "text-davinci-003"
        elif self.provider == "vertexai":
            # VertexAIの初期化処理
            pass
        else:
            raise ValueError(f"Unsupported LLM provider: {self.provider}")

    def generate_text(self, prompt: str, max_tokens: int = 50) -> str:
        if self.provider == "openai":
            return self._generate_with_openai(prompt, max_tokens)
        elif self.provider == "vertexai":
            return self._generate_with_vertexai(prompt, max_tokens)

    def _generate_with_openai(self, prompt: str, max_tokens: int) -> str:
        try:
            response = openai.Completion.create(
                engine=self.model_name,
                prompt=prompt,
                max_tokens=max_tokens,
                n=1,
                stop=None,
                temperature=0.7,
            )
            text = response.choices[0].text.strip()
            return text
        except Exception as e:
            # ログ出力やエラーハンドリングを追加
            print(f"OpenAI API Error: {e}")
            return ""

    def _generate_with_vertexai(self, prompt: str, max_tokens: int) -> str:
        # VertexAIを使用したテキスト生成の実装
        pass
