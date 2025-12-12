"""
LLM wrapper for MetaGPT
"""
from typing import Optional
from abc import ABC, abstractmethod


class BaseLLM(ABC):
    """Base LLM interface"""
    
    def __init__(self, model: str = "mistral", temperature: float = 0.7, max_tokens: int = 2048):
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    
    @abstractmethod
    async def aask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Async ask method"""
        pass
    
    def ask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Sync ask method"""
        import asyncio
        return asyncio.run(self.aask(prompt, system_prompt))
    
    def get_usage(self) -> dict:
        """Get token usage"""
        return self.usage.copy()


class LLM:
    """LLM factory class"""
    
    @staticmethod
    def create(provider: str = "ollama", **kwargs) -> BaseLLM:
        """Create LLM instance based on provider"""
        if provider == "ollama":
            from provider.ollama_api import OllamaAPI
            from flowforge_core.configs.llm_config import LLMConfig
            
            config = LLMConfig(
                provider=provider,
                model=kwargs.get("model", "mistral"),
                temperature=kwargs.get("temperature", 0.7),
                max_tokens=kwargs.get("max_tokens", 2048)
            )
            return OllamaAPI(config, base_url=kwargs.get("base_url", "http://localhost:11434"))
        
        elif provider == "gemini":
            from provider.gemini_api import GeminiAPI
            from flowforge_core.configs.llm_config import LLMConfig
            
            config = LLMConfig(
                provider=provider,
                model=kwargs.get("model", "gemini-2.0-flash"),
                temperature=kwargs.get("temperature", 0.7),
                max_tokens=kwargs.get("max_tokens", 2048)
            )
            return GeminiAPI(config, api_key=kwargs.get("api_key"))
        
        else:
            raise ValueError(f"Unknown LLM provider: {provider}")

