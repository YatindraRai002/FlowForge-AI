"""Content Creator Role - Orchestrates content creation workflow"""
from typing import Dict, Any
from roles.role import Role
from actions.plan import PlanAction
from actions.research import ResearchAction
from actions.write_content import WriteContentAction
from actions.review import ReviewAction
from actions.assemble import AssembleAction
from provider.base_llm import BaseLLM
import json

class ContentCreatorRole(Role):
    """
    Content Creator Role
    Orchestrates the 5-step content creation process:
    1. Plan
    2. Research
    3. Write
    4. Review
    5. Assemble
    """
    
    def __init__(self, llm: BaseLLM):
        super().__init__(
            name="ContentCreator",
            profile="Multi-agent content creation specialist",
            llm=llm
        )
        
        # Initialize all actions
        self.plan_action = PlanAction(llm)
        self.research_action = ResearchAction(llm)
        self.write_action = WriteContentAction(llm)
        self.review_action = ReviewAction(llm)
        self.assemble_action = AssembleAction(llm)
        
        # Set actions list
        self._set_actions([
            self.plan_action,
            self.research_action,
            self.write_action,
            self.review_action,
            self.assemble_action
        ])
        
    async def run(
        self,
        request: str,
        tone: str = "professional",
        length: str = "medium",
        format_type: str = "marketing brief",
        on_progress: callable = None
    ) -> Dict[str, Any]:
        """
        Execute the complete content creation workflow
        
        Args:
            request: User's content request
            tone: Desired tone
            length: Content length
            format_type: Output format
            on_progress: Callback function for progress updates
            
        Returns:
            Dict with final content and metadata
        """
        results = {}
        
        # Step 1: Plan
        if on_progress:
            await on_progress("planning", "Creating strategic plan...")
        plan_output = await self.plan_action.run(request, tone, length, format_type)
        plan_data = json.loads(plan_output.content)
        results['plan'] = plan_data
        
        # Step 2: Research
        if on_progress:
            await on_progress("researching", "Gathering insights and data...")
        research_output = await self.research_action.run(plan_data, request)
        research_data = json.loads(research_output.content)
        results['research'] = research_data
        
        # Step 3: Write
        if on_progress:
            await on_progress("writing", "Generating content...")
        write_output = await self.write_action.run(plan_data, research_data, tone, length)
        write_data = json.loads(write_output.content)
        results['draft'] = write_data
        
        # Step 4: Review
        if on_progress:
            await on_progress("reviewing", "Reviewing and improving quality...")
        review_output = await self.review_action.run(write_data, plan_data)
        review_data = json.loads(review_output.content)
        results['reviewed'] = review_data
        
        # Step 5: Assemble
        if on_progress:
            await on_progress("assembling", "Formatting final output...")
        assemble_output = await self.assemble_action.run(review_data, format_type, request)
        results['final_content'] = assemble_output.content
        
        if on_progress:
            await on_progress("completed", "Workflow completed successfully!")
        
        return results
