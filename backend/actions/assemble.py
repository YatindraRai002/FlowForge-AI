"""Assemble Action - Formats final output"""
from actions.action import Action, ActionOutput

class AssembleAction(Action):
    """Assembles final polished output in requested format"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Assembler")
        self.desc = "Formats content into final polished output"
        
    async def run(self, request: str, plan_text: str, research_text: str, content_text: str, review_text: str) -> ActionOutput:
        """
        Assemble final formatted output
        
        Args:
            request: Original user request
            plan_text: Plan from Planner Agent
            research_text: Research from Researcher Agent
            content_text: Content from Writer Agent
            review_text: Reviewed content from Critic Agent
            
        Returns:
            ActionOutput with final formatted content
        """
        
        prompt = f"""You are the Assembler Agent. Create the final polished marketing brief.

Original Request: {request}

Plan from Planner Agent:
{plan_text}

Research from Researcher Agent:
{research_text}

Content from Writer Agent:
{content_text}

Reviewed Version from Critic Agent:
{review_text}

Your task as the Assembler:
Create a final, polished, professional marketing brief in clean Markdown format.
- Use proper headings (# ## ###)
- Include an executive summary at the top
- Organize sections logically
- Use bullet points and formatting for readability
- Make it ready to present or publish

Return the final marketing brief in Markdown format."""

        response = await self._aask(prompt)
        
        # Clean up the response
        final_content = response.strip()
        if final_content.startswith("```markdown"):
            final_content = final_content[11:]
        if final_content.startswith("```"):
            final_content = final_content[3:]
        if final_content.endswith("```"):
            final_content = final_content[:-3]
        final_content = final_content.strip()
        
        return ActionOutput(
            content=final_content,
            metadata={
                "action": "assemble",
                "request": request
            }
        )

