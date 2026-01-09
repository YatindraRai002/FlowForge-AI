import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Store for campaign history
const useCampaignHistoryStore = create(
  persist(
    (set, get) => ({
      campaigns: [],
      
      // Add a new campaign to history
      addCampaign: (campaign) => {
        const newCampaign = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...campaign
        }
        
        set((state) => ({
          campaigns: [newCampaign, ...state.campaigns]
        }))
        
        return newCampaign.id
      },
      
      // Update a campaign
      updateCampaign: (id, updates) => {
        set((state) => ({
          campaigns: state.campaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, ...updates } : campaign
          )
        }))
      },
      
      // Delete a campaign
      deleteCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.filter((campaign) => campaign.id !== id)
        }))
      },
      
      // Get a campaign by ID
      getCampaign: (id) => {
        return get().campaigns.find((campaign) => campaign.id === id)
      },
      
      // Clear all campaigns
      clearHistory: () => {
        set({ campaigns: [] })
      },
      
      // Get campaigns sorted by date
      getSortedCampaigns: () => {
        return [...get().campaigns].sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        )
      }
    }),
    {
      name: 'campaign-history-storage',
    }
  )
)

export default useCampaignHistoryStore
