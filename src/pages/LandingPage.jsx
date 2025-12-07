import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Users, Sparkles, Brain, Workflow, Target } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Research",
      description: "Our research agent analyzes market trends, competitors, and opportunities in seconds."
    },
    {
      icon: Sparkles,
      title: "Creative Copywriting",
      description: "Generate compelling ad copy and messaging that resonates with your audience."
    },
    {
      icon: Target,
      title: "Smart Art Direction",
      description: "Get creative prompts and visual direction from our AI art director."
    },
    {
      icon: Workflow,
      title: "Automated Workflows",
      description: "Multi-agent collaboration delivers complete marketing briefs automatically."
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
          >
            <Zap className="w-4 h-4 text-neon-blue" />
            <span className="text-sm font-medium text-gray-300">Next-Gen AI Workflow Automation</span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-white">Automate Your</span>
            <br />
            <span className="text-gradient glow-text">Marketing Workflow</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Transform product ideas into complete marketing briefs with our intelligent multi-agent AI system. 
            <span className="text-neon-blue font-semibold"> No manual work required.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/create">
              <Button size="lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/workflow">
              <Button variant="secondary" size="lg">
                <Users className="w-5 h-5" />
                See Agents in Action
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { value: "10min", label: "From Idea to Brief" },
            { value: "4 AI", label: "Specialized Agents" },
            { value: "100%", label: "Automated Process" }
          ].map((stat, i) => (
            <Card key={i} variant="glass" className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powered by <span className="text-gradient">AI Agents</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each agent specializes in a different aspect of marketing, working together seamlessly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card variant="glass" className="h-full hover:border-neon-blue border-2 border-transparent transition-all duration-300">
                <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-3 rounded-xl w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple <span className="text-gradient">3-Step</span> Process
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Enter Product Details",
              description: "Share your product, target audience, and marketing channels"
            },
            {
              step: "02",
              title: "AI Agents Collaborate",
              description: "Watch our specialized agents research, write, and design in real-time"
            },
            {
              step: "03",
              title: "Get Your Brief",
              description: "Download a complete, production-ready marketing brief"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              <Card variant="glass" className="relative z-10 pt-8">
                <div className="text-6xl font-bold text-neon-blue/20 absolute top-2 right-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 relative z-20">{item.title}</h3>
                <p className="text-gray-400 relative z-20">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plans That <span className="text-gradient">Scale With You</span>
          </h2>
          <p className="text-xl text-gray-400">Start free, upgrade as you grow</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Starter", price: "2,999", campaigns: "10", popular: false },
            { name: "Professional", price: "7,999", campaigns: "50", popular: true },
            { name: "Enterprise", price: "Custom", campaigns: "∞", popular: false }
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card 
                variant="glass" 
                className={`text-center relative ${
                  plan.popular ? 'border-2 border-neon-purple shadow-neon-purple' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-neon-purple to-neon-pink px-3 py-1 rounded-full text-xs font-semibold text-white">
                      Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-4 mt-2">{plan.name}</h3>
                <div className="mb-4">
                  {plan.price === "Custom" ? (
                    <div className="text-3xl font-bold text-gradient">Custom</div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-gradient">₹{plan.price}</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                  )}
                </div>
                <div className="text-gray-400 mb-6">
                  <span className="text-2xl font-bold text-neon-blue">{plan.campaigns}</span> campaigns/month
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link to="/pricing">
            <Button variant="secondary" size="lg">
              View All Plans & Features
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <Card variant="glass" className="text-center relative overflow-hidden">
          <div className="absolute inset-0 animated-gradient opacity-10" />
          <div className="relative z-10 py-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of marketers who've automated their way to success
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/create">
                <Button size="lg">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="secondary" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default LandingPage
