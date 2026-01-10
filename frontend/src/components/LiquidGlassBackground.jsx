import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LiquidGlassBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const location = useLocation()
  
  // Determine page type for different backgrounds
  const getPageType = () => {
    const path = location.pathname
    if (path === '/' || path === '/welcome') return 'landing'
    if (path === '/create' || path === '/workflow') return 'workflow'
    if (path === '/dashboard' || path === '/analytics') return 'dashboard'
    if (path === '/settings' || path === '/history') return 'settings'
    if (path === '/docs' || path === '/api-docs') return 'docs'
    if (path === '/login' || path === '/signup') return 'auth'
    return 'default'
  }
  
  const pageType = getPageType()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Page-specific color schemes
  const colorSchemes = {
    landing: {
      primary: '#00ffc8',
      secondary: '#00e5ff',
      accent: '#c147ff',
      glow: 'rgba(0, 255, 200, 0.15)',
    },
    workflow: {
      primary: '#ff6b35',
      secondary: '#f7931e',
      accent: '#ffd700',
      glow: 'rgba(255, 107, 53, 0.15)',
    },
    dashboard: {
      primary: '#00e5ff',
      secondary: '#0099ff',
      accent: '#00ffc8',
      glow: 'rgba(0, 229, 255, 0.15)',
    },
    settings: {
      primary: '#8b5cf6',
      secondary: '#a855f7',
      accent: '#c084fc',
      glow: 'rgba(139, 92, 246, 0.15)',
    },
    docs: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7',
      glow: 'rgba(16, 185, 129, 0.15)',
    },
    auth: {
      primary: '#f472b6',
      secondary: '#ec4899',
      accent: '#db2777',
      glow: 'rgba(244, 114, 182, 0.15)',
    },
    default: {
      primary: '#00ffc8',
      secondary: '#64c8ff',
      accent: '#c864ff',
      glow: 'rgba(0, 255, 200, 0.12)',
    },
  }

  const colors = colorSchemes[pageType] || colorSchemes.default

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ultra-dark base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              #000000 0%, 
              #020408 15%,
              #030610 30%,
              #040810 50%,
              #020406 75%,
              #000000 100%
            )
          `,
        }}
      />

      <AnimatePresence mode="wait">
        {/* Landing Page Background */}
        {pageType === 'landing' && (
          <motion.div
            key="landing-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Cyan/Teal Aurora at top */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0, 255, 200, 0.12) 0%, transparent 60%),
                  radial-gradient(ellipse 80% 40% at 20% 10%, rgba(0, 229, 255, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse 70% 35% at 80% 5%, rgba(193, 71, 255, 0.06) 0%, transparent 50%)
                `,
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Animated aurora rays */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: '3px',
                  height: '50%',
                  left: `${15 + i * 18}%`,
                  top: 0,
                  background: `linear-gradient(180deg, ${colors.primary}60 0%, transparent 100%)`,
                  filter: 'blur(8px)',
                }}
                animate={{
                  scaleY: [0.3, 0.8, 0.5, 0.9, 0.3],
                  opacity: [0.2, 0.6, 0.3, 0.7, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Hexagonal grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
              <defs>
                <pattern id="hexPattern" width="60" height="52" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z" fill="none" stroke={colors.primary} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexPattern)" />
            </svg>

            {/* Neural network nodes */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
              <defs>
                <filter id="nodeGlow1">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {[
                { cx: '10%', cy: '20%', r: 6 },
                { cx: '25%', cy: '35%', r: 8 },
                { cx: '40%', cy: '15%', r: 5 },
                { cx: '55%', cy: '28%', r: 7 },
                { cx: '70%', cy: '18%', r: 6 },
                { cx: '85%', cy: '32%', r: 5 },
                { cx: '15%', cy: '55%', r: 4 },
                { cx: '75%', cy: '50%', r: 6 },
              ].map((node, i) => (
                <motion.circle
                  key={i}
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill={colors.primary}
                  filter="url(#nodeGlow1)"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
              {/* Connection lines */}
              {[
                { x1: '10%', y1: '20%', x2: '25%', y2: '35%' },
                { x1: '25%', y1: '35%', x2: '40%', y2: '15%' },
                { x1: '40%', y1: '15%', x2: '55%', y2: '28%' },
                { x1: '55%', y1: '28%', x2: '70%', y2: '18%' },
                { x1: '70%', y1: '18%', x2: '85%', y2: '32%' },
              ].map((line, i) => (
                <motion.line
                  key={i}
                  {...line}
                  stroke={colors.primary}
                  strokeWidth="1"
                  filter="url(#nodeGlow1)"
                  animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </svg>
          </motion.div>
        )}

        {/* Workflow Page Background */}
        {pageType === 'workflow' && (
          <motion.div
            key="workflow-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Orange/Gold warm gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 40% at 80% 20%, rgba(247, 147, 30, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse 70% 45% at 20% 30%, rgba(255, 215, 0, 0.06) 0%, transparent 50%)
                `,
              }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Flowing workflow lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={colors.primary} stopOpacity="0" />
                  <stop offset="50%" stopColor={colors.primary} stopOpacity="1" />
                  <stop offset="100%" stopColor={colors.secondary} stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 35, 50, 65, 80].map((y, i) => (
                <motion.path
                  key={i}
                  d={`M0,${y}% Q25%,${y + (i % 2 === 0 ? 8 : -8)}% 50%,${y}% T100%,${y}%`}
                  stroke="url(#flowGrad)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, pathOffset: 0 }}
                  animate={{ pathLength: 1, pathOffset: [0, 1] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                />
              ))}
            </svg>

            {/* Animated progress dots */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`,
                  left: `${10 + i * 12}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                  boxShadow: `0 0 15px ${colors.primary}`,
                }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, -20, 20, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}

            {/* Gear icons */}
            {[
              { x: '15%', y: '25%', size: 40 },
              { x: '85%', y: '35%', size: 50 },
              { x: '50%', y: '70%', size: 35 },
            ].map((gear, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: gear.x, top: gear.y }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
              >
                <svg width={gear.size} height={gear.size} viewBox="0 0 100 100" fill="none" style={{ filter: `drop-shadow(0 0 10px ${colors.primary}80)` }}>
                  <path d="M50 15 L56 25 L68 22 L65 34 L78 42 L68 50 L78 58 L65 66 L68 78 L56 75 L50 85 L44 75 L32 78 L35 66 L22 58 L32 50 L22 42 L35 34 L32 22 L44 25 Z"
                    stroke={colors.primary} strokeWidth="2" fill={`${colors.primary}10`} />
                  <circle cx="50" cy="50" r="15" stroke={colors.primary} strokeWidth="2" fill="none" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Dashboard Page Background */}
        {pageType === 'dashboard' && (
          <motion.div
            key="dashboard-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Blue tech gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 90% 50% at 50% 0%, rgba(0, 229, 255, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 40% at 10% 50%, rgba(0, 153, 255, 0.06) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 40% at 90% 50%, rgba(0, 255, 200, 0.05) 0%, transparent 50%)
                `,
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
              <defs>
                <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke={colors.primary} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />
            </svg>

            {/* Data bars animation */}
            <div className="absolute bottom-[20%] left-[10%] flex gap-3 items-end opacity-30">
              {[60, 80, 45, 90, 70, 55, 85, 40].map((height, i) => (
                <motion.div
                  key={i}
                  className="w-4 rounded-t"
                  style={{ background: `linear-gradient(180deg, ${colors.primary}, ${colors.secondary}40)` }}
                  initial={{ height: 0 }}
                  animate={{ height: [0, height, height * 0.8, height] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>

            {/* Floating metrics */}
            {[
              { x: '75%', y: '25%', value: '98%' },
              { x: '20%', y: '40%', value: '256' },
              { x: '80%', y: '60%', value: '1.2K' },
            ].map((metric, i) => (
              <motion.div
                key={i}
                className="absolute text-lg font-mono font-bold"
                style={{ left: metric.x, top: metric.y, color: colors.primary, textShadow: `0 0 20px ${colors.primary}` }}
                animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {metric.value}
              </motion.div>
            ))}

            {/* Circular progress rings */}
            {[
              { x: '15%', y: '20%', size: 60 },
              { x: '85%', y: '45%', size: 80 },
            ].map((ring, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: ring.x, top: ring.y }}
              >
                <svg width={ring.size} height={ring.size} viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke={`${colors.primary}20`} strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    initial={{ strokeDashoffset: 251 }}
                    animate={{ strokeDashoffset: [251, 50, 251] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    style={{ filter: `drop-shadow(0 0 8px ${colors.primary})` }}
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Settings Page Background */}
        {pageType === 'settings' && (
          <motion.div
            key="settings-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Purple gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 50% at 30% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 40% at 70% 60%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)
                `,
              }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Floating config icons */}
            {[
              { x: '10%', y: '30%', rotation: 15 },
              { x: '85%', y: '25%', rotation: -10 },
              { x: '20%', y: '70%', rotation: 5 },
              { x: '75%', y: '65%', rotation: -15 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: item.x, top: item.y }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [item.rotation, item.rotation + 10, item.rotation],
                }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3 }}
              >
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" style={{ filter: `drop-shadow(0 0 15px ${colors.primary}60)` }}>
                  <rect x="15" y="15" width="70" height="70" rx="10" stroke={colors.primary} strokeWidth="2" fill={`${colors.primary}10`} />
                  <line x1="30" y1="40" x2="70" y2="40" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
                  <line x1="30" y1="55" x2="55" y2="55" stroke={colors.secondary} strokeWidth="3" strokeLinecap="round" />
                  <circle cx="65" cy="40" r="5" fill={colors.primary} />
                </svg>
              </motion.div>
            ))}

            {/* Toggle switches animation */}
            <div className="absolute right-[15%] top-[40%] space-y-4 opacity-40">
              {[true, false, true].map((active, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <div className="w-12 h-6 rounded-full" style={{ background: active ? colors.primary : '#374151' }}>
                    <motion.div
                      className="w-5 h-5 rounded-full bg-white shadow-lg"
                      style={{ marginTop: '2px', marginLeft: '2px' }}
                      animate={{ x: active ? [0, 22] : [22, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Docs Page Background */}
        {pageType === 'docs' && (
          <motion.div
            key="docs-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Green gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 70% 50% at 20% 10%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 40% at 80% 70%, rgba(52, 211, 153, 0.06) 0%, transparent 50%)
                `,
              }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Code brackets */}
            {[
              { x: '8%', y: '20%', char: '</', size: 50 },
              { x: '88%', y: '30%', char: '/>', size: 45 },
              { x: '15%', y: '65%', char: '{ }', size: 40 },
              { x: '82%', y: '70%', char: '( )', size: 35 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute font-mono font-bold"
                style={{
                  left: item.x,
                  top: item.y,
                  fontSize: item.size,
                  color: colors.primary,
                  textShadow: `0 0 20px ${colors.primary}`,
                  opacity: 0.3,
                }}
                animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >
                {item.char}
              </motion.div>
            ))}

            {/* Typing cursor lines */}
            <div className="absolute left-[20%] top-[35%] space-y-2 opacity-30">
              {[80, 60, 90, 45, 70].map((width, i) => (
                <motion.div
                  key={i}
                  className="h-2 rounded"
                  style={{ width: `${width}px`, background: colors.primary }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Auth Page Background */}
        {pageType === 'auth' && (
          <motion.div
            key="auth-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Pink gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 60% at 50% 30%, rgba(244, 114, 182, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 40% at 20% 60%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 40% at 80% 70%, rgba(219, 39, 119, 0.06) 0%, transparent 50%)
                `,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Lock icon */}
            <motion.div
              className="absolute"
              style={{ left: '15%', top: '25%' }}
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ filter: `drop-shadow(0 0 15px ${colors.primary}60)` }}>
                <rect x="25" y="45" width="50" height="40" rx="5" stroke={colors.primary} strokeWidth="3" fill={`${colors.primary}10`} />
                <path d="M50 30 Q30 30 30 50 L30 45 L70 45 L70 50 Q70 30 50 30" stroke={colors.primary} strokeWidth="3" fill="none" />
                <circle cx="50" cy="65" r="8" fill={colors.primary} />
              </svg>
            </motion.div>

            {/* Fingerprint */}
            <motion.div
              className="absolute"
              style={{ right: '15%', top: '35%' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="70" height="70" viewBox="0 0 100 100" fill="none" style={{ filter: `drop-shadow(0 0 15px ${colors.primary}60)` }}>
                {[20, 28, 36, 44, 52].map((r, i) => (
                  <motion.circle
                    key={i}
                    cx="50" cy="50" r={r}
                    stroke={colors.primary}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10 5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </svg>
            </motion.div>

            {/* Floating security particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: colors.primary,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  boxShadow: `0 0 10px ${colors.primary}`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </motion.div>
        )}

        {/* Default Page Background */}
        {pageType === 'default' && (
          <motion.div
            key="default-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 70% 50% at 50% 20%, rgba(0, 255, 200, 0.06) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 40% at 30% 60%, rgba(100, 200, 255, 0.05) 0%, transparent 50%)
                `,
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Common floating particles for all pages */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: colors.primary,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${colors.primary}`,
          }}
          animate={{
            y: [0, -80 - Math.random() * 60, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
        />
      ))}

      {/* Interactive mouse glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 80 }}
      />

      {/* Subtle scanning line */}
      <motion.div
        className="absolute w-full h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.primary}50, transparent)`,
        }}
        animate={{ top: ['0%', '100%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

export default LiquidGlassBackground
