import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Cpu, Database, Globe, Terminal, Code2, Layers } from 'lucide-react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      title: 'Generative AI & LLMs',
      icon: <Cpu className="w-6 h-6" />,
      description: 'Architecting intelligent agents and RAG pipelines.',
      skills: ['OpenAI GPT-4', 'LangChain', 'LangGraph', 'Gemini', 'Claude', 'Hugging Face', 'LlamaIndex', 'Prompt Engineering'],
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    {
      title: 'Data Engineering',
      icon: <Database className="w-6 h-6" />,
      description: 'Building robust pipelines and scalable storage.',
      skills: ['Python', 'SQL', 'PostgreSQL', 'Neo4j (Graph DB)', 'Pinecone', 'Vector Databases', 'ETL Pipelines', 'Data Modeling'],
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      title: 'Full Stack Engineering',
      icon: <Globe className="w-6 h-6" />,
      description: 'Creating responsive, modern user interfaces.',
      skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'REST/GraphQL', 'Vite'],
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      title: 'DevOps & Architecture',
      icon: <Layers className="w-6 h-6" />,
      description: 'Deployment, containerization, and cloud infra.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Git/GitHub', 'Microservices', 'System Design'],
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020617] to-[#020617] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
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
            A specialized stack focused on bridging the gap between traditional 
            software engineering and modern Artificial Intelligence.
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
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
            >
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`p-3 rounded-lg ${category.bg} ${category.color} border ${category.border}`}>
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
                    <span className={`w-1.5 h-1.5 rounded-full ${category.color.replace('text-', 'bg-')}`} />
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