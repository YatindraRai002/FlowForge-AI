"""Ollama API Provider - Local LLM Support with Retry Logic"""
import requests
import json
import time
from typing import Optional, Dict, Any
from provider.base_llm import BaseLLM, LLMConfig

class OllamaAPI(BaseLLM):
    """
    Ollama LLM Provider for local models with automatic retry
    Supports models like: llama2, mistral, codellama, phi, gemma, qwen, etc.
    """
    
    def __init__(self, config: LLMConfig, base_url: str = "http://localhost:11434", max_retries: int = 3):
        super().__init__(config)
        self.base_url = base_url.rstrip('/')
        self.api_url = f"{self.base_url}/api/generate"
        self.chat_url = f"{self.base_url}/api/chat"
        self.total_tokens = 0
        self.total_cost = 0.0  # Free for local models
        self.max_retries = max_retries
        
    async def aask(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Async ask using Ollama with retry logic"""
        import asyncio
        return await asyncio.to_thread(self._generate_with_retry, prompt, system_prompt)
    
    def _generate_with_retry(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Generate response with exponential backoff retry"""
        last_error = None
        
        for attempt in range(self.max_retries):
            try:
                return self._generate(prompt, system_prompt)
            except requests.exceptions.Timeout as e:
                last_error = e
                wait_time = min(2 ** attempt, 30)  # Max 30 seconds
                print(f"[WARN] Timeout on attempt {attempt + 1}/{self.max_retries}. Retrying in {wait_time}s...")
                time.sleep(wait_time)
            except requests.exceptions.ConnectionError as e:
                last_error = e
                wait_time = 2 ** attempt
                print(f"[WARN] Connection error on attempt {attempt + 1}/{self.max_retries}. Retrying in {wait_time}s...")
                time.sleep(wait_time)
            except Exception as e:
                # Don't retry on other errors
                print(f"[ERROR] Non-retryable error: {str(e)}")
                raise
        
        # All retries failed
        raise Exception(f"Failed after {self.max_retries} retries: {str(last_error)}")
    
    def _generate(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """
        Generate response from Ollama
        
        Args:
            prompt: User prompt
            system_prompt: Optional system context
            
        Returns:
            str: Generated response
        """
        try:
            print(f"[Ollama] Connecting to {self.base_url}...")
            print(f"[Ollama] Model: {self.model} | Timeout: {self.timeout}s")
            
            # Use chat endpoint for better context handling
            messages = []
            if system_prompt:
                messages.append({
                    "role": "system",
                    "content": system_prompt
                })
            messages.append({
                "role": "user",
                "content": prompt[:200] + "..." if len(prompt) > 200 else prompt
            })
            
            payload = {
                "model": self.model,
                "messages": [messages[-1]],  # Send only user message for simplicity
                "stream": False,
                "options": {
                    "temperature": self.temperature,
                    "num_predict": self.max_tokens,
                }
            }
            
            print(f"[Ollama] Sending request...")
            response = requests.post(
                self.chat_url,
                json=payload,
                timeout=self.timeout
            )
            print(f"[Ollama] Response status: {response.status_code}")
            response.raise_for_status()
            
            result = response.json()
            
            # Track token usage
            if 'eval_count' in result:
                self.total_tokens += result.get('eval_count', 0)
            
            response_text = result['message']['content']
            print(f"[Ollama] Response received: {len(response_text)} chars")
            return response_text
            
        except requests.exceptions.ConnectionError as e:
            print(f"[Ollama ERROR] Connection failed: {str(e)}")
            raise Exception(
                f"Cannot connect to Ollama at {self.base_url}.\n"
                "Please ensure Ollama is running:\n"
                "  1. Open a new terminal\n"
                "  2. Run: ollama serve\n"
                "  OR: ollama run mistral"
            )
        except requests.exceptions.Timeout as e:
            print(f"[Ollama ERROR] Timeout after {self.timeout}s: {str(e)}")
            raise Exception(
                f"Ollama request timed out after {self.timeout}s.\n"
                "The model may be too slow or not responding.\n"
                "Try: ollama run mistral"
            )
        except Exception as e:
            print(f"[Ollama ERROR] Generation failed: {str(e)}")
            raise Exception(f"Ollama generation failed: {str(e)}")
    
    def get_usage(self) -> Dict[str, Any]:
        """Get usage statistics"""
        return {
            "total_tokens": self.total_tokens,
            "total_cost": 0.0,  # Local models are free
            "model": self.model,
            "provider": "ollama"
        }
    
    def get_model_name(self) -> str:
        """Get current model name"""
        return f"ollama/{self.model}"
    
    def list_models(self) -> list:
        """List available Ollama models"""
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=10)
            response.raise_for_status()
            data = response.json()
            return [model['name'] for model in data.get('models', [])]
        except Exception as e:
            print(f"Failed to list Ollama models: {e}")
            return []
    
    def pull_model(self, model_name: str) -> bool:
        """
        Pull a model from Ollama registry
        
        Args:
            model_name: Name of model to pull (e.g., 'llama2', 'mistral')
            
        Returns:
            bool: Success status
        """
        try:
            payload = {"name": model_name}
            response = requests.post(
                f"{self.base_url}/api/pull",
                json=payload,
                stream=True,
                timeout=600  # 10 minutes for large models
            )
            
            # Stream the pull progress
            for line in response.iter_lines():
                if line:
                    data = json.loads(line)
                    if 'status' in data:
                        print(f"Pull status: {data['status']}")
                    if data.get('status') == 'success':
                        return True
            
            return True
        except Exception as e:
            print(f"Failed to pull model {model_name}: {e}")
            return False
