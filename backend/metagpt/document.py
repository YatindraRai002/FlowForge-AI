"""
Document class for storing and managing documents
"""
from typing import Optional
from pydantic import BaseModel, Field


class Document(BaseModel):
    """Document model"""
    
    content: str = Field(default="", description="Document content")
    filename: str = Field(default="", description="Document filename")
    metadata: dict = Field(default_factory=dict, description="Document metadata")
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "content": self.content,
            "filename": self.filename,
            "metadata": self.metadata
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> "Document":
        """Create from dictionary"""
        return cls(**data)
    
    def save(self, filepath: str):
        """Save document to file"""
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(self.content)
    
    @classmethod
    def load(cls, filepath: str) -> "Document":
        """Load document from file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        return cls(content=content, filename=filepath)
