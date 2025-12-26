import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Brain, Rocket } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems with LLMs, GPT models, and generative AI technologies',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Full-Stack Development',
      description: 'Creating robust web applications with modern frameworks and best practices',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Innovation Focus',
      description: 'Transforming ideas into reality with cutting-edge solutions and creative problem-solving',
    },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">About</span>{' '}
            <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8">
            I'm a passionate developer and innovator specializing in building
            cutting-edge solutions using Large Language Models and Generative AI.
            My work focuses on creating intelligent systems that solve real-world
            problems and push the boundaries of what's possible with AI.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            With a strong foundation in software engineering and a deep curiosity
            for emerging technologies, I've developed several projects that showcase
            the power of LLMs and GenAI in practical applications. Each project
            represents a unique exploration of AI capabilities and creative problem-solving.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 hover:bg-white/10 transition-all group"
            >
              <div className="text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
