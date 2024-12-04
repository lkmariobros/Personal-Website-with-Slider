import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS, SECTION_WIDTH } from '../lib/constants';
import { useAnimationStore } from '../lib/store';
import type { ScrollState } from '../lib/types';
import Section from './Section';
import { logger } from '../lib/logger';

export default function VerticalAccordion() {
  const { activeIndex, setActiveIndex, isAnimating, setIsAnimating } = useAnimationStore();
  const directionRef = useRef(0);
  
  const scrollState = useRef<ScrollState>({
    isAnimating: false,
    lastScrollTime: Date.now(),
    direction: 0
  });

  useEffect(() => {
    const handleWheel = async (e: WheelEvent) => {
      const now = Date.now();
      const isScrollingForward = e.deltaY > 0;
      const throttleTime = isScrollingForward ? 100 : 0; // Asymmetric timing

      if (
        scrollState.current.isAnimating || 
        now - scrollState.current.lastScrollTime < throttleTime || 
        isAnimating
      ) {
        e.preventDefault();
        return;
      }

      try {
        logger.time('ScrollTransition', 'Scroll transition');
        scrollState.current.isAnimating = true;
        scrollState.current.lastScrollTime = now;
        directionRef.current = isScrollingForward ? 1 : -1;

        const newIndex = Math.max(-1, Math.min(
          activeIndex + directionRef.current,
          SECTIONS.length - 1
        ));

        if (newIndex !== activeIndex) {
          setIsAnimating(true);
          setActiveIndex(newIndex);
          
          // Asymmetric animation timing
          if (isScrollingForward) {
            await new Promise(resolve => setTimeout(resolve, 700));
          } else {
            // Shorter delay for backward scrolling to prevent flash gaps
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        }
      } catch (error) {
        logger.error('VerticalAccordion', 'Scroll transition error:', error);
      } finally {
        logger.timeEnd('ScrollTransition', 'Scroll transition');
        scrollState.current.isAnimating = false;
        setIsAnimating(false);

        // Additional cleanup delay to ensure smooth transitions
        setTimeout(() => {
          if (scrollState.current.isAnimating) {
            scrollState.current.isAnimating = false;
          }
        }, 50);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      scrollState.current.touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = async (e: TouchEvent) => {
      if (!scrollState.current.touchStartY) return;

      const deltaY = scrollState.current.touchStartY - e.touches[0].clientY;
      const now = Date.now();
      const isScrollingForward = deltaY > 0;
      const throttleTime = isScrollingForward ? 100 : 0;

      if (
        scrollState.current.isAnimating || 
        now - scrollState.current.lastScrollTime < throttleTime || 
        Math.abs(deltaY) < 5
      ) {
        return;
      }

      await handleWheel({ deltaY, preventDefault: () => {} } as unknown as WheelEvent);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeIndex, setActiveIndex, isAnimating, setIsAnimating]);

  return (
    <motion.div 
      className="fixed bottom-0 right-0 w-full h-[85vh] z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          {SECTIONS.map((section, index) => (
            <Section
              key={section.name}
              section={section}
              index={index}
              activeIndex={activeIndex}
              totalSections={SECTIONS.length}
              direction={directionRef.current}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}