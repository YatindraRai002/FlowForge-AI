import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Users, Brain } from 'lucide-react'
import Button from '../components/Button'
import AnimatedLogo from '../components/AnimatedLogo'

const Welcome = () => {
  return (
    <div className="relative min-h-screen h-full flex flex-col overflow-hidden w-full">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #C147FF 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen h-full w-full">
        {/* Header */}
        <header className="py-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AnimatedLogo />
              <span className="text-xl font-bold text-gradient">Multi-Agent Automator</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex items-center w-full">
          <div className="max-w-7xl mx-auto px-6 py-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
                >
                  <Sparkles className="w-4 h-4 text-neon-blue" />
                  <span className="text-sm font-medium text-gray-300">Next-Gen AI Workflow Automation</span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="text-white">Transform Ideas Into</span>
                  <br />
                  <span className="text-gradient glow-text">Marketing Gold</span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Our intelligent multi-agent AI system generates complete marketing briefs in minutes. 
                  <span className="text-neon-blue font-semibold"> No manual work required.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link to="/login">
                    <Button size="lg" className="w-full sm:w-auto">
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Create Account
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto lg:mx-0"
                >
                  {[
                    { value: "10min", label: "From Idea to Brief" },
                    { value: "4 AI", label: "Specialized Agents" },
                    { value: "100%", label: "Automated Process" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-gradient">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Animated Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative glass rounded-3xl p-8 border-2 border-white/10">
                  {/* Agent Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Brain, title: "Research", color: "neon-blue" },
                      { icon: Sparkles, title: "Copywrite", color: "neon-purple" },
                      { icon: Users, title: "Art Direct", color: "neon-pink" },
                      { icon: Zap, title: "Manage", color: "neon-green" }
                    ].map((agent, i) => {
                      const Icon = agent.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="glass rounded-2xl p-4 text-center"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${agent.color} to-${agent.color}/50 flex items-center justify-center mx-auto mb-3`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-white">{agent.title}</h3>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Central Connection */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-dark-900 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-neon-blue" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Zap className="w-6 h-6 text-neon-blue" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <Sparkles className="w-6 h-6 text-neon-purple" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Multi-Agent Workflow Automator. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Welcome
