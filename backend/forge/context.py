"""
Global context management for MetaGPT
"""
from typing import Optional
from pydantic import BaseModel, Field
from forge.configs.llm_config import LLMConfig


class Context(BaseModel):
    """Global context for the current session"""
    
    llm_config: LLMConfig = Field(default_factory=LLMConfig)
    workspace: str = Field(default="workspace")
    project_name: str = Field(default="")
    project_path: str = Field(default="")
    
    class Config:
        arbitrary_types_allowed = True
    
    def __init__(self, **data):
        super().__init__(**data)
        if not self.project_path and self.project_name:
            self.project_path = f"{self.workspace}/{self.project_name}"


# Global context instance
_context: Optional[Context] = None


def get_context() -> Context:
    """Get the global context instance"""
    global _context
    if _context is None:
        _context = Context()
    return _context


def set_context(context: Context):
    """Set the global context instance"""
    global _context
    _context = context
