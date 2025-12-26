import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Copy, CheckCircle, FileText, ArrowLeft, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import ReactMarkdown from 'react-markdown'

const FinalBrief = () => {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [briefData, setBriefData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load the brief from localStorage
    const savedResult = localStorage.getItem('lastWorkflowResult')
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult)
        
        // Handle different data formats
        if (typeof result === 'string') {
          // Plain string format - parse into structured format
          const lines = result.split('\n')
          let title = 'Marketing Brief'
          let summary = ''
          let body = result
          
          // Extract title from first # heading
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('# ')) {
              title = lines[i].replace('# ', '').trim()
              body = lines.slice(i + 1).join('\n').trim()
              break
            }
          }
          
          // Extract summary from Executive Summary section
          const lowerResult = result.toLowerCase()
          if (lowerResult.includes('executive summary')) {
            const summaryMatch = result.match(/executive summary[:\s]+(.*?)(?=\n#|\n\n#|$)/is)
            if (summaryMatch) {
              summary = summaryMatch[1].trim().substring(0, 300)
            }
          }
          
          setBriefData({ title, summary, body, raw: result })
        } else {
          // Already structured format
          setBriefData(result)
        }
      } catch (err) {
        console.error('Error parsing saved result:', err)
      }
    }
    setLoading(false)
  }, [])

  const handleCopy = () => {
    if (!briefData) return
    // Handle both old format (raw string) and new format (structured object)
    const briefText = briefData.raw || briefData.body || JSON.stringify(briefData, null, 2)
    navigator.clipboard.writeText(briefText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!briefData) return
    // Handle both formats
    let briefText
    if (briefData.title && briefData.body) {
      // New structured format
      const summarySection = briefData.summary ? `\n\n**Executive Summary:** ${briefData.summary}\n\n` : '\n\n'
      briefText = `# ${briefData.title}${summarySection}${briefData.body}`
    } else {
      // Old format or raw text
      briefText = briefData.raw || briefData.body || JSON.stringify(briefData, null, 2)
    }
    
    const blob = new Blob([briefText], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'marketing-brief.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-neon-blue mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading your brief...</p>
        </div>
      </div>
    )
  }

  if (!briefData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="text-center max-w-md">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Brief Found</h2>
          <p className="text-gray-400 mb-6">
            Please create a campaign first to generate a marketing brief.
          </p>
          <Button onClick={() => navigate('/create')}>
            Create Campaign
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="relative responsive-container section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-neon-green" />
            <span className="text-sm font-medium text-gray-300">Generated Successfully</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Your <span className="text-gradient">Marketing Brief</span>
          </h1>
          <p className="text-xl text-gray-400">
            Complete, production-ready brief generated by AI agents
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button variant="secondary" onClick={() => navigate('/create')}>
            <ArrowLeft className="w-5 h-5" />
            Create New Campaign
          </Button>
          <Button size="lg" onClick={handleDownload}>
            <Download className="w-5 h-5" />
            Download Brief
          </Button>
          <Button variant="secondary" size="lg" onClick={handleCopy}>
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5 text-neon-green" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </motion.div>

        {/* Brief Content */}
        <Card variant="glass" className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="mb-8 pb-8 border-b border-white/10">
              <h1 className="text-4xl font-bold text-white mb-4">
                {briefData.title || 'Marketing Brief'}
              </h1>
              {briefData.summary && (
                <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-4">
                  <p className="text-lg text-gray-300 mb-0">
                    <strong className="text-neon-blue">Executive Summary:</strong> {briefData.summary}
                  </p>
                </div>
              )}
            </div>
            
            <div className="markdown-content text-gray-300">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-white mt-8 mb-6" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                  strong: ({node, ...props}) => <strong className="text-neon-blue font-semibold" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-neon-purple pl-4 italic my-4 text-gray-400" {...props} />
                  ),
                }}
              >
                {briefData.body || briefData.raw || 'No content available'}
              </ReactMarkdown>
            </div>

            {briefData.table_of_contents && briefData.table_of_contents.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  {briefData.table_of_contents.map((item, index) => (
                    <li key={index} className="text-neon-blue">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default FinalBrief
