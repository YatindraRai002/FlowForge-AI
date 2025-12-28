import sys
sys.path.insert(0, 'backend')

from provider.groq_api import GroqAPI
from provider.base_llm import LLMConfig

# Test Groq API
config = LLMConfig(
    model='llama-3.3-70b-versatile',
    temperature=0.7,
    max_tokens=100,
    timeout=30
)

api = GroqAPI(config, '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')

try:
    print("Testing Groq API...")
    result = api._generate('Say hello in exactly 5 words')
    print(f"\n✅ SUCCESS!")
    print(f"Response: {result}")
except Exception as e:
    print(f"\n❌ FAILED!")
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
