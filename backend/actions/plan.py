"""Plan Action - Creates strategic marketing plans"""
from actions.action import Action, ActionOutput
from typing import Dict, Any
import json

class PlanAction(Action):
    """Creates a strategic plan for content creation"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Planner")
        self.desc = "Creates strategic plans using proven marketing frameworks"
        
    async def run(self, request: str, content_type: str, tone: str) -> ActionOutput:
        """
        Create a strategic plan
        
        Args:
            request: User's content request
            content_type: Type of content (blog_post, social_media, etc.)
            tone: Desired tone (professional, casual, formal)
            
        Returns:
            ActionOutput with JSON plan
        """
        prompt = f"""Create a strategic marketing plan for: {request}

Requirements:
- Content Type: {content_type}
- Tone: {tone}

Respond with a simple structured plan containing:
1. GOAL: The main objective
2. AUDIENCE: Target audience description
3. SECTIONS: List of content sections needed
4. KEY POINTS: Main points to cover

Keep it concise and actionable."""

        print(f"[Planner] Creating plan for: {request[:50]}...")
        response = await self._aask(prompt)
        print(f"[Planner] Plan created ({len(response)} chars)")
        
        # Create a simple structured output
        plan_data = {
            "goal": f"Create {content_type} about {request}",
            "audience": "Target audience based on content type",
            "tone": tone,
            "content_type": content_type,
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
                "content_type": content_type
            }
        )
