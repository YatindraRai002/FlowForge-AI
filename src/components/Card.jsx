import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const Card = ({ 
  children, 
  className = '', 
  variant = 'glass',
  animate = true,
  ...props 
}) => {
  const { theme } = useTheme()
  
  const variants = {
    glass: 'glass',
    glassDark: 'glass-dark',
    solid: theme === 'dark' ? 'bg-dark-800 border border-dark-600' : 'bg-white border border-gray-200',
    gradient: theme === 'dark' 
      ? 'bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10' 
      : 'bg-gradient-to-br from-white to-light-200 border border-gray-200'
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const Component = animate ? motion.div : 'div'
  const animationProps = animate ? {
    initial: "hidden",
    animate: "visible",
    variants: cardVariants
  } : {}

  return (
    <Component
      className={`${variants[variant]} rounded-2xl p-6 ${className}`}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card