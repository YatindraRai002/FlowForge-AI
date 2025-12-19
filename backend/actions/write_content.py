"""Write Content Action - Generates actual content"""
from actions.action import Action, ActionOutput
import json

class WriteContentAction(Action):
    """Writes content based on plan and research"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Writer")
        self.desc = "Creates compelling content from plans and research"
        
    async def run(self, plan_data: dict, research_data: dict, tone: str, length: str) -> ActionOutput:
        """
        Write content based on plan and research
        
        Args:
            plan_data: Strategic plan dict from Planner
            research_data: Research dict from Researcher
            tone: Desired tone
            length: Content length
            
        Returns:
            ActionOutput with written content as JSON
        """
        
        plan_text = plan_data.get('plan', str(plan_data))
        research_text = research_data.get('research', str(research_data))
        request = plan_data.get('goal', 'content creation')
        
        prompt = f"""You are the Writer Agent. Create compelling marketing content.

Goal: {request}
Tone: {tone}
Length: {length}

Plan from Planner Agent:
{plan_text}

Research from Researcher Agent:
{research_text}

Your task as the Writer:
Write a comprehensive, engaging marketing brief that incorporates the strategic plan and research findings.
Make it professional, persuasive, and actionable.
Structure the content logically with clear sections."""

        print(f"[Writer] Creating content (tone: {tone}, length: {length})...")
        response = await self._aask(prompt)
        print(f"[Writer] Content created ({len(response)} chars)")
        
        # Return the content as dict
        write_data = {
            "content": response.strip(),
            "tone": tone,
            "length": length
        }
        
        return ActionOutput(
            content=json.dumps(write_data, indent=2),
            metadata={
                "action": "write"
            }
        )
