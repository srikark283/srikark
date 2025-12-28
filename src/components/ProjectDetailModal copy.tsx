import { motion } from 'framer-motion'
import { Github, ExternalLink, Layers, ArrowRight, Database, Globe, Zap, MessageSquare, FileText, Save, Search, Network, Plug, Brain, CheckCircle, LineChart, Code2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
      <div className="relative py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      {/* Background Track Line */}
      <div 
        className="
          absolute bg-border 
          /* Mobile: Vertical line */
          left-[20px] sm:left-[28px] top-0 bottom-0 w-0.5 
          /* Desktop: Horizontal line */
          md:left-0 md:right-0 md:w-auto md:h-0.5 md:top-[50px] sm:md:top-[60px] md:bottom-auto
        " 
      />
      
      <div className="flex flex-col md:flex-row md:justify-between gap-4 sm:gap-6 md:gap-8 relative">
        {steps.map((step, index) => {
          // Fallback to Globe if icon not found
          const Icon = iconMap[step.icon] || Globe
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative flex md:flex-col items-start md:items-center gap-3 sm:gap-4 md:text-center z-10 md:flex-1"
            >
              {/* Node Circle */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/10 border border-primary/40 flex items-center justify-center shadow-lg shadow-primary/20 z-20 relative group-hover:border-primary/60 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                </div>
                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-30" />
              </div>

              {/* Connecting Line (Mobile Only) */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[20px] sm:left-[28px] top-10 sm:top-12 md:top-14 h-full w-0.5 bg-gradient-to-b from-primary to-muted md:hidden" />
              )}

              {/* Content Card */}
              <Card className="w-full md:min-h-[140px] hover:bg-accent/50 transition-colors">
                <CardContent className="p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs font-mono text-primary mb-1 uppercase tracking-wider">
                    Step 0{index + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground mb-1">{step.title}</h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 leading-relaxed">{step.description}</p>
                  <Badge variant="outline" className="text-[9px] sm:text-[10px] font-mono">
                    {step.tech}
                  </Badge>
                </CardContent>
              </Card>

              {/* Arrow Indicator (Desktop) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-5 -right-1/2 w-full text-center pointer-events-none opacity-50">
                  <motion.div
                    animate={{ x: [0, 10, 0], opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary mx-auto" />
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-7xl xl:max-w-[85vw] max-h-[95vh] p-0 flex flex-col border-primary/20">
        <DialogHeader className="p-4 sm:p-6 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <DialogTitle className="text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">{project.title}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm mt-1 text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Grid Layout for Overview & Sidebar */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* Main Content (Left 2 cols) */}
              <div className="md:col-span-2 space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">The Challenge & Solution</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                    {project.longDescription}
                  </p>
                </div>

                {project.features && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Key Features</h3>
                    <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 sm:mt-1 shrink-0">▹</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar (Right 1 col) */}
              <div className="space-y-4 sm:space-y-6">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-cyan-500/5">
                  <CardContent className="p-4 sm:p-5">
                    <h4 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-[10px] sm:text-xs border-primary/30 hover:border-primary/50 hover:bg-primary/10">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2 sm:space-y-3">
                  {project.githubUrl && (
                    <Button asChild className="w-full" size="lg">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm sm:text-base">
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> View Source
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm sm:text-base">
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Architecture Section (Full Width Below) */}
            <div className="border-t border-primary/20 pt-6 sm:pt-10">
              <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 shrink-0">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">System Architecture</h3>
              </div>
              
              {project.architectureFlow ? (
                <Card className="overflow-x-auto border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="p-4 sm:p-6 md:p-10">
                    <ArchitectureFlow steps={project.architectureFlow} />
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-dashed border-primary/20">
                  <CardContent className="text-center py-12 sm:py-20">
                    <Layers className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 opacity-20 text-primary" />
                    <p className="text-xs sm:text-sm text-muted-foreground">Detailed architecture diagram not available for this project.</p>
                  </CardContent>
                </Card>
              )}
              
              <Card className="mt-6 sm:mt-8 bg-gradient-to-br from-primary/10 to-cyan-500/5 border-primary/30 shadow-lg shadow-primary/10">
                <CardContent className="p-3 sm:p-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-primary mb-1 sm:mb-2">Engineering Note</h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    This system is designed for scalability. For production environments, I utilize 
                    container orchestration and ensure stateless design for the API layer (FastAPI) to handle 
                    horizontal scaling during high-load events.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDetailModal