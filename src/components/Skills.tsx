import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['SQL', 'Python', 'JavaScript', 'TypeScript', 'Java'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI/ML Technologies',
      skills: ['OpenAI GPT', 'Gemini', 'Claude', 'LangChain', 'Hugging Face', 'TensorFlow', 'PyTorch', 'Transformers', 'Embedding Models'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Web Technologies',
      skills: ['React', 'Next.js', 'Vite', 'Node.js', 'REST APIs'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'Azure', 'AWS', 'Vercel', 'PostgreSQL', 'Neo4j', 'LangGraph'],
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section
      id="skills"
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
            <span className="text-white">Skills &</span>{' '}
            <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building innovative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className={`w-1 h-8 bg-gradient-to-b ${category.color} rounded-full`}></span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className={`px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-lg text-sm font-medium shadow-lg hover:scale-105 transition-transform cursor-default`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
