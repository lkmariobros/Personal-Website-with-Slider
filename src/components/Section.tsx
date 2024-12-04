import { memo } from 'react';
import { motion } from 'framer-motion';
import type { NavItem } from '../lib/types';
import { SECTION_WIDTH } from '../lib/constants';
import { sectionVariants } from '../lib/animations';
import SectionContent from './SectionContent';
import SectionLabel from './SectionLabel';

interface SectionProps {
  section: NavItem;
  index: number;
  activeIndex: number;
  totalSections: number;
  direction: number;
}

const Section = memo(function Section({
  section,
  index,
  activeIndex,
  totalSections,
  direction,
}: SectionProps) {
  const isActive = activeIndex === index;
  const isPrevious = index < activeIndex;
  const isInitial = activeIndex === -1;

  // Calculate position and width
  const custom = {
    width: isActive
      ? `calc(100% - ${(totalSections - 1) * SECTION_WIDTH}px)`
      : `${SECTION_WIDTH}px`,
    right: (totalSections - index - 1) * SECTION_WIDTH,
    left: index * SECTION_WIDTH,
    direction,
  };

  const variant = isInitial
    ? 'initial'
    : isActive
    ? 'active'
    : isPrevious
    ? 'previous'
    : 'initial';

  // Dynamic z-index for proper layering - higher z-index for active and transitioning sections
  const zIndex = isActive ? 30 : isPrevious ? 20 + index : 10 + (totalSections - index);

  return (
    <motion.div
      className="absolute top-0 h-full cursor-pointer overflow-hidden transform-gpu will-change-transform bg-background before:absolute before:inset-0 before:bg-background/90 before:backdrop-blur-sm"
      style={{ zIndex }}
      layoutId={`section-${index}`}
      custom={custom}
      variants={sectionVariants}
      initial="initial"
      animate={variant}
      transition={{
        layout: {
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1]
        },
        default: {
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1]
        }
      }}
    >
      {/* Animated background with improved transitions */}
      <motion.div 
        className={`
          absolute inset-0 transform-gpu will-change-transform
          ${isActive 
            ? 'bg-gradient-to-br from-indigo-950 to-purple-950' 
            : 'bg-gradient-to-br from-purple-950/95 to-black'
          }
          backdrop-blur-xl border-l border-purple-300/10
        `}
        layoutId={`bg-${index}`}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1]
        }}
      />

      {/* Content wrapper with improved compositing */}
      <motion.div 
        className="absolute inset-0 overflow-hidden transform-gpu will-change-transform bg-blend-overlay"
        layoutId={`content-container-${index}`}
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
          name={section.name}
          index={index}
          isActive={isActive}
          isPrevious={isPrevious}
          direction={direction}
        />
      </motion.div>
    </motion.div>
  );
});

export default Section;