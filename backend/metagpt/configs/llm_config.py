"""
LLM Configuration
"""
from typing import Optional
from pydantic import BaseModel, Field


class LLMConfig(BaseModel):
    """LLM configuration model"""
    
    provider: str = Field(default="ollama", description="LLM provider (ollama, gemini, etc.)")
    model: str = Field(default="mistral", description="Model name")
    temperature: float = Field(default=0.7, description="Temperature for generation")
    max_tokens: int = Field(default=2048, description="Maximum tokens to generate")
    timeout: int = Field(default=120, description="Request timeout in seconds")
    
    # Provider-specific settings
    ollama_base_url: str = Field(default="http://localhost:11434", description="Ollama API base URL")
    gemini_api_key: Optional[str] = Field(default=None, description="Gemini API key")
    
    class Config:
        extra = "allow"
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "provider": self.provider,
            "model": self.model,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
            "timeout": self.timeout
        }
