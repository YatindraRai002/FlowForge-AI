"""
Context mixin for classes that need access to global context
"""
from forge.context import get_context, Context


class ContextMixin:
    """Mixin class to provide context access"""
    
    def __init__(self, context: Context = None, **kwargs):
        self._context = context or get_context()
        super().__init__(**kwargs)
    
    @property
    def context(self) -> Context:
        """Get the context"""
        return self._context
    
    @context.setter
    def context(self, value: Context):
        """Set the context"""
        self._context = value
