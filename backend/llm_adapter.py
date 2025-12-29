from langchain_groq import ChatGroq

class MetaGPTGroqAdapter:
    def __init__(self, llm: ChatGroq):
        self.llm = llm
        self.model = llm  # compatibility alias

    async def aask(self, prompt: str) -> str:
        response = await self.llm.ainvoke(prompt)
        return response.content

    def ask(self, prompt: str) -> str:
        response = self.llm.invoke(prompt)
        return response.content
