"""
Core schema definitions for MetaGPT
"""
from typing import Optional, List, Any
from datetime import datetime
from pydantic import BaseModel, Field
from enum import Enum


class MessageRole(str, Enum):
    """Message role types"""
    USER = "user"
    SYSTEM = "system"
    ASSISTANT = "assistant"


class Message(BaseModel):
    """Message in the conversation"""
    
    content: str = Field(..., description="Message content")
    role: MessageRole = Field(default=MessageRole.USER, description="Message role")
    cause_by: str = Field(default="", description="Action that caused this message")
    sent_from: str = Field(default="", description="Sender of the message")
    send_to: str = Field(default="", description="Receiver of the message")
    created_at: datetime = Field(default_factory=datetime.now)
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "content": self.content,
            "role": self.role.value,
            "cause_by": self.cause_by,
            "sent_from": self.sent_from,
            "send_to": self.send_to,
            "created_at": self.created_at.isoformat()
        }


class ActionOutput(BaseModel):
    """Output from an action"""
    
    content: str = Field(default="", description="Output content")
    instruct_content: Optional[dict] = Field(default=None, description="Structured instructions")
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "content": self.content,
            "instruct_content": self.instruct_content
        }


class Plan(BaseModel):
    """Plan for content creation"""
    
    goal: str = Field(..., description="Goal of the plan")
    context: str = Field(default="", description="Context and background")
    constraints: List[str] = Field(default_factory=list, description="Constraints and requirements")
    current_plan: str = Field(default="", description="Current plan details")
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "goal": self.goal,
            "context": self.context,
            "constraints": self.constraints,
            "current_plan": self.current_plan
        }


class WorkflowState(str, Enum):
    """Workflow states"""
    INIT = "init"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class TaskResult(BaseModel):
    """Result from a task execution"""
    
    task_id: str = Field(..., description="Task identifier")
    status: WorkflowState = Field(default=WorkflowState.INIT)
    result: Any = Field(default=None, description="Task result")
    error: Optional[str] = Field(default=None, description="Error message if failed")
    created_at: datetime = Field(default_factory=datetime.now)
    completed_at: Optional[datetime] = Field(default=None)
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "task_id": self.task_id,
            "status": self.status.value,
            "result": self.result,
            "error": self.error,
            "created_at": self.created_at.isoformat(),
            "completed_at": self.completed_at.isoformat() if self.completed_at else None
        }
