"""Grok API Provider (xAI)"""
import requests
import time
from typing import Optional, Dict, Any
from provider.base_llm import BaseLLM, LLMConfig

class GrokAPI(BaseLLM):
    """
    Grok API Provider (xAI)
    Uses OpenAI-compatible API format
    Supports: grok-beta, grok-vision-beta, etc.
    """
    
    def __init__(self, config: LLMConfig, api_key: str):
        super().__init__(config)
        self.api_key = api_key
        self.base_url = "https://api.x.ai/v1/chat/completions"
        self.total_tokens = 0
        self.total_cost = 0.0
        
    async def aask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Async ask using Grok"""
        import asyncio
        return await asyncio.to_thread(self._generate, prompt, system_prompt)
    
    def _generate(self, prompt: str, system_prompt: Optional[str] = None, max_retries: int = 3) -> str:
        """
        Generate response from Grok
        
        Args:
            prompt: User prompt
            system_prompt: Optional system context
            max_retries: Number of retry attempts
            
        Returns:
            str: Generated response
        """
        print(f"[Grok] _generate called with prompt length: {len(prompt)}", flush=True)
        
        # Build messages array
        messages = []
        if system_prompt:
            messages.append({
                "role": "system",
                "content": system_prompt
            })
        messages.append({
            "role": "user",
            "content": prompt
        })
        
        print(f"[Grok] Built {len(messages)} messages", flush=True)
        
        for attempt in range(max_retries):
            print(f"[Grok] Attempt {attempt + 1}/{max_retries}", flush=True)
            try:
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {self.api_key}'
                }
                
                # Build request data with only essential parameters
                # Some Grok models may not support all OpenAI parameters
                data = {
                    "model": self.model,
                    "messages": messages,
                    "temperature": self.temperature,
                }
                
                # Only add max_tokens if it's reasonable (< 4096)
                # Grok has specific limits on this parameter
                if self.max_tokens and self.max_tokens <= 4096:
                    data["max_tokens"] = self.max_tokens
                
                print(f"[Grok] API Request: model={self.model}, messages={len(messages)}, temp={self.temperature}, max_tokens={data.get('max_tokens', 'not set')}", flush=True)
                print(f"[Grok] Making POST request to {self.base_url} with timeout={self.timeout}s", flush=True)
                
                try:
                    response = requests.post(
                        self.base_url, 
                        headers=headers, 
                        json=data, 
                        timeout=self.timeout
                    )
                    print(f"[Grok] Got response with status code: {response.status_code}", flush=True)
                except requests.exceptions.Timeout as e:
                    print(f"[Grok] Request timed out after {self.timeout}s", flush=True)
                    raise Exception(f"Grok API timeout after {self.timeout}s")
                except requests.exceptions.ConnectionError as e:
                    print(f"[Grok] Connection error: {str(e)}", flush=True)
                    raise Exception(f"Cannot connect to Grok API: {str(e)}")
                except Exception as e:
                    print(f"[Grok] Request failed: {type(e).__name__}: {str(e)}", flush=True)
                    raise
                
                # Handle rate limiting
                if response.status_code == 429:
                    wait_time = (2 ** attempt) * 5  # 5s, 10s, 20s
                    print(f"Rate limited. Waiting {wait_time}s before retry {attempt + 1}/{max_retries}")
                    time.sleep(wait_time)
                    continue
                
                response.raise_for_status()
                
                result = response.json()
                if 'choices' in result and len(result['choices']) > 0:
                    content = result['choices'][0]['message']['content']
                    
                    # Track usage
                    if 'usage' in result:
                        self.total_tokens += result['usage'].get('total_tokens', 0)
                    
                    return content
                else:
                    raise Exception("No content generated")
                    
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 429:
                    continue
                
                # Log detailed error information for 400 errors
                error_detail = ""
                try:
                    error_detail = e.response.json()
                    print(f"❌ Grok API Error Response: {error_detail}")
                except:
                    error_detail = e.response.text
                    print(f"❌ Grok API Error Text: {error_detail}")
                
                print(f"HTTP error on attempt {attempt + 1}: {str(e)}")
                print(f"Request data: {data}")
                
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                else:
                    raise Exception(f"Failed after {max_retries} attempts: {str(e)} - Response: {error_detail}")
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
            "provider": "grok"
        }
    
    def get_model_name(self) -> str:
        """Get current model name"""
        return f"grok/{self.model}"
