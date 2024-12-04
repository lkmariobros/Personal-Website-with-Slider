import { useCallback, useEffect, useRef } from 'react';
import { useAnimationStore } from './store';
import { logger } from './logger';

interface ScrollOptions {
  threshold?: number;
  throttle?: number;
}

export function useScroll({ threshold = 50, throttle = 150 }: ScrollOptions = {}) {
  const {
    activeIndex,
    isAnimating,
    handleTransition,
  } = useAnimationStore();

  const scrollRef = useRef({
    lastScrollTime: 0,
    accumulatedDelta: 0,
    isLocked: false,
    cleanup: false
  });

  // Performance monitoring
  const perfRef = useRef({
    frameCount: 0,
    lastCheck: Date.now(),
    warningThreshold: 30 // fps
  });

  const checkPerformance = useCallback(() => {
    const now = Date.now();
    const elapsed = now - perfRef.current.lastCheck;
    
    if (elapsed >= 1000) { // Check every second
      const fps = Math.round(perfRef.current.frameCount * 1000 / elapsed);
      
      if (fps < perfRef.current.warningThreshold) {
        logger.warn('useScroll', `Low FPS detected: ${fps}`);
        // Force cleanup if performance is poor
        scrollRef.current.cleanup = true;
        scrollRef.current.isLocked = false;
        scrollRef.current.accumulatedDelta = 0;
      }
      
      perfRef.current.frameCount = 0;
      perfRef.current.lastCheck = now;
    } else {
      perfRef.current.frameCount++;
    }
    
    if (!scrollRef.current.cleanup) {
      requestAnimationFrame(checkPerformance);
    }
  }, []);

  const handleScrollWithThrottle = useCallback((deltaY: number) => {
    const now = Date.now();
    
    if (scrollRef.current.cleanup || scrollRef.current.isLocked || isAnimating) {
      return;
    }

    if (now - scrollRef.current.lastScrollTime < throttle) {
      return;
    }

    scrollRef.current.accumulatedDelta += deltaY;

    if (Math.abs(scrollRef.current.accumulatedDelta) > threshold) {
      const direction = scrollRef.current.accumulatedDelta > 0 ? 1 : -1;
      const newIndex = Math.max(-1, Math.min(activeIndex + direction, 3));

      if (newIndex !== activeIndex) {
        logger.debug('useScroll', `Transitioning to section ${newIndex}`);
        scrollRef.current.isLocked = true;
        
        // Add timeout to prevent infinite hanging
        const transitionTimeout = setTimeout(() => {
          scrollRef.current.isLocked = false;
          scrollRef.current.accumulatedDelta = 0;
          logger.warn('useScroll', 'Transition timed out');
        }, 1000);
        
        handleTransition(newIndex, direction).finally(() => {
          clearTimeout(transitionTimeout);
          scrollRef.current.isLocked = false;
          scrollRef.current.accumulatedDelta = 0;
        });
      }

      scrollRef.current.accumulatedDelta = 0;
      scrollRef.current.lastScrollTime = now;
    }
  }, [activeIndex, isAnimating, handleTransition, threshold, throttle]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (scrollRef.current.cleanup) return;
    e.preventDefault();
    handleScrollWithThrottle(e.deltaY);
  }, [handleScrollWithThrottle]);

  const touchStartRef = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (scrollRef.current.cleanup) return;
    touchStartRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (scrollRef.current.cleanup || !touchStartRef.current) return;
    
    const deltaY = touchStartRef.current - e.touches[0].clientY;
    if (Math.abs(deltaY) > 5) {
      e.preventDefault();
      handleScrollWithThrottle(deltaY);
      touchStartRef.current = e.touches[0].clientY;
    }
  }, [handleScrollWithThrottle]);

  useEffect(() => {
    // Start performance monitoring
    requestAnimationFrame(checkPerformance);
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      scrollRef.current.cleanup = true;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);

      scrollRef.current = {
        lastScrollTime: 0,
        accumulatedDelta: 0,
        isLocked: false,
        cleanup: true
      };
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, checkPerformance]);
}