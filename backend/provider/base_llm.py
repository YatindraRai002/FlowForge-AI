"""Base LLM Provider Interface - MetaGPT Pattern"""
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any, List
from pydantic import BaseModel

class LLMConfig(BaseModel):
    """LLM Configuration"""
    model: str
    temperature: float = 0.7
    max_tokens: int = 2048
    timeout: int = 120
    
class BaseLLM(ABC):
    """
    Base class for all LLM providers
    Following MetaGPT's provider pattern
    """
    
    def __init__(self, config: LLMConfig):
        self.config = config
        self.model = config.model
        self.temperature = config.temperature
        self.max_tokens = config.max_tokens
        self.timeout = config.timeout
    
    @abstractmethod
    async def aask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """
        Async ask - Get response from LLM
        
        Args:
            prompt: User prompt
            system_prompt: Optional system prompt for context
            
        Returns:
            str: LLM response
        """
        pass
    
    def ask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """
        Synchronous ask - Get response from LLM
        
        Args:
            prompt: User prompt
            system_prompt: Optional system prompt for context
            
        Returns:
            str: LLM response
        """
        import asyncio
        return asyncio.run(self.aask(prompt, system_prompt))
    
    @abstractmethod
    def get_usage(self) -> Dict[str, Any]:
        """Get token usage statistics"""
        pass
    
    @abstractmethod
    def get_model_name(self) -> str:
        """Get current model name"""
        pass
