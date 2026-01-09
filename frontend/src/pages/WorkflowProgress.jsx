import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, CheckCircle, Play, Sparkles, Search, PenTool, Palette, Briefcase, RotateCcw } from 'lucide-react'
import Button from '../components/Button'
import AgentStatus from '../components/AgentStatus'
import { workflowAPI } from '../services/api'
import useCampaignHistoryStore from '../store/campaignHistory'

const WorkflowProgress = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { campaigns, updateCampaign } = useCampaignHistoryStore()
  
  // Agent data defined inline - no dummy data needed
  const agentDefinitions = {
    planner: {
      name: "Planner Agent",
      description: "Strategic planning using proven marketing frameworks",
      icon: Search,
      color: "neon-blue",
      tasks: ["Analyzing request", "Defining target audience", "Creating document structure", "Setting quality constraints"]
    },
    researcher: {
      name: "Researcher Agent",
      description: "Real-time market analysis and insights",
      icon: Search,
      color: "neon-purple",
      tasks: ["Analyzing market trends", "Gathering audience insights", "Researching competitors", "Collecting industry data"]
    },
    writer: {
      name: "Writer Agent",
      description: "Crafting compelling, data-driven content",
      icon: PenTool,
      color: "neon-pink",
      tasks: ["Writing engaging copy", "Incorporating research data", "Creating persuasive narratives", "Structuring content"]
    },
    critic: {
      name: "Critic Agent",
      description: "Quality review and strategic improvements",
      icon: RotateCcw,
      color: "neon-green",
      tasks: ["Evaluating accuracy", "Assessing impact", "Improving clarity", "Enhancing effectiveness"]
    },
    assembler: {
      name: "Assembler Agent",
      description: "Final polishing and executive formatting",
      icon: Briefcase,
      color: "blue-400",
      tasks: ["Polishing content", "Formatting document", "Adding executive summary", "Final quality check"]
    }
  }
  
  const [agents, setAgents] = useState({
    planner: { ...agentDefinitions.planner, status: 'pending', progress: 0 },
    researcher: { ...agentDefinitions.researcher, status: 'pending', progress: 0 },
    writer: { ...agentDefinitions.writer, status: 'pending', progress: 0 },
    critic: { ...agentDefinitions.critic, status: 'pending', progress: 0 },
    assembler: { ...agentDefinitions.assembler, status: 'pending', progress: 0 }
  })
  const [expandedAgent, setExpandedAgent] = useState(null)
  const [allComplete, setAllComplete] = useState(false)
  const [workflowStarted, setWorkflowStarted] = useState(false)
  const [workflowId, setWorkflowId] = useState(null)
  const [error, setError] = useState(null)
  const [finalResult, setFinalResult] = useState(null)
  const [campaignData, setCampaignData] = useState({
    product: "Sample Product",
    audience: "General Audience",
    channels: ["Email", "Social Media"]
  })

  // Clear stale workflow data on mount
  useEffect(() => {
    // Don't auto-load old workflows, always start fresh
    localStorage.removeItem('lastWorkflowId');
  }, []);

  // Get campaign data from navigation state
  useEffect(() => {
    if (location.state) {
      setCampaignData(location.state)
    }
  }, [location.state])

  // Auto-start workflow when component mounts and campaign data is available
  useEffect(() => {
    if (campaignData && !workflowStarted) {
      // Small delay to allow user to see the campaign details before starting
      const timer = setTimeout(() => {
        startWorkflow();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [campaignData]);

  // Use SSE for real-time workflow status updates
  useEffect(() => {
    if (!workflowId) return;

    let eventSource = null;
    let fallbackInterval = null;
    let errorCount = 0;
    const maxErrors = 3;

    // Try SSE first for real-time updates
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      eventSource = new EventSource(`${API_URL}/api/workflow/stream/${workflowId}`);
      
      eventSource.onmessage = (event) => {
        try {
          const status = JSON.parse(event.data);
          errorCount = 0; // Reset on successful message
          
          updateAgentsFromStatus(status.current_stage, status.progress);
          
          if (status.current_stage === 'completed') {
            eventSource.close();
            setAllComplete(true);
            // Update campaign history
            const matchingCampaign = campaigns.find(c => 
              c.product === campaignData.product && 
              c.audience === campaignData.audience &&
              c.status === 'in-progress'
            );
            if (matchingCampaign) {
              updateCampaign(matchingCampaign.id, { status: 'completed' });
            }
            // Fetch the final result
            workflowAPI.getWorkflowResult(workflowId)
              .then(result => {
                setFinalResult(result.result);
                localStorage.setItem('lastWorkflowResult', JSON.stringify(result.result));
                localStorage.setItem('lastWorkflowId', workflowId);
              })
              .catch(err => console.error('Error fetching result:', err));
          }
          
          if (status.error) {
            setError(status.error);
            eventSource.close();
          }
        } catch (err) {
          console.error('Error parsing SSE data:', err);
        }
      };

      eventSource.onerror = (err) => {
        console.error('SSE connection error:', err);
        errorCount++;
        
        if (errorCount >= maxErrors) {
          eventSource.close();
          setError('Connection lost. Please refresh the page.');
        }
      };

    } catch (err) {
      console.error('SSE not supported, falling back to polling:', err);
      
      // Fallback to polling if SSE fails
      fallbackInterval = setInterval(async () => {
        try {
          const status = await workflowAPI.getWorkflowStatus(workflowId);
          errorCount = 0;
          
          updateAgentsFromStatus(status.current_stage, status.progress);
          
          if (status.current_stage === 'completed') {
            clearInterval(fallbackInterval);
            setAllComplete(true);
            // Update campaign history
            const matchingCampaign = campaigns.find(c => 
              c.product === campaignData.product && 
              c.audience === campaignData.audience &&
              c.status === 'in-progress'
            );
            if (matchingCampaign) {
              updateCampaign(matchingCampaign.id, { status: 'completed' });
            }
            const result = await workflowAPI.getWorkflowResult(workflowId);
            setFinalResult(result.result);
            localStorage.setItem('lastWorkflowResult', JSON.stringify(result.result));
            localStorage.setItem('lastWorkflowId', workflowId);
          }
        } catch (err) {
          errorCount++;
          if (errorCount >= maxErrors) {
            clearInterval(fallbackInterval);
            setError('Workflow not found. Please start a new campaign.');
            setWorkflowStarted(false);
            setWorkflowId(null);
          }
        }
      }, 2000);
    }

    return () => {
      if (eventSource) eventSource.close();
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [workflowId]);

  const updateAgentsFromActivities = (activities) => {
    const agentMap = {
      'Planner Agent': 'planner',
      'Researcher Agent': 'researcher',
      'Writer Agent': 'writer',
      'Critic Agent': 'critic',
      'Assembler Agent': 'assembler'
    };

    setAgents(prev => {
      const newState = { ...prev };
      
      activities.forEach(activity => {
        const agentKey = agentMap[activity.agent_name];
        if (agentKey) {
          newState[agentKey] = {
            ...prev[agentKey],
            status: activity.status === 'completed' ? 'done' : activity.status,
            currentTask: activity.current_task
          };
        }
      });
      
      return newState;
    });
  };

  const updateAgentsFromStatus = (stage, progress) => {
    const stageMap = {
      'planning': ['planner', 'running'],
      'researching': ['researcher', 'running'],
      'writing': ['writer', 'running'],
      'reviewing': ['critic', 'running'],
      'assembling': ['assembler', 'running'],
      'completed': ['assembler', 'done']
    };

    if (stage in stageMap) {
      const [currentAgent, status] = stageMap[stage];
      
      // Mark previous agents as done
      const agentOrder = ['planner', 'researcher', 'writer', 'critic', 'assembler'];
      const currentIndex = agentOrder.indexOf(currentAgent);
      
      setAgents(prev => {
        const newState = { ...prev };
        agentOrder.forEach((agent, idx) => {
          if (idx < currentIndex) {
            newState[agent] = { ...prev[agent], status: 'done' };
          } else if (agent === currentAgent) {
            newState[agent] = { ...prev[agent], status, currentTask: agentDefinitions[agent]?.name || agent };
          }
        });
        return newState;
      });
    }
  };

  const startWorkflow = async () => {
    setWorkflowStarted(true);
    setError(null);
    
    try {
      // Build the request text
      const requestText = `Create a comprehensive marketing brief for ${campaignData.product}. Target audience: ${campaignData.audience}. Marketing channels: ${campaignData.channels?.join(', ') || 'various channels'}.`;
      
      // Start the workflow
      const response = await workflowAPI.startWorkflow(
        requestText,
        'professional',
        'medium',
        'marketing brief'
      );
      
      setWorkflowId(response.workflow_id);
    } catch (err) {
      console.error('Error starting workflow:', err);
      setError('Failed to start workflow. Please ensure the backend is running.');
      setWorkflowStarted(false);
    }
  }

  const agentKeys = ['planner', 'researcher', 'writer', 'critic', 'assembler']
  const completedCount = agentKeys.filter(key => agents[key].status === 'done').length

  return (
    <div className="relative min-h-screen overflow-hidden py-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative responsive-container section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="text-gradient">AI Command Center</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400">
            Watch your specialized agents collaborate in real-time
          </p>
          
          {/* Workflow Explanation */}
          <div className="mt-6 glass rounded-2xl p-4 max-w-2xl mx-auto border border-neon-blue/20">
            <h3 className="font-semibold text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-neon-blue" />
              How It Works
            </h3>
            <p className="text-gray-300 text-sm">
              Our AI agents work together to create your marketing strategy. Each agent specializes in a different area:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mx-auto mb-1">
                  <Search className="w-4 h-4 text-neon-blue" />
                </div>
                <p className="text-xs text-gray-400">Planning</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto mb-1">
                  <Search className="w-4 h-4 text-neon-purple" />
                </div>
                <p className="text-xs text-gray-400">Research</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-neon-pink/20 flex items-center justify-center mx-auto mb-1">
                  <PenTool className="w-4 h-4 text-neon-pink" />
                </div>
                <p className="text-xs text-gray-400">Writing</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-1">
                  <RotateCcw className="w-4 h-4 text-neon-green" />
                </div>
                <p className="text-xs text-gray-400">Reviewing</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center mx-auto mb-1">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs text-gray-400">Assembly</p>
              </div>
            </div>
          </div>
          
          {/* Campaign Info */}
          {campaignData && (
            <div className="mt-6 glass rounded-2xl p-4 max-w-2xl mx-auto">
              <p className="text-sm text-gray-400 mb-2">Campaign Details:</p>
              <p className="text-white"><span className="text-neon-blue">Product:</span> {campaignData.product}</p>
              <p className="text-white"><span className="text-neon-purple">Audience:</span> {campaignData.audience}</p>
              <p className="text-white"><span className="text-neon-pink">Channels:</span> {campaignData.channels ? campaignData.channels.join(', ') : 'Not specified'}</p>
            </div>
          )}
        </motion.div>
        
        {/* Start Button */}
        {!workflowStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <Button 
              size="lg" 
              onClick={startWorkflow}
              className="shadow-neon-blue"
            >
              <Play className="w-5 h-5" />
              Start AI Workflow
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Watch our AI agents create your marketing strategy
            </p>
          </motion.div>
        )}

        {/* Progress Bar */}
        {workflowStarted && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-400">Workflow Progress</span>
              <span className="text-sm font-medium text-neon-blue">
                {completedCount} / {agentKeys.length} Agents Complete
              </span>
            </div>
            <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / agentKeys.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        {/* Agent Pipeline */}
        {workflowStarted && (
          <div className="space-y-6 mb-12">
            {agentKeys.map((key, index) => (
              <div key={key} className="relative">
                <AgentStatus
                  agent={agents[key]}
                  expanded={expandedAgent === key}
                  onToggle={() => setExpandedAgent(expandedAgent === key ? null : key)}
                />
                
                {/* Connection Line */}
                {index < agentKeys.length - 1 && (
                  <motion.div
                    className="absolute left-1/2 -bottom-3 w-0.5 h-6 transform -translate-x-1/2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: agents[key].status === 'done' ? 24 : 0,
                      opacity: agents[key].status === 'done' ? 1 : 0
                    }}
                    style={{
                      background: 'linear-gradient(to bottom, #00D9FF, #B537F2)'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Completion Message & CTA */}
        <AnimatePresence>
          {allComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-8 border-2 border-neon-green shadow-neon-green">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-neon-green/20 rounded-full mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-neon-green" />
                </motion.div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Workflow Complete! 🎉
                </h2>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Your complete marketing brief is ready. Our AI agents have researched your market, 
                  crafted compelling copy, and created creative direction for your campaign.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/brief')}
                    className="shadow-neon-blue"
                  >
                    View Final Brief
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="secondary"
                    size="lg" 
                    onClick={() => navigate('/dashboard')}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Activity Feed */}
        {workflowStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              Live Activity
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {agentKeys.map((key) => {
                const agent = agents[key]
                const messages = {
                  pending: `${agent.name || agent.title} waiting in queue...`,
                  running: agent.currentTask || `${agent.name || agent.title} is analyzing and generating content...`,
                  done: `${agent.name || agent.title} completed successfully ✓`
                }
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                      agent.status === 'done' ? 'bg-neon-green' :
                      agent.status === 'running' ? 'bg-neon-blue animate-pulse' :
                      'bg-gray-600'
                    }`} />
                    <span className={`${
                      agent.status === 'done' ? 'text-gray-400' :
                      agent.status === 'running' ? 'text-white font-medium' :
                      'text-gray-600'
                    }`}>
                      {messages[agent.status]}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default WorkflowProgress