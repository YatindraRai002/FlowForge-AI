import requests
from config import GEMINI_API_KEY
from typing import Optional
import time

class GeminiClient:
    """Wrapper for Google Gemini API using REST"""
    
    def __init__(self):
        self.api_key = GEMINI_API_KEY
        # Use v1beta API with gemini-2.0-flash (available and free)
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    
    def generate_content(self, prompt: str, max_retries: int = 3) -> Optional[str]:
        """Generate content with retry logic using REST API"""
        for attempt in range(max_retries):
            try:
                url = f"{self.base_url}?key={self.api_key}"
                headers = {'Content-Type': 'application/json'}
                data = {
                    "contents": [{
                        "parts": [{
                            "text": prompt
                        }]
                    }]
                }
                
                response = requests.post(url, headers=headers, json=data, timeout=120)
                
                # Handle rate limiting with exponential backoff
                if response.status_code == 429:
                    wait_time = (2 ** attempt) * 5  # 5s, 10s, 20s
                    print(f"Rate limited. Waiting {wait_time}s before retry {attempt + 1}/{max_retries}")
                    time.sleep(wait_time)
                    continue
                
                response.raise_for_status()
                
                result = response.json()
                if 'candidates' in result and len(result['candidates']) > 0:
                    return result['candidates'][0]['content']['parts'][0]['text']
                else:
                    raise Exception("No content generated")
                    
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 429:
                    # Already handled above
                    continue
                print(f"HTTP error on attempt {attempt + 1}: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                else:
                    raise Exception(f"Failed to generate content after {max_retries} attempts: {str(e)}")
            except Exception as e:
                print(f"Attempt {attempt + 1} failed: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                else:
                    raise Exception(f"Failed to generate content after {max_retries} attempts: {str(e)}")
        
        # If we get here, all retries failed
        raise Exception(f"Failed to generate content after {max_retries} attempts")

# Global client instance
gemini_client = GeminiClient()
