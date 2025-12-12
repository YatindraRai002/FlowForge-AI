from utils.gemini_client import gemini_client
from models.workflow import Plan, Research, Draft
import json
import datetime

class WriterAgent:
    """
    Writer Agent - Creates compelling, data-driven content using real-time market insights
    """
    
    def __init__(self):
        self.role = "Writer"
        self.description = "Crafts professional marketing content with real-world examples and current trends"
    
    def execute(self, plan: Plan, research: Research, user_request: str) -> Draft:
        """Execute the writer agent"""
        
        # Build research context
        research_context = ""
        for section in plan.sections:
            section_id = section.id
            if section_id in research.sections:
                note = research.sections[section_id]
                research_context += f"\n[{section.title}]\n"
                research_context += f"Key Points: {', '.join(note.key_points)}\n"
                research_context += f"Facts: {', '.join(note.facts)}\n"
                research_context += f"Examples: {', '.join(note.examples)}\n"
        
        sections_list = "\n".join([
            f"{i+1}. {section.title} ({section.id}): {section.description}"
            for i, section in enumerate(plan.sections)
        ])
        
        current_date = datetime.datetime.now().strftime("%B %Y")
        
        prompt = f"""Write compelling marketing copy for: {user_request}

Goal: {plan.goal} | Audience: {plan.audience} | Tone: {plan.tone}

Research Insights:
{research_context}

Write 2-3 engaging paragraphs for each section. Use data from research. Make it persuasive and action-oriented.

You MUST respond with ONLY valid JSON:
{{
  "sections": {{
    "intro": "Your compelling introduction paragraph that hooks the reader and presents the value proposition...",
    "problem": "Your problem statement paragraphs addressing pain points with specific examples and data...",
    "solution": "Your solution paragraphs explaining how it solves problems with features and benefits...",
    "benefits": "Your benefits paragraphs highlighting key advantages with metrics and outcomes...",
    "action": "Your call-to-action paragraphs creating urgency and clear next steps..."
  }}
}}

Write for ALL sections: {', '.join([s.id for s in plan.sections])}

Return ONLY the JSON object. No markdown, no extra text."""

        response = gemini_client.generate_content(prompt)
        
        # Parse JSON response
        try:
            response_text = response.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            draft_data = json.loads(response_text)
            return Draft(sections=draft_data["sections"])
        except Exception as e:
            print(f"Draft parse error: {e}")
            # Fallback draft
            sections_draft = {}
            for section in plan.sections:
                sections_draft[section.id] = f"Content for {section.title} based on: {section.description}"
            return Draft(sections=sections_draft)

# Global instance
writer_agent = WriterAgent()
