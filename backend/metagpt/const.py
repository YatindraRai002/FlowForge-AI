"""
Global constants for MetaGPT
"""
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
WORKSPACE_ROOT = PROJECT_ROOT / "workspace"
DATA_PATH = PROJECT_ROOT / "data"
PROMPT_PATH = PROJECT_ROOT / "prompts"

# LLM Constants
DEFAULT_LLM_PROVIDER = "ollama"
DEFAULT_MODEL = "mistral"
DEFAULT_TEMPERATURE = 0.7
DEFAULT_MAX_TOKENS = 2048

# Action Constants
ACTION_TIMEOUT = 300  # 5 minutes
MAX_RETRIES = 3

# Role Constants
MAX_REACT_LOOP = 10

# Workflow States
STATE_INIT = "init"
STATE_RUNNING = "running"
STATE_COMPLETED = "completed"
STATE_FAILED = "failed"

# Message Types
MSG_TYPE_USER = "user"
MSG_TYPE_SYSTEM = "system"
MSG_TYPE_ASSISTANT = "assistant"
