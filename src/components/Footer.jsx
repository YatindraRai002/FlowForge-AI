import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gradient mb-3">
              Multi-Agent Workflow Automator
            </h3>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Transform your marketing workflow with AI-powered multi-agent automation. 
              From product concept to complete marketing brief in minutes.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/DarshilRaj_Git" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-neon-blue transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/product" className="text-sm text-gray-400 hover:text-neon-blue transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-400 hover:text-neon-blue transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-sm text-gray-400 hover:text-neon-blue transition-colors">
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/company" className="text-sm text-gray-400 hover:text-neon-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm text-gray-400 hover:text-neon-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm text-gray-400 hover:text-neon-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Multi-Agent Workflow Automator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer