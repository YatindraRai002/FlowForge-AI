import sys
sys.path.insert(0, 'backend')

from provider.grok_api import GrokAPI
from provider.base_llm import LLMConfig

# Test Grok API with grok-3
config = LLMConfig(
    model='grok-3',
    temperature=0.7,
    max_tokens=100,
    timeout=30
)

api = GrokAPI(config, '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')

try:
    print("Testing Grok API with grok-3...")
    result = api._generate('Say hello in exactly 5 words')
    print(f"\n✅ SUCCESS!")
    print(f"Response: {result}")
except Exception as e:
    print(f"\n❌ FAILED!")
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
