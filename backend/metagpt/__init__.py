"""
MetaGPT Core Module
"""

__version__ = "0.1.0"

from metagpt.actions import Action
from metagpt.base.base_role import Role
from metagpt.schema import Message

__all__ = ["Action", "Role", "Message", "__version__"]
