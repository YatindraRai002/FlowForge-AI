from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage

class MetaGPTGroqAdapter:
    def __init__(self, llm: ChatGroq):
        self.llm = llm
        self.model = llm  # compatibility alias

    async def aask(self, prompt: str, system_prompt: str = None) -> str:
        messages = []
        if system_prompt:
            messages.append(SystemMessage(content=system_prompt))
        messages.append(HumanMessage(content=prompt))
        
        response = await self.llm.ainvoke(messages)
        return response.content

    def ask(self, prompt: str, system_prompt: str = None) -> str:
        messages = []
        if system_prompt:
            messages.append(SystemMessage(content=system_prompt))
        messages.append(HumanMessage(content=prompt))
        
        response = self.llm.invoke(messages)
        return response.content
