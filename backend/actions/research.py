"""Research Action - Gathers insights and information"""
from actions.action import Action, ActionOutput
import json

class ResearchAction(Action):
    """Researches topics and gathers relevant insights"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Researcher")
        self.desc = "Gathers insights, trends, and supporting data"
        
    async def run(self, plan_data: dict, request: str) -> ActionOutput:
        """
        Conduct research based on the plan
        
        Args:
            plan_data: Strategic plan dict from PlanAction
            request: Original user request
            
        Returns:
            ActionOutput with research findings as JSON
        """
        
        plan_summary = plan_data.get('plan', str(plan_data)[:500])
        
        prompt = f"""Research task for: "{request}"

Plan summary: {plan_summary}

Provide concise research findings:
1. 2-3 key market trends
2. 2-3 relevant statistics or data points  
3. Main competitor insights
4. Top customer pain points
5. One unique angle

Keep response under 400 words and focus on actionable insights."""

        print(f"[Researcher] Gathering insights for: {request[:50]}...")
        response = await self._aask(prompt)
        print(f"[Researcher] Research complete ({len(response)} chars)")
        
        # Return research as dict
        research_data = {
            "research": response.strip(),
            "trends": [],
            "insights": response.strip()
        }
        
        return ActionOutput(
            content=json.dumps(research_data, indent=2),
            metadata={
                "action": "research",
                "request": request
            }
        )
