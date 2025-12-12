from utils.gemini_client import gemini_client
from models.workflow import Plan, Research, ResearchNote
import json
import datetime

class ResearcherAgent:
    """
    Researcher Agent - Gathers real-time information and market insights using Gemini's knowledge
    """
    
    def __init__(self):
        self.role = "Researcher"
        self.description = "Analyzes real-time market trends, competitor insights, and audience data"
    
    def execute(self, plan: Plan, user_request: str) -> Research:
        """Execute the researcher agent"""
        
        sections_info = "\n".join([
            f"- {section.title}: {section.description}"
            for section in plan.sections
        ])
        
        current_date = datetime.datetime.now().strftime("%B %Y")
        
        prompt = f"""Research market insights for: {user_request}
Goal: {plan.goal} | Audience: {plan.audience}

Provide research for these sections: {', '.join([s.id for s in plan.sections])}

You MUST respond with ONLY valid JSON:
{{
  "sections": {{
    "intro": {{
      "key_points": ["Current market trend 1", "Audience insight 1", "Competitive advantage 1"],
      "facts": ["Statistic or data point 1", "Industry benchmark 1"],
      "examples": ["Real example 1", "Case study 1"]
    }},
    "problem": {{
      "key_points": ["Pain point insight 1", "Market gap 1", "Customer challenge 1"],
      "facts": ["Problem statistic 1", "Market data 1"],
      "examples": ["Example 1", "Case 1"]
    }},
    "solution": {{
      "key_points": ["Solution approach 1", "Differentiation 1", "Innovation 1"],
      "facts": ["Success metric 1", "Adoption rate 1"],
      "examples": ["Success story 1", "Implementation 1"]
    }},
    "benefits": {{
      "key_points": ["Key benefit 1", "ROI driver 1", "Outcome 1"],
      "facts": ["Benefit statistic 1", "Performance data 1"],
      "examples": ["Customer result 1", "Testimonial 1"]
    }},
    "action": {{
      "key_points": ["Urgency factor 1", "Conversion tactic 1", "Next step 1"],
      "facts": ["Conversion data 1", "Timing insight 1"],
      "examples": ["Successful CTA 1", "Campaign result 1"]
    }}
  }}
}}

Provide 3 key_points, 2 facts, and 2 examples for each section. Return ONLY the JSON object."""

        response = gemini_client.generate_content(prompt)
        
        # Parse JSON response
        try:
            response_text = response.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            research_data = json.loads(response_text)
            
            # Convert to Research model
            sections_research = {}
            for section_id, note_data in research_data["sections"].items():
                sections_research[section_id] = ResearchNote(**note_data)
            
            return Research(sections=sections_research)
        except Exception as e:
            print(f"Research parse error: {e}")
            # Fallback research
            sections_research = {}
            for section in plan.sections:
                sections_research[section.id] = ResearchNote(
                    key_points=[f"Key point 1 for {section.title}", f"Key point 2 for {section.title}"],
                    facts=[f"Relevant fact for {section.title}"],
                    examples=[f"Example for {section.title}"]
                )
            return Research(sections=sections_research)

# Global instance
researcher_agent = ResearcherAgent()
