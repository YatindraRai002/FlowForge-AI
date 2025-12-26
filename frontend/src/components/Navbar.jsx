import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from './Button'
import AnimatedLogo from './AnimatedLogo'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <AnimatedLogo />
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
                to="/dashboard" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? 'text-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Dashboard
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
              <Link 
                to="/pricing" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/pricing') 
                    ? 'text-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Pricing
              </Link>
            </div>

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