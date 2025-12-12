"""
FastAPI application using MetaGPT architecture
"""
import sys
from pathlib import Path

# Add metagpt to path
sys.path.insert(0, str(Path(__file__).parent))

from fastapi import FastAPI, BackgroundTasks, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, AsyncIterator
import uuid
import json
import asyncio
import hashlib
from datetime import datetime, timedelta
from collections import OrderedDict

# FlowForge Core imports
from flowforge_core.llm import LLM
from flowforge_core.logs import logger

# Import existing actions and roles
from actions.plan import PlanAction
from actions.research import ResearchAction
from actions.write_content import WriteContentAction
from actions.review import ReviewAction
from actions.assemble import AssembleAction
from flowforge_core.base.base_role import Role

# Configuration
from config import get_config

config = get_config()

app = FastAPI(title="FlowForge AI - Core", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class WorkflowRequest(BaseModel):
    request: str
    content_type: str = "blog_post"
    tone: str = "professional"
    length: str = "medium"

class StartWorkflowResponse(BaseModel):
    workflow_id: str
    status: str
    message: str

# Workflow storage
workflows = {}

# Simple in-memory cache (LRU with size limit)
class SimpleCache:
    def __init__(self, max_size=100, ttl_seconds=3600):
        self.cache = OrderedDict()
        self.max_size = max_size
        self.ttl = timedelta(seconds=ttl_seconds)
    
    def _make_key(self, request: str, content_type: str, tone: str) -> str:
        data = f"{request}|{content_type}|{tone}"
        return hashlib.md5(data.encode()).hexdigest()
    
    def get(self, request: str, content_type: str, tone: str):
        key = self._make_key(request, content_type, tone)
        if key in self.cache:
            value, timestamp = self.cache[key]
            if datetime.now() - timestamp < self.ttl:
                # Move to end (most recently used)
                self.cache.move_to_end(key)
                return value
            else:
                del self.cache[key]
        return None
    
    def set(self, request: str, content_type: str, tone: str, value: str):
        key = self._make_key(request, content_type, tone)
        self.cache[key] = (value, datetime.now())
        self.cache.move_to_end(key)
        # Remove oldest if cache is full
        if len(self.cache) > self.max_size:
            self.cache.popitem(last=False)

response_cache = SimpleCache(max_size=50, ttl_seconds=1800)  # 30 min TTL

# Initialize specialized LLMs for each agent
llm_planner = LLM.create(
    provider=config.llm.provider,
    model=config.llm.get_model_for_agent("planner"),
    temperature=config.llm.temperature,
    max_tokens=config.llm.max_tokens,
    base_url=config.llm.ollama_base_url if config.llm.provider == "ollama" else None,
    api_key=config.llm.gemini_api_key if config.llm.provider == "gemini" else None
)

llm_researcher = LLM.create(
    provider=config.llm.provider,
    model=config.llm.get_model_for_agent("researcher"),
    temperature=config.llm.temperature,
    max_tokens=config.llm.max_tokens,
    base_url=config.llm.ollama_base_url if config.llm.provider == "ollama" else None,
    api_key=config.llm.gemini_api_key if config.llm.provider == "gemini" else None
)

llm_writer = LLM.create(
    provider=config.llm.provider,
    model=config.llm.get_model_for_agent("writer"),
    temperature=config.llm.temperature,
    max_tokens=config.llm.max_tokens,
    base_url=config.llm.ollama_base_url if config.llm.provider == "ollama" else None,
    api_key=config.llm.gemini_api_key if config.llm.provider == "gemini" else None
)

llm_reviewer = LLM.create(
    provider=config.llm.provider,
    model=config.llm.get_model_for_agent("reviewer"),
    temperature=config.llm.temperature,
    max_tokens=config.llm.max_tokens,
    base_url=config.llm.ollama_base_url if config.llm.provider == "ollama" else None,
    api_key=config.llm.gemini_api_key if config.llm.provider == "gemini" else None
)

llm_assembler = LLM.create(
    provider=config.llm.provider,
    model=config.llm.get_model_for_agent("assembler"),
    temperature=config.llm.temperature,
    max_tokens=config.llm.max_tokens,
    base_url=config.llm.ollama_base_url if config.llm.provider == "ollama" else None,
    api_key=config.llm.gemini_api_key if config.llm.provider == "gemini" else None
)

@app.on_event("startup")
async def startup_event():
    """Application startup"""
    print("="*50)
    print("FlowForge AI - Multi-Model Architecture")
    print("="*50)
    print(f"LLM Provider: {config.llm.provider}")
    print(f"\nSpecialized Models:")
    print(f"  Planner:    {config.llm.get_model_for_agent('planner')}")
    print(f"  Researcher: {config.llm.get_model_for_agent('researcher')}")
    print(f"  Writer:     {config.llm.get_model_for_agent('writer')}")
    print(f"  Reviewer:   {config.llm.get_model_for_agent('reviewer')}")
    print(f"  Assembler:  {config.llm.get_model_for_agent('assembler')}")
    print(f"\nServer: http://{config.host}:{config.port}")
    print("="*50)
    
    # Check Ollama connectivity
    if config.llm.provider == "ollama":
        import requests
        try:
            print("\n[INFO] Checking Ollama connection...")
            response = requests.get(f"{config.llm.ollama_base_url}/api/tags", timeout=5)
            if response.status_code == 200:
                models = response.json().get("models", [])
                print(f"[OK] Ollama is running ({len(models)} models available)")
                model_names = [m.get("name", "") for m in models]
                required_model = config.llm.get_model_for_agent('planner')
                if any(required_model in name for name in model_names):
                    print(f"[OK] Model '{required_model}' is ready")
                else:
                    print(f"[WARN] Model '{required_model}' not found")
                    print(f"   Available: {', '.join(model_names[:3])}")
                    print(f"   To install: ollama pull {required_model}")
            else:
                print(f"[WARN] Ollama returned status {response.status_code}")
        except requests.exceptions.ConnectionError:
            print("[ERROR] Cannot connect to Ollama!")
            print(f"   Please start Ollama:")
            print(f"   1. Open new terminal")
            print(f"   2. Run: ollama serve")
            print(f"   OR: ollama run {config.llm.get_model_for_agent('planner')}")
        except Exception as e:
            print(f"[WARN] Ollama check failed: {str(e)}")
        print("="*50)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "FlowForge AI - Core Architecture", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "provider": config.llm.provider,
        "models": {
            "planner": config.llm.get_model_for_agent("planner"),
            "researcher": config.llm.get_model_for_agent("researcher"),
            "writer": config.llm.get_model_for_agent("writer"),
            "reviewer": config.llm.get_model_for_agent("reviewer"),
            "assembler": config.llm.get_model_for_agent("assembler")
        }
    }

@app.post("/api/workflow/start", response_model=StartWorkflowResponse)
async def start_workflow(request: WorkflowRequest, background_tasks: BackgroundTasks):
    """Start a new workflow with caching support"""
    
    # Check cache first
    cached_result = response_cache.get(request.request, request.content_type, request.tone)
    if cached_result:
        logger.info(f"Cache hit for request: {request.request[:50]}...")
        workflow_id = str(uuid.uuid4())
        workflows[workflow_id] = {
            "status": "completed",
            "progress": 100,
            "current_stage": "completed",
            "result": cached_result,
            "error": None,
            "created_at": datetime.now(),
            "from_cache": True
        }
        return StartWorkflowResponse(
            workflow_id=workflow_id,
            status="completed",
            message="Workflow completed (from cache)"
        )
    
    workflow_id = str(uuid.uuid4())
    
    # Initialize workflow state
    workflows[workflow_id] = {
        "status": "running",
        "progress": 0,
        "current_stage": "initializing",
        "result": None,
        "error": None,
        "created_at": datetime.now(),
        "from_cache": False
    }
    
    # Start workflow in background
    background_tasks.add_task(execute_workflow, workflow_id, request)
    
    return StartWorkflowResponse(
        workflow_id=workflow_id,
        status="started",
        message="Workflow started successfully"
    )

async def execute_workflow(workflow_id: str, request: WorkflowRequest):
    """Execute the 5-agent workflow using FlowForge Core structure with specialized models"""
    try:
        # Create actions with specialized LLMs
        plan_action = PlanAction(llm=llm_planner)
        research_action = ResearchAction(llm=llm_researcher)
        write_action = WriteContentAction(llm=llm_writer)
        review_action = ReviewAction(llm=llm_reviewer)
        assemble_action = AssembleAction(llm=llm_assembler)
        
        # Execute Plan (business-analyst model)
        workflows[workflow_id]["current_stage"] = "planning"
        workflows[workflow_id]["progress"] = 20
        plan_result = await plan_action.run(request.request, request.content_type, request.tone)
        
        # Execute Research (research-assistant model)
        workflows[workflow_id]["current_stage"] = "researching"
        workflows[workflow_id]["progress"] = 40
        research_result = await research_action.run(request.request, plan_result.content)
        
        # Execute Write (code-assistant model)
        workflows[workflow_id]["current_stage"] = "writing"
        workflows[workflow_id]["progress"] = 60
        write_result = await write_action.run(request.request, plan_result.content, research_result.content)
        
        # Execute Review (data-science-specialist model)
        workflows[workflow_id]["current_stage"] = "reviewing"
        workflows[workflow_id]["progress"] = 80
        review_result = await review_action.run(write_result.content)
        
        # Execute Assemble (custom-ml-assistant model)
        workflows[workflow_id]["current_stage"] = "assembling"
        workflows[workflow_id]["progress"] = 90
        final_result = await assemble_action.run(
            request.request,
            plan_result.content,
            research_result.content,
            write_result.content,
            review_result.content
        )
        
        # Complete
        workflows[workflow_id]["status"] = "completed"
        workflows[workflow_id]["current_stage"] = "completed"
        workflows[workflow_id]["progress"] = 100
        workflows[workflow_id]["result"] = final_result.content
        
        # Store in cache for future requests
        response_cache.set(request.request, request.content_type, request.tone, final_result.content)
        logger.info(f"Workflow {workflow_id} completed and cached")
        
    except Exception as e:
        logger.error(f"Workflow {workflow_id} failed: {str(e)}", exc_info=True)
        workflows[workflow_id]["status"] = "failed"
        workflows[workflow_id]["error"] = str(e)

@app.get("/api/workflow/status/{workflow_id}")
async def get_workflow_status(workflow_id: str):
    """Get workflow status"""
    if workflow_id not in workflows:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    workflow = workflows[workflow_id]
    return {
        "status": workflow["status"],
        "current_stage": workflow["current_stage"],
        "progress": workflow["progress"],
        "error": workflow.get("error"),
        "from_cache": workflow.get("from_cache", False)
    }

@app.get("/api/workflow/stream/{workflow_id}")
async def stream_workflow_status(workflow_id: str):
    """Server-Sent Events stream for real-time workflow updates"""
    async def event_generator() -> AsyncIterator[str]:
        last_status = None
        while True:
            if workflow_id not in workflows:
                yield f"data: {{\"error\": \"Workflow not found\"}}\n\n"
                break
            
            workflow = workflows[workflow_id]
            current_status = {
                "status": workflow["status"],
                "current_stage": workflow["current_stage"],
                "progress": workflow["progress"],
                "error": workflow.get("error")
            }
            
            # Only send if status changed
            if current_status != last_status:
                yield f"data: {json.dumps(current_status)}\n\n"
                last_status = current_status
            
            # Stop streaming if workflow is done
            if workflow["status"] in ["completed", "failed"]:
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
    """Get workflow result with structured format for frontend"""
    if workflow_id not in workflows:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    workflow = workflows[workflow_id]
    
    if workflow["status"] != "completed":
        raise HTTPException(
            status_code=400,
            detail=f"Workflow not completed. Current stage: {workflow['current_stage']}"
        )
    
    # Parse the markdown result into structured format
    result_text = workflow["result"]
    
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
    
    # Extract executive summary (look for Executive Summary section)
    if 'executive summary' in result_text.lower():
        for i, line in enumerate(lines):
            if 'executive summary' in line.lower():
                # Get content until next heading or 3 paragraphs
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
        # Fallback: use first paragraph as summary
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
            "raw": result_text  # Keep original for download
        }
    }

@app.get("/api/workflows")
async def list_workflows():
    """List all workflows"""
    return {
        "workflows": [
            {
                "workflow_id": wid,
                "status": w["status"],
                "current_stage": w["current_stage"],
                "progress": w["progress"],
                "created_at": w["created_at"].isoformat()
            }
            for wid, w in workflows.items()
        ]
    }

if __name__ == "__main__":
    import uvicorn
    print("\nStarting FlowForge AI - Multi-Model Architecture\n")
    print(f"LLM Provider: {config.llm.provider}")
    print(f"\nSpecialized Models:")
    print(f"  Planner:    {config.llm.get_model_for_agent('planner')}")
    print(f"  Researcher: {config.llm.get_model_for_agent('researcher')}")
    print(f"  Writer:     {config.llm.get_model_for_agent('writer')}")
    print(f"  Reviewer:   {config.llm.get_model_for_agent('reviewer')}")
    print(f"  Assembler:  {config.llm.get_model_for_agent('assembler')}")
    print(f"\nServer will run on: http://{config.host}:{config.port}\n")
    
    uvicorn.run(
        app,
        host=config.host,
        port=config.port,
        log_level=config.log_level.lower()
    )
