import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  History, 
  X, 
  Trash2, 
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import useCampaignHistoryStore from '../store/campaignHistory'

const HistorySidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { campaigns, deleteCampaign, getSortedCampaigns } = useCampaignHistoryStore()
  const sortedCampaigns = getSortedCampaigns().slice(0, 10) // Show only last 10

  const handleCampaignClick = (campaign) => {
    navigate('/create', { state: campaign })
    onClose()
  }

  const formatRelativeTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-dark-900 border-r border-white/10 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-neon-blue" />
                <h2 className="text-lg font-semibold text-white">History</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Campaign List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {campaigns.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-block p-4 rounded-full bg-dark-800/50 mb-3">
                    <History className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-sm">No history yet</p>
                </div>
              ) : (
                <>
                  {sortedCampaigns.map((campaign) => (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group relative"
                    >
                      <div
                        onClick={() => handleCampaignClick(campaign)}
                        className="p-3 rounded-lg bg-dark-800/50 hover:bg-dark-800 border border-transparent hover:border-neon-blue/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-neon-purple mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate group-hover:text-neon-blue transition-colors">
                              {campaign.product || 'Untitled'}
                            </p>
                            {campaign.audience && (
                              <p className="text-gray-500 text-xs truncate mt-0.5">
                                {campaign.audience}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-gray-600" />
                              <span className="text-gray-600 text-xs">
                                {formatRelativeTime(campaign.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteCampaign(campaign.id)
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-dark-900 hover:bg-red-500/20 rounded opacity-0 group-hover:opacity-100 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
                      </button>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {campaigns.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => {
                    navigate('/history')
                    onClose()
                  }}
                  className="w-full px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-between"
                >
                  View All History
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default HistorySidebar
