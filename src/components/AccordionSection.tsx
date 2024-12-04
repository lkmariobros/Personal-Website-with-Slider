import { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AccordionContent from './AccordionContent';
import { useAnimationStore } from '../lib/store';
import { logger } from '../lib/logger';

const accordionVariants = {
  hidden: { 
    y: "100%",
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  },
  visible: { 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      when: "beforeChildren"
    }
  },
  exit: {
    y: "100%",
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      when: "afterChildren"
    }
  }
};

const AccordionSection = memo(function AccordionSection() {
  const { activeIndex } = useAnimationStore();
  
  const handleAnimationStart = useCallback(() => {
    logger.time('AccordionSection', 'Section Animation');
  }, []);

  const handleAnimationComplete = useCallback(() => {
    logger.timeEnd('AccordionSection', 'Section Animation');
  }, []);

  return (
    <AnimatePresence mode="sync">
      {activeIndex !== -1 && (
        <motion.div 
          className="fixed inset-x-0 bottom-0 h-[85vh] z-40 bg-background/95 border-t border-white/10 backdrop-blur-xl before:absolute before:inset-0 before:bg-background/90"
          variants={accordionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          layoutId="accordion-section"
        >
          <div className="h-full relative bg-background">
            <AccordionContent />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default AccordionSection;