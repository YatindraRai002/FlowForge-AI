"""
LLM Factory - Centralized Groq LLM Initialization
Production-safe, cloud-ready, no fallback logic
"""
import os
from langchain_groq import ChatGroq

# Architecture decision: GROQ is the ONLY provider
PROVIDER = "groq"
MODEL = "llama3-70b-8192"
TEMPERATURE = 0.2
MAX_TOKENS = 2048

def get_llm() -> ChatGroq:
    """
    Get configured Groq LLM instance.
    
    This is the ONLY way to create LLM instances in this application.
    No fallback, no provider switching, cloud-safe.
    
    Returns:
        ChatGroq: Configured Groq LLM instance
        
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
    return llm
