"""
MetaGPT Core Module
"""

__version__ = "0.1.0"

from flowforge_core.actions import Action
from flowforge_core.base.base_role import Role
from flowforge_core.schema import Message

__all__ = ["Action", "Role", "Message", "__version__"]

