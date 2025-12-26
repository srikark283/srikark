import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, Sparkles, Code, Zap, Eye, Network } from 'lucide-react'
import ProjectDetailModal from './ProjectDetailModal'

interface Project {
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  category: 'llm' | 'genai' | 'web' | 'other'
  featured?: boolean
  architecture?: string // Mermaid diagram code
  flowchart?: string // Mermaid flowchart code
  features?: string[]
  architectureImage?: string // URL to custom architecture image
}

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects: Project[] = [
    {
      title: 'AI Chat Assistant',
      description: 'Intelligent conversational AI with context awareness',
      longDescription: 'A sophisticated chat assistant built with OpenAI GPT-4, featuring multi-turn conversations, context retention, and personalized responses. Includes streaming responses and a beautiful, modern UI.',
      technologies: ['OpenAI API', 'React', 'TypeScript', 'Node.js', 'Express'],
      githubUrl: 'https://github.com/srikark283/langgraph_demo',
      demoUrl: 'https://yourproject1.com',
      category: 'llm',
      featured: true,
      features: [
        'Multi-turn conversation support',
        'Context retention across sessions',
        'Streaming responses',
        'Personalized user experience',
        'Modern, responsive UI'
      ],
      architecture: `graph TB
    subgraph "User Interface"
        UI[Client Application]
    end
    subgraph "Application Services"
        API[API Gateway]
        SERVICES[Core Services]
    end
    subgraph "AI Integration"
        AI[AI Services]
    end
    subgraph "Data Management"
        STORAGE[(Data Storage)]
    end
    UI --> API
    API --> SERVICES
    SERVICES --> AI
    SERVICES --> STORAGE
    AI --> SERVICES`,
      flowchart: `graph TD
    A[User Input] --> B[Process Request]
    B --> C[Generate Response]
    C --> D[Return Result]
    D --> E{More Input?}
    E -->|Yes| A
    E -->|No| F[End]`,
    },
    {
      title: 'Smart Document Analyzer',
      description: 'Extract insights from documents using AI',
      longDescription: 'An intelligent document analysis tool that uses LLMs to extract key information, summarize content, answer questions, and generate insights from PDFs and text documents.',
      technologies: ['LangChain', 'PDF Processing', 'OpenAI', 'React', 'Python'],
      githubUrl: 'https://github.com/yourusername/doc-analyzer',
      category: 'llm',
      features: [
        'PDF and text document parsing',
        'Intelligent content extraction',
        'Question-answering system',
        'Document summarization',
        'Insight generation'
      ],
      architecture: `graph TB
    subgraph "Document Input"
        DOCS[Document Sources]
    end
    subgraph "Content Processing"
        PROCESS[Content Processor]
        INDEX[Indexing Engine]
    end
    subgraph "AI Analysis"
        AI[AI Services]
    end
    subgraph "Data Storage"
        STORAGE[(Storage Layer)]
    end
    DOCS --> PROCESS
    PROCESS --> INDEX
    INDEX --> STORAGE
    STORAGE --> AI
    AI --> STORAGE`,
      flowchart: `graph TD
    A[Document Input] --> B[Process Document]
    B --> C[Index Content]
    C --> D[Store]
    E[User Query] --> F[Process Query]
    F --> G[Retrieve Context]
    G --> H[Generate Response]
    H --> I[Return Result]`,
    },
    {
      title: 'Multi-Agent AI System',
      description: 'Complex multi-agent system with LangGraph orchestration',
      longDescription: 'Build a sophisticated multi-agent system where different AI agents collaborate to solve complex tasks. Features agent orchestration, shared memory using Neo4j, task delegation, and inter-agent communication.',
      technologies: ['LangGraph', 'LangChain', 'OpenAI', 'Gemini', 'Claude', 'Neo4j', 'React'],
      category: 'llm',
      featured: true,
      features: [
        'Multi-agent orchestration',
        'Shared memory with SQLite',
        'Task delegation and routing',
        'Inter-agent communication',
        'State management'
      ],
      architecture: `graph TB
    subgraph "Orchestration"
        ORCH[Task Orchestrator]
    end
    subgraph "Specialized Agents"
        AGENTS[Agent Pool]
    end
    subgraph "Shared Memory"
        MEMORY[(Memory Store)]
    end
    subgraph "AI Models"
        MODELS[LLM Services]
    end
    ORCH --> AGENTS
    AGENTS --> MEMORY
    AGENTS --> MODELS
    MODELS --> AGENTS`,
      flowchart: `graph LR
    A[Task Input] --> B[Orchestrate]
    B --> C[Execute Agents]
    C --> D[Update State]
    D --> E[Validate]
    E --> F{Complete?}
    F -->|No| B
    F -->|Yes| G[Output]`,
    },
    {
      title: 'Graph + RAG Knowledge Base',
      description: 'Semantic search system with vector embeddings',
      longDescription: 'A production-ready RAG (Retrieval-Augmented Generation) system using embeddings and vector databases. Features document ingestion, vector storage, semantic search, and citation tracking for accurate information retrieval.',
      technologies: ['Hugging Face', 'Embedding Models', 'PostgreSQL', 'pgvector', 'Neo4j',  'LangChain', 'React'],
      category: 'llm',
      featured: true,
      features: [
        'Document ingestion and chunking',
        'Vector embeddings generation',
        'Semantic similarity search',
        'Citation tracking',
        'Context-aware responses'
      ],
      architecture: `graph TB
    subgraph "Data Ingestion"
        INPUT[Document Input]
        PROCESS[Processing Pipeline]
        STORE[Vector Storage]
    end
    subgraph "Query Processing"
        QUERY[User Query]
        SEARCH[Semantic Search]
        GENERATION[Response Generation]
        OUTPUT[Results]
    end
    INPUT --> PROCESS
    PROCESS --> STORE
    QUERY --> SEARCH
    STORE --> SEARCH
    SEARCH --> GENERATION
    GENERATION --> OUTPUT`,
      flowchart: `graph TD
    A[User Query] --> B[Process Query]
    B --> C[Search Knowledge Base]
    C --> D[Retrieve Context]
    D --> E[Generate Response]
    E --> F[Return Answer]`,
    },
    {
      title: 'Documentation Generator',
      description: 'Auto-generate documentation from code',
      longDescription: 'An intelligent tool that analyzes code and automatically generates comprehensive documentation, code examples etc. Features code analysis, example generation, and multi-language support.',
      technologies: ['LangChain', 'OpenAI', 'TypeScript', 'React', 'Node.js'],
      category: 'llm',
      features: [
        'Automatic code analysis',
        'API documentation generation',
        'Code example creation',
        'Multi-language support',
        'Markdown export'
      ],
      architecture: `graph TB
    subgraph "Source Input"
        SOURCE[Codebase]
    end
    subgraph "Code Analysis"
        ANALYZER[Code Analyzer]
    end
    subgraph "Documentation Engine"
        GENERATOR[Documentation Generator]
    end
    subgraph "Output"
        OUTPUT[Documentation]
    end
    SOURCE --> ANALYZER
    ANALYZER --> GENERATOR
    GENERATOR --> OUTPUT`,
      flowchart: `graph TD
    A[Source Code] --> B[Analyze Code]
    B --> C[Extract Structure]
    C --> D[Generate Documentation]
    D --> E[Format Output]
    E --> F[Export]`,
    },
    {
      title: 'Conversational Data Analytics',
      description: 'Ask questions about data in natural language',
      longDescription: 'A conversational data analytics platform that allows users to ask questions about their data in natural language. Features NL to query conversion, automatic data visualization, insights generation, and report creation.',
      technologies: ['LangChain', 'SQL', 'SQLite', 'PostgreSQL', 'Embedding Models', 'React', 'Chart.js'],
      category: 'llm',
      features: [
        'Natural language to SQL conversion',
        'Automatic query validation',
        'Data visualization generation',
        'Insight extraction',
        'Report generation'
      ],
      architecture: `graph TB
    subgraph "User Interface"
        UI[Dashboard]
        VIZ[Visualizations]
    end
    subgraph "Natural Language Processing"
        NLP[NL Processing]
        QUERY[Query Generation]
    end
    subgraph "Data Access"
        DATA[(Data Sources)]
    end
    subgraph "AI Services"
        AI[AI Engine]
    end
    UI --> NLP
    NLP --> QUERY
    QUERY --> AI
    AI --> DATA
    DATA --> VIZ
    VIZ --> UI`,
      flowchart: `graph TD
    A[User Question] --> B[Process Query]
    B --> C[Generate Query]
    C --> D[Execute]
    D --> E[Process Results]
    E --> F[Visualize]
    F --> G[Return Response]`,
    },
  ]

  const categoryIcons = {
    llm: <Sparkles className="w-5 h-5" />,
    genai: <Zap className="w-5 h-5" />,
    web: <Code className="w-5 h-5" />,
    other: <Code className="w-5 h-5" />,
  }

  const categoryColors = {
    llm: 'from-blue-500 to-cyan-500',
    genai: 'from-purple-500 to-pink-500',
    web: 'from-green-500 to-emerald-500',
    other: 'from-gray-500 to-gray-600',
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Projects &</span>{' '}
            <span className="text-gradient">Ideas</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Exploring the possibilities of AI through innovative projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative p-8">
                {/* Category badge and diagram indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`text-${project.category === 'llm' ? 'blue' : project.category === 'genai' ? 'purple' : 'green'}-400`}>
                      {categoryIcons[project.category]}
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wider text-${project.category === 'llm' ? 'blue' : project.category === 'genai' ? 'purple' : 'green'}-400`}>
                      {project.category === 'llm' ? 'LLM' : project.category === 'genai' ? 'GenAI' : 'Web'}
                    </span>
                  </div>
                  {(project.architecture || project.flowchart) && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-primary-500/20 border border-primary-500/30 rounded-lg">
                      <Network className="w-3 h-3 text-primary-400" />
                      <span className="text-xs text-primary-300 font-medium">Diagrams</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gradient transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {hoveredIndex === index ? project.longDescription : project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 text-gray-300 rounded-lg text-xs font-medium border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 flex-wrap">
                  <motion.button
                    onClick={() => {
                      setSelectedProject(project)
                      setIsModalOpen(true)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 rounded-lg text-sm font-medium transition-colors border border-primary-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.button>
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                      whileHover={{ x: 5 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm font-medium">Code</span>
                    </motion.a>
                  )}
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                      whileHover={{ x: 5 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-sm font-medium">Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setTimeout(() => setSelectedProject(null), 300)
        }}
      />
    </section>
  )
}

export default Projects
