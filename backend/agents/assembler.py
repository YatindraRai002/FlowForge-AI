from utils.gemini_client import gemini_client
from models.workflow import Plan, ImprovedDraft, FinalOutput

class AssemblerAgent:
    """
    Assembler Agent - Produces final polished output
    """
    
    def __init__(self):
        self.role = "Assembler"
        self.description = "Creates final polished document"
    
    def execute(self, plan: Plan, improved_draft: ImprovedDraft) -> FinalOutput:
        """Execute the assembler agent"""
        
        # Build improved draft text
        draft_text = ""
        for section in plan.sections:
            if section.id in improved_draft.sections:
                draft_text += f"\n## {section.title}\n\n{improved_draft.sections[section.id]}\n"
        
        import datetime
        current_date = datetime.datetime.now().strftime("%B %Y")
        
        prompt = f"""Finalize this marketing document for: {plan.goal}

Audience: {plan.audience} | Tone: {plan.tone}

CONTENT:
{draft_text}

Create a polished final document with:
- Compelling title
- Executive summary (2-3 sentences)
- Professional Markdown formatting
- Smooth section transitions
- Clear call-to-action

Format as:
# [Catchy Professional Title]

**Executive Summary:** Brief powerful summary highlighting key value and outcomes.

## Introduction
[Content with smooth flow]

## Problem Statement
[Content]

## Solution
[Content]

## Key Benefits
[Content with **bold** metrics]

## Call to Action
[Content with urgency]

---

Return ONLY the formatted Markdown document. No JSON, no extra text."""

        response = gemini_client.generate_content(prompt)
        
        # Parse the response
        final_text = response.strip()
        
        # Extract title (first line starting with #)
        lines = final_text.split('\n')
        title = "Untitled Document"
        summary = ""
        body = final_text
        toc = []
        
        for i, line in enumerate(lines):
            if line.startswith('# '):
                title = line[2:].strip()
                body = '\n'.join(lines[i+1:]).strip()
                break
        
        # Extract summary
        for line in lines:
            if '**Executive Summary:**' in line or '**Summary:**' in line:
                summary = line.split(':**')[-1].strip()
                break
            elif line.strip().startswith('Executive Summary:') or line.strip().startswith('Summary:'):
                summary = line.split(':')[-1].strip()
                break
        
        # Extract table of contents (section headings)
        for line in lines:
            if line.startswith('## '):
                toc.append(line[3:].strip())
        
        return FinalOutput(
            title=title,
            summary=summary if summary else f"A comprehensive {plan.goal}",
            body=body,
            table_of_contents=toc if toc else None
        )

# Global instance
assembler_agent = AssemblerAgent()
