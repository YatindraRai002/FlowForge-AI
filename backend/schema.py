"""Data Schemas - Pydantic Models"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any, Literal
from datetime import datetime

class UserRequest(BaseModel):
    """User's content creation request"""
    request: str = Field(..., description="Content request description")
    tone: Literal["professional", "casual", "formal"] = "professional"
    length: Literal["short", "medium", "long"] = "medium"
    format: Literal["marketing brief", "social media", "blog post", "email campaign"] = "marketing brief"

class Section(BaseModel):
    """Content section"""
    id: str
    title: str
    description: str
    content: Optional[str] = None

class Plan(BaseModel):
    """Strategic content plan"""
    goal: str
    audience: str
    tone: str
    sections: List[Section]
    constraints: List[str]

class AgentActivity(BaseModel):
    """Activity status of an agent"""
    agent_name: str
    status: Literal["pending", "running", "completed", "error"] = "pending"
    current_task: str = ""
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    error: Optional[str] = None

class WorkflowState(BaseModel):
    """State of a workflow execution"""
    workflow_id: str
    status: Literal["started", "in_progress", "completed", "error"] = "started"
    current_stage: str = "planning"
    progress: int = 0  # 0-100
    agent_activities: List[AgentActivity] = []
    data: Optional[Any] = None
    error: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class WorkflowResult(BaseModel):
    """Final workflow result"""
    workflow_id: str
    status: str
    final_content: str
    metadata: Dict[str, Any] = {}
    created_at: datetime
    completed_at: Optional[datetime] = None

class APIResponse(BaseModel):
    """Standard API response"""
    success: bool
    message: str
    data: Optional[Any] = None
    error: Optional[str] = None
