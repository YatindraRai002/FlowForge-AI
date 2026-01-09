import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Package, Users, Radio, Sparkles, History } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import HistorySidebar from '../components/HistorySidebar'
import useCampaignHistoryStore from '../store/campaignHistory'

const CreateCampaign = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { addCampaign } = useCampaignHistoryStore()
  const [showHistory, setShowHistory] = useState(false)
  const [formData, setFormData] = useState({
    product: '',
    audience: '',
    channels: []
  })

  // Load campaign data from history if provided
  useEffect(() => {
    if (location.state) {
      setFormData({
        product: location.state.product || '',
        audience: location.state.audience || '',
        channels: location.state.channels || []
      })
    }
  }, [location.state])

  const channelOptions = [
    'LinkedIn',
    'Twitter/X',
    'Instagram',
    'Facebook',
    'YouTube',
    'Email'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save to history
    addCampaign({
      ...formData,
      status: 'in-progress'
    })
    // Navigate to workflow page with form data
    navigate('/workflow', { state: formData })
  }

  const toggleChannel = (channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }))
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative responsive-container section-padding">
        {/* History Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setShowHistory(true)}
          className="fixed left-4 top-24 z-30 p-3 glass rounded-xl border border-neon-blue/30 hover:border-neon-blue hover:shadow-neon-blue transition-all group"
          title="View History"
        >
          <History className="w-5 h-5 text-neon-blue group-hover:scale-110 transition-transform" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-neon-blue" />
            <span className="text-sm font-medium text-gray-300">Campaign Generator</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Create Your <span className="text-gradient">Campaign</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Tell us about your product and watch our AI agents craft a complete marketing strategy
          </p>
        </motion.div>

        <Card variant="glass" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-neon-blue/10 to-transparent rounded-full blur-3xl" />
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            {/* Product Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <Package className="w-5 h-5 text-neon-blue" />
                Product / Service
              </label>
              <input
                type="text"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="e.g., AI-powered task management app"
                className="w-full px-6 py-4 bg-dark-800/50 border border-neon-blue/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-neon-blue transition-all hover:border-neon-blue/50 backdrop-blur-sm"
                required
              />
            </motion.div>

            {/* Audience Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <Users className="w-5 h-5 text-neon-purple" />
                Target Audience
              </label>
              <input
                type="text"
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                placeholder="e.g., Busy professionals aged 25-40"
                className="w-full px-6 py-4 bg-dark-800/50 border border-neon-purple/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-neon-purple transition-all hover:border-neon-purple/50 backdrop-blur-sm"
                required
              />
            </motion.div>

            {/* Channels Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="flex items-center gap-2 text-white font-semibold mb-4">
                <Radio className="w-5 h-5 text-neon-pink" />
                Marketing Channels
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {channelOptions.map((channel) => (
                  <motion.button
                    key={channel}
                    type="button"
                    onClick={() => toggleChannel(channel)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      formData.channels.includes(channel)
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon-blue'
                        : 'bg-dark-800/50 text-gray-300 hover:text-white border border-gray-600 hover:border-neon-blue/50'
                    }`}
                  >
                    {channel}
                  </motion.button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Selected: {formData.channels.length > 0 ? formData.channels.join(', ') : 'None'}
              </p>
            </motion.div>

            {/* Process Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass rounded-xl p-4 border border-neon-blue/20"
            >
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-blue" />
                What happens next?
              </h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Our AI agents will understand your request and create a plan</li>
                <li>• They'll gather relevant information based on that plan</li>
                <li>• Produce initial drafts and evaluate their quality</li>
                <li>• Perform final polishing and formatting of your brief</li>
                <li>• You'll see the workflow progress in real-time</li>
                <li>• Receive a complete marketing brief when finished</li>
              </ul>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6 flex justify-center"
            >
              <Button 
                type="submit" 
                size="lg"
                className="min-w-[250px]"
              >
                <Sparkles className="w-5 h-5" />
                Generate Workflow
              </Button>
            </motion.div>
          </form>
        </Card>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          {[
            { icon: '🔍', text: 'Market research in seconds' },
            { icon: '✍️', text: 'AI-crafted copy & messaging' },
            { icon: '🎨', text: 'Creative direction included' }
          ].map((item, i) => (
            <Card key={i} variant="glassDark" className="text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-sm text-gray-400">{item.text}</p>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* History Sidebar */}
      <HistorySidebar isOpen={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  )
}

export default CreateCampaign
