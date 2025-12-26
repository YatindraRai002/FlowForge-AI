import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState('')
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section)
  }

  const privacySections = [
    {
      id: 'data-collection',
      title: 'Information We Collect',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We collect minimal information to provide our services:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Account registration information (email, username)</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Usage data to improve our platform</span>
            </li>
          </ul>
          <p className="text-gray-300 mt-4">
            This is a student project under development and should not be used to store sensitive information.
          </p>
        </div>
      )
    },
    {
      id: 'data-use',
      title: 'How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We use your information solely for:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Providing and maintaining our service</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Improving and personalizing your experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Research and analysis for educational purposes</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Security',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We implement various security measures to protect your data:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Encrypted data transmission</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Regular security assessments</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Limited access controls</span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              GDPR Compliant
            </span>
            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
              Secure Storage
            </span>
            <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm flex items-center">
              <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
              Encrypted
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Our commitment to your privacy:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">We do not sell your data</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">We do not share your data with third parties</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">We do not track your activity across websites</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">We do not use third-party advertising</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'updates',
      title: 'Policy Updates',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We may update this privacy policy from time to time. When we do, we will:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Post the updated policy on this page</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Update the "Last Updated" date</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">•</span>
              <span className="text-gray-300">Notify users of significant changes when the full backend is launched</span>
            </li>
          </ul>
          <p className="text-gray-300 mt-4">
            When the full backend authentication system is launched in future, this privacy policy will be updated.
          </p>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-2">
            Your privacy is important to us
          </p>
          <p className="text-gray-500 text-sm">
            Last Updated: December 7, 2025
          </p>
        </motion.div>

        <div className="space-y-6">
          <Card variant="glass" className="p-6 sm:p-8">
            <p className="text-gray-300 mb-6">
              This website currently collects minimal information for account creation and basic functionality. 
              As an experimental student project, we prioritize your privacy and data protection.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">
                No Data Selling
              </span>
              <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">
                No Third-Party Sharing
              </span>
              <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm">
                No Tracking
              </span>
            </div>
            
            <p className="text-gray-300 italic border-l-2 border-neon-blue pl-4 py-2">
              "This is a student project under development and should not be used to store sensitive information."
            </p>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-4">
            {privacySections.map((section) => (
              <Card 
                key={section.id} 
                variant="glass" 
                className="p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:border-neon-blue/50"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                  <motion.div
                    animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </div>
                
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    {section.content}
                  </motion.div>
                )}
              </Card>
            ))}
          </div>

          {/* Contact Info */}
          <Card variant="glass" className="p-6 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Questions About Your Privacy?</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about this privacy policy, please contact us.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-indigo-900/30 text-indigo-400 rounded-full text-sm">
                Educational Project
              </span>
              <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">
                Beta Version
              </span>
              <span className="px-3 py-1 bg-pink-900/30 text-pink-400 rounded-full text-sm">
                Student Developed
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy