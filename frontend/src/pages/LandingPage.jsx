import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Lightbulb,
  Search,
  PenTool,
  Eye,
  Layers,
  Brain,
  Zap,
  Shield,
  GitBranch,
  Server,
  Sparkles
} from 'lucide-react'
import AgentCard3D from '../components/AgentCard3D'
import MouseFollower from '../components/MouseFollower'

const LandingPage = () => {
  const [activePhase, setActivePhase] = useState(0)

  // Auto-rotate phases
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 5)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const agents = [
    {
      id: 'AGENT_01',
      name: 'PLANNER',
      icon: Lightbulb,
      color: '#00e5ff',
      colorName: 'cyan',
      description: 'Creates strategic marketing plans using proven frameworks. Breaks down your content goals into structured sections with clear objectives and audience targeting.'
    },
    {
      id: 'AGENT_02',
      name: 'RESEARCHER',
      icon: Search,
      color: '#c147ff',
      colorName: 'purple',
      description: 'Gathers real-time market insights and trends. Analyzes competitor data, audience behavior, and industry benchmarks to fuel your content with relevant facts.'
    },
    {
      id: 'AGENT_03',
      name: 'WRITER',
      icon: PenTool,
      color: '#ff3ba8',
      colorName: 'pink',
      description: 'Crafts compelling, data-driven marketing content. Transforms research insights into persuasive narratives that resonate with your target audience.'
    },
    {
      id: 'AGENT_04',
      name: 'REVIEWER',
      icon: Eye,
      color: '#00ffc8',
      colorName: 'green',
      description: 'Reviews and enhances draft quality. Provides actionable feedback on messaging, flow, and impact while generating improved versions of your content.'
    },
    {
      id: 'AGENT_05',
      name: 'ASSEMBLER',
      icon: Layers,
      color: '#ffd700',
      colorName: 'yellow',
      description: 'Produces the final polished document. Combines all sections with professional formatting, smooth transitions, and a compelling executive summary.'
    }
  ]

  const phases = [
    { name: 'Planner', color: '#00e5ff' },
    { name: 'Researcher', color: '#c147ff' },
    { name: 'Writer', color: '#ff3ba8' },
    { name: 'Reviewer', color: '#00ffc8' },
    { name: 'Assembler', color: '#ffd700' }
  ]

  const features = [
    {
      icon: Brain,
      title: 'Neural Intelligence',
      description: 'Advanced AI models trained on vast datasets for superior decision-making'
    },
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'Optimized architecture delivering results in milliseconds, not minutes'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with industry standards'
    },
    {
      icon: GitBranch,
      title: 'Seamless Integration',
      description: 'Plug-and-play compatibility with your existing tech stack'
    },
    {
      icon: Server,
      title: 'Scalable Architecture',
      description: 'Handle millions of requests without breaking a sweat'
    },
    {
      icon: Sparkles,
      title: 'Continuous Learning',
      description: 'Self-improving agents that get smarter with every interaction'
    }
  ]

  const stats = [
    { value: '10x faster', label: 'Processing Speed' },
    { value: '99.9%', label: 'Accuracy Rate' },
    { value: '100+', label: 'Parallel Tasks' },
    { value: '<1s', label: 'Response Time' }
  ]

  return (
    <div className="relative overflow-hidden w-full min-h-screen">
      {/* Custom Mouse Follower */}
      <MouseFollower />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Right decorative circle */}
        <motion.div
          className="absolute right-[8%] bottom-[20%] hidden lg:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-48 h-48 rounded-full border-2 border-purple-500/30" />
          <div className="absolute inset-4 rounded-full border border-purple-500/20" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Decorative line */}
          <motion.div
            className="w-full h-[2px] mb-8 mx-auto max-w-2xl"
            style={{
              background: 'linear-gradient(90deg, transparent, #00e5ff, #c147ff, transparent)'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight min-h-[1.2em]"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">Automate Your</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
              Marketing Workflow
            </span>
          </motion.h1>

          {/* Agent Types */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {agents.map((agent, i) => (
              <motion.span
                key={agent.name}
                className="text-sm sm:text-base font-mono tracking-wider cursor-pointer transition-all duration-300"
                style={{ color: activePhase === i ? agent.color : '#6b7280' }}
                whileHover={{ scale: 1.1, color: agent.color }}
                animate={{
                  textShadow: activePhase === i ? `0 0 20px ${agent.color}` : 'none'
                }}
              >
                {agent.name}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Transform product ideas into complete marketing briefs with our
            intelligent multi-agent AI system. <span className="text-pink-400 font-semibold">No manual work required.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link to="/create">
              <motion.button
                className="px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #00e5ff, #00ffc8)',
                  boxShadow: '0 0 30px rgba(0, 229, 255, 0.3)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 229, 255, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Launch Agents
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Agent Matrix Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              AGENT MATRIX
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Five autonomous AI systems, each mastering a critical domain, collaborating
            seamlessly to achieve extraordinary outcomes.
          </p>
        </motion.div>

        {/* Agent Cards - First Row (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {agents.slice(0, 3).map((agent, i) => (
            <AgentCard3D key={agent.id} agent={agent} index={i} />
          ))}
        </div>

        {/* Agent Cards - Second Row (2 cards centered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {agents.slice(3, 5).map((agent, i) => (
            <AgentCard3D key={agent.id} agent={agent} index={i + 3} />
          ))}
        </div>
      </section>

      {/* Seamless Workflow Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              SEAMLESS WORKFLOW
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Watch how our agents collaborate in perfect synchronization
          </p>
        </motion.div>

        {/* Workflow Timeline */}
        <div className="relative mb-16">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 transform -translate-y-1/2 hidden md:block">
            <motion.div
              className="h-full"
              style={{
                background: `linear-gradient(90deg, ${phases[activePhase].color}, ${phases[(activePhase + 1) % 5].color})`,
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${(activePhase + 1) * 20}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Phase Circles */}
          <div className="flex flex-wrap justify-between items-center relative z-10 gap-y-8">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.name}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setActivePhase(i)}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="relative mb-4"
                  animate={{
                    scale: activePhase === i ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Outer ring */}
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: activePhase >= i
                        ? `linear-gradient(135deg, ${phase.color}40, ${phase.color}20)`
                        : 'rgba(30, 30, 40, 0.8)',
                      border: `2px solid ${activePhase >= i ? phase.color : '#374151'}`,
                      boxShadow: activePhase === i ? `0 0 30px ${phase.color}50` : 'none'
                    }}
                    animate={{
                      boxShadow: activePhase === i
                        ? [`0 0 20px ${phase.color}30`, `0 0 40px ${phase.color}50`, `0 0 20px ${phase.color}30`]
                        : 'none'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{ color: activePhase >= i ? phase.color : '#6b7280' }}
                    >
                      {i + 1}
                    </span>
                  </motion.div>

                  {/* Floating dot */}
                  {activePhase === i && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
                      style={{ background: phase.color }}
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <motion.p
                  className="text-sm sm:text-base font-semibold"
                  style={{ color: activePhase === i ? phase.color : '#6b7280' }}
                >
                  {phase.name}
                </motion.p>
                <p className="text-xs text-gray-500 font-mono">PHASE {i + 1}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 text-center hover:border-cyan-500/50 transition-all duration-300"
            >
              <motion.div
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-500 font-mono uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Powered by Innovation Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
        {/* Animated background lights */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Central glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.15) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating light orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: i % 2 === 0
                  ? 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent 70%)'
                  : 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Sparkle particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.5)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          {/* Animated title with glow */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 italic"
            animate={{
              textShadow: [
                '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
                '0 0 40px rgba(236, 72, 153, 0.7), 0 0 80px rgba(6, 182, 212, 0.5)',
                '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              POWERED BY INNOVATION
            </span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="mx-auto h-1 rounded-full mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, #ec4899, #06b6d4, transparent)',
            }}
            initial={{ width: 0 }}
            whileInView={{ width: '300px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Cutting-edge technology meets intuitive design to deliver unparalleled performance
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, borderColor: '#00e5ff50' }}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900/30 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 w-fit mb-4 group-hover:border-cyan-500/50 transition-colors">
                <feature.icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-12 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.95), rgba(10, 10, 20, 0.98))',
            border: '1px solid rgba(0, 229, 255, 0.2)'
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.1), transparent 70%)'
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who've revolutionized their processes with our AI agent ecosystem
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/create">
                <motion.button
                  className="px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #00e5ff, #c147ff)',
                    boxShadow: '0 0 30px rgba(0, 229, 255, 0.3)'
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 229, 255, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/docs">
                <motion.button
                  className="px-8 py-4 rounded-xl font-semibold text-gray-300 border border-gray-700 hover:border-gray-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default LandingPage
