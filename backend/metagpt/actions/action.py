"""
Base Action class for MetaGPT
"""
from typing import Optional
from abc import ABC, abstractmethod
from pydantic import BaseModel, Field

from metagpt.llm import BaseLLM
from metagpt.schema import Message, ActionOutput
from metagpt.context_mixin import ContextMixin


class Action(ContextMixin, BaseModel, ABC):
    """Base class for all actions"""
    
    name: str = Field(default="", description="Action name")
    llm: Optional[BaseLLM] = Field(default=None, description="LLM instance")
    prefix: str = Field(default="", description="Prompt prefix")
    desc: str = Field(default="", description="Action description")
    
    class Config:
        arbitrary_types_allowed = True
    
    def __init__(self, **data):
        super().__init__(**data)
        if not self.name:
            self.name = self.__class__.__name__
    
    @abstractmethod
    async def run(self, *args, **kwargs) -> ActionOutput:
        """Execute the action"""
        pass
    
    async def _aask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Ask LLM asynchronously"""
        if not self.llm:
            raise ValueError("LLM not initialized")
        return await self.llm.aask(prompt, system_prompt)
    
    def __str__(self) -> str:
        return f"{self.name}: {self.desc}"
    
    def __repr__(self) -> str:
        return self.__str__()
