import './index.css'
import Hero from './components/Hero'
import VerticalAccordion from './components/VerticalAccordion'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Base layers - immediately visible */}
        <div className="fixed inset-0 bg-black z-0" />
        <div className="fixed inset-0 backdrop-blur-xl z-10" />
        <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/50 via-purple-950/50 to-black opacity-90 z-20" />
        
        {/* Content layers */}
        <div className="relative z-30">
          <Hero />
          <VerticalAccordion />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App