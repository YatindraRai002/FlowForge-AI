"""
MetaGPT Core Module
"""

__version__ = "0.1.0"

from forge.actions import Action
from forge.base.base_role import Role
from forge.schema import Message

__all__ = ["Action", "Role", "Message", "__version__"]
