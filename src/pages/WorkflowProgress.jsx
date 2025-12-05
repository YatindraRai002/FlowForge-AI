import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Button from '../components/Button'
import AgentStatus from '../components/AgentStatus'
import { agentWorkflowData } from '../data/dummyData'

const WorkflowProgress = () => {
  const navigate = useNavigate()
  const [agents, setAgents] = useState({
    research: { ...agentWorkflowData.research, status: 'pending' },
    copywriter: { ...agentWorkflowData.copywriter, status: 'pending' },
    artDirector: { ...agentWorkflowData.artDirector, status: 'pending' },
    manager: { ...agentWorkflowData.manager, status: 'pending' }
  })
  const [expandedAgent, setExpandedAgent] = useState(null)
  const [allComplete, setAllComplete] = useState(false)

  useEffect(() => {
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

    const timers = timeline.map(({ delay, agent, status }) =>
      setTimeout(() => {
        setAgents(prev => ({
          ...prev,
          [agent]: { ...prev[agent], status }
        }))
        
        if (agent === 'manager' && status === 'done') {
          setAllComplete(true)
        }
      }, delay)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  const agentKeys = ['research', 'copywriter', 'artDirector', 'manager']
  const completedCount = agentKeys.filter(key => agents[key].status === 'done').length

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="text-gradient">AI Command Center</span>
          </h1>
          <p className="text-xl text-gray-400">
            Watch your specialized agents collaborate in real-time
          </p>
        </motion.div>

        {/* Progress Bar */}
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

        {/* Agent Pipeline */}
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
                
                <h2 className="text-3xl font-bold text-white mb-3">
                  Workflow Complete! 🎉
                </h2>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Your complete marketing brief is ready. Review it and download when you're satisfied.
                </p>
                
                <Button 
                  size="lg" 
                  onClick={() => navigate('/brief')}
                  className="shadow-neon-blue"
                >
                  View Final Brief
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Activity Feed */}
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
      </div>
    </div>
  )
}

export default WorkflowProgress
