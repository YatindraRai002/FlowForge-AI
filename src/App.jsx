import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreateCampaign from './pages/CreateCampaign'
import WorkflowProgress from './pages/WorkflowProgress'
import FinalBrief from './pages/FinalBrief'
import Pricing from './pages/Pricing'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import Team from './pages/Team'
import Documentation from './pages/Documentation'
import APIDocumentation from './pages/APIDocumentation'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Product from './pages/Product'
import Company from './pages/Company'
import React from 'react'

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
  <Documentation />
)

const Docs = () => (
  <APIDocumentation />
)

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />
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
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App