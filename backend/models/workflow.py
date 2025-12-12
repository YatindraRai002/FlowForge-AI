from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class UserRequest(BaseModel):
    """Model for user's initial request"""
    request: str
    tone: Optional[str] = "professional"
    length: Optional[str] = "medium"
    format: Optional[str] = "marketing brief"

class Section(BaseModel):
    """Model for document sections"""
    id: str
    title: str
    description: str

class Plan(BaseModel):
    """Model for planner agent output"""
    goal: str
    audience: str
    tone: str
    sections: List[Section]
    constraints: List[str]

class ResearchNote(BaseModel):
    """Model for research per section"""
    key_points: List[str]
    facts: List[str]
    examples: List[str]

class Research(BaseModel):
    """Model for researcher agent output"""
    sections: Dict[str, ResearchNote]

class Draft(BaseModel):
    """Model for writer agent output"""
    sections: Dict[str, str]

class SectionFeedback(BaseModel):
    """Model for feedback per section"""
    comments: List[str]

class Feedback(BaseModel):
    """Model for critic agent output"""
    overall: List[str]
    by_section: Dict[str, SectionFeedback]

class ImprovedDraft(BaseModel):
    """Model for improved draft"""
    sections: Dict[str, str]

class FinalOutput(BaseModel):
    """Model for final assembled output"""
    title: str
    summary: str
    body: str
    table_of_contents: Optional[List[str]] = None

class AgentActivity(BaseModel):
    """Model for tracking agent activities"""
    agent_name: str
    status: str  # 'pending', 'running', 'completed'
    current_task: str
    started_at: Optional[str] = None
    completed_at: Optional[str] = None

class WorkflowState(BaseModel):
    """Complete state of the workflow"""
    user_request: UserRequest
    plan: Optional[Plan] = None
    research: Optional[Research] = None
    draft: Optional[Draft] = None
    feedback: Optional[Feedback] = None
    improved_draft: Optional[ImprovedDraft] = None
    final_output: Optional[FinalOutput] = None
    current_stage: str = "initiated"
    progress: int = 0
    agent_activities: List[AgentActivity] = []

class WorkflowResponse(BaseModel):
    """Response model for workflow status"""
    status: str
    current_stage: str
    progress: int
    agent_activities: List[AgentActivity] = []
    data: Optional[Any] = None
    error: Optional[str] = None
