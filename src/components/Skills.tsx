import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Layout, Server, Share2, Brain } from 'lucide-react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      title: 'LLM & Generative AI',
      icon: <Brain className="w-6 h-6" />,
      description: 'Orchestrating agents and semantic pipelines.',
      skills: ['LangChain', 'LangGraph', 'OpenAI', 'Google Gemini', 'Anthropic Claude', 'Ollama', 'Embedding Models', 'Prompt Engineering'],
      // Using a subtle tech-blue for accents
      accent: 'text-blue-400',
      border: 'group-hover:border-blue-500/50'
    },
    {
      title: 'Backend & Data',
      icon: <Server className="w-6 h-6" />,
      description: 'High-performance APIs and data structures.',
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'SQLite', 'Neo4j (Graph DB)', 'Vector Databases', 'SQLAlchemy', 'Pydantic'],
      accent: 'text-emerald-400',
      border: 'group-hover:border-emerald-500/50'
    },
    {
      title: 'Frontend Engineering',
      icon: <Layout className="w-6 h-6" />,
      description: 'Responsive, interactive user interfaces.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Chart.js', 'Vite', 'Responsive Design', 'State Management'],
      accent: 'text-purple-400',
      border: 'group-hover:border-purple-500/50'
    },
    {
      title: 'Architecture & Tools',
      icon: <Share2 className="w-6 h-6" />,
      description: 'System integration and protocols.',
      skills: ['Model Context Protocol (MCP)', 'REST APIs', 'Server-Sent Events (SSE)', 'Git', 'Docker', 'System Design', 'CI/CD'],
      accent: 'text-orange-400',
      border: 'group-hover:border-orange-500/50'
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
      className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden"
    >
      {/* Background Ambience - Matches Projects.tsx */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/20 via-[#020617] to-[#020617] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Matches Design Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[1px] bg-primary-500" />
            <span className="text-primary-400 font-mono text-sm tracking-widest uppercase">Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="text-gray-500">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            A specialized stack focused on bridging the gap between robust 
            backend engineering and modern Artificial Intelligence.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={`group relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.07] ${category.border}`}
            >
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`p-3 rounded-lg bg-white/5 border border-white/10 ${category.accent}`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/30 transition-colors cursor-default"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${category.accent.replace('text-', 'bg-')}`} />
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills