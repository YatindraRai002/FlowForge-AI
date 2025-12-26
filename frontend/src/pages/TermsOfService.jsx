import { motion } from 'framer-motion'
import Card from '../components/Card'

const TermsOfService = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Last Updated: December 7, 2025
          </p>
        </motion.div>

        <div className="space-y-8">
          <Card variant="glass" className="p-6 sm:p-8">
            <p className="text-gray-300 mb-6">
              Welcome to Multi Agent Workflow Automator.
            </p>

            <p className="text-gray-300 mb-6">
              By creating an account, you confirm that:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300">You are using this platform for personal and educational purposes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300">You will not use this project to perform illegal activities.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300">You understand that this is an early beta project and may contain bugs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300">We are not responsible for any incorrect or unexpected AI outputs.</span>
              </li>
            </ul>

            <p className="text-gray-300 mb-6">
              We reserve the right to:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300">update the application</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300">modify features</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                <span className="text-gray-300">remove access in case of misuse</span>
              </li>
            </ul>

            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-300">
                This project is experimental and intended only for testing and educational use.
              </p>
            </div>
          </Card>

          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              If you have any questions about these terms, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService