import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Snowfall = ({ snowflakeCount = 50 }) => {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    const flakes = Array.from({ length: snowflakeCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 3 + 5,
      delay: Math.random() * 5,
      drift: Math.random() * 30 - 15,
      opacity: Math.random() * 0.6 + 0.3,
    }))
    setSnowflakes(flakes)
  }, [snowflakeCount])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
          }}
          initial={{ y: -20, x: 0 }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, flake.drift, -flake.drift, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default Snowfall
