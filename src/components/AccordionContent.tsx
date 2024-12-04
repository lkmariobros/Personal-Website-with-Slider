import { useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '../lib/constants';
import { useAnimationStore } from '../lib/store';
import { contentVariants, accordionItemVariants } from '../lib/animations';
import type { NavItem } from '../lib/types';

// Content component for individual sections
const AccordionContent = memo(function AccordionContent({
  section,
  isActive,
  layoutId
}: {
  section: NavItem;
  isActive: boolean;
  layoutId: string;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      layoutId={layoutId}
      animate={isActive ? "enter" : "exit"}
      variants={contentVariants}
    >
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">{section.name}</h2>
        <p className="text-white/80">{section.content}</p>
      </div>
    </motion.div>
  );
});

// Main accordion component
const Accordion = () => {
  const { 
    activeIndex, 
    setActiveIndex,
    isAnimating,
    setIsAnimating
  } = useAnimationStore();

  const handleSectionClick = useCallback((index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index === activeIndex ? -1 : index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  }, [activeIndex, setActiveIndex, isAnimating, setIsAnimating]);

  const renderSection = useMemo(() => (section: NavItem, index: number) => {
    const isActive = index === activeIndex;

    return (
      <div
        key={index}
        className="relative"
        style={{
          width: isActive ? 'calc(100% - 240px)' : '80px'
        }}
      >
        <motion.div
          className="h-full"
          variants={accordionItemVariants}
          initial="collapsed"
          animate={isActive ? "expanded" : "collapsed"}
          onClick={() => handleSectionClick(index)}
        >
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <div className="px-6 pb-8">
                  <AccordionContent section={section} isActive={isActive} layoutId={`content-${index}`} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }, [activeIndex, handleSectionClick, setIsAnimating]);

  return (
    <div className="fixed inset-y-0 right-0 flex items-center">
      <div className="flex h-[85vh]">
        {SECTIONS.map(renderSection)}
      </div>
    </div>
  );
};

export { AccordionContent };
export default Accordion;