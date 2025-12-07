import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ExternalLink } from 'lucide-react'
import Card from '../components/Card'

const APIDocumentation = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const apiEndpoints = [
    {
      category: 'Campaigns',
      endpoints: [
        {
          method: 'POST',
          path: '/api/campaigns',
          description: 'Create a new marketing campaign',
          parameters: [
            { name: 'product', type: 'string', required: true, description: 'Product or service being marketed' },
            { name: 'audience', type: 'string', required: true, description: 'Target audience description' },
            { name: 'channels', type: 'array', required: true, description: 'List of marketing channels to target' }
          ],
          response: '{ "id": "camp_123", "status": "created", "createdAt": "2025-12-07T10:30:00Z" }'
        },
        {
          method: 'GET',
          path: '/api/campaigns',
          description: 'Retrieve all campaigns',
          parameters: [
            { name: 'limit', type: 'integer', required: false, description: 'Number of campaigns to return (default: 10)' },
            { name: 'offset', type: 'integer', required: false, description: 'Offset for pagination (default: 0)' }
          ],
          response: '{ "campaigns": [...], "total": 24, "limit": 10, "offset": 0 }'
        },
        {
          method: 'GET',
          path: '/api/campaigns/{id}',
          description: 'Retrieve a specific campaign by ID',
          parameters: [],
          response: '{ "id": "camp_123", "product": "AI SaaS Platform", "status": "completed", ... }'
        }
      ]
    },
    {
      category: 'Agents',
      endpoints: [
        {
          method: 'GET',
          path: '/api/agents',
          description: 'List all available agent types',
          parameters: [],
          response: '{ "agents": [{ "id": "research", "name": "Research Agent", "capabilities": [...] }] }'
        },
        {
          method: 'GET',
          path: '/api/agents/{id}/status',
          description: 'Get the current status of a specific agent',
          parameters: [],
          response: '{ "agentId": "research", "status": "idle", "currentTask": null }'
        }
      ]
    },
    {
      category: 'Workflows',
      endpoints: [
        {
          method: 'POST',
          path: '/api/workflows',
          description: 'Initiate a new workflow for a campaign',
          parameters: [
            { name: 'campaignId', type: 'string', required: true, description: 'ID of the campaign to process' }
          ],
          response: '{ "workflowId": "wf_456", "status": "started", "progress": 0 }'
        },
        {
          method: 'GET',
          path: '/api/workflows/{id}',
          description: 'Get the status and progress of a workflow',
          parameters: [],
          response: '{ "workflowId": "wf_456", "status": "running", "progress": 65, "completedSteps": 2, "totalSteps": 4 }'
        }
      ]
    },
    {
      category: 'Authentication',
      endpoints: [
        {
          method: 'POST',
          path: '/api/auth/login',
          description: 'Authenticate and receive an access token',
          parameters: [
            { name: 'email', type: 'string', required: true, description: 'User email address' },
            { name: 'password', type: 'string', required: true, description: 'User password' }
          ],
          response: '{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "expiresIn": 3600 }'
        },
        {
          method: 'POST',
          path: '/api/auth/logout',
          description: 'Invalidate the current session',
          parameters: [],
          response: '{ "message": "Successfully logged out" }'
        }
      ]
    }
  ]

  const sdkExamples = [
    {
      language: 'JavaScript',
      example: `
// Install the SDK
npm install @multi-agent-workflow/sdk

// Import and initialize
import { WorkflowClient } from '@multi-agent-workflow/sdk';

const client = new WorkflowClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.multiagentworkflow.com'
});

// Create a campaign
const campaign = await client.createCampaign({
  product: 'AI SaaS Platform',
  audience: 'Tech startups',
  channels: ['email', 'linkedin']
});

console.log('Campaign created:', campaign.id);
      `
    },
    {
      language: 'Python',
      example: `
# Install the SDK
pip install multi-agent-workflow

# Import and initialize
from multi_agent_workflow import WorkflowClient

client = WorkflowClient(
    api_key='your-api-key',
    base_url='https://api.multiagentworkflow.com'
)

# Create a campaign
campaign = client.create_campaign(
    product='AI SaaS Platform',
    audience='Tech startups',
    channels=['email', 'linkedin']
)

print(f'Campaign created: {campaign.id}')
      `
    },
    {
      language: 'curl',
      example: `
# Authentication
curl -X POST https://api.multiagentworkflow.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "password"}'

# Create a campaign
curl -X POST https://api.multiagentworkflow.com/api/campaigns \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product": "AI SaaS Platform",
    "audience": "Tech startups",
    "channels": ["email", "linkedin"]
  }'
      `
    }
  ]

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">API Documentation</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Integrate the Multi-Agent Workflow Automator into your applications with our REST API and SDKs
          </p>
          
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search API documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass rounded-xl text-inherit placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card variant="glass" className="p-4 sticky top-6">
              <nav className="space-y-2">
                <a href="#endpoints" className="block px-3 py-2 rounded-lg text-white bg-neon-blue/20">
                  API Endpoints
                </a>
                <a href="#sdk" className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  SDK Examples
                </a>
                <a href="#authentication" className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Authentication
                </a>
                <a href="#errors" className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Error Handling
                </a>
                <a href="#rate-limits" className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Rate Limits
                </a>
              </nav>
              
              <div className="border-t border-white/10 my-4 pt-4">
                <Link to="/guide" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">User Guide</span>
                </Link>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">Download SDK</span>
                </a>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            {/* Introduction */}
            <Card variant="glass" className="p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">API Overview</h2>
              <p className="text-gray-300 mb-4">
                The Multi-Agent Workflow Automator API allows you to programmatically create and manage marketing campaigns, 
                monitor agent workflows, and integrate our platform with your existing tools and systems.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="glass rounded-xl p-4">
                  <h3 className="font-bold text-white mb-2">Base URL</h3>
                  <code className="text-neon-blue">https://api.multiagentworkflow.com</code>
                </div>
                <div className="glass rounded-xl p-4">
                  <h3 className="font-bold text-white mb-2">API Version</h3>
                  <code className="text-neon-blue">v1</code>
                </div>
                <div className="glass rounded-xl p-4">
                  <h3 className="font-bold text-white mb-2">Format</h3>
                  <code className="text-neon-blue">JSON</code>
                </div>
              </div>
            </Card>
            
            {/* API Endpoints */}
            <div id="endpoints" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
              {apiEndpoints.map((section, index) => (
                <Card key={index} variant="glass" className="p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">{section.category}</h3>
                  <div className="space-y-6">
                    {section.endpoints.map((endpoint, endpointIndex) => (
                      <div key={endpointIndex} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                            endpoint.method === 'GET' ? 'bg-neon-blue/20 text-neon-blue' :
                            endpoint.method === 'POST' ? 'bg-neon-green/20 text-neon-green' :
                            endpoint.method === 'PUT' ? 'bg-neon-purple/20 text-neon-purple' :
                            endpoint.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-600/20 text-gray-400'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-neon-blue font-mono">{endpoint.path}</code>
                        </div>
                        <p className="text-gray-300 mb-4">{endpoint.description}</p>
                        
                        {endpoint.parameters.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-bold text-white mb-2">Parameters</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b border-white/10">
                                    <th className="text-left py-2 text-gray-400">Name</th>
                                    <th className="text-left py-2 text-gray-400">Type</th>
                                    <th className="text-left py-2 text-gray-400">Required</th>
                                    <th className="text-left py-2 text-gray-400">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {endpoint.parameters.map((param, paramIndex) => (
                                    <tr key={paramIndex} className="border-b border-white/5">
                                      <td className="py-2 text-white">{param.name}</td>
                                      <td className="py-2 text-gray-400">{param.type}</td>
                                      <td className="py-2">
                                        {param.required ? (
                                          <span className="text-neon-green">Yes</span>
                                        ) : (
                                          <span className="text-gray-500">No</span>
                                        )}
                                      </td>
                                      <td className="py-2 text-gray-400">{param.description}</td>
                                      </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-bold text-white mb-2">Response Example</h4>
                          <pre className="bg-dark-800 rounded-lg p-4 text-sm overflow-x-auto">
                            <code className="text-gray-300">{endpoint.response}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            
            {/* SDK Examples */}
            <div id="sdk" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">SDK Examples</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {sdkExamples.map((sdk, index) => (
                  <Card key={index} variant="glass" className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">{sdk.language}</h3>
                    <pre className="bg-dark-800 rounded-lg p-4 text-sm overflow-x-auto max-h-64">
                      <code className="text-gray-300">{sdk.example.trim()}</code>
                    </pre>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Authentication */}
            <div id="authentication" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Authentication</h2>
              <Card variant="glass" className="p-6">
                <p className="text-gray-300 mb-4">
                  All API requests must be authenticated using a Bearer token. Obtain a token by authenticating with your 
                  credentials at the <code className="text-neon-blue">/api/auth/login</code> endpoint.
                </p>
                <pre className="bg-dark-800 rounded-lg p-4 text-sm overflow-x-auto">
                  <code className="text-gray-300">
{`curl -X POST https://api.multiagentworkflow.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "password"}'`}
                  </code>
                </pre>
                <p className="text-gray-300 mt-4">
                  Include the returned token in the Authorization header of subsequent requests:
                </p>
                <pre className="bg-dark-800 rounded-lg p-4 text-sm overflow-x-auto mt-2">
                  <code className="text-gray-300">
Authorization: Bearer YOUR_ACCESS_TOKEN
                  </code>
                </pre>
              </Card>
            </div>
            
            {/* Error Handling */}
            <div id="errors" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Error Handling</h2>
              <Card variant="glass" className="p-6">
                <p className="text-gray-300 mb-4">
                  The API uses standard HTTP status codes to indicate the success or failure of requests:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-gray-400">Code</th>
                        <th className="text-left py-2 text-gray-400">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-neon-green">200</td>
                        <td className="py-2 text-gray-400">Success</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-neon-blue">201</td>
                        <td className="py-2 text-gray-400">Created</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-yellow-500">400</td>
                        <td className="py-2 text-gray-400">Bad Request - Invalid parameters</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-yellow-500">401</td>
                        <td className="py-2 text-gray-400">Unauthorized - Invalid or missing token</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-yellow-500">404</td>
                        <td className="py-2 text-gray-400">Not Found - Resource doesn't exist</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-red-400">500</td>
                        <td className="py-2 text-gray-400">Internal Server Error</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            
            {/* Rate Limits */}
            <div id="rate-limits">
              <h2 className="text-2xl font-bold text-white mb-6">Rate Limits</h2>
              <Card variant="glass" className="p-6">
                <p className="text-gray-300 mb-4">
                  To ensure fair usage and optimal performance, the API enforces rate limits:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Free tier: 100 requests per hour</li>
                  <li>Pro tier: 1,000 requests per hour</li>
                  <li>Enterprise tier: 10,000 requests per hour</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  If you exceed your rate limit, you'll receive a 429 Too Many Requests response. Wait before making 
                  additional requests.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIDocumentation