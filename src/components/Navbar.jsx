import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { motion } from 'framer-motion'
import Button from './Button'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-2 rounded-xl group-hover:shadow-neon-blue transition-all">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">
              Multi-Agent Automator
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/create" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/create') 
                    ? 'text-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Create Campaign
              </Link>
              <Link 
                to="/workflow" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/workflow') 
                    ? 'text-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Workflow
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl glass hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </motion.button>

            <Link to="/create">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
