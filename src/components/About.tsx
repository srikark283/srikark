import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Database, Brain, Rocket, Code2 } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const cards = [
    {
      icon: <Database className="w-6 h-6 text-blue-400" />,
      title: 'Data Roots',
      description: '13+ years building scalable ETL pipelines, data warehouses, and backend infrastructure.'
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      title: 'AI Evolution',
      description: '4 years dedicated to LLMs, RAG, and Multi-Agent systems using LangChain & LangGraph.'
    },
    {
      icon: <Rocket className="w-6 h-6 text-emerald-400" />,
      title: 'Production Focus',
      description: 'Moving beyond notebooks to deploy reliable, containerized AI applications.'
    }
  ]

  return (
    <section id="about" ref={ref} className="relative py-24 bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[1px] bg-primary-500" />
            <span className="text-primary-400 font-mono text-sm tracking-widest uppercase">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Engineering the <span className="text-gray-500">Future</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              I am a <strong className="text-white font-semibold">Senior AI Engineer</strong> bridging the gap between robust data infrastructure and frontier Artificial Intelligence.
            </p>
            <p className="text-gray-400 leading-relaxed">
              With a <strong className="text-white">13-year foundation in Data Engineering</strong>, I specialize in building production-grade AI systems that are as reliable as they are innovative. I don't just write prompts; I engineer the end-to-end ecosystems—from data ingestion and vectorization to orchestration and UI.
            </p>
            <p className="text-gray-400 leading-relaxed">
              For the past <strong className="text-white">4 years</strong>, I have focused exclusively on the AI space, architecting Multi-Agent Systems, RAG pipelines, and Large Language Model applications. My mission is to ensure that 'intelligence' is supported by scalable architecture.
            </p>
            
            <div className="pt-4">
                <a href="#contact" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors border-b border-primary-500/30 hover:border-primary-500 pb-1">
                    Let's discuss your project <Code2 className="w-4 h-4" />
                </a>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default About