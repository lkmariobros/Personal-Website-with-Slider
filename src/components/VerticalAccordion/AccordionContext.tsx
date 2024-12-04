import { createContext, useContext, ReactNode } from 'react';
import { useAnimationStore } from '../../lib/store';

type AccordionContextType = {
  activeIndex: number;
  isAnimating: boolean;
  handleSectionClick: (index: number) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

export function AccordionProvider({ children }: { children: ReactNode }) {
  const { 
    activeIndex, 
    setActiveIndex, 
    isAnimating, 
    setIsAnimating 
  } = useAnimationStore();

  const handleSectionClick = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index === activeIndex ? -1 : index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  return (
    <AccordionContext.Provider value={{ 
      activeIndex, 
      isAnimating,
      handleSectionClick 
    }}>
      {children}
    </AccordionContext.Provider>
  );
}

export function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }
  return context;
}