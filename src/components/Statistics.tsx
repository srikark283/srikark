import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code2, Star, GitBranch, Zap, Trophy, Clock } from 'lucide-react'
import { fetchGitHubStats } from '../services/github'

interface Stat {
  id: string
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon: React.ReactNode
  description: string
}

const stats: Stat[] = [
  {
    id: 'experience',
    label: 'Years Experience',
    value: 13,
    suffix: '+',
    icon: <Clock className="w-5 h-5" />,
    description: 'Data & AI Engineering',
  },
  {
    id: 'projects',
    label: 'Repositories',
    value: 15, // Will update from GitHub
    icon: <Code2 className="w-5 h-5" />,
    description: 'Public projects',
  },
  {
    id: 'ai-projects',
    label: 'AI Implementations',
    value: 8,
    icon: <Zap className="w-5 h-5" />,
    description: 'LLM & RAG Systems',
  },
  {
    id: 'github-stars',
    label: 'GitHub Stars',
    value: 42, // Will update from GitHub
    icon: <Star className="w-5 h-5" />,
    description: 'Community recognition',
  },
  {
    id: 'contributions',
    label: 'Contributions',
    value: 120, // Placeholder
    suffix: '+',
    icon: <GitBranch className="w-5 h-5" />,
    description: 'Commits this year',
  },
  {
    id: 'awards', // Changed from "Technologies" to something more impact-focused
    label: 'Project Impact',
    value: 100,
    suffix: '%',
    icon: <Trophy className="w-5 h-5" />,
    description: 'Commitment to quality',
  },
]

const Statistics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // GitHub username
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
        
        setDynamicStats((prevStats) =>
          prevStats.map((stat) => {
            switch (stat.id) {
              case 'projects':
                return { ...stat, value: githubStats.totalRepos }
              case 'github-stars':
                return { ...stat, value: githubStats.totalStars }
              default:
                return stat
            }
          })
        )
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err)
        setError('Failed to load GitHub statistics')
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubStats()
  }, [])

  // Animate counter
  useEffect(() => {
    if (isInView && !isLoading && dynamicStats.length > 0) {
      setCountedValues({})
      
      const timers: number[] = []
      
      setTimeout(() => {
        dynamicStats.forEach((stat) => {
          const duration = 2000 
          const steps = 60
          const increment = stat.value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= stat.value) {
              setCountedValues((prev) => ({ ...prev, [stat.id]: stat.value }))
              clearInterval(timer)
            } else {
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
      className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden"
    >
       {/* Background Ambience - Same as Projects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020617] to-[#020617] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Consistent Design Language */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[1px] bg-primary-500" />
            <span className="text-primary-400 font-mono text-sm tracking-widest uppercase">Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            By The <span className="text-gray-500">Numbers</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Quantifying the impact of data engineering and AI solutions through 
            metrics, contributions, and professional milestones.
          </p>
        </motion.div>

        {error && (
           <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
             Unable to load live GitHub data. Showing cached values.
           </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-8 h-full animate-pulse border border-white/5">
                <div className="w-10 h-10 bg-white/10 rounded-lg mb-6"></div>
                <div className="w-20 h-10 bg-white/10 rounded mb-2"></div>
                <div className="w-32 h-4 bg-white/10 rounded"></div>
              </div>
            ))
          ) : (
            dynamicStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden group-hover:bg-white/[0.07]">
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Header part */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-primary-400 group-hover:text-white group-hover:bg-primary-500 transition-colors duration-300">
                            {stat.icon}
                        </div>
                        {/* Decorative line */}
                        <div className="h-[1px] flex-1 bg-white/10 ml-4" />
                    </div>

                    <div className="mb-1">
                        <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        {stat.prefix || ''}
                        {isInView && !isLoading 
                            ? (countedValues[stat.id] !== undefined ? countedValues[stat.id] : stat.value)
                            : stat.value}
                        {stat.suffix || ''}
                        </span>
                    </div>
                  </div>

                  {/* Footer part */}
                  <div className="mt-4">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-gray-500 group-hover:text-primary-400 transition-colors mb-1">
                        {stat.label}
                    </h3>
                    <p className="text-sm text-gray-400 font-light">
                        {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Statistics