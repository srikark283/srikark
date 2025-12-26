import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, Sparkles, Code, Zap, Eye } from 'lucide-react'
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
      flowchart: `graph TD
    A[User Input] --> B[Message Processing]
    B --> C{Context Available?}
    C -->|Yes| D[Retrieve Context]
    C -->|No| E[Initialize Context]
    D --> F[Build Prompt]
    E --> F
    F --> G[OpenAI API Call]
    G --> H[Stream Response]
    H --> I[Update Context]
    I --> J[Display to User]
    J --> K{Continue?}
    K -->|Yes| A
    K -->|No| L[End]`,
    },
    // {
    //   title: 'LLM Code Generator',
    //   description: 'Generate boilerplate code using natural language',
    //   longDescription: 'An intelligent code generation tool that leverages LLMs to create boilerplate code, suggest implementations, and explain complex code patterns. Supports multiple programming languages.',
    //   technologies: ['LangChain', 'Python', 'FastAPI', 'React', 'TypeScript'],
    //   githubUrl: 'https://github.com/yourusername/code-gen',
    //   demoUrl: 'https://yourproject2.com',
    //   category: 'llm',
    //   featured: true,
    // },
    // {
    //   title: 'GenAI Content Creator',
    //   description: 'AI-powered content generation platform',
    //   longDescription: 'A comprehensive platform that uses generative AI to create blog posts, social media content, marketing copy, and more. Features customizable tone, style, and length controls.',
    //   technologies: ['GPT-3.5', 'Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI'],
    //   githubUrl: 'https://github.com/yourusername/content-creator',
    //   demoUrl: 'https://yourproject3.com',
    //   category: 'genai',
    //   featured: true,
    // },
    // {
    //   title: 'AI Image Generator',
    //   description: 'Create stunning images with AI',
    //   longDescription: 'A web application that generates high-quality images from text prompts using advanced AI models. Features image editing, style transfer, and batch generation capabilities.',
    //   technologies: ['DALL-E', 'Stable Diffusion', 'React', 'Python', 'Flask'],
    //   githubUrl: 'https://github.com/yourusername/image-gen',
    //   category: 'genai',
    // },
    {
      title: 'Smart Document Analyzer',
      description: 'Extract insights from documents using AI',
      longDescription: 'An intelligent document analysis tool that uses LLMs to extract key information, summarize content, answer questions, and generate insights from PDFs and text documents.',
      technologies: ['LangChain', 'PDF Processing', 'OpenAI', 'React', 'Python'],
      githubUrl: 'https://github.com/yourusername/doc-analyzer',
      category: 'llm',
    },
    // {
    //   title: 'AI-Powered Resume Builder',
    //   description: 'Build professional resumes with AI assistance',
    //   longDescription: 'A resume builder that uses AI to suggest improvements, optimize content, and tailor resumes for specific job descriptions. Includes ATS optimization features.',
    //   technologies: ['GPT-4', 'React', 'TypeScript', 'Node.js', 'MongoDB'],
    //   githubUrl: 'https://github.com/yourusername/resume-builder',
    //   category: 'llm',
    // },
    {
      title: 'Multi-Agent AI System',
      description: 'Complex multi-agent system with LangGraph orchestration',
      longDescription: 'Build a sophisticated multi-agent system where different AI agents collaborate to solve complex tasks. Features agent orchestration, shared memory using Neo4j, task delegation, and inter-agent communication.',
      technologies: ['LangGraph', 'LangChain', 'OpenAI', 'Gemini', 'Claude', 'Neo4j', 'React'],
      category: 'llm',
      featured: true,
      features: [
        'Multi-agent orchestration',
        'Shared memory with Neo4j',
        'Task delegation and routing',
        'Inter-agent communication',
        'State management'
      ],
      architecture: `graph TB
    subgraph "Orchestrator Layer"
        O[LangGraph Orchestrator]
    end
    subgraph "Agent Layer"
        A1[Research Agent]
        A2[Analysis Agent]
        A3[Writing Agent]
        A4[Review Agent]
    end
    subgraph "Memory Layer"
        M[(Neo4j Graph DB)]
    end
    subgraph "LLM Layer"
        L1[OpenAI GPT-4]
        L2[Gemini]
        L3[Claude]
    end
    O --> A1
    O --> A2
    O --> A3
    O --> A4
    A1 --> M
    A2 --> M
    A3 --> M
    A4 --> M
    A1 --> L1
    A2 --> L2
    A3 --> L3
    A4 --> L1`,
      flowchart: `graph LR
    A[Task Input] --> B[Orchestrator]
    B --> C{Task Type?}
    C -->|Research| D[Research Agent]
    C -->|Analyze| E[Analysis Agent]
    C -->|Write| F[Writing Agent]
    D --> G[Update Memory]
    E --> G
    F --> G
    G --> H[Review Agent]
    H --> I{Approved?}
    I -->|No| B
    I -->|Yes| J[Output Result]`,
    },
    {
      title: 'RAG Knowledge Base',
      description: 'Semantic search system with vector embeddings',
      longDescription: 'A production-ready RAG (Retrieval-Augmented Generation) system using embeddings and vector databases. Features document ingestion, vector storage, semantic search, and citation tracking for accurate information retrieval.',
      technologies: ['Hugging Face', 'Embedding Models', 'PostgreSQL', 'pgvector', 'LangChain', 'React'],
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
    subgraph "Ingestion Pipeline"
        D1[Documents] --> C[Chunking]
        C --> E[Embedding Model]
        E --> V[Vector Store]
    end
    subgraph "Query Pipeline"
        Q[User Query] --> EQ[Query Embedding]
        EQ --> VS[Vector Search]
        VS --> R[Retrieved Context]
        R --> LLM[LLM Generation]
        LLM --> A[Answer with Citations]
    end
    V --> VS`,
      flowchart: `graph TD
    A[User Query] --> B[Generate Query Embedding]
    B --> C[Vector Similarity Search]
    C --> D[Retrieve Top K Chunks]
    D --> E[Build Context]
    E --> F[Generate Prompt]
    F --> G[LLM Inference]
    G --> H[Format Response]
    H --> I[Add Citations]
    I --> J[Return Answer]`,
    },
    // {
    //   title: 'AI Code Reviewer',
    //   description: 'LLM-powered code quality and security scanner',
    //   longDescription: 'An intelligent code review tool that analyzes code quality, detects security vulnerabilities, and suggests best practices. Supports multiple programming languages with detailed explanations and actionable recommendations.',
    //   technologies: ['LangChain', 'OpenAI', 'Claude', 'Python', 'React', 'TypeScript'],
    //   category: 'llm',
    // },
    // {
    //   title: 'NL to SQL Converter',
    //   description: 'Natural language database query interface',
    //   longDescription: 'A conversational interface that converts natural language queries to SQL. Features query validation, result visualization, and intelligent query explanations. Makes database access accessible to non-technical users.',
    //   technologies: ['LangChain', 'SQL', 'PostgreSQL', 'OpenAI', 'React', 'Node.js'],
    //   category: 'llm',
    // },
    // {
    //   title: 'AI Meeting Assistant',
    //   description: 'Transcribe and analyze meetings with AI',
    //   longDescription: 'An intelligent meeting assistant that transcribes audio, extracts action items, summarizes key points, and identifies speakers. Features real-time transcription, automated summaries, and action item tracking.',
    //   technologies: ['OpenAI Whisper', 'GPT-4', 'LangChain', 'React', 'Node.js'],
    //   category: 'genai',
    // },
    // {
    //   title: 'Graph-Based Recommendation Engine',
    //   description: 'Neo4j-powered AI recommendation system',
    //   longDescription: 'An intelligent recommendation engine using Neo4j graph database with LLMs for relationship analysis. Features graph traversal, personalized recommendations, and explainable AI insights based on user behavior patterns.',
    //   technologies: ['Neo4j', 'LangChain', 'Embedding Models', 'Python', 'React'],
    //   category: 'llm',
    // },
    // {
    //   title: 'Multi-Model AI Playground',
    //   description: 'Compare OpenAI, Gemini, and Claude side-by-side',
    //   longDescription: 'A comprehensive playground to compare outputs from multiple AI models simultaneously. Features parallel API calls, response comparison, cost analysis, and performance metrics to help choose the best model for each use case.',
    //   technologies: ['OpenAI API', 'Gemini API', 'Claude API', 'React', 'TypeScript'],
    //   category: 'genai',
    // },
    // {
    //   title: 'AI Data Pipeline Builder',
    //   description: 'Generate ETL pipelines from natural language',
    //   longDescription: 'An intelligent tool that generates ETL pipelines from natural language descriptions. Features automatic pipeline generation, data transformation logic, validation, and scheduling capabilities.',
    //   technologies: ['LangChain', 'Python', 'SQL', 'PostgreSQL', 'React'],
    //   category: 'llm',
    // },
    {
      title: 'API Documentation Generator',
      description: 'Auto-generate API docs and SDKs from code',
      longDescription: 'An intelligent tool that analyzes code and automatically generates comprehensive API documentation, code examples, and SDKs. Features code analysis, example generation, and multi-language SDK support.',
      technologies: ['LangChain', 'OpenAI', 'TypeScript', 'React', 'Node.js'],
      category: 'llm',
    },
    // {
    //   title: 'AI Test Case Generator',
    //   description: 'Generate unit tests and test data with AI',
    //   longDescription: 'An AI-powered tool that generates comprehensive test cases, integration tests, and test data. Features edge case detection, test data creation, coverage analysis, and supports multiple testing frameworks.',
    //   technologies: ['LangChain', 'OpenAI', 'Claude', 'Python', 'TypeScript', 'React'],
    //   category: 'llm',
    // },
    // {
    //   title: 'Semantic Code Search',
    //   description: 'Search codebases using natural language',
    //   longDescription: 'A powerful semantic search engine for codebases using embeddings and vector search. Features natural language queries, code snippet retrieval, similarity matching, and context understanding across large codebases.',
    //   technologies: ['Embedding Models', 'Vector DB', 'LangChain', 'React', 'TypeScript'],
    //   category: 'llm',
    // },
    // {
    //   title: 'Cloud Resource AI Agent',
    //   description: 'AI agent for AWS/Azure resource management',
    //   longDescription: 'An intelligent AI agent that monitors, manages, and optimizes cloud resources. Features resource monitoring, cost optimization recommendations, auto-scaling suggestions, and anomaly detection for AWS and Azure.',
    //   technologies: ['LangGraph', 'AWS SDK', 'Azure SDK', 'LangChain', 'React'],
    //   category: 'llm',
    // },
    {
      title: 'Conversational Data Analytics',
      description: 'Ask questions about data in natural language',
      longDescription: 'A conversational data analytics platform that allows users to ask questions about their data in natural language. Features NL to query conversion, automatic data visualization, insights generation, and report creation.',
      technologies: ['LangChain', 'SQL', 'PostgreSQL', 'Embedding Models', 'React', 'Chart.js'],
      category: 'llm',
    },
    // {
    //   title: 'AI Code Migration Tool',
    //   description: 'Migrate code between frameworks using AI',
    //   longDescription: 'An intelligent code migration tool that helps migrate code between frameworks and languages. Features code translation, dependency mapping, refactoring suggestions, and automated testing to ensure migration success.',
    //   technologies: ['LangChain', 'OpenAI', 'Claude', 'TypeScript', 'Python', 'React'],
    //   category: 'llm',
    // },
    // {
    //   title: 'Multi-Modal Content Analyzer',
    //   description: 'Analyze images, text, and audio together',
    //   longDescription: 'A comprehensive multi-modal content analyzer that processes images, text, and audio simultaneously. Features image analysis, text extraction, audio transcription, and cross-modal insights generation.',
    //   technologies: ['GPT-4 Vision', 'Whisper', 'Embedding Models', 'LangChain', 'React'],
    //   category: 'genai',
    // },
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
                {/* Category badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`text-${project.category === 'llm' ? 'blue' : project.category === 'genai' ? 'purple' : 'green'}-400`}>
                    {categoryIcons[project.category]}
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider text-${project.category === 'llm' ? 'blue' : project.category === 'genai' ? 'purple' : 'green'}-400`}>
                    {project.category === 'llm' ? 'LLM' : project.category === 'genai' ? 'GenAI' : 'Web'}
                  </span>
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
