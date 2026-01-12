import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const SplashScreen = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState('INITIALIZING AI AGENTS')
  const [progress, setProgress] = useState(0)

  const loadingMessages = [
    'INITIALIZING AI AGENTS',
    'LOADING NEURAL NETWORKS',
    'CONNECTING WORKFLOW ENGINE',
    'PREPARING MULTI-AGENT SYSTEM',
    'LAUNCHING FLOWFORGE AI'
  ]

  useEffect(() => {
    let messageIndex = 0
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length
      setLoadingText(loadingMessages[messageIndex])
    }, 800)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(messageInterval)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return prev + 2
      })
    }, 80)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#030308' }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)'
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#00ffc8', '#00e5ff', '#c147ff', '#ff3ba8'][i % 4],
              boxShadow: `0 0 ${10 + Math.random() * 10}px currentColor`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Glowing background orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(193, 71, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
          x: [50, -50, 50],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center min-w-[300px] min-h-[400px]">
        {/* Hexagonal Logo with Animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute -inset-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffc8" />
                  <stop offset="50%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#c147ff" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth="1"
                strokeDasharray="20 10"
                opacity="0.5"
              />
            </svg>
          </motion.div>

          {/* Hexagon Shape */}
          <motion.svg
            width="150"
            height="150"
            viewBox="0 0 100 100"
            className="relative z-10"
          >
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c147ff" />
                <stop offset="25%" stopColor="#ff3ba8" />
                <stop offset="50%" stopColor="#ffa500" />
                <stop offset="75%" stopColor="#00ffc8" />
                <stop offset="100%" stopColor="#00e5ff" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Hexagon outline with gradient */}
            <motion.path
              d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
              fill="none"
              stroke="url(#hexGradient)"
              strokeWidth="2.5"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Inner hexagon */}
            <motion.path
              d="M50 15 L80 32.5 L80 67.5 L50 85 L20 67.5 L20 32.5 Z"
              fill="none"
              stroke="url(#hexGradient)"
              strokeWidth="1"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Center circles */}
            <motion.circle
              cx="50"
              cy="50"
              r="18"
              fill="none"
              stroke="#00ffc8"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />

            <motion.circle
              cx="50"
              cy="50"
              r="8"
              fill="#00ffc8"
              filter="url(#glow)"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                delay: 1,
                duration: 1.5,
                repeat: Infinity,
              }}
            />

            {/* Decorative lines */}
            <motion.line
              x1="50" y1="32" x2="50" y2="15"
              stroke="#00e5ff"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            />
            <motion.line
              x1="68" y1="50" x2="80" y2="50"
              stroke="#ff3ba8"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.4, duration: 0.3 }}
            />
          </motion.svg>

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 200, 0.3) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* FlowForge AI Text */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-wider">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              FLOWFORGE
            </span>
            <span className="text-white ml-2">AI</span>
          </h1>
        </motion.div>

        {/* Loading dots animation */}
        <motion.div
          className="flex gap-2 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-cyan-400"
              style={{
                boxShadow: '0 0 15px #00e5ff, 0 0 30px #00e5ff',
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="mt-8 text-cyan-400 text-sm tracking-[0.3em] font-mono uppercase min-h-[1.5em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.span
            key={loadingText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {loadingText}
          </motion.span>
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 256 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00ffc8, #00e5ff, #c147ff, #ff3ba8)',
              width: `${progress}%`,
            }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Progress percentage */}
        <motion.p
          className="mt-3 text-gray-500 text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7 }}
        >
          {progress}%
        </motion.p>
      </div>

      {/* Bottom decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <motion.div
          className="absolute bottom-20 left-0 w-full h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-0 w-full h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #c147ff, transparent)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8">
        <motion.div
          className="w-20 h-20 border-l-2 border-t-2 border-cyan-500/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        />
      </div>
      <div className="absolute top-8 right-8">
        <motion.div
          className="w-20 h-20 border-r-2 border-t-2 border-purple-500/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        />
      </div>
      <div className="absolute bottom-8 left-8">
        <motion.div
          className="w-20 h-20 border-l-2 border-b-2 border-pink-500/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        />
      </div>
      <div className="absolute bottom-8 right-8">
        <motion.div
          className="w-20 h-20 border-r-2 border-b-2 border-cyan-500/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        />
      </div>
    </motion.div>
  )
}

export default SplashScreen
