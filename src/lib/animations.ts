import type { Variants } from 'framer-motion';

export const sectionVariants: Variants = {
  initial: (custom: { width: string; right: number; direction: number }) => ({
    width: custom.width,
    right: custom.right,
    left: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      opacity: {
        duration: 0.2,
        ease: 'linear'
      }
    }
  }),
  active: (custom: { width: string; right: number; direction: number }) => ({
    width: custom.width,
    right: custom.right,
    left: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      opacity: {
        duration: 0.2,
        ease: 'linear'
      }
    }
  }),
  previous: (custom: { left: number; direction: number }) => ({
    width: "64px",
    right: 'auto',
    left: custom.left,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      opacity: {
        duration: 0.2,
        ease: 'linear'
      }
    }
  })
};

export const contentVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      opacity: {
        duration: 0.2,
        ease: 'linear'
      }
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.32, 0.72, 0, 1],
      opacity: {
        duration: 0.15,
        ease: 'linear'
      }
    }
  })
};