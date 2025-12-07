import Navbar from './Navbar'
import Footer from './Footer'
import BackgroundAnimation from './BackgroundAnimation'
import AIChatbot from './AIChatbot'
import { useTheme } from '../context/ThemeContext'

const Layout = ({ children }) => {
  const { theme } = useTheme()
  
  return (
    <div className={`min-h-screen h-full transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-900' : 'bg-gray-50'}`}>
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col min-h-screen h-full w-full">
        <Navbar />
        <main className="flex-grow w-full">
          <div className="h-full w-full">
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
