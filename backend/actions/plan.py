"""Plan Action - Creates strategic marketing plans"""
from actions.action import Action, ActionOutput
from typing import Dict, Any
import json

class PlanAction(Action):
    """Creates a strategic plan for content creation"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Planner")
        self.desc = "Creates strategic plans using proven marketing frameworks"
        
    async def run(self, request: str, tone: str, length: str, format_type: str) -> ActionOutput:
        """
        Create a strategic plan
        
        Args:
            request: User's content request
            tone: Desired tone (professional, casual, formal)
            length: Content length (short, medium, long)
            format_type: Output format (marketing brief, blog post, etc.)
            
        Returns:
            ActionOutput with JSON plan
        """
        prompt = f"""Create a strategic marketing plan for: {request}

Requirements:
- Format: {format_type}
- Tone: {tone}
- Length: {length}

Respond with a simple structured plan containing:
1. GOAL: The main objective
2. AUDIENCE: Target audience description
3. SECTIONS: List of content sections needed
4. KEY POINTS: Main points to cover

Keep it concise and actionable."""

        print(f"[Planner] Creating plan for: {request[:50]}...", flush=True)
        print(f"[Planner] About to call LLM with prompt length: {len(prompt)}", flush=True)
        print(f"[Planner] LLM instance: {type(self.llm).__name__}", flush=True)
        
        # Call LLM - let errors propagate
        response = await self._aask(prompt)
        print(f"[Planner] LLM response received ({len(response)} chars)", flush=True)
        print(f"[Planner] Response preview: {response[:200]}...", flush=True)
        
        print(f"[Planner] Plan created ({len(response)} chars)", flush=True)
        
        # Create a simple structured output
        plan_data = {
            "goal": f"Create {format_type} about {request}",
            "audience": "Target audience based on content type",
            "tone": tone,
            "length": length,
            "format_type": format_type,
            "plan": response,
            "sections": [
                {"id": "intro", "title": "Introduction"},
                {"id": "main", "title": "Main Content"},
                {"id": "conclusion", "title": "Conclusion"}
            ]
        }
        
        return ActionOutput(
            content=json.dumps(plan_data, indent=2),
            metadata={
                "action": "plan",
                "request": request,
                "tone": tone,
                "content_type": format_type
            }
        )
