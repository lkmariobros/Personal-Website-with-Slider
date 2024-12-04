import { memo } from 'react';
import { motion } from 'framer-motion';

interface SectionLabelProps {
  name: string;
  index: number;
  isActive: boolean;
  isPrevious: boolean;
  direction: number;
}

const SectionLabel = memo(function SectionLabel({ 
  name, 
  index, 
  isActive, 
  isPrevious 
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
            opacity: isPrevious ? 0.3 : 1,
            transition: {
              duration: 0.4,
              ease: [0.32, 0.72, 0, 1]
            }
          }}
        >
          <span className="font-medium text-sm">
            {name}
          </span>
        </motion.div>
      </div>
      <div className="flex justify-center mt-auto">
        <motion.span 
          className={`text-[11px] font-medium transform -rotate-90 ${
            isPrevious ? 'text-white/20' : 'text-white/40'
          }`}
          initial={false}
          animate={{ 
            opacity: isPrevious ? 0.2 : 0.4,
            transition: {
              duration: 0.4,
              ease: [0.32, 0.72, 0, 1]
            }
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>
    </motion.div>
  );
});

export default SectionLabel;