import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your AI assistant. I can help you with:\n• Creating marketing campaigns\n• Understanding the workflow process\n• Troubleshooting issues\n• General questions about our platform\n\nHow can I help you today?"
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue
    }
    setMessages(prev => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        text: botResponse
      }])
    }, 1000)

    setInputValue('')
  }

  const getBotResponse = (input) => {
    const lowercaseInput = input.toLowerCase()

    if (lowercaseInput.includes('campaign') || lowercaseInput.includes('create')) {
      return "To create a campaign, click on 'Create Campaign' in the navigation menu. You'll need to provide:\n1. Product/Service details\n2. Target audience information\n3. Marketing channels you want to use\n\nOur AI agents will then generate a complete marketing brief for you!"
    }

    if (lowercaseInput.includes('workflow') || lowercaseInput.includes('process')) {
      return "Our workflow has 4 specialized AI agents:\n1. Research Agent - Analyzes market trends\n2. Copywriter Agent - Creates compelling copy\n3. Art Director Agent - Provides creative direction\n4. Manager Agent - Compiles everything into a final brief\n\nClick 'Start AI Workflow' on the workflow page to begin!"
    }

    if (lowercaseInput.includes('price') || lowercaseInput.includes('cost') || lowercaseInput.includes('pricing')) {
      return "We offer flexible pricing plans:\n• Free Trial - Try all features\n• Starter - ₹2,999/month\n• Professional - ₹7,999/month\n• Enterprise - Custom pricing\n\nAll plans include unlimited campaigns and AI-powered generation!"
    }

    if (lowercaseInput.includes('help') || lowercaseInput.includes('support')) {
      return "I'm here to help! You can:\n• Ask me about specific features\n• Get guidance on creating campaigns\n• Learn about our AI agents\n• Contact our support team at support@multiagent.ai\n\nWhat would you like to know?"
    }

    if (lowercaseInput.includes('agent')) {
      return "Our AI agents are specialized for different tasks:\n• Research Agent: Market analysis & competitor research\n• Copywriter Agent: Ad copy & messaging\n• Art Director Agent: Visual concepts & creative direction\n• Manager Agent: Final brief compilation\n\nThey work together to create comprehensive marketing materials!"
    }

    return "I understand you're asking about: " + input + "\n\nFor specific assistance, try asking about:\n• Creating campaigns\n• Workflow process\n• Pricing information\n• Feature details\n\nOr contact our support team for personalized help!"
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon-blue flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass rounded-2xl border-2 border-neon-blue/30 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">AI Assistant</h3>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-dark-800/50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2 ${
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-neon-purple' 
                        : 'bg-neon-blue'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-neon-purple text-white'
                        : 'bg-white/10 text-gray-200'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-inherit placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center hover:shadow-neon-blue transition-all"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChatbot
