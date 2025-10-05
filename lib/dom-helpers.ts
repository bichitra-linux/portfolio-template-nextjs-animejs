import { ScrollAnimationOptions } from '@/types';

/**
 * DOM Helper utilities for client-side operations
 */

export const $ = <T extends HTMLElement = HTMLElement>(selector: string, parent: Document | HTMLElement = document): T | null => {
  return parent.querySelector<T>(selector);
};

export const $$ = <T extends HTMLElement = HTMLElement>(selector: string, parent: Document | HTMLElement = document): T[] => {
  return Array.from(parent.querySelectorAll<T>(selector));
};

export const addClass = (element: HTMLElement, className: string): void => {
  element.classList.add(className);
};

export const removeClass = (element: HTMLElement, className: string): void => {
  element.classList.remove(className);
};

export const toggleClass = (element: HTMLElement, className: string): void => {
  element.classList.toggle(className);
};

export const hasClass = (element: HTMLElement, className: string): boolean => {
  return element.classList.contains(className);
};

export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {}
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
};

export const scrollTo = (target: HTMLElement | string, offset: number = 0): void => {
  const element = typeof target === 'string' ? $(target) : target;
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};

export const isInViewport = (element: HTMLElement, offset: number = 0): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const getScrollProgress = (): number => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return (winScroll / height) * 100;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const createScrollObserver = (
  callback: IntersectionObserverCallback,
  options: ScrollAnimationOptions = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '0px',
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

export const waitForImages = (container: HTMLElement): Promise<void> => {
  const images = Array.from(container.getElementsByTagName('img'));
  const promises = images.map(
    (img) =>
      new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.addEventListener('load', () => resolve());
          img.addEventListener('error', () => resolve());
        }
      })
  );
  
  return Promise.all(promises).then(() => undefined);
};

export const getElementOffset = (element: HTMLElement): { top: number; left: number } => {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  };
};

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const prefersDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};
