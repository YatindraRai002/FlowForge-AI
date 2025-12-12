from utils.gemini_client import gemini_client
from models.workflow import Plan, Draft, Feedback, SectionFeedback, ImprovedDraft
import json

class CriticAgent:
    """
    Critic Agent - Reviews draft and provides improvements
    """
    
    def __init__(self):
        self.role = "Critic"
        self.description = "Evaluates draft quality and provides improvements"
    
    def execute(self, plan: Plan, draft: Draft) -> tuple[Feedback, ImprovedDraft]:
        """Execute the critic agent"""
        
        # Build draft context
        draft_text = ""
        for section in plan.sections:
            if section.id in draft.sections:
                draft_text += f"\n[{section.title}]\n{draft.sections[section.id]}\n"
        
        prompt = f"""Review and improve this marketing content:

Goal: {plan.goal} | Audience: {plan.audience} | Tone: {plan.tone}

DRAFT:
{draft_text}

Provide brief feedback and enhanced versions with stronger hooks, clearer messaging, and better flow.

You MUST respond with ONLY valid JSON:
{{
  "feedback": {{
    "overall": ["Strong point 1", "Improvement needed 1", "Enhancement 1"],
    "by_section": {{
      "intro": {{"comments": ["Specific improvement 1", "Enhancement 1"]}},
      "problem": {{"comments": ["Specific improvement 1", "Enhancement 1"]}},
      "solution": {{"comments": ["Specific improvement 1", "Enhancement 1"]}},
      "benefits": {{"comments": ["Specific improvement 1", "Enhancement 1"]}},
      "action": {{"comments": ["Specific improvement 1", "Enhancement 1"]}}
    }}
  }},
  "improved_draft": {{
    "sections": {{
      "intro": "Enhanced intro with stronger hook...",
      "problem": "Enhanced problem statement...",
      "solution": "Enhanced solution description...",
      "benefits": "Enhanced benefits section...",
      "action": "Enhanced call-to-action..."
    }}
  }}
}}

Improve ALL sections: {', '.join([s.id for s in plan.sections])}

Return ONLY the JSON object."""

        response = gemini_client.generate_content(prompt)
        
        # Parse JSON response
        try:
            response_text = response.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            critic_data = json.loads(response_text)
            
            # Parse feedback
            by_section = {}
            for section_id, comments in critic_data["feedback"]["by_section"].items():
                by_section[section_id] = SectionFeedback(**comments)
            
            feedback = Feedback(
                overall=critic_data["feedback"]["overall"],
                by_section=by_section
            )
            
            # Parse improved draft
            improved_draft = ImprovedDraft(sections=critic_data["improved_draft"]["sections"])
            
            return feedback, improved_draft
        except Exception as e:
            print(f"Critic parse error: {e}")
            # Fallback
            by_section = {}
            improved_sections = {}
            for section in plan.sections:
                by_section[section.id] = SectionFeedback(comments=["Looks good"])
                improved_sections[section.id] = draft.sections.get(section.id, "")
            
            feedback = Feedback(
                overall=["Draft is well-structured"],
                by_section=by_section
            )
            improved_draft = ImprovedDraft(sections=improved_sections)
            return feedback, improved_draft

# Global instance
critic_agent = CriticAgent()
