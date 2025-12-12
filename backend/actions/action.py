"""Base Action class - MetaGPT pattern"""
from abc import ABC, abstractmethod
from typing import Optional, Any
from pydantic import BaseModel
from provider.base_llm import BaseLLM

class ActionOutput(BaseModel):
    """Output from an action"""
    content: str
    metadata: dict = {}

class Action(ABC):
    """
    Base Action class
    All actions inherit from this and implement run() method
    """
    
    def __init__(self, llm: BaseLLM, name: str = ""):
        self.llm = llm
        self.name = name or self.__class__.__name__
        self.desc = ""
        
    @abstractmethod
    async def run(self, *args, **kwargs) -> ActionOutput:
        """
        Execute the action
        
        Returns:
            ActionOutput: Result of the action
        """
        pass
    
    def _format_prompt(self, template: str, **kwargs) -> str:
        """Format prompt template with variables"""
        try:
            return template.format(**kwargs)
        except KeyError as e:
            raise ValueError(f"Missing required template variable: {e}")
    
    async def _aask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Ask LLM with prompt"""
        return await self.llm.aask(prompt, system_prompt)
    
    def __str__(self):
        return f"{self.name}Action"
