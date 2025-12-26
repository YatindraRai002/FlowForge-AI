import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, CreditCard, HelpCircle, LogOut, ChevronRight } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account')
  const [formData, setFormData] = useState({
    name: 'Darshil Raj',
    email: 'darshil@example.com',
    notifications: true,
    newsletter: true
  })

  const handleSave = (e) => {
    e.preventDefault()
    alert('Settings saved successfully!')
  }

  const settingsSections = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'help', name: 'Help & Support', icon: HelpCircle }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
            
            <Card variant="glass" className="p-6">
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 glass rounded-xl text-inherit placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all border border-white/10 hover:border-neon-blue/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 glass rounded-xl text-inherit placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all border border-white/10 hover:border-neon-blue/50"
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" size="lg">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )
      
      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
            
            <Card variant="glass" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive email updates about your campaigns</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.notifications}
                      onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Newsletter</h3>
                    <p className="text-sm text-gray-400">Product updates and company news</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Workflow Updates</h3>
                    <p className="text-sm text-gray-400">Real-time progress notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      
      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
            
            <Card variant="glass" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-white mb-2">Password</h3>
                  <p className="text-sm text-gray-400 mb-4">Change your password regularly for better security</p>
                  <Button variant="secondary">Change Password</Button>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
                  <Button variant="secondary">Enable 2FA</Button>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-2">Active Sessions</h3>
                  <p className="text-sm text-gray-400 mb-4">Manage devices that are currently signed in</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 glass rounded-lg">
                      <div>
                        <p className="text-white">Chrome on Windows</p>
                        <p className="text-xs text-gray-400">Current session</p>
                      </div>
                      <span className="text-neon-green text-sm">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 glass rounded-lg">
                      <div>
                        <p className="text-white">Safari on iPhone</p>
                        <p className="text-xs text-gray-400">Last active: 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      
      case 'billing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Billing & Subscription</h2>
            
            <Card variant="glass" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-white mb-2">Current Plan</h3>
                  <div className="p-4 glass rounded-xl border border-neon-purple">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">Professional Plan</p>
                        <p className="text-sm text-gray-400">₹7,999/month</p>
                      </div>
                      <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Next billing date: Jan 15, 2026</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-4">Payment Method</h3>
                  <div className="p-4 glass rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mr-3">
                        <span className="font-bold text-white">V</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">Visa ending in 4242</p>
                        <p className="text-sm text-gray-400">Expires 12/27</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="secondary">Manage Subscription</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      
      case 'help':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Help & Support</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="glass" className="p-6">
                <HelpCircle className="w-8 h-8 text-neon-blue mb-4" />
                <h3 className="font-bold text-white mb-2">Documentation</h3>
                <p className="text-gray-400 text-sm mb-4">Learn how to get the most out of our platform</p>
                <Button variant="secondary" className="w-full">View Docs</Button>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center mb-4">
                  <span className="font-bold text-white">24</span>
                </div>
                <h3 className="font-bold text-white mb-2">Support</h3>
                <p className="text-gray-400 text-sm mb-4">Get help from our support team</p>
                <Button variant="secondary" className="w-full">Contact Us</Button>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="w-8 h-8 rounded-full bg-neon-green flex items-center justify-center mb-4">
                  <span className="font-bold text-white">?</span>
                </div>
                <h3 className="font-bold text-white mb-2">FAQ</h3>
                <p className="text-gray-400 text-sm mb-4">Find answers to common questions</p>
                <Button variant="secondary" className="w-full">Browse FAQ</Button>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="w-8 h-8 rounded-full bg-neon-pink flex items-center justify-center mb-4">
                  <span className="font-bold text-white">!</span>
                </div>
                <h3 className="font-bold text-white mb-2">Report Issue</h3>
                <p className="text-gray-400 text-sm mb-4">Report bugs or suggest improvements</p>
                <Button variant="secondary" className="w-full">Submit Report</Button>
              </Card>
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <Card variant="glass" className="p-4">
              <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
              <nav className="space-y-1">
                {settingsSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-neon-blue/20 text-neon-blue'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.name}</span>
                    </button>
                  )
                })}
                
                <div className="border-t border-white/10 my-2 pt-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </nav>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings