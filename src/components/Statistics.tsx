import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code, Sparkles, Zap, TrendingUp, Star, GitBranch, Loader2 } from 'lucide-react'
import { fetchGitHubStats } from '../services/github'

interface Stat {
  id: string
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon: React.ReactNode
  color: string
  description: string
}

const stats: Stat[] = [
  {
    id: 'projects',
    label: 'Projects Built',
    value: 15,
    icon: <Code className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    description: 'Innovative projects showcasing AI capabilities',
  },
  {
    id: 'github-stars',
    label: 'GitHub Stars',
    value: 42,
    icon: <Star className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    description: 'Stars received across repositories',
  },
  {
    id: 'technologies',
    label: 'Technologies',
    value: 25,
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    description: 'Technologies mastered',
  },
  {
    id: 'ai-projects',
    label: 'AI Projects',
    value: 8,
    icon: <Zap className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    description: 'Projects using LLMs & GenAI',
  },
  {
    id: 'contributions',
    label: 'Contributions',
    value: 120,
    suffix: '+',
    icon: <GitBranch className="w-6 h-6" />,
    color: 'from-indigo-500 to-blue-500',
    description: 'GitHub contributions this year',
  },
  {
    id: 'experience',
    label: 'Years Experience',
    value: 13,
    suffix: '+',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-red-500 to-pink-500',
    description: 'Years of professional experience',
  },
]

const Statistics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // GitHub username - update this with your GitHub username
  const GITHUB_USERNAME = 'srikark283'

  const [countedValues, setCountedValues] = useState<{ [key: string]: number }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dynamicStats, setDynamicStats] = useState(stats)

  // Fetch GitHub stats on mount
  useEffect(() => {
    const loadGitHubStats = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const githubStats = await fetchGitHubStats(GITHUB_USERNAME)
        
        // Update stats with real GitHub data
        // Note: Only update GitHub-related stats, preserve manual stats like experience
        setDynamicStats((prevStats) =>
          prevStats.map((stat) => {
            switch (stat.id) {
              case 'projects':
                return { ...stat, value: githubStats.totalRepos }
              case 'github-stars':
                return { ...stat, value: githubStats.totalStars }
              case 'technologies':
                return { ...stat, value: githubStats.languages.length }
              case 'contributions':
                // Contributions require GitHub token - keeping placeholder for now
                return stat
              case 'experience':
                // Preserve manual experience value - don't override
                return stat
              case 'ai-projects':
                // Preserve manual AI projects value
                return stat
              default:
                return stat
            }
          })
        )
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err)
        setError('Failed to load GitHub statistics')
        // Keep default values on error
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubStats()
  }, [])

  // Animate counter when in view and data is loaded
  useEffect(() => {
    if (isInView && !isLoading && dynamicStats.length > 0) {
      // Reset counted values to start fresh animation
      setCountedValues({})
      
      // Small delay to ensure state is ready
      const timers: number[] = []
      
      setTimeout(() => {
        dynamicStats.forEach((stat) => {
          const duration = 2000 // 2 seconds
          const steps = 60
          const increment = stat.value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= stat.value) {
              setCountedValues((prev) => ({ ...prev, [stat.id]: stat.value }))
              clearInterval(timer)
            } else {
              // Show the floor value, but ensure we show at least 1 if value > 0
              const displayValue = stat.value > 0 ? Math.max(1, Math.floor(current)) : Math.floor(current)
              setCountedValues((prev) => ({ ...prev, [stat.id]: displayValue }))
            }
          }, duration / steps)
          
          timers.push(timer)
        })
      }, 100)

      return () => {
        timers.forEach(timer => clearInterval(timer))
      }
    }
  }, [isInView, isLoading, dynamicStats])

  return (
    <section
      id="statistics"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">By The</span>{' '}
            <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Quantifying impact through metrics and achievements
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              <span>{error}</span>
              <span className="text-gray-500">(Using default values)</span>
            </div>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 h-full animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-xl mb-4"></div>
                <div className="w-24 h-12 bg-gray-700 rounded mb-2"></div>
                <div className="w-32 h-6 bg-gray-700 rounded mb-2"></div>
                <div className="w-40 h-4 bg-gray-700 rounded"></div>
              </div>
            ))
          ) : (
            dynamicStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass rounded-2xl p-8 h-full hover:bg-white/10 transition-all relative overflow-hidden">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-white">
                      {stat.prefix || ''}
                      {isInView && !isLoading 
                        ? (countedValues[stat.id] !== undefined 
                            ? countedValues[stat.id] 
                            : stat.value) // Fallback to actual value if counter hasn't started
                        : isLoading ? (
                          <Loader2 className="w-8 h-8 inline-block animate-spin" />
                        ) : stat.value}
                      {stat.suffix || ''}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </div>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Continuous Growth & Learning
            </h3>
            <p className="text-gray-400 leading-relaxed">
              These numbers represent not just projects completed, but a journey of continuous 
              learning, innovation, and pushing the boundaries of what's possible with AI and 
              modern web technologies. Every project is an opportunity to explore new ideas and 
              create meaningful solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics
