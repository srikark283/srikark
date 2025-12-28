import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const socialLinks = [
    {
      name: 'Email',
      value: 'srikark@outlook.com',
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:srikark@outlook.com',
    },
    {
      name: 'LinkedIn',
      value: 'in/skrishnapurapu',
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/skrishnapurapu/',
    },
    {
      name: 'GitHub',
      value: 'github.com/srikark283',
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/srikark283',
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 sm:py-32 bg-background overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-purple-500/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-primary font-mono text-xs sm:text-sm tracking-widest uppercase">Next Steps</span>
            <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground px-2">
            Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Collaborate?</span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
            Always interested in exploring the frontiers of AI. Whether it's a complex 
            architectural challenge, a debate on the latest LLM advancements, or a 
            new venture idea, I'm always open to a conversation.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto"
          >
            {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="group h-full hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <div className="p-2 sm:p-3 md:p-4 rounded-full bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 group-hover:border-primary/50 group-hover:shadow-md group-hover:shadow-primary/20 transition-all">
                        {link.icon}
                      </div>
                      <div className="text-center">
                        <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-foreground mb-0.5 sm:mb-1">{link.name}</h3>
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground group-hover:text-foreground">
                          <span className="truncate max-w-[60px] sm:max-w-[80px] md:max-w-none">{link.value}</span> 
                          <ExternalLink className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact