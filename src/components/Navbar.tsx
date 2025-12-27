import { useState, useEffect } from 'react'
import { Menu, X, Terminal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
    { name: 'Impact', href: '#statistics' },
    { name: 'Stack', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Changed: Removed 'border-b' and specific border colors to avoid the solid line
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020617]/80 backdrop-blur-md py-4 shadow-lg shadow-black/10' // Added subtle shadow instead of border
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#hero')
            }}
            className="group flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:border-primary-500/50 transition-colors">
              <Terminal className="w-5 h-5 text-primary-400" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight font-mono">
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
                className={`relative px-4 py-2 text-sm font-mono transition-colors rounded-lg ${
                  activeSection === item.href.slice(1)
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020617] border-b border-white/10 overflow-hidden shadow-2xl"
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
                  className={`block px-4 py-3 rounded-lg text-sm font-mono transition-colors ${
                    activeSection === item.href.slice(1)
                      ? 'text-white bg-white/10 border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-primary-500 mr-2">{'>'}</span>
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