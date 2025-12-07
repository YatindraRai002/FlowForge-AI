import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, TrendingUp, FileText, Users, Settings, LogOut } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Updated recent campaigns with proper navigation
  const recentCampaigns = [
    {
      id: 1,
      title: "AI SaaS Platform Launch",
      status: "Completed",
      date: "2025-12-01",
      agents: 4,
      channels: ["Email", "Social Media"]
    },
    {
      id: 2,
      title: "E-commerce Holiday Campaign",
      status: "In Progress",
      date: "2025-12-05",
      agents: 3,
      channels: ["Google Ads", "Facebook"]
    },
    {
      id: 3,
      title: "Mobile App Onboarding",
      status: "Pending",
      date: "2025-12-10",
      agents: 0,
      channels: ["Push Notifications", "SMS"]
    }
  ]

  // Updated stats with better explanations
  const stats = [
    { 
      label: "Total Campaigns", 
      value: "24", 
      change: "+12%", 
      description: "All campaigns created since account inception"
    },
    { 
      label: "Active Agents", 
      value: "4", 
      change: "Stable",
      description: "Currently processing campaigns"
    },
    { 
      label: "Avg. Completion", 
      value: "8m", 
      change: "-2m",
      description: "Average time to complete a campaign"
    },
    { 
      label: "Success Rate", 
      value: "94%", 
      change: "+3%",
      description: "Campaigns meeting all objectives"
    }
  ]

  return (
    <div className="min-h-screen h-full p-4 sm:p-6 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              to="/settings" 
              className="flex items-center gap-2 px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-xl hover:bg-neon-blue/30 transition-all duration-300 text-sm sm:text-base border border-neon-blue/30 hover:border-neon-blue/50 shadow-neon-blue/10 hover:shadow-neon-blue/20 shadow-sm"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Settings</span>
            </Link>
            <Link 
              to="/logout" 
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all duration-300 text-sm sm:text-base border border-red-500/30 hover:border-red-500/50 shadow-red-500/10 hover:shadow-red-500/20 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {stats.map((stat, i) => (
            <Card key={i} variant="glass" className="p-4 sm:p-6">
              <p className="text-gray-400 text-xs sm:text-sm mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs sm:text-sm text-neon-green">{stat.change}</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">{stat.description}</p>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Create Campaign */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Create Campaign Card */}
            <Card variant="glass" className="p-6 sm:p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Create New Campaign</h2>
                <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                  Start a new marketing automation workflow with our AI agents
                </p>
                <Link to="/create">
                  <Button size="lg" className="text-sm sm:text-base">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    New Campaign
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Recent Campaigns */}
            <Card variant="glass" className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">Recent Campaigns</h2>
                <Link to="/create" className="text-neon-blue text-xs sm:text-sm hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {recentCampaigns.map((campaign) => (
                  <motion.div
                    key={campaign.id}
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-xl p-3 sm:p-4 border border-white/10 hover:border-neon-blue/50 transition-all cursor-pointer"
                    // Fixed navigation to use the correct route and pass campaign data
                    onClick={() => navigate(`/workflow`, { state: campaign })}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-sm sm:text-base">{campaign.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-400">{campaign.date}</p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === "Completed" 
                            ? "bg-neon-green/20 text-neon-green" 
                            : campaign.status === "In Progress" 
                              ? "bg-neon-blue/20 text-neon-blue" 
                              : "bg-gray-600/20 text-gray-400"
                        }`}>
                          {campaign.status}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">{campaign.agents}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Resources */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Actions */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Actions</h2>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { icon: FileText, label: "View Final Briefs", path: "/brief" },
                  { icon: TrendingUp, label: "Analytics & Reports", path: "/analytics" },
                  { icon: Users, label: "Team Management", path: "/team" }
                ].map((action, i) => {
                  const Icon = action.icon
                  return (
                    <Link 
                      key={i} 
                      to={action.path}
                      className="flex items-center gap-3 p-3 sm:p-4 glass rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-neon-blue" />
                      </div>
                      <span className="text-white text-sm sm:text-base">{action.label}</span>
                    </Link>
                  )
                })}
              </div>
            </Card>

            {/* Resources */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Resources</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="glass rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Getting Started Guide</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                    Learn how to maximize your workflow automation
                  </p>
                  {/* Fixed link to use the correct route */}
                  <Link 
                    to="/guide"
                    className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-lg text-xs hover:bg-neon-blue/30 transition-colors inline-block"
                  >
                    Read Guide
                  </Link>
                </div>
                
                <div className="glass rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">API Documentation</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                    Integrate with your existing tools
                  </p>
                  {/* Fixed link to use the correct route */}
                  <Link 
                    to="/docs"
                    className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-lg text-xs hover:bg-neon-blue/30 transition-colors inline-block"
                  >
                    View Docs
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard