import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code2, Star, GitBranch, Zap, Trophy, Clock } from 'lucide-react'
import { fetchGitHubStats } from '../services/github'
import { Card } from '@/components/ui/card'

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
      className="relative py-16 sm:py-20 md:py-24 bg-background overflow-hidden"
    >
       {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-cyan-500/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-primary to-cyan-500" />
            <span className="text-primary font-mono text-xs sm:text-sm tracking-widest uppercase">Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            By The <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Numbers</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Quantifying the impact of data engineering and AI solutions through 
            metrics, contributions, and professional milestones.
          </p>
        </motion.div>

        {error && (
           <div className="mb-8 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-destructive text-sm text-center">
             Unable to load live GitHub data. Showing cached values.
           </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-full animate-pulse">
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-lg mb-4 sm:mb-6"></div>
                  <div className="w-16 sm:w-20 h-8 sm:h-10 bg-muted rounded mb-2"></div>
                  <div className="w-24 sm:w-32 h-3 sm:h-4 bg-muted rounded"></div>
                </div>
              </Card>
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
              <Card className="h-full hover:border-primary/50 transition-all duration-300 hover:bg-accent/50 hover:shadow-lg hover:shadow-primary/10 group">
                <div className="p-5 sm:p-6 md:p-8 flex flex-col h-full justify-between">
                  {/* Header part */}
                  <div>
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/30 transition-all duration-300 shrink-0">
                            {stat.icon}
                        </div>
                        {/* Decorative line */}
                        <div className="h-px flex-1 bg-border ml-3 sm:ml-4" />
                    </div>

                    <div className="mb-1">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                        {stat.prefix || ''}
                        {isInView && !isLoading 
                            ? (countedValues[stat.id] !== undefined ? countedValues[stat.id] : stat.value)
                            : stat.value}
                        {stat.suffix || ''}
                        </span>
                    </div>
                  </div>

                  {/* Footer part */}
                  <div className="mt-3 sm:mt-4">
                    <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors mb-1">
                        {stat.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-light">
                        {stat.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Statistics