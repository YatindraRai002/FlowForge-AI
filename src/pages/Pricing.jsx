import { motion } from 'framer-motion'
import { Check, Zap, Crown, Rocket, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "2,999",
      period: "month",
      description: "Perfect for individuals and small teams getting started",
      icon: Zap,
      color: "neon-blue",
      features: [
        "10 campaigns per month",
        "All 4 AI agents",
        "Basic analytics",
        "Email support",
        "Export to JSON/PDF",
        "1 team member"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "7,999",
      period: "month",
      description: "Best for growing businesses and marketing teams",
      icon: Crown,
      color: "neon-purple",
      features: [
        "50 campaigns per month",
        "All 4 AI agents",
        "Advanced analytics",
        "Priority support",
        "Export to JSON/PDF/DOCX",
        "5 team members",
        "Custom branding",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Unlimited power for large organizations",
      icon: Rocket,
      color: "neon-pink",
      features: [
        "Unlimited campaigns",
        "All 4 AI agents",
        "Enterprise analytics",
        "24/7 dedicated support",
        "All export formats",
        "Unlimited team members",
        "White-label solution",
        "Custom integrations",
        "SLA guarantee"
      ],
      popular: false
    }
  ]

  const handlePurchase = (planName) => {
    if (planName === "Enterprise") {
      // Redirect to Instagram for Enterprise plan inquiries
      window.open("https://www.instagram.com/multiagent_ai", "_blank");
    } else {
      alert(`You selected ${planName} plan! Payment integration coming soon...`);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto px-4 sm:px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
        >
          <Crown className="w-4 h-4 text-neon-purple" />
          <span className="text-sm font-medium text-gray-300">Simple, Transparent Pricing</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
          Choose Your <span className="text-gradient">Plan</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400">
          Start free, scale as you grow. All plans include our powerful AI agents.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="responsive-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-neon-purple to-neon-pink px-4 py-1 rounded-full text-sm font-semibold text-white shadow-neon-purple">
                      Most Popular
                    </div>
                  </div>
                )}

                <Card 
                  variant="glass" 
                  className={`h-full relative overflow-hidden transition-all duration-300 ${
                    plan.popular 
                      ? 'border-2 border-neon-purple shadow-neon-purple scale-105' 
                      : 'border border-white/10 hover:border-neon-blue/50'
                  }`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${plan.color}/20 to-transparent rounded-full blur-2xl`} />
                  
                  <div className="relative z-10 card-padding">
                    {/* Icon */}
                    <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-gradient-to-br from-${plan.color} to-${plan.color}/50 flex items-center justify-center mb-4`}>
                      <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-400 mb-4 sm:mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      {plan.price === "Custom" ? (
                        <div className="text-3xl sm:text-4xl font-bold text-gradient">Custom</div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl sm:text-2xl font-semibold text-gray-400">₹</span>
                          <span className="text-4xl sm:text-5xl font-bold text-white">{plan.price}</span>
                          <span className="text-gray-400">/{plan.period}</span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6 sm:mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={`w-4 sm:w-5 h-4 sm:h-5 text-${plan.color} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handlePurchase(plan.name)}
                      className={`w-full ${plan.popular ? 'shadow-neon-purple' : ''}`}
                      variant={plan.popular ? 'primary' : 'secondary'}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="responsive-container mt-12 sm:mt-20"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {[
            {
              q: "Can I change plans later?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit/debit cards, UPI, net banking, and digital wallets."
            },
            {
              q: "Is there a free trial?",
              a: "Yes! All new users get a 14-day free trial with full access to Professional plan features."
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely. Cancel your subscription anytime with no questions asked. No hidden fees."
            }
          ].map((faq, i) => (
            <Card key={i} variant="glass" className="hover:border-neon-blue/50 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-gray-400">{faq.a}</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="responsive-container mt-12 sm:mt-20"
      >
        <Card variant="glass" className="text-center relative overflow-hidden border-2 border-neon-blue/30">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10" />
          <div className="relative z-10 py-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-6">
              Our team is here to help you find the perfect plan for your needs
            </p>
            <Button 
              size="lg"
              onClick={() => window.open("https://www.instagram.com/multiagent_ai", "_blank")}
            >
              Contact Sales Team
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Pricing
