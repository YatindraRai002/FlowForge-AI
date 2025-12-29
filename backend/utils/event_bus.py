import asyncio
import json

# Workflow event queues
_queues = {}

def get_queue(workflow_id: str) -> asyncio.Queue:
    """Get or create an event queue for a workflow"""
    if workflow_id not in _queues:
        print(f"[EventBus] Creating new queue for workflow: {workflow_id}")
        _queues[workflow_id] = asyncio.Queue()
    return _queues[workflow_id]

async def emit_event(workflow_id: str, payload: dict):
    """Put an event into the workflow's queue"""
    queue = get_queue(workflow_id)
    print(f"[EventBus] Emitting event for {workflow_id}: {payload.get('current_stage')} | {payload.get('status')}")
    await queue.put(payload)

def clear_queue(workflow_id: str):
    """Remove queue after workflow completion"""
    if workflow_id in _queues:
        del _queues[workflow_id]
