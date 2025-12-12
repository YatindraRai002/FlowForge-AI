"""FastAPI Application - MetaGPT Architecture"""
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from schema import UserRequest, WorkflowState
from orchestrator import orchestrator
from config import config
import asyncio

app = FastAPI(
    title="FlowForge AI - Multi-Agent Content Creator",
    description="MetaGPT-powered multi-agent system with Ollama/Gemini support",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StartWorkflowRequest(BaseModel):
    request: str
    tone: str = "professional"
    length: str = "medium"
    format: str = "marketing brief"

class StartWorkflowResponse(BaseModel):
    workflow_id: str
    status: str
    message: str

@app.on_event("startup")
async def startup_event():
    """Application startup"""
    print("="*43)
    print("FlowForge AI - MetaGPT Architecture")
    print("="*43)
    print(f"LLM Provider: {config.llm.provider}")
    print(f"Model: {config.llm.model}")
    print(f"Server: http://{config.host}:{config.port}")
    print(f"CORS: {', '.join(config.cors_origins)}")
    print("="*43)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "FlowForge AI - MetaGPT Architecture",
        "version": "2.0.0",
        "architecture": "MetaGPT",
        "provider": config.llm.provider,
        "model": config.llm.model,
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "provider": config.llm.provider,
        "model": config.llm.model
    }

@app.post("/api/workflow/start", response_model=StartWorkflowResponse)
async def start_workflow(request: StartWorkflowRequest, background_tasks: BackgroundTasks):
    """Start a new workflow"""
    
    try:
        # Create user request
        user_request = UserRequest(
            request=request.request,
            tone=request.tone,
            length=request.length,
            format=request.format
        )
        
        # Create workflow
        workflow_id = await orchestrator.create_workflow(user_request)
        
        # Start workflow execution in background
        background_tasks.add_task(
            orchestrator.execute_workflow,
            workflow_id,
            user_request
        )
        
        return StartWorkflowResponse(
            workflow_id=workflow_id,
            status="started",
            message="Workflow started successfully"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/workflow/status/{workflow_id}")
async def get_workflow_status(workflow_id: str):
    """Get status of a workflow"""
    
    try:
        state = orchestrator.get_workflow_status(workflow_id)
        
        if not state:
            raise HTTPException(status_code=404, detail="Workflow not found")
        
        return {
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
            "data": state.data,
            "error": state.error
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/workflow/result/{workflow_id}")
async def get_workflow_result(workflow_id: str):
    """Get final result of a completed workflow"""
    
    try:
        result = orchestrator.get_workflow_result(workflow_id)
        
        if result is None:
            state = orchestrator.get_workflow_status(workflow_id)
            if not state:
                raise HTTPException(status_code=404, detail="Workflow not found")
            elif state.status != "completed":
                raise HTTPException(
                    status_code=400,
                    detail=f"Workflow not completed yet. Current stage: {state.current_stage}"
                )
        
        return {
            "workflow_id": workflow_id,
            "status": "completed",
            "data": result
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/workflows")
async def list_workflows():
    """List all workflows"""
    try:
        workflows = []
        for workflow_id, state in orchestrator.workflows.items():
            workflows.append({
                "workflow_id": workflow_id,
                "status": state.status,
                "current_stage": state.current_stage,
                "progress": state.progress,
                "created_at": state.created_at.isoformat(),
                "updated_at": state.updated_at.isoformat()
            })
        
        return {"workflows": workflows}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("\nStarting FlowForge AI - MetaGPT Architecture\n")
    print(f"LLM Provider: {config.llm.provider}")
    print(f"Model: {config.llm.model}")
    print(f"Server will run on: http://{config.host}:{config.port}\n")
    
    uvicorn.run(
        app,
        host=config.host,
        port=config.port,
        log_level=config.log_level.lower()
    )

