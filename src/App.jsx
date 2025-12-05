import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import CreateCampaign from './pages/CreateCampaign'
import WorkflowProgress from './pages/WorkflowProgress'
import FinalBrief from './pages/FinalBrief'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreateCampaign />} />
            <Route path="/workflow" element={<WorkflowProgress />} />
            <Route path="/brief" element={<FinalBrief />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
