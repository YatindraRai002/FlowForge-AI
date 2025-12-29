"""Workflow Orchestrator - MetaGPT Architecture"""
import asyncio
import uuid
from datetime import datetime
from typing import Dict, Optional
from schema import WorkflowState, AgentActivity, UserRequest
from roles.content_creator import ContentCreatorRole
from llm_factory import get_llm  # Centralized LLM factory - Groq only
from config import config

class WorkflowOrchestrator:
    """
    Orchestrates multi-agent workflows using MetaGPT pattern
    Manages workflow state and coordinates Role execution
    """
    
    def __init__(self):
        self.workflows: Dict[str, WorkflowState] = {}
        self.llm = get_llm()  # Use centralized factory - no provider switching
        
    async def emit_event(self, workflow_id: str, state: WorkflowState):
        """Emit workflow state event to the queue"""
        from utils.event_bus import emit_event
        
        event = {
            "status": state.status,
            "current_stage": state.current_stage,
            "progress": state.progress,
            "agent_activities": [
                {
                    "agent_name": a.agent_name,
                    "status": a.status,
                    "current_task": a.current_task,
                    "started_at": a.started_at.isoformat() if a.started_at else None,
                    "completed_at": a.completed_at.isoformat() if a.completed_at else None
                }
                for a in state.agent_activities
            ],
            "error": state.error
        }
        await emit_event(workflow_id, event)
        

    
    async def create_workflow(self, user_request: UserRequest) -> str:
        """
        Create a new workflow
        
        Args:
            user_request: User's content request
            
        Returns:
            str: Workflow ID
        """
        workflow_id = str(uuid.uuid4())
        
        # Initialize workflow state
        state = WorkflowState(
            workflow_id=workflow_id,
            status="started",
            current_stage="initializing",
            progress=0,
            agent_activities=[]
        )
        
        self.workflows[workflow_id] = state
        return workflow_id
    
    async def execute_workflow(self, workflow_id: str, user_request: UserRequest):
        """
        Execute the workflow asynchronously
        
        Args:
            workflow_id: Workflow identifier
            user_request: User's content request
        """
        state = self.workflows.get(workflow_id)
        if not state:
            raise ValueError(f"Workflow {workflow_id} not found")
        
        try:
            print(f"\n{'='*50}")
            print(f"🔄 Executing workflow {workflow_id}")
            print(f"Request: {user_request.request[:100]}...")
            print(f"{'='*50}\n")
            
            # Update status
            state.status = "in_progress"
            state.progress = 5
            state.current_stage = "planning"
            print(f"✅ Workflow status updated to in_progress")
            await self.emit_event(workflow_id, state)
            
            # Create Content Creator Role
            print(f"🤖 Creating ContentCreatorRole with LLM provider: groq")
            creator_role = ContentCreatorRole(self.llm)
            print(f"✅ ContentCreatorRole created successfully")
            
            # Define progress callback
            async def update_progress(stage: str, message: str):
                # Map stages to agent names and progress
                stage_mapping = {
                    "planning": ("Planner Agent", 20),
                    "researching": ("Researcher Agent", 40),
                    "writing": ("Writer Agent", 60),
                    "reviewing": ("Critic Agent", 80),
                    "assembling": ("Assembler Agent", 90),
                    "completed": ("Workflow", 100)
                }
                
                agent_name, progress = stage_mapping.get(stage, ("Unknown", state.progress))
                
                # Update or add agent activity
                activity = next(
                    (a for a in state.agent_activities if a.agent_name == agent_name),
                    None
                )
                
                if not activity:
                    activity = AgentActivity(
                        agent_name=agent_name,
                        status="running" if stage != "completed" else "completed",
                        current_task=message,
                        started_at=datetime.now()
                    )
                    state.agent_activities.append(activity)
                else:
                    activity.status = "running" if stage != "completed" else "completed"
                    activity.current_task = message
                    if stage == "completed":
                        activity.completed_at = datetime.now()
                
                state.current_stage = stage
                state.progress = progress
                state.updated_at = datetime.now()
                await self.emit_event(workflow_id, state)
            
            # Execute the role
            print(f"🚀 Starting creator_role.run()...")
            results = await creator_role.run(
                request=user_request.request,
                tone=user_request.tone,
                length=user_request.length,
                format_type=user_request.format,
                on_progress=update_progress
            )
            print(f"✅ creator_role.run() completed successfully")
            
            # Mark all agents as completed
            for activity in state.agent_activities:
                if activity.status == "running":
                    activity.status = "completed"
                    activity.completed_at = datetime.now()
            
            # Update final state
            state.status = "completed"
            state.progress = 100
            state.current_stage = "completed"
            state.data = results['final_content']
            state.updated_at = datetime.now()
            await self.emit_event(workflow_id, state)
            
        except Exception as e:
            # Handle errors
            error_msg = str(e)
            print(f"❌ Workflow {workflow_id} failed: {error_msg}")
            import traceback
            traceback.print_exc()
            
            state.status = "error"
            state.current_stage = "error"
            state.error = error_msg
            state.updated_at = datetime.now()
            
            # Mark current agent as error
            if state.agent_activities:
                last_activity = state.agent_activities[-1]
                if last_activity.status == "running":
                    last_activity.status = "error"
                    last_activity.current_task = f"Error: {error_msg}"
                    last_activity.completed_at = datetime.now()
            
            await self.emit_event(workflow_id, state)
            
            # Re-raise the exception as requested
            raise
    
    def get_workflow_status(self, workflow_id: str) -> Optional[WorkflowState]:
        """Get workflow status"""
        return self.workflows.get(workflow_id)
    
    def get_workflow_result(self, workflow_id: str) -> Optional[str]:
        """Get final workflow result"""
        state = self.workflows.get(workflow_id)
        if state and state.status == "completed":
            return state.data
        return None

# Global orchestrator instance
orchestrator = WorkflowOrchestrator()
