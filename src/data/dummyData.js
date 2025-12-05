export const agentWorkflowData = {
  research: {
    title: "Research Agent",
    status: "done",
    icon: "Search",
    output: {
      marketTrends: [
        "AI-powered productivity tools showing 300% growth in 2024",
        "Enterprise adoption of multi-agent systems increasing",
        "Workflow automation market valued at $25B"
      ],
      competitors: [
        "Zapier - General automation, lacks AI agents",
        "Make.com - Visual automation, no intelligent routing",
        "n8n - Open source, requires technical expertise"
      ],
      insights: "Market gap exists for visual, AI-driven multi-agent workflows accessible to non-technical users."
    }
  },
  copywriter: {
    title: "Copywriter Agent",
    status: "running",
    icon: "PenTool",
    output: {
      headline: "Automate Smarter, Not Harder",
      tagline: "Your AI Team Works While You Sleep",
      adCopy: [
        "Stop wasting 15+ hours per week on repetitive tasks. Our multi-agent AI system handles research, content creation, and creative direction automatically.",
        "Unlike basic automation tools, our intelligent agents collaborate, make decisions, and deliver production-ready marketing briefs in minutes, not days.",
        "Join 10,000+ marketers who've reclaimed their time and 10x their output."
      ],
      ctaText: "Start Your Free Trial"
    }
  },
  artDirector: {
    title: "Art Director Agent",
    status: "pending",
    icon: "Palette",
    output: {
      visualTheme: "Futuristic Tech Command Center",
      colorPalette: ["#00D9FF", "#B537F2", "#FF2E97", "#00FF94"],
      creativePrompts: [
        "Hero image: Glowing neural network connections forming a workflow diagram, neon blue and purple gradients",
        "Dashboard UI: Dark glassmorphic cards with animated agent avatars collaborating in real-time",
        "Social media: Animated GIF showing agents passing work seamlessly through pipeline"
      ],
      styleGuide: "Modern minimalistic with neon accents, rounded corners, soft glows"
    }
  },
  manager: {
    title: "Manager Agent",
    status: "pending",
    icon: "Briefcase",
    output: {
      overview: "Complete marketing brief generated",
      timeline: "2-week sprint",
      deliverables: ["Ad creatives", "Landing page copy", "Social media kit"],
      nextSteps: ["Review brief", "Approve budget", "Launch campaign"]
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
      budget: "$5,000/month",
      goal: "Lead generation - target B2B marketers",
      creative: "Carousel showing before/after workflow automation"
    },
    {
      name: "Twitter/X",
      budget: "Organic + $1,000 promoted",
      goal: "Thought leadership and community building",
      creative: "Demo videos, agent personality content"
    },
    {
      name: "Product Hunt",
      budget: "$500",
      goal: "Launch day awareness and early adopters",
      creative: "Interactive demo, founder story"
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
