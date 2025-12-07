import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, Search, MoreVertical, Mail, Phone, MapPin, X, Edit3, Trash2, Eye } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showActionMenu, setShowActionMenu] = useState(null) // Track which member's menu is open
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Member'
  })
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Darshil Raj',
      role: 'Admin',
      email: 'darshil@example.com',
      avatar: 'DR',
      status: 'online',
      lastActive: 'Just now'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Marketing Specialist',
      email: 'sarah@example.com',
      avatar: 'SJ',
      status: 'online',
      lastActive: '5 min ago'
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'Content Creator',
      email: 'mike@example.com',
      avatar: 'MC',
      status: 'away',
      lastActive: '1 hour ago'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      role: 'Designer',
      email: 'emma@example.com',
      avatar: 'EW',
      status: 'offline',
      lastActive: '3 hours ago'
    },
    {
      id: 5,
      name: 'Alex Rodriguez',
      role: 'Analyst',
      email: 'alex@example.com',
      avatar: 'AR',
      status: 'offline',
      lastActive: '1 day ago'
    }
  ])

  const [pendingInvites, setPendingInvites] = useState([
    { id: 1, email: 'newuser1@example.com', invitedBy: 'Darshil Raj', date: '2 days ago' },
    { id: 2, email: 'newuser2@example.com', invitedBy: 'Sarah Johnson', date: '1 week ago' },
    { id: 3, email: 'newuser3@example.com', invitedBy: 'Darshil Raj', date: '2 weeks ago' }
  ])

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member = {
        id: teamMembers.length + 1,
        name: newMember.name,
        role: newMember.role,
        email: newMember.email,
        avatar: newMember.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        status: 'offline',
        lastActive: 'Just invited'
      }
      
      setTeamMembers([...teamMembers, member])
      
      // Add to pending invites
      const invite = {
        id: pendingInvites.length + 1,
        email: newMember.email,
        invitedBy: 'You',
        date: 'Just now'
      }
      setPendingInvites([invite, ...pendingInvites])
      
      setNewMember({ name: '', email: '', role: 'Member' })
      setShowAddModal(false)
    }
  }

  const handleResendInvite = (inviteId) => {
    // Update the invite date to show it was resent
    setPendingInvites(pendingInvites.map(invite => 
      invite.id === inviteId 
        ? { ...invite, date: 'Just resent' } 
        : invite
    ))
    
    // Show a confirmation message (in a real app, you'd show a toast notification)
    alert(`Invite resent to ${pendingInvites.find(i => i.id === inviteId)?.email}`)
  }

  const handleCancelInvite = (inviteId) => {
    // Remove the invite from the list
    setPendingInvites(pendingInvites.filter(invite => invite.id !== inviteId))
    
    // Show a confirmation message (in a real app, you'd show a toast notification)
    alert('Invite cancelled successfully')
  }

  const handleViewDetails = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId)
    if (member) {
      alert(`Viewing details for ${member.name}\nRole: ${member.role}\nEmail: ${member.email}\nStatus: ${member.status}`)
    }
    setShowActionMenu(null) // Close the menu
  }

  const handleEditMember = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId)
    if (member) {
      alert(`Editing ${member.name}'s profile and permissions`)
      // In a real app, this would open an edit modal
    }
    setShowActionMenu(null) // Close the menu
  }

  const handleRemoveMember = (memberId) => {
    // Remove the member from the team
    const memberToRemove = teamMembers.find(m => m.id === memberId)
    if (memberToRemove) {
      setTeamMembers(teamMembers.filter(member => member.id !== memberId))
      alert(`${memberToRemove.name} has been removed from the team`)
    }
    setShowActionMenu(null) // Close the menu
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Team Management</h1>
            <p className="text-gray-400">Manage your team members and their permissions</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 glass rounded-lg text-inherit placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue w-64"
              />
            </div>
            
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>
        </div>
        
        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
        >
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Members</p>
                <p className="text-3xl font-bold text-white mt-1">{teamMembers.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-blue/20 text-neon-blue">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Online Now</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {teamMembers.filter(m => m.status === 'online').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-neon-green/20 text-neon-green">
                <div className="w-6 h-6 rounded-full bg-current animate-pulse"></div>
              </div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Pending Invites</p>
                <p className="text-3xl font-bold text-white mt-1">{pendingInvites.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-purple/20 text-neon-purple">
                <Mail className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Team Members Table */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Team Members</h2>
            <p className="text-gray-400">{filteredMembers.length} members</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Member</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Active</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <motion.tr 
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium">{member.name}</p>
                          <p className="text-gray-400 text-sm">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          member.status === 'online' ? 'bg-neon-green' :
                          member.status === 'away' ? 'bg-neon-yellow' :
                          'bg-gray-500'
                        }`}></div>
                        <span className="text-white capitalize">{member.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{member.lastActive}</td>
                    <td className="py-4 px-4 text-right relative">
                      <button 
                        onClick={() => setShowActionMenu(showActionMenu === member.id ? null : member.id)}
                        className="p-2 glass rounded-lg text-gray-400 hover:text-white transition-colors"
                        title="Member actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {/* Action Menu Dropdown */}
                      {showActionMenu === member.id && (
                        <div className="absolute right-0 top-12 z-10 glass rounded-lg shadow-lg w-48">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewDetails(member.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button
                              onClick={() => handleEditMember(member.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit Profile
                            </button>
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove Member
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* Pending Invites */}
        <Card variant="glass" className="p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Pending Invites</h2>
          </div>
          
          <div className="space-y-4">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between p-4 glass rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-white">{invite.email}</p>
                    <p className="text-gray-400 text-sm">Invited by {invite.invitedBy} • {invite.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleResendInvite(invite.id)}
                  >
                    Resend
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCancelInvite(invite.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
            
            {pendingInvites.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p>No pending invites</p>
                <p className="text-sm mt-1">Invite team members to get started</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-900 rounded-2xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Add Team Member</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 glass rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full px-4 py-3 glass rounded-lg text-inherit placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    className="w-full px-4 py-3 glass rounded-lg text-inherit placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full px-4 py-3 glass rounded-lg text-inherit focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  >
                    <option value="Member">Member</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleAddMember}
                  disabled={!newMember.name || !newMember.email}
                >
                  Add Member
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Team