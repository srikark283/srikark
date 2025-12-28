import { ArrowUp, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-8 bg-background border-t border-border overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 text-center md:text-left">
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="font-mono text-xs sm:text-sm tracking-tight font-semibold">Srikar K.</span>
            </div>
            <span className="hidden md:block text-muted-foreground">|</span>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">
              &copy; {currentYear} • Built with React & Tailwind CSS
            </p>
          </div>

          {/* Right: Back to Top */}
          <Button 
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group text-xs font-mono font-medium"
          >
            BACK TO TOP
            <div className="p-1.5 bg-muted border border-border rounded group-hover:bg-accent group-hover:-translate-y-0.5 transition-all duration-300">
              <ArrowUp className="w-3 h-3" />
            </div>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer