import { Variants, Target } from 'framer-motion';

type CustomTarget = Target & {
  width: string;
  transition: {
    duration: number;
    ease: [number, number, number, number];
    opacity?: {
      duration: number;
      ease: "linear";
    };
  };
};

export const sectionVariants: Variants = {
  initial: (custom: { width: string; right: number; direction: number; position: 'left' | 'right' }) => ({
    width: custom.width,
    x: custom.position === 'right' ? custom.right : -custom.right,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      opacity: {
        duration: 0.4,
        ease: "linear"
      }
    }
  }) as CustomTarget,
  enter: (custom: { width: string; right: number; direction: number; position: 'left' | 'right' }) => ({
    width: custom.width,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      opacity: {
        duration: 0.4,
        ease: "linear"
      }
    }
  }) as CustomTarget,
  exit: (custom: { left: number; direction: number; position: 'left' | 'right' }) => ({
    x: custom.position === 'right' ? custom.left : -custom.left,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      opacity: {
        duration: 0.4,
        ease: "linear"
      }
    }
  }) as CustomTarget
};

export const contentVariants: Variants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  }
};

export const accordionItemVariants: Variants = {
  collapsed: {
    width: '80px',
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  },
  expanded: {
    width: 'calc(100% - 240px)',
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  }
};