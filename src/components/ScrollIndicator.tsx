import { motion } from 'framer-motion';
import { useAnimationStore } from '../lib/store';
import { SECTIONS } from '../lib/constants';

export default function ScrollIndicator() {
  const { activeIndex } = useAnimationStore();

  return (
    <motion.div 
      className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {SECTIONS.map((_, index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === activeIndex 
              ? 'bg-purple-400 scale-125' 
              : 'bg-white/20 hover:bg-white/40'
          }`}
          whileHover={{ scale: 1.2 }}
        />
      ))}
    </motion.div>
  );
}