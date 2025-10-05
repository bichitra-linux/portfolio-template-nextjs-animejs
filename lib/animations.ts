import anime, { AnimeParams } from 'animejs';
import { AnimationConfig } from '@/types';

// Animation configuration constants
export const ANIMATION_DURATION = {
  FAST: 300,
  BASE: 800,
  SLOW: 1000,
  SLOWER: 1500,
} as const;

export const ANIMATION_EASING = {
  LINEAR: 'linear',
  EASE: 'easeInOutQuad',
  EASE_OUT: 'easeOutQuad',
  EASE_IN: 'easeInQuad',
  BOUNCE: 'easeOutBounce',
  ELASTIC: 'easeOutElastic(1, .5)',
  BACK: 'easeOutBack',
  SPRING: 'spring(1, 80, 10, 0)',
} as const;

export const STAGGER_DELAY = {
  BASE: 100,
  FAST: 50,
  SLOW: 150,
} as const;

// Default animation configuration
export const defaultConfig: AnimationConfig = {
  duration: ANIMATION_DURATION.BASE,
  easing: ANIMATION_EASING.EASE,
  delay: 0,
};

/**
 * Create a fade-in animation
 */
export const fadeIn = (
  targets: string | HTMLElement | HTMLElement[],
  config: AnimationConfig = {}
): anime.AnimeInstance => {
  return anime({
    targets,
    opacity: [0, 1],
    duration: config.duration || ANIMATION_DURATION.BASE,
    easing: config.easing || ANIMATION_EASING.EASE,
    delay: config.delay || 0,
  });
};

/**
 * Create a fade-in-up animation
 */
export const fadeInUp = (
  targets: string | HTMLElement | HTMLElement[],
  config: AnimationConfig = {}
): anime.AnimeInstance => {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: config.duration || ANIMATION_DURATION.BASE,
    easing: config.easing || ANIMATION_EASING.EASE_OUT,
    delay: config.delay || 0,
  });
};

/**
 * Create a scale-in animation
 */
export const scaleIn = (
  targets: string | HTMLElement | HTMLElement[],
  config: AnimationConfig = {}
): anime.AnimeInstance => {
  return anime({
    targets,
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: config.duration || ANIMATION_DURATION.BASE,
    easing: config.easing || ANIMATION_EASING.BACK,
    delay: config.delay || 0,
  });
};

/**
 * Create a staggered animation
 */
export const staggerAnimation = (
  targets: string | HTMLElement | HTMLElement[],
  animation: Partial<AnimeParams>,
  staggerDelay: number = STAGGER_DELAY.BASE
): anime.AnimeInstance => {
  return anime({
    targets,
    ...animation,
    delay: anime.stagger(staggerDelay),
  });
};

/**
 * Animate skill progress bars
 */
export const animateSkillBar = (
  target: string | HTMLElement,
  percentage: number,
  config: AnimationConfig = {}
): anime.AnimeInstance => {
  return anime({
    targets: target,
    width: `${percentage}%`,
    duration: config.duration || ANIMATION_DURATION.SLOW,
    easing: config.easing || ANIMATION_EASING.EASE_OUT,
    delay: config.delay || 0,
  });
};

/**
 * Animate counter (numbers counting up)
 */
export const animateCounter = (
  element: HTMLElement,
  targetValue: number,
  duration: number = ANIMATION_DURATION.SLOW
): void => {
  const obj = { value: 0 };
  
  anime({
    targets: obj,
    value: targetValue,
    duration,
    easing: ANIMATION_EASING.EASE_OUT,
    round: 1,
    update: () => {
      element.textContent = Math.round(obj.value).toString();
    },
  });
};

/**
 * Create a typing animation effect
 */
export const typeText = (
  element: HTMLElement,
  text: string,
  speed: number = 100
): Promise<void> => {
  return new Promise((resolve) => {
    let index = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
};

/**
 * Create a timeline animation
 */
export const createTimeline = (config: AnimationConfig = {}): anime.AnimeTimelineInstance => {
  return anime.timeline({
    duration: config.duration || ANIMATION_DURATION.BASE,
    easing: config.easing || ANIMATION_EASING.EASE,
    direction: config.direction,
    loop: config.loop,
  });
};

/**
 * Animate element on hover
 */
export const hoverAnimation = (
  target: HTMLElement,
  hoverState: Partial<AnimeParams>,
  defaultState: Partial<AnimeParams>
): void => {
  target.addEventListener('mouseenter', () => {
    anime({
      targets: target,
      ...hoverState,
      duration: ANIMATION_DURATION.FAST,
      easing: ANIMATION_EASING.EASE_OUT,
    });
  });
  
  target.addEventListener('mouseleave', () => {
    anime({
      targets: target,
      ...defaultState,
      duration: ANIMATION_DURATION.FAST,
      easing: ANIMATION_EASING.EASE_OUT,
    });
  });
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get safe animation duration (respects reduced motion preference)
 */
export const getSafeDuration = (duration: number): number => {
  return prefersReducedMotion() ? 1 : duration;
};

/**
 * Get safe animation configuration
 */
export const getSafeConfig = (config: AnimationConfig): AnimationConfig => {
  if (prefersReducedMotion()) {
    return {
      ...config,
      duration: 1,
      delay: 0,
    };
  }
  return config;
};
