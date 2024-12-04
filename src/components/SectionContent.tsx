import { memo } from 'react';
import { motion } from 'framer-motion';
import type { NavItem } from '../lib/types';
import { ArrowRight } from 'lucide-react';

interface SectionContentProps {
  section: NavItem;
  isActive: boolean;
  isPrevious: boolean;
  isNext: boolean;
  direction: number;
  layoutId: string;
}

const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0
  })
};

const SectionContent = memo(function SectionContent({
  section,
  isActive,
  direction,
  layoutId
}: SectionContentProps) {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 p-12 bg-gradient-to-br from-transparent to-black/30"
      layoutId={layoutId}
      variants={contentVariants}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        layout: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
      }}
    >
      <motion.div 
        className="max-w-3xl"
        layoutId={`${layoutId}-inner`}
      >
        <motion.h2 
          className="text-4xl font-bold mb-6 text-purple-50"
          layoutId={`${layoutId}-title`}
        >
          {section.name}
        </motion.h2>
        <motion.p 
          className="text-lg text-purple-200/80 leading-relaxed mb-8"
          layoutId={`${layoutId}-content`}
        >
          {section.content}
        </motion.p>
        <motion.div layoutId={`${layoutId}-button`}>
          <button className="group px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors flex items-center gap-2 text-purple-200">
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default SectionContent;