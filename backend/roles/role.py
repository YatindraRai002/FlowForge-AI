"""Base Role class - MetaGPT pattern"""
from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from provider.base_llm import BaseLLM
from actions.action import Action

class Role(ABC):
    """
    Base Role class
    A Role orchestrates multiple Actions to accomplish complex tasks
    """
    
    def __init__(self, name: str = "", profile: str = "", llm: Optional[BaseLLM] = None):
        self.name = name or self.__class__.__name__
        self.profile = profile
        self.llm = llm
        self.actions: List[Action] = []
        self.states: Dict[str, Any] = {}
        
    def set_llm(self, llm: BaseLLM):
        """Set the LLM for this role"""
        self.llm = llm
        
    def _set_actions(self, actions: List[Action]):
        """Set the actions this role can perform"""
        self.actions = actions
        
    async def _think(self) -> Action:
        """
        Think about which action to take next
        Override this for custom logic
        """
        if not self.actions:
            raise ValueError(f"No actions defined for {self.name}")
        return self.actions[0]
    
    async def _act(self) -> Any:
        """Execute the current action"""
        action = await self._think()
        result = await action.run()
        return result
    
    async def _react(self) -> Any:
        """
        React to environment and execute actions
        This is the main execution loop
        """
        return await self._act()
    
    async def run(self, *args, **kwargs) -> Any:
        """
        Main entry point for role execution
        Override this in subclasses
        """
        return await self._react()
    
    def __str__(self):
        return f"{self.name}<{self.profile}>"
