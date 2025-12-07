import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, ExternalLink, Download, BookOpen } from 'lucide-react'
import Card from '../components/Card'

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedSection, setExpandedSection] = useState('getting-started')
  const [selectedArticle, setSelectedArticle] = useState('intro')

  // Documentation content
  const articleContent = {
    intro: {
      title: 'Introduction to Multi-Agent Workflow',
      content: `
        <p>Welcome to the Multi-Agent Workflow Automator documentation. Our platform revolutionizes how businesses approach marketing automation by leveraging specialized AI agents that work together to accomplish complex tasks.</p>
        
        <h3>What Are Multi-Agent Workflows?</h3>
        <p>Unlike traditional single-AI solutions, our system employs multiple specialized agents, each with distinct capabilities:</p>
        <ul>
          <li><strong>Research Agent</strong>: Gathers market intelligence and competitive analysis</li>
          <li><strong>Copywriter Agent</strong>: Crafts compelling marketing copy and messaging</li>
          <li><strong>Art Director Agent</strong>: Designs visual concepts and creative direction</li>
          <li><strong>Manager Agent</strong>: Coordinates workflow and ensures quality delivery</li>
        </ul>
        
        <h3>How It Works</h3>
        <p>When you initiate a campaign, these agents collaborate in real-time, passing information and building upon each other's work to produce comprehensive marketing materials far superior to what any single tool could generate.</p>
      `
    },
    setup: {
      title: 'Setting Up Your First Campaign',
      content: `
        <p>Creating your first campaign is simple and intuitive. Follow these steps to get started:</p>
        
        <h3>Step 1: Access the Dashboard</h3>
        <p>Navigate to your dashboard and click the "New Campaign" button. This will take you to the campaign creation form.</p>
        
        <h3>Step 2: Define Your Product</h3>
        <p>Provide details about the product or service you're marketing, including key features, benefits, and unique selling propositions.</p>
        
        <h3>Step 3: Specify Your Audience</h3>
        <p>Describe your target audience including demographics, interests, pain points, and preferred communication channels.</p>
        
        <h3>Step 4: Select Marketing Channels</h3>
        <p>Choose which platforms you want to target (email, social media, paid advertising, etc.) and our system will optimize content accordingly.</p>
        
        <h3>Step 5: Launch the Workflow</h3>
        <p>Click "Generate Workflow" and watch as our AI agents collaborate to create your complete marketing brief.</p>
      `
    },
    interface: {
      title: 'Navigating the Interface',
      content: `
        <p>Our interface is designed for both simplicity and power. Here's a tour of the key areas:</p>
        
        <h3>Dashboard Overview</h3>
        <p>Your dashboard provides a snapshot of all campaigns, recent activity, and key performance metrics. Quick actions let you create new campaigns or access important resources.</p>
        
        <h3>Campaign Management</h3>
        <p>The campaign management section allows you to view, edit, and monitor all your active and past campaigns. Filter by status, date, or other criteria.</p>
        
        <h3>Workflow Visualization</h3>
        <p>Watch your agents in action with our real-time workflow visualization. See exactly what each agent is working on and track progress.</p>
        
        <h3>Results & Analytics</h3>
        <p>Detailed analytics show campaign performance, ROI, and optimization suggestions. Export reports for stakeholders.</p>
      `
    },
    create: {
      title: 'Creating Campaigns',
      content: `
        <p>Campaign creation is where the magic begins. Here's how to make the most of our campaign creation tools:</p>
        
        <h3>Campaign Templates</h3>
        <p>Start with industry-specific templates or create from scratch. Templates accelerate setup while allowing full customization.</p>
        
        <h3>Advanced Targeting Options</h3>
        <p>Specify detailed audience segments, geographic targeting, timing preferences, and channel priorities.</p>
        
        <h3>Budget Allocation</h3>
        <p>Distribute your marketing budget across channels and agents for optimal resource utilization.</p>
        
        <h3>Scheduling & Automation</h3>
        <p>Schedule campaigns for future dates or set up recurring campaigns with automated triggers.</p>
      `
    },
    edit: {
      title: 'Editing Campaigns',
      content: `
        <p>Need to make changes to an existing campaign? Our editing tools make it easy:</p>
        
        <h3>Real-Time Editing</h3>
        <p>Modify campaign parameters while preserving existing work. Changes are reflected immediately across all agents.</p>
        
        <h3>Version Control</h3>
        <p>Track all changes with our built-in version control. Revert to previous versions if needed.</p>
        
        <h3>Collaborative Editing</h3>
        <p>Invite team members to collaborate on campaigns with role-based permissions and commenting.</p>
      `
    },
    schedule: {
      title: 'Scheduling Campaigns',
      content: `
        <p>Timing is everything in marketing. Our scheduling features give you complete control:</p>
        
        <h3>Calendar Integration</h3>
        <p>Sync with your existing calendar tools to coordinate campaigns with other business activities.</p>
        
        <h3>Optimal Timing</h3>
        <p>Our AI suggests the best times to launch campaigns based on historical performance data and audience behavior.</p>
        
        <h3>Time Zone Management</h3>
        <p>Automatically adjust campaign timing for different geographic markets and time zones.</p>
      `
    },
    analyze: {
      title: 'Analyzing Results',
      content: `
        <p>Data-driven decisions are crucial for marketing success. Our analytics tools provide deep insights:</p>
        
        <h3>Performance Metrics</h3>
        <p>Track key metrics including engagement rates, conversion rates, ROI, and cost per acquisition.</p>
        
        <h3>A/B Testing</h3>
        <p>Run simultaneous experiments to determine the most effective approaches and messaging.</p>
        
        <h3>Predictive Analytics</h3>
        <p>Leverage machine learning to forecast future performance and identify optimization opportunities.</p>
      `
    },
    types: {
      title: 'Agent Types and Capabilities',
      content: `
        <p>Each agent type brings unique skills to your marketing workflows:</p>
        
        <h3>Research Agent</h3>
        <p>Gathers competitive intelligence, market trends, and audience insights to inform strategy.</p>
        
        <h3>Copywriter Agent</h3>
        <p>Creates compelling copy tailored to different channels, audiences, and brand voices.</p>
        
        <h3>Art Director Agent</h3>
        <p>Develops visual concepts, designs creative assets, and maintains brand consistency.</p>
        
        <h3>Manager Agent</h3>
        <p>Coordinates workflow, ensures quality standards, and delivers final outputs.</p>
      `
    },
    customize: {
      title: 'Customizing Agent Behavior',
      content: `
        <p>Tailor agent behavior to match your specific needs and preferences:</p>
        
        <h3>Personality Tuning</h3>
        <p>Adjust agent communication styles from professional to casual, formal to playful.</p>
        
        <h3>Expertise Levels</h3>
        <p>Configure agents for different industries, experience levels, and specialization areas.</p>
        
        <h3>Brand Alignment</h3>
        <p>Ensure all outputs align with your brand voice, values, and visual identity.</p>
      `
    },
    collaboration: {
      title: 'Agent Collaboration',
      content: `
        <p>Our agents work together seamlessly to produce superior results:</p>
        
        <h3>Information Sharing</h3>
        <p>Agents share insights and findings to build upon each other's work.</p>
        
        <h3>Quality Assurance</h3>
        <p>Agents review each other's outputs to ensure consistency and quality.</p>
        
        <h3>Dynamic Adaptation</h3>
        <p>Agents adapt their approaches based on feedback and changing requirements.</p>
      `
    },
    product: {
      title: 'Product Overview',
      content: `
        <p>Multi-Agent Workflow Automator transforms marketing through intelligent automation:</p>
        
        <h3>Core Features</h3>
        <p>Specialized AI agents, real-time collaboration, workflow visualization, and comprehensive analytics.</p>
        
        <h3>Industries Served</h3>
        <p>E-commerce, SaaS, professional services, healthcare, finance, and more.</p>
        
        <h3>Scalability</h3>
        <p>From solo entrepreneurs to enterprise teams, our platform scales with your needs.</p>
      `
    },
    features: {
      title: 'Feature List',
      content: `
        <p>Explore our comprehensive feature set:</p>
        
        <h3>Automation</h3>
        <p>Fully automated workflows from concept to delivery.</p>
        
        <h3>Customization</h3>
        <p>Tailor every aspect to match your brand and requirements.</p>
        
        <h3>Integration</h3>
        <p>Connect with your existing tools and platforms.</p>
        
        <h3>Analytics</h3>
        <p>Detailed reporting and actionable insights.</p>
      `
    },
    pricing: {
      title: 'Pricing Plans',
      content: `
        <p>Flexible pricing to suit businesses of all sizes:</p>
        
        <h3>Starter Plan</h3>
        <p>Perfect for individuals and small teams getting started.</p>
        
        <h3>Professional Plan</h3>
        <p>Ideal for growing businesses with advanced needs.</p>
        
        <h3>Enterprise Plan</h3>
        <p>Full-featured solution for large organizations with dedicated support.</p>
      `
    },
    plans: {
      title: 'Plan Comparison',
      content: `
        <p>Compare our plans to find the perfect fit:</p>
        
        <h3>Feature Availability</h3>
        <p>Detailed breakdown of features included in each plan.</p>
        
        <h3>Usage Limits</h3>
        <p>Understand campaign limits, agent hours, and storage allowances.</p>
        
        <h3>Upgrade Path</h3>
        <p>Seamlessly upgrade as your needs grow.</p>
      `
    },
    payments: {
      title: 'Payment Methods',
      content: `
        <p>We support multiple payment options for your convenience:</p>
        
        <h3>Credit Cards</h3>
        <p>All major credit and debit cards accepted.</p>
        
        <h3>Invoicing</h3>
        <p>Pay by invoice for enterprise accounts.</p>
        
        <h3>Annual Discounts</h3>
        <p>Save with annual payment plans.</p>
      `
    },
    invoices: {
      title: 'Managing Invoices',
      content: `
        <p>Easy invoice management and financial tracking:</p>
        
        <h3>Automatic Generation</h3>
        <p>Invoices created automatically for your records.</p>
        
        <h3>Export Options</h3>
        <p>Download invoices in multiple formats for accounting.</p>
        
        <h3>Payment History</h3>
        <p>Track all payments and outstanding balances.</p>
      `
    }
  }

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      articles: [
        { id: 'intro', title: 'Introduction to Multi-Agent Workflow' },
        { id: 'setup', title: 'Setting Up Your First Campaign' },
        { id: 'interface', title: 'Navigating the Interface' }
      ]
    },
    {
      id: 'campaigns',
      title: 'Campaign Management',
      icon: ChevronRight,
      articles: [
        { id: 'create', title: 'Creating Campaigns' },
        { id: 'edit', title: 'Editing Campaigns' },
        { id: 'schedule', title: 'Scheduling Campaigns' },
        { id: 'analyze', title: 'Analyzing Results' }
      ]
    },
    {
      id: 'agents',
      title: 'Working with Agents',
      icon: ChevronRight,
      articles: [
        { id: 'types', title: 'Agent Types and Capabilities' },
        { id: 'customize', title: 'Customizing Agent Behavior' },
        { id: 'collaboration', title: 'Agent Collaboration' }
      ]
    },
    {
      id: 'platform',
      title: 'Platform Features',
      icon: ChevronRight,
      articles: [
        { id: 'product', title: 'Product Overview' },
        { id: 'features', title: 'Feature List' },
        { id: 'pricing', title: 'Pricing Plans' }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Plans',
      icon: ChevronRight,
      articles: [
        { id: 'plans', title: 'Plan Comparison' },
        { id: 'payments', title: 'Payment Methods' },
        { id: 'invoices', title: 'Managing Invoices' }
      ]
    }
  ]

  const faqs = [
    {
      question: "How do I create my first campaign?",
      answer: "To create your first campaign, navigate to the Dashboard and click the 'New Campaign' button. Fill in your product details, select your target audience, and choose marketing channels. Then click 'Generate Workflow' to start the AI process."
    },
    {
      question: "Can I customize the AI agents?",
      answer: "Yes, you can customize agent behavior through the Settings panel. Advanced users can adjust parameters like creativity level, tone of voice, and output formats for each agent type."
    },
    {
      question: "What integrations are available?",
      answer: "We offer integrations with popular marketing platforms including Mailchimp, HubSpot, Slack, and Google Analytics. Check our API documentation for custom integration options."
    },
    {
      question: "How is my data protected?",
      answer: "All data is encrypted both in transit and at rest. We comply with GDPR and CCPA regulations. You retain full ownership of your data and can export or delete it at any time."
    }
  ]

  // Get current article content
  const currentArticle = articleContent[selectedArticle] || articleContent.intro

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Documentation & Resources</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive guides, tutorials, and resources to help you master the Multi-Agent Workflow Automator
          </p>
          
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass rounded-xl text-inherit placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card variant="glass" className="p-4 sticky top-6">
              <nav className="space-y-1">
                {documentationSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.id ? '' : section.id)}
                        className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left transition-colors text-white hover:bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-neon-blue" />
                          <span className="font-medium">{section.title}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                          expandedSection === section.id ? 'rotate-90' : ''
                        }`} />
                      </button>
                      
                      {expandedSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="ml-7 mt-1 space-y-1 overflow-hidden"
                        >
                          {section.articles.map((article) => (
                            <a
                              key={article.id}
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedArticle(article.id)
                              }}
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                                selectedArticle === article.id
                                  ? 'text-neon-blue bg-white/5'
                                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              {article.title}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </nav>
              
              <div className="border-t border-white/10 my-4 pt-4">
                <Link to="/product" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">Product Overview</span>
                </Link>
                <Link to="/features" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">Features</span>
                </Link>
                <Link to="/pricing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">Pricing</span>
                </Link>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Download Guides</span>
                </a>
                <Link to="/terms" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">Terms of Service</span>
                </Link>
                <Link to="/privacy" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">Privacy Policy</span>
                </Link>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            {/* Article Content */}
            <Card variant="glass" className="p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">{currentArticle.title}</h2>
              <div 
                className="prose prose-invert max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              />
            </Card>
            
            {/* Popular Articles */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Popular Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Setting Up Your First Campaign', reads: '2.4k', time: '5 min read' },
                  { title: 'Understanding Agent Collaboration', reads: '1.8k', time: '8 min read' },
                  { title: 'Advanced Customization Techniques', reads: '1.2k', time: '12 min read' },
                  { title: 'Integration with Marketing Platforms', reads: '980', time: '6 min read' }
                ].map((article, i) => (
                  <Card key={i} variant="glass" className="p-6 hover:border-neon-blue/50 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{article.reads} reads</span>
                      <span>{article.time}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Video Tutorials */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Video Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Getting Started', duration: '8:42' },
                  { title: 'Campaign Creation', duration: '12:15' },
                  { title: 'Agent Customization', duration: '15:30' }
                ].map((video, i) => (
                  <Card key={i} variant="glass" className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg mb-4 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-white ml-1"></div>
                      </div>
                    </div>
                    <h3 className="text-white font-medium mb-1">{video.title}</h3>
                    <p className="text-gray-400 text-sm">{video.duration}</p>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <Card key={i} variant="glass" className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documentation