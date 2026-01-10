import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

// Color mapping for different agent colors
const colorMap = {
  cyan: {
    border: 'border-cyan-500/30',
    glow: '0 0 40px rgba(6, 182, 212, 0.3)',
    bg: 'from-cyan-500/10 to-transparent',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  purple: {
    border: 'border-purple-500/30',
    glow: '0 0 40px rgba(168, 85, 247, 0.3)',
    bg: 'from-purple-500/10 to-transparent',
    gradient: 'from-purple-400 to-purple-600',
  },
  pink: {
    border: 'border-pink-500/30',
    glow: '0 0 40px rgba(236, 72, 153, 0.3)',
    bg: 'from-pink-500/10 to-transparent',
    gradient: 'from-pink-400 to-pink-600',
  },
  green: {
    border: 'border-green-500/30',
    glow: '0 0 40px rgba(34, 197, 94, 0.3)',
    bg: 'from-green-500/10 to-transparent',
    gradient: 'from-green-400 to-green-600',
  },
  yellow: {
    border: 'border-yellow-500/30',
    glow: '0 0 40px rgba(234, 179, 8, 0.3)',
    bg: 'from-yellow-500/10 to-transparent',
    gradient: 'from-yellow-400 to-yellow-600',
  },
}

const AgentCard3D = ({ agent, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = agent.icon
  const colors = colorMap[agent.colorName] || colorMap.cyan

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className="relative group h-full"
      initial={{ opacity: 0, y: 100, rotateX: -45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1500px',
      }}
    >
      <motion.div
        className={`relative bg-black/70 border-2 ${colors.border} rounded-3xl p-8 overflow-hidden backdrop-blur-xl h-full`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          boxShadow: isHovered ? colors.glow : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Glowing orb */}
        <motion.div
          className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${colors.gradient} rounded-full blur-3xl`}
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
          <motion.div
            className={`absolute -top-10 -left-10 w-20 h-20 border-4 ${colors.border} rounded-full`}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 1 : 0.3,
            }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
          <motion.div
            className={`absolute -bottom-10 -right-10 w-20 h-20 border-4 ${colors.border} rounded-full`}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 1 : 0.3,
            }}
          />
        </div>

        {/* Header */}
        <div className="relative flex items-start justify-between mb-6">
          <motion.div
            className="flex items-center gap-4"
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`relative w-16 h-16 rounded-2xl border-2 ${colors.border} flex items-center justify-center bg-black/50`}
              animate={{
                rotateZ: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-8 h-8 text-white" />

              {/* Icon glow */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl blur-xl`}
                animate={{
                  opacity: isHovered ? 0.5 : 0,
                }}
              />
            </motion.div>

            <div>
              <motion.div
                className="text-xs font-mono text-gray-500 mb-1"
                animate={{
                  color: isHovered ? agent.color : '#6b7280',
                }}
              >
                {agent.id}
              </motion.div>
              <h3 className="text-2xl font-bold text-white font-mono tracking-tight">
                {agent.name}
              </h3>
            </div>
          </motion.div>

          {/* Status indicator */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.5 }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors.gradient}`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-xs font-mono text-gray-500">ACTIVE</span>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="relative text-gray-400 text-sm leading-relaxed"
          style={{ transform: 'translateZ(20px)' }}
        >
          {agent.description}
        </motion.p>

        {/* Hover particles */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}

        {/* Bottom glow line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.gradient}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default AgentCard3D
