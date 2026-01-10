import Navbar from './Navbar'
import Footer from './Footer'
import BackgroundAnimation from './BackgroundAnimation'
import LiquidGlassBackground from './LiquidGlassBackground'
import AIChatbot from './AIChatbot'
import { useTheme } from '../context/ThemeContext'

const Layout = ({ children }) => {
  const { theme } = useTheme()
  
  return (
    <div id="layout-container" className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-900' : 'bg-gray-50'}`}>
      <LiquidGlassBackground />
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow w-full">
          <div className="w-full">
            {children}
          </div>
        </main>
        <Footer />
      </div>
      <AIChatbot />
    </div>
  )
}

export default Layout