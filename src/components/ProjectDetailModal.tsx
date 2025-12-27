import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Layers, ArrowRight, Database, Globe, Zap, MessageSquare, FileText, Save, Search, Network, Plug, Brain, CheckCircle, LineChart, Code2 } from 'lucide-react'

// --- Types ---
interface FlowStep {
  title: string
  description: string
  icon: 'user' | 'server' | 'ai' | 'db' | 'web' | 'code' | 'file' | 'tool' | 'chart' | 'network' | 'search' | 'check' | 'save'
  tech: string
}

interface Project {
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  category: 'llm' | 'genai' | 'web' | 'other'
  features?: string[]
  architectureFlow?: FlowStep[]
}

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

// --- Icons Map (Aligned to your stack) ---
const iconMap = {
  user: MessageSquare,    // User Input
  server: Zap,            // FastAPI / Python Backend
  ai: Brain,               // LLMs (OpenAI, Claude, Gemini)
  db: Database,          // Postgres, SQLite, Neo4j
  web: Globe,            // React / TypeScript
  code: Code2,           // Scripting / LangChain
  file: FileText,        // Documents / PDF
  tool: Plug,            // MCP / External Tools
  chart: LineChart,      // Chart.js
  network: Network,      // Knowledge Graph
  search: Search,        // Retrieval / Vector Search
  check: CheckCircle,    // Validation / Success
  save: Save             // Persistence
}

// --- Sub-Component: Architecture Flow Visualizer ---
const ArchitectureFlow = ({ steps }: { steps: FlowStep[] }) => {
  return (
    <div className="relative py-8 px-4">
      {/* Background Track Line */}
      <div 
        className="
          absolute bg-gray-800 
          /* Mobile: Vertical line */
          left-[28px] top-0 bottom-0 w-0.5 
          /* Desktop: Horizontal line fixed */
          md:left-0 md:right-0 md:w-auto md:h-0.5 md:top-[60px] md:bottom-auto
        " 
      />
      
      <div className="flex flex-col md:flex-row md:justify-between gap-8 relative">
        {steps.map((step, index) => {
          // Fallback to Globe if icon not found
          const Icon = iconMap[step.icon] || Globe
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative flex md:flex-col items-center gap-4 md:text-center z-10 md:flex-1"
            >
              {/* Node Circle */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center shadow-xl z-20 relative group-hover:border-primary-500 transition-colors">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping opacity-20" />
              </div>

              {/* Connecting Line (Mobile Only) */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[28px] top-14 h-full w-0.5 bg-gradient-to-b from-primary-500 to-gray-800 md:hidden" />
              )}

              {/* Content Card */}
              <div className="glass p-4 rounded-xl border border-white/5 bg-gray-900/50 w-full md:min-h-[140px] hover:bg-gray-800/50 transition-colors">
                <div className="text-xs font-mono text-primary-400 mb-1 uppercase tracking-wider">
                  Step 0{index + 1}
                </div>
                <h4 className="font-bold text-white mb-1">{step.title}</h4>
                <p className="text-xs text-gray-400 mb-2 leading-relaxed">{step.description}</p>
                <span className="inline-block px-2 py-1 bg-white/5 rounded text-[10px] text-gray-300 border border-white/5 font-mono">
                  {step.tech}
                </span>
              </div>

              {/* Arrow Indicator (Desktop) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-5 -right-1/2 w-full text-center pointer-events-none opacity-50">
                  <motion.div
                    animate={{ x: [0, 10, 0], opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary-500 mx-auto" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 md:inset-10 z-[110] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#0b0f19] border border-white/10 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0b0f19]">
                <div>
                  <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto flex-1 p-6 md:p-8 custom-scrollbar">
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Grid Layout for Overview & Sidebar */}
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Main Content (Left 2 cols) */}
                    <div className="md:col-span-2 space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">The Challenge & Solution</h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                          {project.longDescription}
                        </p>
                      </div>

                      {project.features && (
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                          <ul className="grid sm:grid-cols-2 gap-3">
                            {project.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="text-primary-400 mt-1">▹</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Sidebar (Right 1 col) */}
                    <div className="space-y-6">
                      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-black/40 border border-white/10 rounded text-xs text-primary-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                         {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                            <Github className="w-4 h-4" /> View Source
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors">
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Architecture Section (Full Width Below) */}
                  <div className="border-t border-white/10 pt-10">
                    <div className="mb-6 flex items-center gap-3">
                      <Layers className="w-5 h-5 text-primary-400" />
                      <h3 className="text-xl font-bold text-white">System Architecture</h3>
                    </div>
                    
                    {project.architectureFlow ? (
                      <div className="bg-black/40 rounded-2xl border border-white/10 p-6 md:p-10 overflow-x-auto">
                        <ArchitectureFlow steps={project.architectureFlow} />
                      </div>
                    ) : (
                      <div className="text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-xl">
                        <Layers className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p>Detailed architecture diagram not available for this project.</p>
                      </div>
                    )}
                    
                    <div className="mt-8 p-4 bg-primary-900/10 border border-primary-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-primary-400 mb-2">Engineering Note</h4>
                        <p className="text-xs text-gray-400">
                            This system is designed for scalability. For production environments, I utilize 
                            container orchestration and ensure stateless design for the API layer (FastAPI) to handle 
                            horizontal scaling during high-load events.
                        </p>
                    </div>
                  </div>
                </motion.div>
                
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectDetailModal