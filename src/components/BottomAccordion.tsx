import { motion } from 'framer-motion';
import { SECTIONS } from '../lib/constants';
import { useAnimationStore } from '../lib/store';
import { cn } from '../lib/utils';

export default function BottomAccordion() {
  const { activeIndex, setActiveIndex } = useAnimationStore();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t border-white/10"
    >
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {SECTIONS.map((section, index) => (
          <motion.button
            key={section.name}
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeIndex === index 
                ? "bg-white text-black" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            {section.name}
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
}