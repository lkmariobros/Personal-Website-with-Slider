import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '../lib/constants';
import { useAccordionStore } from '../lib/store';

export default function AccordionContainer() {
  const { activeSection, setActiveSection } = useAccordionStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[85vh]">
      <motion.div 
        className="h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-5xl mx-auto h-full">
          {SECTIONS.map((section, index) => (
            <motion.div
              key={section.name}
              className={`
                relative border-t border-white/10 cursor-pointer
                ${activeSection === index ? 'bg-purple-950/30' : 'hover:bg-purple-950/10'}
              `}
              initial={false}
              animate={{
                height: activeSection === index ? 'auto' : '64px'
              }}
              transition={{
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1]
              }}
              onClick={() => setActiveSection(activeSection === index ? -1 : index)}
            >
              {/* Header */}
              <div className="h-16 flex items-center px-6 gap-4">
                <span className="text-sm text-white/50">{(SECTIONS.length - index).toString().padStart(2, '0')}</span>
                <span className="font-medium">{section.name}</span>
              </div>

              {/* Content */}
              <AnimatePresence>
                {activeSection === index && (
                  <motion.div
                    className="px-6 pb-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-4 space-y-6">
                      <p className="text-white/80 leading-relaxed max-w-2xl">
                        {section.content}
                      </p>
                      <div className="pt-4 border-t border-white/10">
                        <div className="grid grid-cols-2 gap-3 max-w-lg">
                          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                            Learn More
                          </button>
                          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}