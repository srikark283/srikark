import { useState, useEffect } from 'react'
import { Menu, X, Terminal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavbarProps {
  isScrolled: boolean
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'statistics', 'skills', 'projects', 'contact']
      // Offset to trigger active state slightly before section hits top
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Stack', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Impact', href: '#statistics' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    setIsOpen(false)

    // Add a small delay to ensure the menu close animation 
    // doesn't interrupt the scroll action on mobile
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        // Increase offset to account for the fixed header height (approx 80px)
        // A value of 10 would leave the section title hidden behind the navbar
        const headerOffset = 10 
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100) // 100ms delay is usually sufficient
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-4 shadow-lg shadow-primary/5 border-b border-primary/20"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#hero')
            }}
            className="group flex items-center gap-1.5 sm:gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/30 rounded-lg group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <span className="font-bold text-foreground text-base sm:text-lg tracking-tight font-mono">
              Srikar K.
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.href)
                }}
                className={cn(
                  "relative px-4 py-2 text-sm font-mono transition-colors rounded-lg",
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-lg -z-10 shadow-sm shadow-primary/10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(item.href)
                  }}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-mono transition-colors",
                    activeSection === item.href.slice(1)
                      ? "text-foreground bg-accent border border-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <span className="text-primary mr-2">{'>'}</span>
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar