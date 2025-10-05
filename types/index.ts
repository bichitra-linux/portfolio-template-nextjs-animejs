// Type definitions for the resume website

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  email: string;
}

export interface Stats {
  projects: number;
  experience: number;
  clients: number;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
}

export interface ResumeData {
  personal: PersonalInfo;
  social: SocialLinks;
  stats: Stats;
  skills: Skill[];
  timeline: TimelineItem[];
  portfolio: PortfolioProject[];
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate';
  loop?: boolean | number;
}

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export type NavigationSection = 'home' | 'about' | 'skills' | 'timeline' | 'portfolio' | 'contact';
