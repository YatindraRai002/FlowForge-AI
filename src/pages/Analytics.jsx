import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, PieChart, Activity, Calendar, Filter } from 'lucide-react'
import Card from '../components/Card'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d')
  
  // Mock data for charts
  const campaignData = [
    { name: 'Jan', campaigns: 40 },
    { name: 'Feb', campaigns: 30 },
    { name: 'Mar', campaigns: 20 },
    { name: 'Apr', campaigns: 27 },
    { name: 'May', campaigns: 18 },
    { name: 'Jun', campaigns: 23 },
  ]
  
  const performanceData = [
    { name: 'Research', value: 85 },
    { name: 'Copywrite', value: 92 },
    { name: 'Art Direct', value: 78 },
    { name: 'Manage', value: 88 },
  ]
  
  const metrics = [
    { name: 'Total Campaigns', value: '142', change: '+12%', icon: BarChart3 },
    { name: 'Active Agents', value: '4', change: 'Stable', icon: Activity },
    { name: 'Success Rate', value: '94%', change: '+3%', icon: TrendingUp },
    { name: 'Avg. Time', value: '8m', change: '-2m', icon: PieChart },
  ]

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics & Reports</h1>
            <p className="text-gray-400">Track your campaign performance and agent efficiency</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="glass rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            
            <button className="glass rounded-lg p-2 text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metrics.map((metric, i) => {
            const Icon = metric.icon
            return (
              <Card key={i} variant="glass" className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{metric.name}</p>
                    <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    metric.change.startsWith('+') 
                      ? 'bg-neon-green/20 text-neon-green' 
                      : metric.change === 'Stable'
                        ? 'bg-gray-600/20 text-gray-400'
                        : 'bg-neon-blue/20 text-neon-blue'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className={`text-sm mt-3 ${
                  metric.change.startsWith('+') 
                    ? 'text-neon-green' 
                    : metric.change === 'Stable'
                      ? 'text-gray-400'
                      : 'text-neon-blue'
                }`}>
                  {metric.change} from last period
                </p>
              </Card>
            )
          })}
        </motion.div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Campaign Volume Chart */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Campaign Volume</h2>
              <BarChart3 className="w-5 h-5 text-neon-blue" />
            </div>
            
            <div className="h-64 flex items-end gap-2 md:gap-4">
              {campaignData.map((item, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-neon-blue to-neon-purple rounded-t-lg transition-all hover:opacity-75"
                    style={{ height: `${(item.campaigns / 40) * 100}%` }}
                  ></div>
                  <span className="text-gray-400 text-xs mt-2">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Agent Performance Chart */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Agent Performance</h2>
              <PieChart className="w-5 h-5 text-neon-purple" />
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {performanceData.map((item, i) => {
                  const colors = ['from-neon-blue', 'from-neon-purple', 'from-neon-pink', 'from-neon-green']
                  const rotations = [0, 92, 182, 270]
                  return (
                    <div 
                      key={i}
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors[i]} to-transparent opacity-80`}
                      style={{
                        clipPath: `conic-gradient(from ${rotations[i]}deg, transparent ${item.value}%, #0000 0)`
                      }}
                    ></div>
                  )
                })}
                <div className="absolute inset-4 rounded-full bg-dark-900 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">94%</p>
                    <p className="text-gray-400 text-sm">Avg. Score</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {performanceData.map((item, i) => {
                const colors = ['bg-neon-blue', 'bg-neon-purple', 'bg-neon-pink', 'bg-neon-green']
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colors[i]}`}></div>
                    <span className="text-white text-sm">{item.name}</span>
                    <span className="text-gray-400 text-sm ml-auto">{item.value}%</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card variant="glass" className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {[
              { action: 'Campaign completed', detail: 'AI SaaS Platform Launch', time: '2 hours ago', status: 'success' },
              { action: 'Agent started', detail: 'Research Agent processing', time: '4 hours ago', status: 'info' },
              { action: 'Campaign created', detail: 'E-commerce Holiday Campaign', time: '1 day ago', status: 'neutral' },
              { action: 'Performance report', detail: 'Monthly analytics generated', time: '2 days ago', status: 'info' },
              { action: 'System update', detail: 'Agents updated to v2.1', time: '3 days ago', status: 'neutral' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-4 glass rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-neon-green' :
                  activity.status === 'info' ? 'bg-neon-blue' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.detail}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Analytics