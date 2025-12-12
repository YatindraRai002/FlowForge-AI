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
    
    # Multi-model configuration for specialized agents
    planner_model: str = Field(default="business-analyst", description="Model for planning agent")
    researcher_model: str = Field(default="research-assistant", description="Model for research agent")
    writer_model: str = Field(default="code-assistant", description="Model for writing agent")
    reviewer_model: str = Field(default="data-science-specialist", description="Model for review agent")
    assembler_model: str = Field(default="custom-ml-assistant", description="Model for assembly agent")
    
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
    
    def get_model_for_agent(self, agent_type: str) -> str:
        """Get the specialized model for a given agent type"""
        model_mapping = {
            "planner": self.planner_model,
            "researcher": self.researcher_model,
            "writer": self.writer_model,
            "reviewer": self.reviewer_model,
            "assembler": self.assembler_model
        }
        return model_mapping.get(agent_type, self.model)

