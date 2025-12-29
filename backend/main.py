"""FastAPI Application - MetaGPT Architecture"""
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from schema import UserRequest, WorkflowState
from orchestrator import orchestrator
from config import config
from llm_factory import MODEL  # Import model constant
import asyncio
import json
from typing import AsyncIterator

app = FastAPI(
    title="FlowForge AI - Multi-Agent Content Creator",
    description="LangChain Groq-powered multi-agent system",
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
    print(f"[LLM] Provider: groq | Model: {MODEL}")
    print(f"Server: http://{config.server.host}:{config.server.port}")
    print(f"CORS: {', '.join(config.cors_origins)}")
    print("="*43)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "FlowForge AI - MetaGPT Architecture",
        "version": "2.0.0",
        "architecture": "MetaGPT",
        "provider": "groq",
        "model": MODEL,
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "provider": "groq",
        "model": MODEL
    }

@app.post("/api/workflow/start", response_model=StartWorkflowResponse)
async def start_workflow(request: StartWorkflowRequest, background_tasks: BackgroundTasks):
    """Start a new workflow"""
    
    try:
        print(f"\n{'='*50}")
        print(f"🚀 Starting new workflow")
        print(f"Request: {request.request[:100]}...")
        print(f"Tone: {request.tone}, Length: {request.length}, Format: {request.format}")
        print(f"{'='*50}\n")
        
        # Create user request
        user_request = UserRequest(
            request=request.request,
            tone=request.tone,
            length=request.length,
            format=request.format
        )
        
        # Create workflow
        workflow_id = await orchestrator.create_workflow(user_request)
        print(f"✅ Workflow created with ID: {workflow_id}")
        
        # Start workflow execution in background using asyncio.create_task
        # This properly handles async functions unlike BackgroundTasks
        async def run_workflow():
            try:
                print(f"🔄 Starting workflow execution for {workflow_id}")
                await orchestrator.execute_workflow(workflow_id, user_request)
                print(f"✅ Workflow {workflow_id} completed successfully")
            except Exception as e:
                print(f"❌ Workflow {workflow_id} failed with error: {str(e)}")
                import traceback
                traceback.print_exc()
        
        # Create the task
        asyncio.create_task(run_workflow())
        
        return StartWorkflowResponse(
            workflow_id=workflow_id,
            status="started",
            message="Workflow started successfully"
        )
    
    except Exception as e:
        print(f"❌ Failed to start workflow: {str(e)}")
        import traceback
        traceback.print_exc()
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

@app.get("/api/workflow/stream/{workflow_id}")
async def stream_workflow_status(workflow_id: str):
    """Server-Sent Events stream for real-time workflow updates"""
    async def event_generator() -> AsyncIterator[str]:
        last_status = None
        while True:
            state = orchestrator.get_workflow_status(workflow_id)
            
            if not state:
                yield f'data: {{"error": "Workflow not found"}}\n\n'
                break
            
            current_status = {
                "status": state.status,
                "current_stage": state.current_stage,
                "progress": state.progress,
                "error": state.error
            }
            
            # Only send if status changed
            status_tuple = (current_status["status"], current_status["current_stage"], current_status["progress"])
            if status_tuple != last_status:
                yield f"data: {json.dumps(current_status)}\n\n"
                last_status = status_tuple
            
            # Stop streaming if workflow is done
            if state.status in ["completed", "error"]:
                break
            
            await asyncio.sleep(0.5)  # Check every 500ms
    
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )

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
        
        # Parse the result into structured format for frontend
        result_text = result if isinstance(result, str) else str(result)
        
        # Extract title (first # heading)
        title = "Marketing Brief"
        summary = ""
        body = result_text
        
        lines = result_text.split('\n')
        for i, line in enumerate(lines):
            if line.startswith('# '):
                title = line.replace('# ', '').strip()
                body = '\n'.join(lines[i+1:]).strip()
                break
        
        # Extract executive summary
        if 'executive summary' in result_text.lower():
            for i, line in enumerate(lines):
                if 'executive summary' in line.lower():
                    summary_lines = []
                    for j in range(i+1, min(i+10, len(lines))):
                        if lines[j].startswith('#'):
                            break
                        if lines[j].strip():
                            summary_lines.append(lines[j].strip())
                        if len(summary_lines) >= 3:
                            break
                    summary = ' '.join(summary_lines)
                    break
        
        if not summary:
            for line in lines:
                if line.strip() and not line.startswith('#'):
                    summary = line.strip()
                    break
        
        return {
            "workflow_id": workflow_id,
            "status": "completed",
            "result": {
                "title": title,
                "summary": summary[:300] if summary else "AI-generated marketing brief",
                "body": body,
                "raw": result_text
            }
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
    print(f"[LLM] Provider: groq | Model: {MODEL}")
    print(f"Server will run on: http://{config.server.host}:{config.server.port}\n")
    
    uvicorn.run(
        app,
        host=config.server.host,
        port=config.server.port,
        log_level=config.log_level.lower()
    )


