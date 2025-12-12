from utils.gemini_client import gemini_client
from models.workflow import UserRequest, Plan, Section
import json
import datetime

class PlannerAgent:
    """
    Planner Agent - Strategic planning based on real-world marketing frameworks
    """
    
    def __init__(self):
        self.role = "Planner"
        self.description = "Creates strategic plans using proven marketing frameworks and current best practices"
    
    def execute(self, user_request: UserRequest) -> Plan:
        """Execute the planner agent with real-world strategic thinking"""
        
        current_date = datetime.datetime.now().strftime("%B %Y")
        
        prompt = f"""Create a strategic marketing plan for: {user_request.request}

Tone: {user_request.tone} | Length: {user_request.length} | Format: {user_request.format}

You MUST respond with ONLY valid JSON in this exact format:
{{
  "goal": "Specific measurable objective",
  "audience": "Target demographic and psychographic profile",
  "tone": "{user_request.tone}",
  "sections": [
    {{"id": "intro", "title": "Introduction", "description": "Hook and value proposition"}},
    {{"id": "problem", "title": "Problem Statement", "description": "Pain points and challenges"}},
    {{"id": "solution", "title": "Solution", "description": "How product/service solves problems"}},
    {{"id": "benefits", "title": "Key Benefits", "description": "Specific advantages and outcomes"}},
    {{"id": "action", "title": "Call to Action", "description": "Next steps and urgency"}}
  ],
  "constraints": [
    "Use {user_request.tone} tone throughout",
    "Keep content concise and scannable",
    "Include specific data and examples",
    "Focus on audience benefits"
  ]
}}

DO NOT add any text before or after the JSON. Return ONLY the JSON object."""

        response = gemini_client.generate_content(prompt)
        
        # Check if response is None or empty
        if not response:
            raise Exception("Gemini API returned empty response")
        
        # Parse JSON response
        try:
            # Clean the response
            response_text = response.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            plan_data = json.loads(response_text)
            
            # Convert to Plan model
            sections = [Section(**section) for section in plan_data["sections"]]
            plan = Plan(
                goal=plan_data["goal"],
                audience=plan_data["audience"],
                tone=plan_data["tone"],
                sections=sections,
                constraints=plan_data["constraints"]
            )
            return plan
        except json.JSONDecodeError as e:
            # Fallback: create a basic plan
            print(f"JSON parse error: {e}")
            print(f"Response was: {response}")
            return Plan(
                goal=f"Create {user_request.format} for {user_request.request}",
                audience="Target audience",
                tone=user_request.tone,
                sections=[
                    Section(id="overview", title="Overview", description="Introduction and context"),
                    Section(id="main_content", title="Main Content", description="Core information"),
                    Section(id="conclusion", title="Conclusion", description="Summary and next steps")
                ],
                constraints=["Keep tone consistent", "Be clear and concise"]
            )

# Global instance
planner_agent = PlannerAgent()
