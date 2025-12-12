"""Google Gemini API Provider"""
import requests
import time
from typing import Optional, Dict, Any
from provider.base_llm import BaseLLM, LLMConfig

class GeminiAPI(BaseLLM):
    """
    Google Gemini API Provider
    Supports: gemini-2.0-flash, gemini-2.5-flash, etc.
    """
    
    def __init__(self, config: LLMConfig, api_key: str):
        super().__init__(config)
        self.api_key = api_key
        self.base_url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent"
        self.total_tokens = 0
        self.total_cost = 0.0
        
    async def aask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Async ask using Gemini"""
        import asyncio
        return await asyncio.to_thread(self._generate, prompt, system_prompt)
    
    def _generate(self, prompt: str, system_prompt: Optional[str] = None, max_retries: int = 3) -> str:
        """
        Generate response from Gemini
        
        Args:
            prompt: User prompt
            system_prompt: Optional system context (prepended to prompt)
            max_retries: Number of retry attempts
            
        Returns:
            str: Generated response
        """
        # Combine system prompt and user prompt
        full_prompt = prompt
        if system_prompt:
            full_prompt = f"{system_prompt}\n\n{prompt}"
        
        for attempt in range(max_retries):
            try:
                url = f"{self.base_url}?key={self.api_key}"
                headers = {'Content-Type': 'application/json'}
                data = {
                    "contents": [{
                        "parts": [{
                            "text": full_prompt
                        }]
                    }],
                    "generationConfig": {
                        "temperature": self.temperature,
                        "maxOutputTokens": self.max_tokens,
                    }
                }
                
                response = requests.post(url, headers=headers, json=data, timeout=self.timeout)
                
                # Handle rate limiting
                if response.status_code == 429:
                    wait_time = (2 ** attempt) * 5  # 5s, 10s, 20s
                    print(f"Rate limited. Waiting {wait_time}s before retry {attempt + 1}/{max_retries}")
                    time.sleep(wait_time)
                    continue
                
                response.raise_for_status()
                
                result = response.json()
                if 'candidates' in result and len(result['candidates']) > 0:
                    content = result['candidates'][0]['content']['parts'][0]['text']
                    
                    # Track usage
                    if 'usageMetadata' in result:
                        self.total_tokens += result['usageMetadata'].get('totalTokenCount', 0)
                    
                    return content
                else:
                    raise Exception("No content generated")
                    
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 429:
                    continue
                print(f"HTTP error on attempt {attempt + 1}: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                else:
                    raise Exception(f"Failed after {max_retries} attempts: {str(e)}")
            except Exception as e:
                print(f"Attempt {attempt + 1} failed: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                else:
                    raise Exception(f"Failed after {max_retries} attempts: {str(e)}")
        
        raise Exception(f"Failed to generate content after {max_retries} attempts")
    
    def get_usage(self) -> Dict[str, Any]:
        """Get usage statistics"""
        return {
            "total_tokens": self.total_tokens,
            "total_cost": self.total_cost,
            "model": self.model,
            "provider": "gemini"
        }
    
    def get_model_name(self) -> str:
        """Get current model name"""
        return f"gemini/{self.model}"
