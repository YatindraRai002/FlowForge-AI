import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import SplashScreen from './components/SplashScreen'
// Lazy load pages
const Welcome = React.lazy(() => import('./pages/Welcome'))
const Login = React.lazy(() => import('./pages/Login'))
const Signup = React.lazy(() => import('./pages/Signup'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const CreateCampaign = React.lazy(() => import('./pages/CreateCampaign'))
const WorkflowProgress = React.lazy(() => import('./pages/WorkflowProgress'))
const FinalBrief = React.lazy(() => import('./pages/FinalBrief'))
const Pricing = React.lazy(() => import('./pages/Pricing'))
const Settings = React.lazy(() => import('./pages/Settings'))
const Analytics = React.lazy(() => import('./pages/Analytics'))
const Team = React.lazy(() => import('./pages/Team'))
const Documentation = React.lazy(() => import('./pages/Documentation'))
const APIDocumentation = React.lazy(() => import('./pages/APIDocumentation'))
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'))
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'))
const Product = React.lazy(() => import('./pages/Product'))
const Company = React.lazy(() => import('./pages/Company'))
const LandingPage = React.lazy(() => import('./pages/LandingPage'))
const History = React.lazy(() => import('./pages/History'))

// Simple components for missing pages
const Logout = () => {
  // Handle logout logic
  React.useEffect(() => {
    // In a real app, you would clear the user's session/token here
    // For this demo, we'll just redirect to login after a short delay
    const timer = setTimeout(() => {
      // Clear any stored user data
      localStorage.removeItem('userToken');
      sessionStorage.clear();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-dark-900">
      <div className="glass rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Logged Out</h1>
        <p className="text-gray-400 mb-6">You have been successfully logged out.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            className="px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-purple transition-colors inline-block text-center"
          >
            Return to Login
          </Link>
          <Link
            to="/"
            className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors inline-block text-center border border-white/20"
          >
            Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

const Guide = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Documentation />
  </React.Suspense>
)

const Docs = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <APIDocumentation />
  </React.Suspense>
)

function App() {
  console.log('App component rendering...')
  const [showSplash, setShowSplash] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem('splashShown')
    if (splashShown) {
      setShowSplash(false)
      setIsLoaded(true)
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true')
    setShowSplash(false)
    setIsLoaded(true)
  }

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {isLoaded && (
        <Router>
          <Layout>
            <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-cyan-400">Loading...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateCampaign />} />
                <Route path="/workflow" element={<WorkflowProgress />} />
                <Route path="/brief" element={<FinalBrief />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/team" element={<Team />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/product" element={<Product />} />
                <Route path="/company" element={<Company />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </React.Suspense>
          </Layout>
        </Router>
      )}
    </ThemeProvider>
  )
}

export default App