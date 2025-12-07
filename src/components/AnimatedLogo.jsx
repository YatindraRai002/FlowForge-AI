import { motion } from 'framer-motion'
import { Sparkles, Zap, Brain } from 'lucide-react'

const AnimatedLogo = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative w-12 h-12"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Professional hexagon frame */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,5 90,25 90,75 50,95 10,75 10,25" 
              className="fill-none stroke-neon-blue stroke-2"
            />
          </svg>
        </div>
        
        {/* Letter "M" for Multi-Agent */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-neon-blue">M</span>
        </div>
        
        {/* Subtle pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(0, 217, 255, 0.3)",
              "0 0 0 10px rgba(0, 217, 255, 0)",
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}

export default AnimatedLogo
