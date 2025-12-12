"""
Base Role class for MetaGPT
"""
from typing import List, Optional, Set
from pydantic import BaseModel, Field

from metagpt.actions.action import Action
from metagpt.schema import Message
from metagpt.llm import BaseLLM
from metagpt.context_mixin import ContextMixin
from metagpt.logs import logger


class Role(ContextMixin, BaseModel):
    """Base class for all roles"""
    
    name: str = Field(..., description="Role name")
    profile: str = Field(default="", description="Role profile/description")
    goal: str = Field(default="", description="Role goal")
    constraints: str = Field(default="", description="Role constraints")
    actions: List[Action] = Field(default_factory=list, description="Actions the role can perform")
    llm: Optional[BaseLLM] = Field(default=None, description="LLM instance")
    
    # State
    _states: List[str] = []
    _rc: dict = {}  # Role context
    
    class Config:
        arbitrary_types_allowed = True
    
    def __init__(self, **data):
        super().__init__(**data)
        self._init_actions()
    
    def _init_actions(self):
        """Initialize actions with LLM"""
        for action in self.actions:
            if action.llm is None and self.llm is not None:
                action.llm = self.llm
    
    async def _think(self) -> Action:
        """Think about which action to take next"""
        if not self.actions:
            raise ValueError(f"Role {self.name} has no actions")
        
        # Simple strategy: execute actions in order
        return self.actions[0]
    
    async def _act(self) -> Message:
        """Execute an action"""
        logger.info(f"{self.name} is thinking...")
        action = await self._think()
        
        logger.info(f"{self.name} is executing {action.name}...")
        result = await action.run()
        
        msg = Message(
            content=result.content,
            role="assistant",
            cause_by=action.name,
            sent_from=self.name
        )
        
        return msg
    
    async def run(self, message: Optional[Message] = None) -> Message:
        """Run the role's main loop"""
        logger.info(f"Starting {self.name}...")
        
        # Act
        response = await self._act()
        
        logger.info(f"{self.name} completed")
        return response
    
    def __str__(self) -> str:
        return f"{self.profile}({self.name})"
    
    def __repr__(self) -> str:
        return self.__str__()
