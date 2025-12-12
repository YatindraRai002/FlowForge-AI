"""Review Action - Reviews and improves content quality"""
from actions.action import Action, ActionOutput

class ReviewAction(Action):
    """Reviews content and suggests improvements"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Critic")
        self.desc = "Reviews content quality and suggests improvements"
        
    async def run(self, content_text: str) -> ActionOutput:
        """
        Review and improve content
        
        Args:
            content_text: Written content from Writer Agent
            
        Returns:
            ActionOutput with reviewed and improved content
        """
        
        prompt = f"""You are the Critic Agent. Review and improve this marketing content.

Content from Writer Agent:
{content_text}

Your task as the Critic:
1. Check for clarity, grammar, and flow
2. Ensure messaging is compelling and actionable
3. Verify tone consistency
4. Strengthen calls-to-action
5. Improve overall impact

Provide the reviewed and improved version of the content."""

        response = await self._aask(prompt)
        
        # Return the reviewed content as text
        return ActionOutput(
            content=response.strip(),
            metadata={
                "action": "review"
            }
        )
