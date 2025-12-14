"""Research Action - Gathers insights and information"""
from actions.action import Action, ActionOutput
import json

class ResearchAction(Action):
    """Researches topics and gathers relevant insights"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Researcher")
        self.desc = "Gathers insights, trends, and supporting data"
        
    async def run(self, request: str, plan_text: str) -> ActionOutput:
        """
        Conduct research based on the plan
        
        Args:
            request: Original user request
            plan_text: Strategic plan from PlanAction (as text)
            
        Returns:
            ActionOutput with research findings
        """
        
        prompt = f"""Research task for: "{request}"

Plan summary: {plan_text[:500]}...

Provide concise research findings:
1. 2-3 key market trends
2. 2-3 relevant statistics or data points  
3. Main competitor insights
4. Top customer pain points
5. One unique angle

Keep response under 400 words and focus on actionable insights."""

        response = await self._aask(prompt)
        
        # Simply return the research findings as text
        return ActionOutput(
            content=response.strip(),
            metadata={
                "action": "research",
                "request": request
            }
        )
