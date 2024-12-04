export interface NavItem {
  name: string;
  content: string;
  color: string;
}

export interface ScrollState {
  isAnimating: boolean;
  lastScrollTime: number;
  direction: number;
  touchStartY?: number;
}

export interface AnimationMetrics {
  startTime: number;
  duration: number;
  fps: number;
}

export interface SectionMetrics {
  viewTime: number;
  interactions: number;
  lastInteraction: number;
}