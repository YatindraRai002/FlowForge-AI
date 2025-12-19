"""Review Action - Reviews and improves content quality"""
from actions.action import Action, ActionOutput
import json

class ReviewAction(Action):
    """Reviews content and suggests improvements"""
    
    def __init__(self, llm):
        super().__init__(llm, name="Critic")
        self.desc = "Reviews content quality and suggests improvements"
        
    async def run(self, write_data: dict, plan_data: dict) -> ActionOutput:
        """
        Review and improve content
        
        Args:
            write_data: Written content dict from Writer Agent
            plan_data: Plan dict for reference
            
        Returns:
            ActionOutput with reviewed and improved content as JSON
        """
        
        content_text = write_data.get('content', str(write_data))
        tone = write_data.get('tone', 'professional')
        
        prompt = f"""You are the Critic Agent. Review and improve this marketing content.

Content from Writer Agent:
{content_text}

Expected tone: {tone}

Your task as the Critic:
1. Check for clarity, grammar, and flow
2. Ensure messaging is compelling and actionable
3. Verify tone consistency
4. Strengthen calls-to-action
5. Improve overall impact

Provide the reviewed and improved version of the content."""

        print(f"[Reviewer] Reviewing content quality...")
        response = await self._aask(prompt)
        print(f"[Reviewer] Review complete ({len(response)} chars)")
        
        # Return the reviewed content as dict
        review_data = {
            "reviewed_content": response.strip(),
            "quality_score": "high",
            "improvements": "Applied clarity and impact improvements"
        }
        
        return ActionOutput(
            content=json.dumps(review_data, indent=2),
            metadata={
                "action": "review"
            }
        )
