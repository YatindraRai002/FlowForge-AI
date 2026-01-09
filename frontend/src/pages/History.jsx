import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  History, 
  Trash2, 
  Clock, 
  FileText, 
  Search,
  ChevronRight,
  Calendar,
  Filter,
  X
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import useCampaignHistoryStore from '../store/campaignHistory'

const HistoryPage = () => {
  const navigate = useNavigate()
  const { campaigns, deleteCampaign, clearHistory, getSortedCampaigns } = useCampaignHistoryStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showClearModal, setShowClearModal] = useState(false)

  const sortedCampaigns = getSortedCampaigns()

  // Filter campaigns
  const filteredCampaigns = sortedCampaigns.filter((campaign) => {
    const matchesSearch = campaign.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.audience?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Group campaigns by date
  const groupedCampaigns = filteredCampaigns.reduce((groups, campaign) => {
    const date = new Date(campaign.timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    let label
    if (date.toDateString() === today.toDateString()) {
      label = 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = 'Yesterday'
    } else if (date > new Date(today.setDate(today.getDate() - 7))) {
      label = 'Last 7 Days'
    } else if (date > new Date(today.setDate(today.getDate() - 30))) {
      label = 'Last 30 Days'
    } else {
      label = 'Older'
    }
    
    if (!groups[label]) {
      groups[label] = []
    }
    groups[label].push(campaign)
    return groups
  }, {})

  const handleDelete = (id) => {
    deleteCampaign(id)
  }

  const handleClearAll = () => {
    clearHistory()
    setShowClearModal(false)
  }

  const handleCampaignClick = (campaign) => {
    navigate('/create', { state: campaign })
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'in-progress':
        return 'text-blue-400'
      case 'draft':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative responsive-container section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-neon-blue/20 border border-neon-blue/30">
                <History className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Campaign History</h1>
                <p className="text-gray-400 mt-1">
                  {campaigns.length} {campaigns.length === 1 ? 'campaign' : 'campaigns'} saved
                </p>
              </div>
            </div>
            
            {campaigns.length > 0 && (
              <Button
                variant="danger"
                onClick={() => setShowClearModal(true)}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>

          {/* Search and Filter Bar */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue/50"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Campaign List */}
        {campaigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block p-6 rounded-full bg-dark-800/50 mb-4">
              <History className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Campaign History</h3>
            <p className="text-gray-400 mb-6">
              Start creating campaigns to see them here
            </p>
            <Button onClick={() => navigate('/create')}>
              Create New Campaign
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedCampaigns).map(([label, campaignGroup]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-neon-blue" />
                  {label}
                </h2>
                
                <div className="space-y-3">
                  {campaignGroup.map((campaign, index) => (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="p-4 hover:border-neon-blue/50 transition-all cursor-pointer group">
                        <div className="flex items-start justify-between gap-4">
                          <div 
                            className="flex-1"
                            onClick={() => handleCampaignClick(campaign)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-neon-purple/20 border border-neon-purple/30 group-hover:bg-neon-purple/30 transition-colors">
                                <FileText className="w-5 h-5 text-neon-purple" />
                              </div>
                              
                              <div className="flex-1">
                                <h3 className="text-white font-semibold mb-1 group-hover:text-neon-blue transition-colors">
                                  {campaign.product || 'Untitled Campaign'}
                                </h3>
                                
                                {campaign.audience && (
                                  <p className="text-gray-400 text-sm mb-2">
                                    Target: {campaign.audience}
                                  </p>
                                )}
                                
                                <div className="flex flex-wrap items-center gap-3 text-xs">
                                  <div className="flex items-center gap-1 text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(campaign.timestamp)}
                                  </div>
                                  
                                  {campaign.channels && campaign.channels.length > 0 && (
                                    <div className="flex gap-1">
                                      {campaign.channels.map((channel) => (
                                        <span
                                          key={channel}
                                          className="px-2 py-1 bg-dark-800 rounded text-gray-400"
                                        >
                                          {channel}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {campaign.status && (
                                    <span className={`${getStatusColor(campaign.status)} font-medium`}>
                                      {campaign.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCampaignClick(campaign)}
                              className="p-2 hover:bg-dark-800 rounded-lg transition-colors text-gray-400 hover:text-neon-blue"
                              title="Reuse campaign"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(campaign.id)}
                              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                              title="Delete campaign"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Clear All Modal */}
      <AnimatePresence>
        {showClearModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowClearModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-800 border border-white/10 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Clear All History</h3>
                <button
                  onClick={() => setShowClearModal(false)}
                  className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete all campaign history? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowClearModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleClearAll}
                  className="flex-1"
                >
                  Clear All
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HistoryPage
