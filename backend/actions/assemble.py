"""Assemble Action - Formats final output"""
from actions.action import Action, ActionOutput

class AssembleAction(Action):
    """Assembles final polished output in requested format"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Assembler")
        self.desc = "Formats content into final polished output"
        
    async def run(self, review_data: dict, format_type: str, request: str) -> ActionOutput:
        """
        Assemble final formatted output
        
        Args:
            review_data: Reviewed content dict from Critic Agent
            format_type: Desired output format
            request: Original user request
            
        Returns:
            ActionOutput with final formatted content
        """
        
        reviewed_content = review_data.get('reviewed_content', str(review_data))
        
        prompt = f"""You are the Assembler Agent. Create the final polished marketing brief.

Original Request: {request}
Format: {format_type}

Reviewed Content from Critic Agent:
{reviewed_content}

Your task as the Assembler:
Create a final, polished, professional marketing brief in clean Markdown format.
- Use proper headings (# ## ###)
- Include an executive summary at the top
- Organize sections logically
- Use bullet points and formatting for readability
- Make it ready to present or publish

Return the final marketing brief in Markdown format."""

        print(f"[Assembler] Formatting final output as {format_type}...")
        response = await self._aask(prompt)
        print(f"[Assembler] Assembly complete ({len(response)} chars)")
        
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
                "format": format_type
            }
        )


