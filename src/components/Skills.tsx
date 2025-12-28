import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Layout, Server, Share2, Brain } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      title: 'LLM & Generative AI',
      icon: <Brain className="w-6 h-6" />,
      description: 'Orchestrating agents and semantic pipelines.',
      skills: ['LangChain', 'LangGraph', 'OpenAI', 'Google Gemini', 'Anthropic Claude', 'Ollama', 'Embedding Models', 'Prompt Engineering'],
    },
    {
      title: 'Backend & Data',
      icon: <Server className="w-6 h-6" />,
      description: 'High-performance APIs and data structures.',
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'SQLite', 'Neo4j (Graph DB)', 'Vector Databases', 'SQLAlchemy', 'Pydantic'],
    },
    {
      title: 'Frontend Engineering',
      icon: <Layout className="w-6 h-6" />,
      description: 'Responsive, interactive user interfaces.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Chart.js', 'Vite', 'Responsive Design', 'State Management'],
    },
    {
      title: 'Architecture & Tools',
      icon: <Share2 className="w-6 h-6" />,
      description: 'System integration and protocols.',
      skills: ['Model Context Protocol (MCP)', 'REST APIs', 'Server-Sent Events (SSE)', 'Git', 'Docker', 'System Design', 'CI/CD'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-16 sm:py-20 md:py-24 bg-background overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-purple-500/10 to-background pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-10 sm:mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-primary to-cyan-500" />
            <span className="text-primary font-mono text-xs sm:text-sm tracking-widest uppercase">Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Arsenal</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A specialized stack focused on bridging the gap between robust 
            backend engineering and modern Artificial Intelligence.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-4 sm:gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
            >
              <Card className="group relative transition-all duration-300 hover:bg-accent/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-5 sm:p-6 md:p-8">
                  {/* Category Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 group-hover:border-primary/50 group-hover:shadow-md group-hover:shadow-primary/20 text-primary transition-all shrink-0">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{category.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs sm:text-sm cursor-default hover:bg-primary/10 hover:border-primary/40 transition-colors border-primary/20"
                      >
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mr-1 sm:mr-1.5 shadow-sm shadow-primary/50" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills