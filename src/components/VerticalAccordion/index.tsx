import { memo } from 'react';
import { motion } from 'framer-motion';
import { SECTIONS } from '../../lib/constants';
import { AccordionProvider } from './AccordionContext';
import AccordionSection from './AccordionSection';

const VerticalAccordion = memo(function VerticalAccordion() {
  return (
    <motion.div 
      className="fixed bottom-0 right-0 w-[400px] h-[85vh] bg-black/80 backdrop-blur-xl border-l border-white/10"
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }}
    >
      <AccordionProvider>
        <div className="h-full flex flex-col justify-end">
          {SECTIONS.map((section, index) => (
            <AccordionSection
              key={section.name}
              section={section}
              index={index}
            />
          ))}
        </div>
      </AccordionProvider>
    </motion.div>
  );
});

export default VerticalAccordion;