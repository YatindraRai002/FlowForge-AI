"""Configuration Management - MetaGPT Style"""
import os
from typing import Optional, Literal
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class LLMConfig(BaseModel):
    """LLM Provider Configuration"""
    provider: Literal["ollama", "gemini"] = "ollama"
    model: str = "llama2"
    temperature: float = 0.7
    max_tokens: int = 2048
    timeout: int = 120
    
    # Provider-specific settings
    ollama_base_url: str = "http://localhost:11434"
    gemini_api_key: Optional[str] = None
    
    # Multi-model configuration for specialized agents
    planner_model: str = "business-analyst"
    researcher_model: str = "research-assistant"
    writer_model: str = "code-assistant"
    reviewer_model: str = "data-science-specialist"
    assembler_model: str = "custom-ml-assistant"
    
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

class AppConfig(BaseModel):
    """Application Configuration"""
    # LLM Settings
    llm: LLMConfig = LLMConfig()
    
    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000
    cors_origins: list = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"]
    
    # Workflow Settings
    max_concurrent_workflows: int = 5
    workflow_timeout: int = 600  # 10 minutes
    
    # Logging
    log_level: str = "INFO"
    
def get_config() -> AppConfig:
    """Get application configuration from environment"""
    llm_config = LLMConfig(
        provider=os.getenv("LLM_PROVIDER", "ollama"),
        model=os.getenv("LLM_MODEL", "llama2"),
        temperature=float(os.getenv("LLM_TEMPERATURE", "0.7")),
        max_tokens=int(os.getenv("LLM_MAX_TOKENS", "2048")),
        timeout=int(os.getenv("LLM_TIMEOUT", "120")),
        ollama_base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
        gemini_api_key=os.getenv("GEMINI_API_KEY"),
        # Load specialized models from environment
        planner_model=os.getenv("PLANNER_MODEL", "business-analyst"),
        researcher_model=os.getenv("RESEARCHER_MODEL", "research-assistant"),
        writer_model=os.getenv("WRITER_MODEL", "code-assistant"),
        reviewer_model=os.getenv("REVIEWER_MODEL", "data-science-specialist"),
        assembler_model=os.getenv("ASSEMBLER_MODEL", "custom-ml-assistant")
    )
    
    return AppConfig(
        llm=llm_config,
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        log_level=os.getenv("LOG_LEVEL", "INFO")
    )

# Global config instance
config = get_config()

# Legacy support - keep these for backward compatibility
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
PORT = int(os.getenv("PORT", 8000))
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama")
LLM_MODEL = os.getenv("LLM_MODEL", "llama2")
