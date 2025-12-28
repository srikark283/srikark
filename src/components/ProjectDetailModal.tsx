import { motion } from 'framer-motion'
import { Github, ExternalLink, Layers, Database, Globe, Zap, MessageSquare, FileText, Save, Search, Network, Plug, Brain, CheckCircle, LineChart, Code2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// --- Types ---
interface FlowStep {
  title: string
  description: string
  icon: 'user' | 'server' | 'ai' | 'db' | 'web' | 'code' | 'file' | 'tool' | 'chart' | 'network' | 'search' | 'check' | 'save'
  tech: string
  color?: string
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

// --- Icons Map ---
const iconMap = {
  user: MessageSquare,
  server: Zap,
  ai: Brain,
  db: Database,
  web: Globe,
  code: Code2,
  file: FileText,
  tool: Plug,
  chart: LineChart,
  network: Network,
  search: Search,
  check: CheckCircle,
  save: Save
}

// Color palette
const stepColors = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-emerald-500 to-teal-400',
  'from-amber-500 to-orange-400',
  'from-violet-500 to-purple-400',
  'from-sky-500 to-blue-400',
  'from-rose-500 to-pink-400',
  'from-lime-500 to-emerald-400'
]

// --- Architecture Flow Visualizer ---
const ArchitectureFlow = ({ steps }: { steps: FlowStep[] }) => {
  return (
    <div className="py-2">
      {/* Mobile: Vertical Stack (Full Descriptions) */}
      <div className="lg:hidden space-y-4">
        {steps.map((step, i) => {
          const Icon = iconMap[step.icon] || Globe
          const colorClass = stepColors[i % stepColors.length]
          
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-4 p-4 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm overflow-hidden"
            >
              {/* Connector Line for Mobile */}
              {i !== steps.length - 1 && (
                 <div className="absolute left-[28px] top-12 bottom-0 w-[2px] bg-gradient-to-b from-primary/20 to-transparent" />
              )}

              <div className="relative shrink-0">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  bg-gradient-to-br ${colorClass}
                  shadow-md shadow-primary/20 relative z-10
                `}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
                  <Badge variant="secondary" className="text-[10px] h-5 px-1.5 border-primary/20">{step.tech}</Badge>
                </div>
                {/* Full Description shown here */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Desktop: Horizontal Flow (Readable Descriptions) */}
      <div className="hidden lg:block relative">
        <div className="overflow-x-auto pb-6 pt-2 -mx-4 px-4 hide-scrollbar">
          <div className="flex items-start gap-4 min-w-max">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon] || Globe
              const colorClass = stepColors[index % stepColors.length]
              const isLast = index === steps.length - 1
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="relative group w-[220px]"
                >
                  {/* Connecting Line */}
                  {!isLast && (
                    <div className="absolute top-[20px] left-[55%] w-full h-[1px] bg-gradient-to-r from-primary/40 to-primary/10 -z-10" />
                  )}
                  
                  <div className="flex flex-col items-center text-center">
                    {/* Icon Node */}
                    <div className="relative mb-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className={`
                          relative z-10 w-11 h-11 rounded-xl
                          bg-gradient-to-br ${colorClass}
                          flex items-center justify-center
                          shadow-lg shadow-primary/20
                          border border-background/50
                        `}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 z-20 w-5 h-5 rounded-full bg-background border border-primary/20 flex items-center justify-center shadow-sm">
                        <span className="text-[10px] font-bold text-foreground">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Content Card - Increased size for readability */}
                    <Card className="w-full min-h-[140px] border-primary/20 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-900/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
                      <CardContent className="p-4 flex flex-col h-full text-left">
                        <div className="mb-2">
                           <div className="flex justify-between items-start mb-1">
                              <h4 className="text-xs font-bold text-foreground leading-tight">{step.title}</h4>
                           </div>
                           <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-primary/20 bg-primary/5 text-primary/80">
                              {step.tech}
                           </Badge>
                        </div>
                        
                        <Separator className="bg-primary/10 mb-2" />
                        
                        {/* Description - Standard readable size */}
                        <p className="text-xs text-muted-foreground leading-normal">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-5xl xl:max-w-6xl max-h-[90vh] p-0 flex flex-col border-primary/20 shadow-xl bg-[#0b0f19]">
        
        {/* Header */}
        <DialogHeader className="px-5 py-5 pr-10 border-b border-primary/10 bg-gradient-to-r from-primary/5 via-primary/5 to-transparent shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-primary ">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-sm mt-1 text-muted-foreground">
                {project.description}
              </DialogDescription>
            </div>
            <Badge variant="outline" className="text-xs uppercase tracking-wider border-primary/20 text-primary-400 shrink-0">
              {project.category}
            </Badge>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Grid Layout */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              
              {/* Left Column */}
              <div className="md:col-span-2 space-y-5">
                <Card className="border-primary/10 bg-white/5">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary-400" />
                      The Challenge & Solution
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {project.longDescription}
                    </p>
                  </CardContent>
                </Card>

                {project.features && (
                  <Card className="border-primary/10 bg-white/5">
                    <CardContent className="p-5">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-400" />
                        Key Features
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                            <p className="text-sm text-gray-400">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <Card className="border-primary/10 bg-white/5">
                  <CardContent className="p-5">
                    <h4 className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-[10px] px-2.5 py-1 bg-white/10 text-gray-300 hover:bg-white/20 border-transparent"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-3">
                  {project.githubUrl && (
                    <Button asChild className="w-full bg-white text-black hover:bg-gray-200">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <Github className="w-4 h-4" /> Source Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Architecture Section */}
            <div className="border-t border-primary/10 pt-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                   <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    System Architecture
                  </h3>
                  <p className="text-xs text-gray-500">Data flow and component interaction</p>
                </div>
              </div>
              
              {project.architectureFlow ? (
                <div className="rounded-xl border border-primary/10 bg-white/[0.02] p-4 sm:p-6 overflow-hidden">
                  <ArchitectureFlow steps={project.architectureFlow} />
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-primary/20 rounded-xl bg-white/[0.02]">
                  <p className="text-sm text-gray-500">Architecture diagram coming soon</p>
                </div>
              )}
              
              <div className="mt-4 p-4 rounded-lg bg-primary-500/5 border border-primary-500/10 flex gap-3">
                <Zap className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="font-bold text-primary-400">Engineering Note: </span>
                  Designed for scalability with a stateless API layer (FastAPI) and container orchestration. 
                  Supports horizontal scaling and high-throughput data processing.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDetailModal