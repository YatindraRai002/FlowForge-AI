export const agentWorkflowData = {
  planner: {
    title: "Planner Agent",
    status: "done",
    icon: "Search",
    output: {
      plan: [
        "Analyze user request for marketing brief creation",
        "Identify key requirements: product, audience, channels",
        "Create structured workflow for other agents",
        "Define success criteria and deliverables"
      ],
      approach: "Sequential multi-agent processing with feedback loops",
      timeline: "Estimated completion: 15 seconds"
    }
  },
  researcher: {
    title: "Researcher Agent",
    status: "running",
    icon: "Search",
    output: {
      requestData: "Gathering relevant information based on the plan",
      sources: [
        "Industry reports and market analysis",
        "Competitor websites and marketing materials",
        "Customer reviews and feedback",
        "Social media trends and discussions"
      ],
      methodology: "Systematic data collection from trusted sources",
      findings: "Comprehensive dataset ready for content creation"
    }
  },
  writer: {
    title: "Writer Agent",
    status: "pending",
    icon: "PenTool",
    output: {
      draftStatus: "Produces initial drafts using collected information",
      contentTypes: [
        "Product descriptions and value propositions",
        "Marketing copy for various channels",
        "Technical specifications and features",
        "Call-to-action statements"
      ],
      styleGuide: "Follows brand voice and tone guidelines",
      draftVersion: "Initial draft ready for review"
    }
  },
  critic: {
    title: "Critic Agent",
    status: "pending",
    icon: "RotateCcw",
    output: {
      evaluation: "Evaluates draft quality, scores it, and triggers rewrite cycles if needed",
      score: "8.5/10 - Good overall quality",
      strengths: [
        "Clear value proposition and messaging",
        "Consistent tone aligned with brand guidelines",
        "Effective use of persuasive language"
      ],
      areasForImprovement: [
        "Add more specific statistics and data points",
        "Include stronger emotional appeal",
        "Enhance call-to-action urgency"
      ],
      recommendation: "Proceed to next stage with minor revisions"
    }
  },
  assembler: {
    title: "Assembler Agent",
    status: "pending",
    icon: "Briefcase",
    output: {
      finalization: "Performs final polishing, formatting, and output assembly",
      tasksCompleted: [
        "Grammar and spelling check",
        "Formatting consistency across all sections",
        "Integration of all content elements",
        "Final quality assurance review"
      ],
      deliverables: [
        "Complete marketing brief document",
        "Channel-specific content variations",
        "Visual asset recommendations",
        "Implementation timeline and next steps"
      ],
      status: "Ready for delivery"
    }
  }
}

export const finalBriefData = {
  projectTitle: "Multi-Agent Workflow Automator - Q1 2025 Launch Campaign",
  generatedDate: new Date().toLocaleDateString(),
  overview: "Launch campaign targeting productivity-focused professionals and small business owners seeking AI-powered automation solutions. Focus on differentiating through intelligent multi-agent collaboration vs. traditional single-flow automation.",
  objectives: [
    "Generate 5,000 qualified leads in first quarter",
    "Achieve 15% trial-to-paid conversion rate",
    "Establish thought leadership in AI workflow automation space",
    "Build community of 10,000 active users"
  ],
  targetAudience: {
    primary: "Marketing managers and operations leads at 50-500 person companies",
    secondary: "Solo entrepreneurs and consultants managing multiple clients",
    demographics: "Ages 28-45, tech-savvy, values efficiency and innovation",
    painPoints: [
      "Spending too much time on repetitive marketing tasks",
      "Struggling to maintain consistent content quality",
      "Unable to scale operations without hiring"
    ]
  },
  keyMessages: [
    "Your personal AI marketing team that never sleeps",
    "From product idea to complete brief in 10 minutes",
    "Intelligence automation, not just task automation"
  ],
  adCopy: {
    headline: "Automate Smarter, Not Harder",
    subheadline: "Your AI Team Works While You Sleep",
    bodyPrimary: "Stop wasting 15+ hours per week on repetitive tasks. Our multi-agent AI system handles research, content creation, and creative direction automatically.",
    bodySocial: "Unlike basic automation tools, our intelligent agents collaborate, make decisions, and deliver production-ready marketing briefs in minutes, not days.",
    cta: "Start Your Free Trial - No Credit Card Required"
  },
  creativeDirection: {
    visualTheme: "Futuristic Tech Command Center",
    colorPalette: {
      primary: "#00D9FF (Neon Blue)",
      secondary: "#B537F2 (Electric Purple)",
      accent: "#FF2E97 (Neon Pink)",
      success: "#00FF94 (Neon Green)"
    },
    imagery: [
      "Hero: Glowing neural network connections forming workflow diagram",
      "Product shots: Dark glassmorphic UI with animated agent avatars",
      "Social: Animated workflows showing agent collaboration"
    ],
    designStyle: "Modern minimalistic with neon accents, rounded 2xl corners, soft glowing effects, dark backgrounds with glassmorphism"
  },
  channels: [
    {
      name: "LinkedIn Ads",
      budget: "₹4,00,000/month",
      goal: "Lead generation - target B2B marketers",
      creative: "Carousel showing before/after workflow automation"
    },
    {
      name: "Twitter/X",
      budget: "Organic + ₹80,000 promoted",
      goal: "Thought leadership and community building",
      creative: "Demo videos, agent personality content"
    }
  ],
  postingPlan: {
    week1: "Teaser campaign - mysterious AI agent personality reveals",
    week2: "Product demo videos showcasing each agent's capabilities",
    week3: "Launch week - comprehensive coverage across all channels",
    week4: "User testimonials and case studies from early adopters"
  },
  metrics: {
    awareness: "500K impressions",
    engagement: "5% CTR on paid ads",
    conversion: "5,000 trial signups",
    retention: "15% trial-to-paid conversion"
  }
}

export const campaignFormData = {
  product: "",
  audience: "",
  channels: []
}
