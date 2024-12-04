import { useEffect, useCallback } from 'react';
import { useAnimationStore } from '../lib/store';
import { logger } from '../lib/logger';

export default function ScrollManager() {
  const { handleScroll, isScrollLocked } = useAnimationStore();
  const lastTransitionTime = useAnimationStore((state) => state.lastTransitionTime);

  const onWheel = useCallback((e: WheelEvent) => {
    if (isScrollLocked) return;

    // Add cooldown period to prevent rapid transitions
    const now = Date.now();
    if (now - lastTransitionTime < 1000) return;

    // Normalize wheel delta across different browsers
    const delta = e.deltaY;
    
    // Prevent default only when we're handling the scroll
    if (Math.abs(delta) > 0) {
      e.preventDefault();
      handleScroll(delta);
      logger.debug('ScrollManager', `Scroll delta: ${delta}`);
    }
  }, [handleScroll, isScrollLocked, lastTransitionTime]);

  // Handle touch events for mobile
  const onTouchStart = useCallback((e: TouchEvent) => {
    if (isScrollLocked) return;

    // Add cooldown period to prevent rapid transitions
    const now = Date.now();
    if (now - lastTransitionTime < 1000) return;

    const touch = e.touches[0];
    if (touch) {
      const touchStart = touch.clientY;
      
      const onTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (touch) {
          const delta = touchStart - touch.clientY;
          handleScroll(delta);
        }
      };

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', onTouchMove);
      }, { once: true });
    }
  }, [handleScroll, isScrollLocked, lastTransitionTime]);

  useEffect(() => {
    // Add wheel event listener
    window.addEventListener('wheel', onWheel, { passive: false });
    // Add touch event listener
    window.addEventListener('touchstart', onTouchStart, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, [onWheel, onTouchStart]);

  return null;
}