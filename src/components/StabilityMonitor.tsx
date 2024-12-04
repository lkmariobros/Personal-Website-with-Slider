import { useEffect } from 'react';
import { logger } from '../lib/logger';
import { useAnimationStore } from '../lib/store';

export default function StabilityMonitor() {
  const { error, setError } = useAnimationStore();

  // Monitor for performance issues
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    function checkPerformance(time: number) {
      frameCount++;
      
      if (time - lastTime >= 1000) {
        const fps = Math.round(frameCount * 1000 / (time - lastTime));
        
        if (fps < 30) {
          logger.warn('StabilityMonitor', `Low FPS detected: ${fps}`);
          setError(new Error('Performance issues detected'));
        }
        
        frameCount = 0;
        lastTime = time;
      }
      
      rafId = requestAnimationFrame(checkPerformance);
    }

    rafId = requestAnimationFrame(checkPerformance);

    // Monitor for memory leaks
    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const { usedJSHeapSize, jsHeapSizeLimit } = (performance as any).memory;
        const usageRatio = usedJSHeapSize / jsHeapSizeLimit;
        
        if (usageRatio > 0.9) {
          logger.warn('StabilityMonitor', 'High memory usage detected');
          setError(new Error('Memory usage is too high'));
        }
      }
    }, 5000);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(memoryInterval);
    };
  }, [setError]);

  // Only render if there's an error
  if (error) {
    return (
      <div className="fixed bottom-4 right-4 p-4 bg-red-950/80 backdrop-blur-sm rounded-lg border border-red-500/20 text-red-200 text-sm">
        Performance issue detected. Please refresh the page.
      </div>
    );
  }

  return null;
}