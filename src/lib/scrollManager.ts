import Lenis from '@studio-freight/lenis';
import { logger } from './logger';

let lenisInstance: Lenis | null = null;
let isLocked = false;
let lastScrollTime = 0;
const SCROLL_COOLDOWN = 500; // ms between transitions

export function initScroll() {
  try {
    if (lenisInstance) return lenisInstance;

    lenisInstance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7,
      gestureOrientation: "vertical",
      normalizeWheel: true,
      smoothTouch: false,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return lenisInstance;
  } catch (error) {
    logger.error('ScrollManager', 'Failed to initialize scroll:', error);
    return null;
  }
}

export function useScrollManager() {
  function lockScroll() {
    if (!isLocked && lenisInstance) {
      lenisInstance.stop();
      isLocked = true;
      logger.debug('ScrollManager', 'Scroll locked');
    }
  }

  function unlockScroll() {
    if (isLocked && lenisInstance) {
      lenisInstance.start();
      isLocked = false;
      logger.debug('ScrollManager', 'Scroll unlocked');
    }
  }

  async function handleScrollTransition(
    activeIndex: number,
    isAnimating: boolean,
    handleTransition: (newIndex: number, direction: number) => Promise<void>
  ) {
    if (isLocked || isAnimating) {
      logger.debug('ScrollManager', 'Scroll blocked - locked or animating');
      return;
    }

    const now = Date.now();
    if (now - lastScrollTime < SCROLL_COOLDOWN) {
      logger.debug('ScrollManager', 'Scroll blocked - cooldown');
      return;
    }

    try {
      lockScroll();
      const direction = 1;
      const newIndex = Math.max(-1, Math.min(activeIndex + direction, 3));
      
      if (newIndex === activeIndex) {
        unlockScroll();
        return;
      }

      logger.debug('ScrollManager', `Transitioning to section ${newIndex}`);
      await handleTransition(newIndex, direction);
      lastScrollTime = now;
    } catch (error) {
      logger.error('ScrollManager', 'Transition error:', error);
    } finally {
      unlockScroll();
    }
  }

  // Simplified scroll listener setup
  function setupScrollListeners() {
    if (!lenisInstance) return;

    lenisInstance.on('scroll', ({ velocity }: { velocity: number }) => {
      logger.debug('ScrollManager', `Scroll velocity: ${velocity}`);
    });
  }

  // Simplified touch handling
  let touchStartY = 0;
  const TOUCH_THRESHOLD = 50;

  function handleTouchStart(e: TouchEvent) {
    if (!isLocked) {
      touchStartY = e.touches[0].clientY;
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (isLocked) return;

    const deltaY = touchStartY - e.touches[0].clientY;
    if (Math.abs(deltaY) > TOUCH_THRESHOLD) {
      e.preventDefault();
      touchStartY = e.touches[0].clientY;
    }
  }

  return {
    initScroll,
    handleScrollTransition,
    setupScrollListeners,
    handleTouchStart,
    handleTouchMove,
    lockScroll,
    unlockScroll,
  };
}