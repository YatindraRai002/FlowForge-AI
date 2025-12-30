"""Application Configuration - Groq Only"""
import os
from pydantic import BaseModel
from pydantic_settings import BaseSettings
from typing import Optional

class LLMConfig(BaseModel):
    """LLM Configuration - Groq Only (No Provider Switching)"""
    # Note: Provider is hardcoded in llm_factory.py, not configurable
    model: str = "llama-3.1-8b-instant"
    temperature: float = 0.2
    max_tokens: int = 2048
    timeout: int = 120
    
    # Groq API Key (loaded from environment)
    groq_api_key: Optional[str] = None
    
    # Specialized models (optional overrides)
    planner_model: str = "llama-3.1-8b-instant"
    researcher_model: str = "llama-3.1-8b-instant"
    writer_model: str = "llama-3.1-8b-instant"
    reviewer_model: str = "llama-3.1-8b-instant"
    assembler_model: str = "llama-3.1-8b-instant"

class ServerConfig(BaseModel):
    """Server Configuration"""
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = False

class AppConfig(BaseModel):
    """Application Configuration"""
    llm: LLMConfig
    server: ServerConfig
    
    # CORS Configuration
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "https://flowforge-ai.onrender.com",
    ]
    
    # Workflow settings
    max_concurrent_workflows: int = 5
    workflow_timeout: int = 600  # 10 minutes
    
    # Logging
    log_level: str = "INFO"
    
def get_config() -> AppConfig:
    """Get application configuration from environment"""
    llm_config = LLMConfig(
        model=os.getenv("LLM_MODEL", "llama-3.1-8b-instant"),
        temperature=float(os.getenv("LLM_TEMPERATURE", "0.2")),
        max_tokens=int(os.getenv("LLM_MAX_TOKENS", "2048")),
        timeout=int(os.getenv("LLM_TIMEOUT", "120")),
        groq_api_key=os.getenv("GROQ_API_KEY"),  # FIXED: Was GROK_API_KEY
        # Specialized models
        planner_model=os.getenv("PLANNER_MODEL", "llama-3.1-8b-instant"),
        researcher_model=os.getenv("RESEARCHER_MODEL", "llama-3.1-8b-instant"),
        writer_model=os.getenv("WRITER_MODEL", "llama-3.1-8b-instant"),
        reviewer_model=os.getenv("REVIEWER_MODEL", "llama-3.1-8b-instant"),
        assembler_model=os.getenv("ASSEMBLER_MODEL", "llama-3.1-8b-instant")
    )
    
    server_config = ServerConfig(
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        reload=os.getenv("RELOAD", "false").lower() == "true"
    )
    
    return AppConfig(
        llm=llm_config,
        server=server_config,
        max_concurrent_workflows=int(os.getenv("MAX_CONCURRENT_WORKFLOWS", "5")),
        workflow_timeout=int(os.getenv("WORKFLOW_TIMEOUT", "600")),
        log_level=os.getenv("LOG_LEVEL", "INFO")
    )

# Global config instance
config = get_config()
