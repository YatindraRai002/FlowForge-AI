"""
Groq Client - Simple wrapper around llm_factory for agent compatibility
Provides the same interface as gemini_client for easy migration
"""
from llm_factory import get_llm
from typing import Optional

class GroqClient:
    """Wrapper for Groq LLM that matches Gemini client interface"""
    
    def __init__(self):
        self.llm = get_llm()
    
    def generate_content(self, prompt: str) -> Optional[str]:
        """Generate content using Groq LLM (matches Gemini interface)"""
        try:
            response = self.llm.ask(prompt)
            return response
        except Exception as e:
            print(f"[Groq] Error generating content: {str(e)}")
            raise

# Global client instance
groq_client = GroqClient()
