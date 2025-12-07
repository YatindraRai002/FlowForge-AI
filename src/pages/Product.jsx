import { motion } from 'framer-motion'
import Card from '../components/Card'

const Product = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Product</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Multi-Agent Workflow Automator - Transforming marketing workflows with AI
          </p>
        </motion.div>

        <div className="space-y-8">
          <Card variant="glass" className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What This App Is & Does</h2>
            <p className="text-gray-300 mb-4">
              Multi-Agent Workflow Automator is an intelligent platform that transforms how you create marketing campaigns. 
              Instead of spending countless hours on research, copywriting, and creative direction, our AI team does it for you.
            </p>
            <p className="text-gray-300 mb-4">
              Our system consists of four specialized AI agents that work together in real-time:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300"><strong>Research Agent:</strong> Gathers market insights and competitor analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300"><strong>Copywriter Agent:</strong> Crafts compelling ad copy and messaging</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300"><strong>Art Director Agent:</strong> Develops visual themes and creative direction</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300"><strong>Manager Agent:</strong> Coordinates workflow and delivers final briefs</span>
              </li>
            </ul>
          </Card>

          <Card variant="glass" className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why It's Better Than Other Apps</h2>
            <p className="text-gray-300 mb-4">
              Unlike single-AI tools, our four specialized agents collaborate like a real marketing team, sharing insights and building on each other's work. 
              What takes 15+ hours manually is completed in minutes. Each agent focuses on their expertise area, ensuring professional-quality output across research, 
              copywriting, design, and project management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 glass rounded-lg">
                <h3 className="font-bold text-white mb-2">Intelligent Multi-Agent System</h3>
                <p className="text-gray-400 text-sm">Agents communicate and coordinate like human colleagues</p>
              </div>
              <div className="p-4 glass rounded-lg">
                <h3 className="font-bold text-white mb-2">Lightning Fast Results</h3>
                <p className="text-gray-400 text-sm">Processes complex workflows at unprecedented speed</p>
              </div>
            </div>
          </Card>

          <Card variant="glass" className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-gray-300 mb-4">
              We're designed for humans by students for students and professionals who want to reclaim their time without sacrificing quality. 
              Our system provides complete, production-ready marketing briefs and offers educational value by explaining decision-making processes.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-sm">
                Student Project
              </span>
              <span className="px-3 py-1 bg-neon-purple/10 text-neon-purple rounded-full text-sm">
                Educational Value
              </span>
              <span className="px-3 py-1 bg-neon-pink/10 text-neon-pink rounded-full text-sm">
                Time Saving
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Product