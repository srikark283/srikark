import { motion } from 'framer-motion'
import { BrainCircuit, Database, ChevronDown } from 'lucide-react'

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]">
      {/* Background Layer: Subtle Grid & Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Seniority Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <Database className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">
                13+ Years of Data Architecture & AI
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8"
          >
            <span className="text-white">Engineering the</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-white to-primary-200">
              Intelligence Era
            </span>
          </motion.h1>

          {/* Value Prop Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Bridging the gap between <strong>robust data infrastructure</strong> and 
            <strong> frontier AI</strong>. Specialized in deploying scalable LLM systems 
            and Generative AI solutions for enterprise-grade applications.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                View AI Portfolio <BrainCircuit className="w-5 h-5" />
              </span>
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/5 transition-all"
            >
              Technical Consulting
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero