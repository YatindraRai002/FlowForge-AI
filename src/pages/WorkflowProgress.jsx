import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, CheckCircle, Play, Sparkles, Search, PenTool, Palette, Briefcase } from 'lucide-react'
import Button from '../components/Button'
import AgentStatus from '../components/AgentStatus'
import { agentWorkflowData } from '../data/dummyData'

const WorkflowProgress = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [agents, setAgents] = useState({
    research: { ...agentWorkflowData.research, status: 'pending' },
    copywriter: { ...agentWorkflowData.copywriter, status: 'pending' },
    artDirector: { ...agentWorkflowData.artDirector, status: 'pending' },
    manager: { ...agentWorkflowData.manager, status: 'pending' }
  })
  const [expandedAgent, setExpandedAgent] = useState(null)
  const [allComplete, setAllComplete] = useState(false)
  const [workflowStarted, setWorkflowStarted] = useState(false)
  const [campaignData, setCampaignData] = useState({
    product: "Sample Product",
    audience: "General Audience",
    channels: ["Email", "Social Media"]
  })

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

  const startWorkflow = () => {
    setWorkflowStarted(true)
    
    // Simulate workflow progression
    const timeline = [
      { delay: 1000, agent: 'research', status: 'running' },
      { delay: 3000, agent: 'research', status: 'done' },
      { delay: 3500, agent: 'copywriter', status: 'running' },
      { delay: 6000, agent: 'copywriter', status: 'done' },
      { delay: 6500, agent: 'artDirector', status: 'running' },
      { delay: 9000, agent: 'artDirector', status: 'done' },
      { delay: 9500, agent: 'manager', status: 'running' },
      { delay: 12000, agent: 'manager', status: 'done' }
    ]

    timeline.forEach(({ delay, agent, status }) => {
      setTimeout(() => {
        setAgents(prev => ({
          ...prev,
          [agent]: { ...prev[agent], status }
        }))
        
        if (agent === 'manager' && status === 'done') {
          setAllComplete(true)
        }
      }, delay)
    })
  }

  const agentKeys = ['research', 'copywriter', 'artDirector', 'manager']
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mx-auto mb-1">
                  <Search className="w-4 h-4 text-neon-blue" />
                </div>
                <p className="text-xs text-gray-400">Research</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto mb-1">
                  <PenTool className="w-4 h-4 text-neon-purple" />
                </div>
                <p className="text-xs text-gray-400">Copywriting</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-neon-pink/20 flex items-center justify-center mx-auto mb-1">
                  <Palette className="w-4 h-4 text-neon-pink" />
                </div>
                <p className="text-xs text-gray-400">Design</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-1">
                  <Briefcase className="w-4 h-4 text-neon-green" />
                </div>
                <p className="text-xs text-gray-400">Management</p>
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
                  pending: `${agent.title} waiting in queue...`,
                  running: `${agent.title} is analyzing and generating content...`,
                  done: `${agent.title} completed successfully ✓`
                }
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className={`w-2 h-2 rounded-full mt-1 ${
                      agent.status === 'done' ? 'bg-neon-green' :
                      agent.status === 'running' ? 'bg-neon-blue animate-pulse' :
                      'bg-gray-600'
                    }`} />
                    <span className={`${
                      agent.status === 'done' ? 'text-gray-400' :
                      agent.status === 'running' ? 'text-white' :
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