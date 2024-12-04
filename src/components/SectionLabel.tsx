import { memo } from 'react';
import { motion } from 'framer-motion';
import type { NavItem } from '../lib/types';

interface SectionLabelProps {
  section: NavItem;
  index: number;
  isActive: boolean;
}

const SectionLabel = memo(function SectionLabel({ 
  section, 
  index, 
  isActive
}: SectionLabelProps) {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col justify-between py-12"
      initial={false}
      animate={{ 
        opacity: isActive ? 0 : 1,
        transition: {
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1]
        }
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          className="transform -rotate-90"
          initial={false}
          animate={{ 
            opacity: 1,
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
          {String(4 - index).padStart(2, '0')}
        </motion.span>
      </div>
    </motion.div>
  );
});

export default SectionLabel;