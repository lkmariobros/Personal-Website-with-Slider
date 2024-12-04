import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../lib/logger';
import { useAnimationStore } from '../lib/store';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isPerformanceIssue: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  private performanceCheckInterval: number | null = null;
  
  public state: State = {
    hasError: false,
    error: null,
    isPerformanceIssue: false
  };

  componentDidMount() {
    // Setup performance monitoring
    let lastTime = performance.now();
    let frames = 0;
    
    const checkPerformance = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = frames;
        if (fps < 30) { // Low FPS threshold
          this.setState({ 
            hasError: true, 
            isPerformanceIssue: true,
            error: new Error('Performance degradation detected')
          });
          logger.error('ErrorBoundary', `Low FPS detected: ${fps}`);
        }
        frames = 0;
        lastTime = currentTime;
      }
      
      this.performanceCheckInterval = requestAnimationFrame(checkPerformance);
    };
    
    this.performanceCheckInterval = requestAnimationFrame(checkPerformance);
  }

  componentWillUnmount() {
    if (this.performanceCheckInterval) {
      cancelAnimationFrame(this.performanceCheckInterval);
    }
  }

  public static getDerivedStateFromError(error: Error): State {
    logger.error('ErrorBoundary', 'Error caught in boundary:', error);
    return { hasError: true, error, isPerformanceIssue: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary', 'Component stack trace:', errorInfo.componentStack);
  }

  private handleReload = () => {
    logger.info('ErrorBoundary', 'Manual page reload triggered');
    window.location.reload();
  };

  private handleReset = () => {
    logger.info('ErrorBoundary', 'Attempting state reset');
    const store = useAnimationStore.getState();
    store.resetState();
    this.setState({ hasError: false, error: null, isPerformanceIssue: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/95 z-50">
          <div className="max-w-md p-8 rounded-xl bg-purple-950/50 backdrop-blur-xl border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-semibold text-purple-100">
                {this.state.isPerformanceIssue ? 'Performance Issue Detected' : 'Something went wrong'}
              </h2>
            </div>
            
            <p className="text-purple-200/80 mb-6">
              {this.state.isPerformanceIssue
                ? 'The application is experiencing performance issues. This might be due to heavy animations or background processes.'
                : (this.state.error?.message || 'An unexpected error occurred. Please try again.')}
            </p>
            
            <div className="space-y-3">
              <button
                className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-400 rounded-lg transition-colors text-white font-medium"
                onClick={this.handleReset}
              >
                Try Again
              </button>
              <button
                className="w-full px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors text-purple-200"
                onClick={this.handleReload}
              >
                Reload Page
              </button>
              {this.state.isPerformanceIssue && (
                <p className="text-sm text-purple-300/60 text-center mt-4">
                  Tip: Try closing other tabs or applications to improve performance
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}