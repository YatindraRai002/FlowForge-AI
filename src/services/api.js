// API service for backend communication

const API_BASE_URL = 'http://localhost:8000';

export const workflowAPI = {
  /**
   * Start a new workflow
   */
  async startWorkflow(request, tone = 'professional', length = 'medium', content_type = 'blog_post') {
    const response = await fetch(`${API_BASE_URL}/api/workflow/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request,
        tone,
        length,
        content_type
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to start workflow');
    }
    
    return await response.json();
  },

  /**
   * Get workflow status
   */
  async getWorkflowStatus(workflowId) {
    const response = await fetch(`${API_BASE_URL}/api/workflow/status/${workflowId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get workflow status');
    }
    
    return await response.json();
  },

  /**
   * Get final workflow result
   */
  async getWorkflowResult(workflowId) {
    const response = await fetch(`${API_BASE_URL}/api/workflow/result/${workflowId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get workflow result');
    }
    
    return await response.json();
  },

  /**
   * List all workflows
   */
  async listWorkflows() {
    const response = await fetch(`${API_BASE_URL}/api/workflows`);
    
    if (!response.ok) {
      throw new Error('Failed to list workflows');
    }
    
    return await response.json();
  },

  /**
   * Health check
   */
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  }
};
