import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Database, Brain, Rocket, Code2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const cards = [
    {
      icon: <Database className="w-6 h-6 text-primary" />,
      title: 'Data Roots',
      description: '13+ years building scalable ETL pipelines, data warehouses, and backend infrastructure.'
    },
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: 'AI Evolution',
      description: '4 years dedicated to LLMs, RAG, and Multi-Agent systems using LangChain & LangGraph.'
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: 'Production Focus',
      description: 'Moving beyond notebooks to deploy reliable, containerized AI applications.'
    }
  ]

  return (
    <section id="about" ref={ref} className="relative py-16 sm:py-20 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-primary to-cyan-500" />
            <span className="text-primary font-mono text-xs sm:text-sm tracking-widest uppercase">About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Engineering the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Future</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light">
              I am a <strong className="text-foreground font-semibold">Senior AI Engineer</strong> bridging the gap between robust data infrastructure and frontier Artificial Intelligence.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              With a <strong className="text-foreground">13-year foundation in Data Engineering</strong>, I specialize in building production-grade AI systems that are as reliable as they are innovative. I don't just write prompts; I engineer the end-to-end ecosystems—from data ingestion and vectorization to orchestration and UI.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              For the past <strong className="text-foreground">4 years</strong>, I have focused exclusively on the AI space, architecting Multi-Agent Systems, RAG pipelines, and Large Language Model applications. My mission is to ensure that 'intelligence' is supported by scalable architecture.
            </p>
            
            <div className="pt-4">
              <Button variant="link" asChild className="p-0 h-auto">
                <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  Let's discuss your project <Code2 className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-4 sm:gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              >
                <Card className="hover:bg-accent/50 hover:border-primary/30 transition-all group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-primary/10 to-cyan-500/5 rounded-lg border border-primary/20 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all shrink-0">
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2">{card.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default About