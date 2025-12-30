"""
LLM Factory - Centralized Groq LLM Initialization
Production-safe, cloud-ready, no fallback logic
"""
import os
from langchain_groq import ChatGroq
from llm_adapter import MetaGPTGroqAdapter

# Architecture decision: GROQ is the ONLY provider
# Default model updated to llama-3.1-8b-instant (llama3-8b-8192 was decommissioned)
PROVIDER = "groq"
MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
TEMPERATURE = 0.2
MAX_TOKENS = 2048

def get_llm() -> MetaGPTGroqAdapter:
    """
    Get configured Groq LLM instance wrapped in MetaGPT adapter.
    
    This is the ONLY way to create LLM instances in this application.
    No fallback, no provider switching, cloud-safe.
    
    Returns:
        MetaGPTGroqAdapter: Configured Groq LLM instance
        
    Raises:
        RuntimeError: If GROQ_API_KEY is not set
    """
    groq_api_key = os.getenv("GROQ_API_KEY")

    if not groq_api_key:
        raise RuntimeError(
            "GROQ_API_KEY is missing. "
            "Set it in environment variables (Render / local shell). "
            "Example: export GROQ_API_KEY='your_key_here'"
        )

    llm = ChatGroq(
        groq_api_key=groq_api_key,
        model_name=MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
    )

    print(f"[LLM] Provider: {PROVIDER} | Model: {MODEL}", flush=True)
    return MetaGPTGroqAdapter(llm)
