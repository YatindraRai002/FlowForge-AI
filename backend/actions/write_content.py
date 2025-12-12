"""Write Content Action - Generates actual content"""
from actions.action import Action, ActionOutput
import json

class WriteContentAction(Action):
    """Writes content based on plan and research"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Writer")
        self.desc = "Creates compelling content from plans and research"
        
    async def run(self, request: str, plan_text: str, research_text: str) -> ActionOutput:
        """
        Write content based on plan and research
        
        Args:
            request: Original user request
            plan_text: Strategic plan from Planner
            research_text: Research findings from Researcher
            
        Returns:
            ActionOutput with written content
        """
        
        prompt = f"""You are the Writer Agent. Create compelling marketing content based on the plan and research.

Original Request: {request}

Plan from Planner Agent:
{plan_text}

Research from Researcher Agent:
{research_text}

Your task as the Writer:
Write a comprehensive, engaging marketing brief that incorporates the strategic plan and research findings.
Make it professional, persuasive, and actionable.
Structure the content logically with clear sections."""

        response = await self._aask(prompt)
        
        # Return the content as text
        return ActionOutput(
            content=response.strip(),
            metadata={
                "action": "write",
                "request": request
            }
        )
