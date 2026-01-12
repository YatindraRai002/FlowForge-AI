import { motion } from 'framer-motion'
import logo from '../data/logo.png'

const AnimatedLogo = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative w-10 h-10"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {/* FlowForge Logo */}
        <img
          src={logo}
          alt="FlowForge Logo"
          width="40"
          height="40"
          className="w-full h-full object-contain rounded-lg"
        />

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
