import { memo } from 'react';
import { motion } from 'framer-motion';
import type { NavItem } from '../lib/types';
import { SECTION_WIDTH } from '../lib/constants';
import SectionContent from './SectionContent';
import SectionLabel from './SectionLabel';

interface SectionProps {
  section: NavItem;
  index: number;
  totalSections: number;
  activeIndex: number;
  direction: number;
}

const Section = memo(function Section({
  section,
  index,
  totalSections,
  activeIndex,
  direction
}: SectionProps) {
  const isActive = index === activeIndex;
  const isPrevious = index < activeIndex;

  // Calculate position and width
  const width = isActive
    ? `calc(100% - ${(totalSections - 1) * SECTION_WIDTH}px)`
    : `${SECTION_WIDTH}px`;

  // Calculate transform based on state for right-side positioning
  const x = isActive
    ? 0
    : isPrevious
    ? -(totalSections - index - 1) * SECTION_WIDTH
    : -index * SECTION_WIDTH;

  // Dynamic z-index for proper layering
  const zIndex = isActive ? 30 : isPrevious ? 20 + index : 10 + (totalSections - index);

  return (
    <motion.div
      className="absolute top-0 right-0 h-full cursor-pointer overflow-hidden transform-gpu will-change-transform bg-background before:absolute before:inset-0 before:bg-background/90 before:backdrop-blur-sm"
      style={{ 
        zIndex,
        width,
      }}
      animate={{ 
        x,
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
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3
        }}
      />

      {/* Content wrapper with improved compositing */}
      <motion.div 
        className="absolute inset-0 overflow-hidden transform-gpu will-change-transform bg-blend-overlay"
      >
        <SectionContent
          section={section}
          isActive={isActive}
          isPrevious={isPrevious}
          isNext={index === activeIndex + 1}
          direction={direction}
          layoutId={`content-${index}`}
        />

        <SectionLabel
          section={section}
          index={index}
          isActive={isActive}
        />
      </motion.div>
    </motion.div>
  );
});

export default Section;