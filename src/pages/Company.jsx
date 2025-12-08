import { motion } from 'framer-motion'
import Card from '../components/Card'

const Company = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Company</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Student-developed platform reshaping the future of work
          </p>
        </motion.div>

        <div className="space-y-8">
          <Card variant="glass" className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">About</h2>
            <p className="text-gray-300 mb-4">
              Multi-Agent Workflow Automator is a student-developed platform that uses collaborative AI agents to revolutionize marketing workflow automation. 
              We're building the future of work, one intelligent agent at a time.
            </p>
            <p className="text-gray-300">
              As a student project, we offer unique opportunities to gain real-world experience while contributing to innovative technology that solves actual problems. 
              Our team is passionate about making advanced marketing tools accessible to everyone.
            </p>
          </Card>

          <Card variant="glass" className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Blog</h2>
            <p className="text-gray-300 mb-4">
              Our blog features insights, stories, and research from our team of student developers building the future of AI-powered workflow automation.
            </p>
            <p className="text-gray-300">
              Topics include AI innovation, technical deep dives, case studies, research findings, team stories, and ethics in AI. 
              We regularly publish articles about our development process, challenges we overcome, and insights we gain.
            </p>
          </Card>

          <Card variant="glass" className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Careers</h2>
            <p className="text-gray-300 mb-4">
              We offer internships in AI research, frontend development, UX/UI design, and marketing. 
              As a student project, we provide hands-on experience with modern tech stacks and AI systems.
            </p>
            <p className="text-gray-300">
              Join our diverse, supportive team of students and mentors working on cutting-edge technology. 
              We value innovation through experimentation, collaboration over competition, and continuous learning.
            </p>
          </Card>

          <Card variant="glass" className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <p className="text-gray-300 mb-4">
              Follow us on Instagram: <span className="text-neon-blue">@multiagent_ai</span>
            </p>
            <p className="text-gray-300 mb-4">
              This is a student project under active development. We appreciate your feedback as we continue to improve.
            </p>
            <p className="text-gray-300">
              For general inquiries, please reach out through our social media channels. 
              We're always excited to hear from users and potential contributors to our project.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Company