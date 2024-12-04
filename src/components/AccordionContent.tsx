import { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '../lib/constants';
import { useAnimationStore } from '../lib/store';
import AccordionInfoPanel from './AccordionInfoPanel';
import { contentVariants, accordionItemVariants } from '../lib/animations';
import { logger } from '../lib/logger';

export default function AccordionContent() {
  const { 
    activeIndex, 
    setActiveIndex,
    isAnimating,
    setIsAnimating
  } = useAnimationStore();

  const handleSectionClick = useCallback((index: number) => {
    if (isAnimating) return;

    logger.debug('AccordionContent', `Section clicked: ${index}`);
    setIsAnimating(true);
    setActiveIndex(index === activeIndex ? -1 : index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, [activeIndex, setActiveIndex, isAnimating, setIsAnimating]);

  const renderSection = useMemo(() => (section: typeof SECTIONS[0], index: number) => {
    const isActive = index === activeIndex;

    return (
      <motion.div
        key={section.name}
        className={`flex flex-col cursor-pointer group transition-colors border-b border-white/10
          ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
        onClick={() => handleSectionClick(index)}
        variants={accordionItemVariants}
        animate={isActive ? "expanded" : "collapsed"}
        layout
      >
        {/* Title Bar */}
        <motion.div 
          className="h-14 flex items-center px-6"
          layoutId={`title-${index}`}
        >
          <span className="opacity-50 group-hover:opacity-100 transition-opacity text-sm mr-4">
            0{index + 1}
          </span>
          <span className="font-medium tracking-wide">{section.name}</span>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div 
              className="relative overflow-hidden"
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
            >
              <div className="px-6 pb-8">
                <AccordionInfoPanel section={section} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }, [activeIndex, handleSectionClick, setIsAnimating]);

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="flex flex-col">
        {SECTIONS.map(renderSection)}
      </div>
    </div>
  );
}