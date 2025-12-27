import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const socialLinks = [
    {
      name: 'Email',
      value: 'srikark@outlook.com',
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:srikark@outlook.com',
      color: 'hover:text-white hover:border-red-500/50 hover:bg-red-500/10',
    },
    {
      name: 'LinkedIn',
      value: 'in/skrishnapurapu',
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/skrishnapurapu/',
      color: 'hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10',
    },
    {
      name: 'GitHub',
      value: 'github.com/srikark283',
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/srikark283',
      color: 'hover:text-white hover:border-gray-400/50 hover:bg-gray-500/10',
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-[#020617] to-[#020617] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-10 h-[1px] bg-primary-500" />
            <span className="text-primary-400 font-mono text-sm tracking-widest uppercase">Next Steps</span>
            <span className="w-10 h-[1px] bg-primary-500" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            Ready to <span className="text-gray-500">Collaborate?</span>
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
  Always interested in exploring the frontiers of AI. Whether it's a complex 
  architectural challenge, a debate on the latest LLM advancements, or a 
  new venture idea, I'm always open to a conversation.
</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-2xl text-gray-400 transition-all duration-300 ${link.color}`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-4 rounded-full bg-black/20 border border-white/5 group-hover:border-white/10 transition-colors">
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{link.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-300">
                    {link.value} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact