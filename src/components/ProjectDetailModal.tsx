import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Network, Workflow } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface Project {
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  category: 'llm' | 'genai' | 'web' | 'other'
  architecture?: string // Mermaid diagram code
  flowchart?: string // Mermaid flowchart code
  features?: string[]
  architectureImage?: string // URL to custom architecture image
}

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const architectureRef = useRef<HTMLDivElement>(null)
  const flowchartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && project && (project.architecture || project.flowchart)) {
      const loadMermaid = async () => {
        try {
          const mermaid = (await import('mermaid')).default
          
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            themeVariables: {
              primaryColor: '#0ea5e9',
              primaryTextColor: '#fff',
              primaryBorderColor: '#0284c7',
              lineColor: '#64748b',
              secondaryColor: '#1e293b',
              tertiaryColor: '#0f172a',
              background: '#0f172a',
              textColor: '#e2e8f0',
            },
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true,
              curve: 'basis',
            },
          })
          
          // Render architecture diagram
          if (project.architecture && architectureRef.current) {
            architectureRef.current.innerHTML = ''
            const archDiv = document.createElement('div')
            archDiv.className = 'mermaid'
            archDiv.textContent = project.architecture
            architectureRef.current.appendChild(archDiv)
            await mermaid.run({ nodes: [archDiv] })
          }
          
          // Render flowchart
          if (project.flowchart && flowchartRef.current) {
            flowchartRef.current.innerHTML = ''
            const flowDiv = document.createElement('div')
            flowDiv.className = 'mermaid'
            flowDiv.textContent = project.flowchart
            flowchartRef.current.appendChild(flowDiv)
            await mermaid.run({ nodes: [flowDiv] })
          }
        } catch (error) {
          console.error('Error loading Mermaid:', error)
        }
      }
      
      loadMermaid()
    }
  }, [isOpen, project])

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 overflow-y-auto"
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8 max-w-5xl mx-auto my-8 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 text-lg">{project.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <div className="flex gap-4 mb-6">
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                )}
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="text-primary-400 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-lg text-sm font-medium border border-primary-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture Diagram */}
              {(project.architecture || project.architectureImage) && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Network className="w-5 h-5 text-primary-400" />
                    <h3 className="text-xl font-semibold text-white">Architecture</h3>
                  </div>
                  {project.architectureImage ? (
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <img
                        src={project.architectureImage}
                        alt={`${project.title} Architecture`}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  ) : project.architecture ? (
                    <div
                      ref={architectureRef}
                      className="glass rounded-lg p-4 overflow-x-auto flex justify-center"
                    />
                  ) : null}
                </div>
              )}

              {/* Flowchart */}
              {project.flowchart && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Workflow className="w-5 h-5 text-primary-400" />
                    <h3 className="text-xl font-semibold text-white">Algorithm Flow</h3>
                  </div>
                  <div
                    ref={flowchartRef}
                    className="glass rounded-lg p-4 overflow-x-auto flex justify-center"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectDetailModal
