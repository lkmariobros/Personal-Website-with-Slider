import { motion, AnimatePresence } from 'framer-motion';
import { useAccordion } from './AccordionContext';
import type { NavItem } from '../../lib/types';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';

type AccordionSectionProps = {
  section: NavItem;
  index: number;
};

const AccordionSection = memo(function AccordionSection({ section, index }: AccordionSectionProps) {
  const { activeIndex, handleSectionClick } = useAccordion();
  const isActive = activeIndex === index;

  return (
    <motion.div
      layout
      className={`
        relative border-t border-white/10 cursor-pointer
        transition-colors duration-200
        ${isActive ? 'bg-purple-950/30' : 'hover:bg-purple-950/10'}
      `}
      initial={false}
      animate={{
        height: isActive ? 'auto' : '64px'
      }}
      transition={{
        height: {
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1]
        }
      }}
      onClick={() => handleSectionClick(index)}
    >
      {/* Section Label - Always visible */}
      <div className="h-16 flex items-center px-6 gap-4">
        <span className="text-sm text-white/50">0{index + 1}</span>
        <span className="font-medium">{section.name}</span>
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="sync">
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              opacity: { duration: 0.2 },
              height: { duration: 0.3 }
            }}
            className="overflow-hidden will-change-[height]"
          >
            <div className="px-6 pb-6 space-y-4">
              <p className="text-white/80 leading-relaxed">
                {section.content}
              </p>
              <button className="group flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors">
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default AccordionSection;