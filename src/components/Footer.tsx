import { ArrowUp, Terminal } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-8 bg-[#020617] border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-900/5 via-[#020617] to-[#020617] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2 text-gray-300">
              <Terminal className="w-4 h-4 text-primary-400" />
              <span className="font-mono text-sm tracking-tight font-semibold">Srikar K.</span>
            </div>
            <span className="hidden md:block text-gray-700">|</span>
            <p className="text-xs text-gray-500 font-mono">
              &copy; {currentYear} • Built with React & Framer Motion
            </p>
          </div>

          {/* Right: Back to Top */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-mono font-medium text-gray-500 hover:text-primary-400 transition-colors"
          >
            BACK TO TOP
            <div className="p-1.5 bg-white/5 border border-white/10 rounded group-hover:bg-white/10 group-hover:-translate-y-0.5 transition-all duration-300">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer