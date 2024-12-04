import { memo } from 'react';
import { motion } from 'framer-motion';
import type { NavItem } from '../lib/types';
import { SECTION_WIDTH } from '../lib/constants';
import { AccordionContent } from './AccordionContent';

interface AccordionSectionProps {
  section: NavItem;
  index: number;
  totalSections: number;
  activeIndex: number | null;
  onSelect: (index: number) => void;
}

const AccordionSection = memo(function AccordionSection({
  section,
  index,
  totalSections,
  activeIndex,
  onSelect,
}: AccordionSectionProps) {
  const isActive = index === activeIndex;
  const isPrevious = activeIndex !== null && index < activeIndex;

  // Calculate position from right side
  const right = `${(totalSections - index - 1) * SECTION_WIDTH}px`;
  
  // Calculate z-index for proper layering
  const zIndex = isActive ? 30 : isPrevious ? 20 + index : 10 + (totalSections - index);

  // Calculate section number (01 for Projects on left to 04 for Contact on right)
  const sectionNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      className="absolute top-0 h-full cursor-pointer overflow-hidden transform-gpu will-change-transform"
      style={{
        zIndex,
        width: SECTION_WIDTH,
        right,
      }}
      onClick={() => onSelect(index)}
      initial={false}
      animate={{
        transition: {
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1]
        }
      }}
    >
      {/* Background overlay */}
      <motion.div
        className={`
          absolute inset-0 bg-gradient-to-b from-background/5 to-background
          ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-75'}
          transition-opacity duration-300
          backdrop-blur-xl border-l border-purple-300/10
        `}
        initial={false}
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative h-full">
        <AccordionContent
          section={section}
          isActive={isActive}
          layoutId={`accordion-${index}`}
        />
        
        {/* Section number and title */}
        <div className="absolute inset-0 flex flex-col justify-between py-12">
          <div className="flex-1 flex items-center justify-center">
            <motion.div 
              className="transform -rotate-90"
              initial={false}
              animate={{ 
                opacity: isActive ? 0 : 1,
                transition: {
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1]
                }
              }}
            >
              <span className="font-medium text-sm">
                {section.name}
              </span>
            </motion.div>
          </div>
          <div className="flex justify-center mt-auto">
            <motion.span 
              className="text-[11px] font-medium transform -rotate-90 text-white/40"
            >
              {sectionNumber}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default AccordionSection;