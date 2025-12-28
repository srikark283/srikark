import { motion } from 'framer-motion'
import { BrainCircuit, Database, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Meteors } from '@/components/ui/meteors'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Layer: Subtle Grid & Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.7_0.2_220_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.7_0.2_220_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-gradient-to-tl from-primary/15 to-transparent rounded-full blur-[100px]" />
        
        {/* Shooting Stars */}
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-[80px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-meteor-effect"
              style={{
                top: `${Math.random() * 40}%`,
                left: `${Math.random() * 20 + 60}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
                opacity: 0
              }}
            />
          ))}
        </div> */}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Seniority Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-4 sm:mb-6">
            <Badge variant="outline" className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 backdrop-blur-md border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
              <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              <span className="text-[10px] sm:text-xs font-medium tracking-widest uppercase text-primary/90">
                13+ Years of Data Architecture & AI
              </span>
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 sm:mb-8 px-2"
          >
            <span className="text-foreground">Engineering the</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-purple-400 animate-gradient bg-[length:200%_auto]">
              Intelligence Era
            </span>
          </motion.h1>

          {/* Value Prop Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4"
          >
            Bridging the gap between <strong className="text-foreground">robust data infrastructure</strong> and 
            <strong className="text-foreground"> frontier AI</strong>. Specialized in deploying scalable LLM systems 
            and Generative AI solutions for enterprise-grade applications.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center px-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2"
              >
                View AI Portfolio <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full font-semibold text-base sm:text-lg bg-background/10 border-2 border-primary/60 hover:border-primary hover:bg-primary/10 backdrop-blur-sm shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.a>
            </Button>

          </motion.div>
        </motion.div>
      </div>

      <Meteors number={10}/>

      {/* Modern Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero