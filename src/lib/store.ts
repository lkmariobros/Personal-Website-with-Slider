import { create } from 'zustand';

interface AnimationState {
  activeIndex: number;
  isAnimating: boolean;
  lastTransitionTime: number;
  isScrollLocked: boolean;
  error: Error | null;
  handleScroll: (delta: number) => void;
  setActiveIndex: (index: number) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setError: (error: Error | null) => void;
  resetState: () => void;
}

interface AccordionState {
  activeSection: number;
  setActiveSection: (index: number) => void;
}

export const useAnimationStore = create<AnimationState>((set, get) => ({
  activeIndex: -1,
  isAnimating: false,
  lastTransitionTime: 0,
  isScrollLocked: false,
  error: null,
  
  handleScroll: (delta: number) => {
    const state = get();
    if (state.isScrollLocked || state.isAnimating) return;
    
    const now = Date.now();
    if (now - state.lastTransitionTime < 1000) return;
    
    const direction = delta > 0 ? 1 : -1;
    const nextIndex = state.activeIndex + direction;
    
    if (nextIndex >= -1 && nextIndex <= 3) {
      set({ 
        activeIndex: nextIndex,
        lastTransitionTime: now,
        isAnimating: true 
      });
      
      setTimeout(() => {
        set({ isAnimating: false });
      }, 400);
    }
  },
  setActiveIndex: (index) => set({ 
    activeIndex: index,
    lastTransitionTime: Date.now() 
  }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setError: (error) => set({ error }),
  
  resetState: () => set({
    activeIndex: -1,
    isAnimating: false,
    lastTransitionTime: 0,
    isScrollLocked: false,
    error: null
  })
}));

export const useAccordionStore = create<AccordionState>((set) => ({
  activeSection: -1,
  setActiveSection: (index) => set({ activeSection: index }),
}));