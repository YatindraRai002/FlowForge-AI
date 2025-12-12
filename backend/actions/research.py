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
        
        prompt = f"""Based on this marketing plan for "{request}", conduct thorough research.

Plan from Planner Agent:
{plan_text}

Your task as the Researcher:
1. Identify key trends and insights relevant to the plan
2. Provide statistics or data points that support the message
3. Analyze competitor landscape and market positioning
4. Understand pain points and customer needs
5. Find unique angles or fresh perspectives

Provide comprehensive research findings that will help the Writer create compelling content."""

        response = await self._aask(prompt)
        
        # Simply return the research findings as text
        return ActionOutput(
            content=response.strip(),
            metadata={
                "action": "research",
                "request": request
            }
        )
