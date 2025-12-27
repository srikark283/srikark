import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight, Sparkles, Zap, Code } from 'lucide-react'
import ProjectDetailModal from './ProjectDetailModal'

// --- Interface Definitions ---
interface FlowStep {
  title: string
  description: string
  // Updated icons to match the new ProjectDetailModal map
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
  featured?: boolean
  features?: string[]
  architectureFlow?: FlowStep[]
}

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // --- Project Data ---
  const projects: Project[] = [
    {
      title: 'AI Chat Assistant',
      description: 'Intelligent conversational AI with context awareness.',
      longDescription: 'Building a truly conversational AI requires overcoming the limitations of stateless web protocols and restricted context windows. The challenge was to maintain continuity in long-running dialogues. The solution is a high-performance backend using FastAPI and SQLite that implements a sliding-window context mechanism. This ensures the model retains critical conversation history while managing token usage efficiently, delivering a personalized and coherent user experience.',
      technologies: ['OpenAI', 'React', 'TypeScript', 'FastAPI', 'SQLite', 'Python'],
      githubUrl: 'https://github.com/srikark283/langgraph_demo',
      demoUrl: 'https://yourproject1.com',
      category: 'llm',
      featured: true,
      features: [
        'Multi-turn conversation support',
        'Context retention using SQLite',
        'Streaming responses (FastAPI SSE)',
        'Personalized user experience'
      ],
      architectureFlow: [
        { title: 'User Input', description: 'Chat message entered', icon: 'user', tech: 'React / TypeScript' },
        { title: 'API Gateway', description: 'Route request', icon: 'server', tech: 'FastAPI' },
        { title: 'Context Load', description: 'Retrieve history', icon: 'db', tech: 'SQLite' },
        { title: 'Inference', description: 'Generate reply', icon: 'ai', tech: 'OpenAI GPT-4o' },
        { title: 'Streaming', description: 'Token delivery', icon: 'web', tech: 'SSE / StreamingResponse' },
        { title: 'Persistence', description: 'Save interaction', icon: 'save', tech: 'SQLite' }
      ]
    },
    {
      title: 'Smart Doc Analyzer',
      description: 'Extract insights from documents using AI.',
      longDescription: 'Unlocking knowledge trapped in PDF documents is a common enterprise hurdle where standard search fails to capture semantic meaning. This solution implements a robust RAG (Retrieval-Augmented Generation) pipeline using LangChain. It parses complex document structures, chunks text semantically, and utilizes high-dimensional embeddings. This allows users to "chat" with their documents, retrieving precise answers with source attribution, far exceeding simple keyword matching.',
      technologies: ['LangChain', 'Python', 'OpenAI', 'React', 'Embedding Models'],
      githubUrl: 'https://github.com/srikark283/doc-analyzer',
      category: 'llm',
      features: [
        'PDF Parsing with Python',
        'Intelligent content extraction',
        'RAG with Embedding Models',
        'Document summarization'
      ],
      architectureFlow: [
        { title: 'Upload', description: 'PDF input', icon: 'file', tech: 'React UI' },
        { title: 'Ingestion', description: 'Text extraction', icon: 'code', tech: 'Python / LangChain' },
        { title: 'Embedding', description: 'Vectorize chunks', icon: 'ai', tech: 'Embedding Models' },
        { title: 'Vector Store', description: 'Index content', icon: 'db', tech: 'Chroma / Postgres' },
        { title: 'Retrieval', description: 'Semantic search', icon: 'search', tech: 'LangChain' },
        { title: 'Generation', description: 'Answer synthesis', icon: 'ai', tech: 'OpenAI' }
      ]
    },
    {
      title: 'Multi-Agent AI System',
      description: 'Complex system with LangGraph orchestration.',
      longDescription: 'Single-pass LLM calls struggle with complex, multi-step workflows that require planning and tool use. This project implements a sophisticated multi-agent architecture using LangGraph. A "Supervisor" agent orchestrates specialized sub-agents, delegating tasks and aggregating results. By integrating a Neo4j graph database for shared state and using the Model Context Protocol (MCP) for tool interfaces, the system achieves a level of autonomy and reasoning capability that standard chatbots cannot match.',
      technologies: ['LangGraph', 'LangChain', 'OpenAI', 'Gemini', 'Neo4j', 'MCP'],
      githubUrl: 'https://github.com/srikark283/multi-agent-ai-system',
      category: 'llm',
      featured: true,
      features: [
        'LangGraph Supervisor Pattern',
        'Shared memory with Neo4j',
        'MCP Tool Integration',
        'State management'
      ],
      architectureFlow: [
        { title: 'Task Input', description: 'Complex objective', icon: 'user', tech: 'User Request' },
        { title: 'Supervisor', description: 'Route to agents', icon: 'network', tech: 'LangGraph' },
        { title: 'Agents', description: 'Execute sub-tasks', icon: 'ai', tech: 'Gemini / OpenAI' },
        { title: 'Memory', description: 'Read/Write state', icon: 'db', tech: 'Neo4j' },
        { title: 'Tools', description: 'External actions', icon: 'tool', tech: 'MCP Servers' },
        { title: 'Aggregation', description: 'Compile results', icon: 'check', tech: 'Supervisor' }
      ]
    },
    {
      title: 'Graph + RAG Knowledge',
      description: 'Semantic search system with vector embeddings.',
      longDescription: 'Vector databases excel at similarity search but often fail to capture the structural relationships between data points, leading to "hallucinations" or shallow answers. This system solves this by implementing a Hybrid RAG architecture. It synchronizes a vector store (Postgres/pgvector) for semantic retrieval with a Knowledge Graph (Neo4j) for relational context. This dual-path approach allows the AI to "reason" across connected concepts, providing significantly more accurate and comprehensive answers.',
      technologies: ['LangChain', 'Postgres', 'Neo4j', 'Embedding Models', 'Claude'],
      githubUrl: 'https://github.com/srikark283/graph-rag-knowledge',
      category: 'llm',
      featured: true,
      features: [
        'Hybrid Search (Vector + Graph)',
        'Postgres for Vector Storage',
        'Neo4j for Knowledge Graph',
        'Citation tracking'
      ],
      architectureFlow: [
        { title: 'Ingestion', description: 'Parse data', icon: 'file', tech: 'LangChain' },
        { title: 'Embedding', description: 'Create vectors', icon: 'ai', tech: 'Embedding Models' },
        { title: 'Vector DB', description: 'Store dense vectors', icon: 'db', tech: 'Postgres' },
        { title: 'Graph DB', description: 'Store relationships', icon: 'network', tech: 'Neo4j' },
        { title: 'Hybrid Search', description: 'Retrieval strategy', icon: 'search', tech: 'Ensemble Retriever' },
        { title: 'Synthesis', description: 'Final response', icon: 'ai', tech: 'Claude' }
      ]
    },
    {
      title: 'Doc Generator',
      description: 'Auto-generate documentation from code.',
      longDescription: 'Documentation often lags behind development, leading to technical debt and onboarding friction. This tool automates the documentation process by combining static analysis with generative AI. It uses Python\'s AST module to extract code structure deterministically, which is then fed into an LLM context. The result is auto-generated, high-quality Markdown documentation that accurately describes function signatures, logic flows, and edge cases, keeping the docs in perfect sync with the codebase.',
      technologies: ['LangChain', 'OpenAI', 'TypeScript', 'React', 'Python'],
      githubUrl: 'https://github.com/srikark283/doc-generator',
      category: 'web',
      features: [
        'AST Parsing with Python',
        'API documentation generation',
        'Code example creation',
        'Markdown generation'
      ],
      architectureFlow: [
        { title: 'Code Sync', description: 'Upload repo', icon: 'code', tech: 'Python Script' },
        { title: 'Parsing', description: 'Extract logic', icon: 'server', tech: 'AST / LangChain' },
        { title: 'Analysis', description: 'Understand flow', icon: 'ai', tech: 'OpenAI' },
        { title: 'Drafting', description: 'Write Markdown', icon: 'file', tech: 'LangChain' },
        { title: 'Output', description: 'Render Docs', icon: 'web', tech: 'React / Markdown' }
      ]
    },
    {
      title: 'Conversational Analytics',
      description: 'Ask questions about data in natural language.',
      longDescription: 'Bridging the gap between raw data and business decision-makers usually requires data analysts to write SQL. This platform eliminates that bottleneck by enabling Natural Language to SQL generation. The core challenge was ensuring accuracy and security. The solution involves a multi-stage validation pipeline that generates, sanitizes, and dry-runs SQL queries. It then dynamically selects the best visualization type for the result set, providing instant, self-serve business intelligence.',
      technologies: ['LangChain', 'Postgres', 'Gemini', 'Chart.js', 'Python', 'Embedding Models'],
      githubUrl: 'https://github.com/srikark283/conversational-analytics',
      category: 'llm',
      features: [
        'Text-to-SQL conversion',
        'Safe Query Execution',
        'Automatic Visualization',
        'Insight extraction'
      ],
      architectureFlow: [
        { title: 'Query', description: 'User question', icon: 'user', tech: 'React UI' },
        { title: 'SQL Gen', description: 'Write SQL', icon: 'ai', tech: 'Gemini' },
        { title: 'Validator', description: 'Check safety', icon: 'check', tech: 'LangChain' },
        { title: 'Execution', description: 'Run Query', icon: 'db', tech: 'Postgres' },
        { title: 'Visualization', description: 'Render Chart', icon: 'chart', tech: 'Chart.js' }
      ]
    },
  ]

  const categoryIcons = {
    llm: <Sparkles className="w-5 h-5" />,
    genai: <Zap className="w-5 h-5" />,
    web: <Code className="w-5 h-5" />,
    other: <Code className="w-5 h-5" />,
  }

  return (
    <section id="projects" ref={ref} className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[1px] bg-primary-500" />
            <span className="text-primary-400 font-mono text-sm tracking-widest uppercase">My Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="text-gray-500">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            A selection of AI systems and data pipelines I've engineered. 
            Focusing on scalability, reliability, and business impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedProject(project)
                setIsModalOpen(true)
              }}
              className={`group cursor-pointer relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/20 flex flex-col`}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/5 rounded-lg text-primary-400 group-hover:text-white group-hover:bg-primary-600 transition-colors">
                      {categoryIcons[project.category]}
                    </div>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <div className="mb-auto">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Footer / Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] font-mono text-gray-400 px-2 py-1 rounded bg-black/30 border border-white/5">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] font-mono text-gray-500 px-2 py-1">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default Projects