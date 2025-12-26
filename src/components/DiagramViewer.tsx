import { useEffect, useRef, useState } from 'react'
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DiagramViewerProps {
  diagramCode: string
  title: string
  type?: 'architecture' | 'flowchart' // Optional, reserved for future use
}

const DiagramViewer = ({ diagramCode, title }: DiagramViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const mermaidNodeRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    const renderDiagram = async () => {
      if (!diagramRef.current || !diagramCode) {
        setIsLoaded(true)
        return
      }

      try {
        setIsLoaded(false)
        setHasError(false)
        setErrorMessage('')
        
        // Clean up previous mermaid node if it exists
        if (mermaidNodeRef.current && diagramRef.current.contains(mermaidNodeRef.current)) {
          try {
            diagramRef.current.removeChild(mermaidNodeRef.current)
          } catch (e) {
            // Node might already be removed, ignore
          }
        }
        mermaidNodeRef.current = null

        const mermaid = (await import('mermaid')).default

        if (!isMounted) return

        // Initialize Mermaid with better configuration
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
            fontSize: '18px', // Larger font size
            fontFamily: 'Inter, sans-serif',
          },
          flowchart: {
            useMaxWidth: false, // Don't constrain width
            htmlLabels: true,
            curve: 'basis',
            padding: 20, // More padding
            nodeSpacing: 80, // More spacing between nodes
            rankSpacing: 100, // More spacing between ranks
            diagramPadding: 40, // More diagram padding
          },
        })

        if (!isMounted || !diagramRef.current) return

        // Create diagram element
        const diagramDiv = document.createElement('div')
        diagramDiv.className = 'mermaid-diagram'
        diagramDiv.textContent = diagramCode
        mermaidNodeRef.current = diagramDiv
        
        if (diagramRef.current) {
          diagramRef.current.appendChild(diagramDiv)
        }

        if (!isMounted) return

        // Render the diagram
        await mermaid.run({ nodes: [diagramDiv] })
        
        if (!isMounted) return
        
        setIsLoaded(true)

        // Auto-fit the diagram
        setTimeout(() => {
          if (!isMounted || !diagramRef.current || !containerRef.current) return
          const svg = diagramRef.current.querySelector('svg')
          if (svg && containerRef.current) {
            const containerWidth = containerRef.current.clientWidth
            const svgWidth = svg.getBBox().width
            if (svgWidth > containerWidth) {
              const autoScale = containerWidth / svgWidth
              setScale(Math.min(autoScale, 1))
            }
          }
        }, 100)
      } catch (error) {
        console.error('Error rendering diagram:', error)
        if (isMounted) {
          setIsLoaded(true)
          setHasError(true)
          setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
        }
      }
    }

    renderDiagram()

    // Cleanup function
    return () => {
      isMounted = false
      // Clean up mermaid node if component unmounts
      if (mermaidNodeRef.current && diagramRef.current && diagramRef.current.contains(mermaidNodeRef.current)) {
        try {
          diagramRef.current.removeChild(mermaidNodeRef.current)
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      mermaidNodeRef.current = null
    }
  }, [diagramCode])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setScale(1)
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0
      containerRef.current.scrollTop = 0
    }
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true)
    } else {
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isFullscreen])

  const diagramContent = (
    <div className="relative w-full">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <motion.button
          onClick={handleZoomOut}
          className="p-2 glass rounded-lg text-gray-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={handleZoomIn}
          className="p-2 glass rounded-lg text-gray-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={handleReset}
          className="p-2 glass rounded-lg text-gray-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Reset Zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={toggleFullscreen}
          className="p-2 glass rounded-lg text-gray-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Diagram Container */}
      <div
        ref={containerRef}
        className="diagram-container w-full overflow-auto bg-gray-900/50 rounded-lg border border-white/10"
        style={{
          maxHeight: isFullscreen ? '90vh' : '600px',
          minHeight: isFullscreen ? '90vh' : '400px',
        }}
      >
        <div
          ref={diagramRef}
          className="flex items-center justify-center p-8 min-h-[400px]"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            minWidth: `${100 / scale}%`,
          }}
        >
          {!isLoaded && !hasError && (
            <div className="text-gray-400 text-center py-20 w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
              <p>Loading diagram...</p>
            </div>
          )}
          {hasError && (
            <div className="text-red-400 text-center py-20 px-4 w-full">
              <p className="mb-2 font-semibold">Error loading diagram</p>
              <p className="text-sm text-gray-500">{errorMessage || 'Unknown error'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Zoom indicator */}
      {scale !== 1 && (
        <div className="absolute bottom-4 left-4 px-3 py-1 glass rounded-lg text-xs text-gray-300">
          {Math.round(scale * 100)}%
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Regular view */}
      {!isFullscreen && diagramContent}

      {/* Fullscreen view */}
      <AnimatePresence>
        {isFullscreen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleFullscreen}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-8 lg:inset-12 z-[70]"
            >
              <div className="glass-strong rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                  <motion.button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="flex-1 overflow-hidden relative min-h-0">{diagramContent}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default DiagramViewer

