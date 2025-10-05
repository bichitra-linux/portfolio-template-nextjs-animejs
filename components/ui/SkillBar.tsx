'use client';

import React, { HTMLAttributes, forwardRef, useEffect, useRef, useState } from 'react';
import styles from './SkillBar.module.css';

// SkillBar color variants
type SkillBarVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gradient' | 'gradientReverse';
type SkillBarSize = 'thin' | 'medium' | 'thick' | 'extraThick';

// SkillBar props
export interface SkillBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Name of the skill */
  name: string;
  /** Skill level (0-100) */
  level: number;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Optional description */
  description?: string;
  /** Optional tags */
  tags?: string[];
  /** Color variant */
  variant?: SkillBarVariant;
  /** Size variant */
  size?: SkillBarSize;
  /** Show percentage inside the bar */
  showInnerLabel?: boolean;
  /** Striped pattern */
  striped?: boolean;
  /** Animated stripes */
  animatedStripes?: boolean;
  /** Glow effect */
  glow?: boolean;
  /** Horizontal layout */
  horizontal?: boolean;
  /** Compact variant */
  compact?: boolean;
  /** Interactive hover effect */
  interactive?: boolean;
  /** Years of experience badge */
  yearsOfExperience?: number;
  /** Certified badge */
  certified?: boolean;
  /** Custom format for level display */
  formatLevel?: (level: number) => string;
  /** Animate on mount */
  animate?: boolean;
}

/**
 * SkillBar Component
 * 
 * An animated progress bar for displaying skill levels.
 * 
 * @example
 * ```tsx
 * <SkillBar
 *   name="React"
 *   level={90}
 *   icon={<ReactIcon />}
 *   description="Advanced React development"
 *   tags={['Hooks', 'Context', 'SSR']}
 *   yearsOfExperience={5}
 *   certified
 * />
 * ```
 */
export const SkillBar = forwardRef<HTMLDivElement, SkillBarProps>(
  (
    {
      name,
      level,
      icon,
      description,
      tags,
      variant = 'gradient',
      size = 'medium',
      showInnerLabel = false,
      striped = false,
      animatedStripes = false,
      glow = false,
      horizontal = false,
      compact = false,
      interactive = false,
      yearsOfExperience,
      certified = false,
      formatLevel = (level) => `${level}%`,
      animate = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [animatedLevel, setAnimatedLevel] = useState(animate ? 0 : level);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    // Clamp level between 0 and 100
    const clampedLevel = Math.max(0, Math.min(100, level));

    // Animate progress bar on mount or when in viewport
    useEffect(() => {
      if (!animate || hasAnimated.current) {
        setAnimatedLevel(clampedLevel);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated.current) {
              hasAnimated.current = true;
              setTimeout(() => {
                setAnimatedLevel(clampedLevel);
              }, 100);
            }
          });
        },
        { threshold: 0.1 }
      );

      const currentRef = progressBarRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [animate, clampedLevel]);

    const containerClassNames = [
      styles.skillBar,
      showInnerLabel && styles.withInnerLabel,
      horizontal && styles.horizontal,
      compact && styles.compact,
      interactive && styles.interactive,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const progressBarClassNames = [
      styles.progressBar,
      size !== 'medium' && styles[size],
    ]
      .filter(Boolean)
      .join(' ');

    const progressFillClassNames = [
      styles.progressFill,
      styles[variant],
      striped && styles.striped,
      animatedStripes && styles.animated,
      glow && styles.glow,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClassNames} {...props}>
        {/* Skill Header */}
        <div className={styles.skillHeader}>
          <div className={styles.skillName}>
            {icon && <span className={styles.skillIcon}>{icon}</span>}
            <span>{name}</span>
            {certified && <span className={styles.certified} />}
            {yearsOfExperience !== undefined && (
              <span className={styles.experienceBadge}>
                {yearsOfExperience}y
              </span>
            )}
          </div>
          {!showInnerLabel && (
            <span className={styles.skillLevel}>{formatLevel(clampedLevel)}</span>
          )}
        </div>

        {/* Progress Bar */}
        <div ref={progressBarRef} className={progressBarClassNames}>
          <div
            className={progressFillClassNames}
            style={{ width: `${animatedLevel}%` }}
            role="progressbar"
            aria-valuenow={clampedLevel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${name} skill level: ${clampedLevel}%`}
          >
            {showInnerLabel && (
              <span className={styles.innerLabel}>{formatLevel(clampedLevel)}</span>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className={styles.skillDescription}>{description}</p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className={styles.skillTags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.skillTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SkillBar.displayName = 'SkillBar';

/**
 * SkillGroup Component
 * 
 * Groups multiple skill bars with a title.
 * 
 * @example
 * ```tsx
 * <SkillGroup title="Frontend Development">
 *   <SkillBar name="React" level={90} />
 *   <SkillBar name="TypeScript" level={85} />
 * </SkillGroup>
 * ```
 */
interface SkillGroupProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const SkillGroup = forwardRef<HTMLDivElement, SkillGroupProps>(
  ({ title, className = '', children, ...props }, ref) => {
    const classNames = `${styles.skillGroup} ${className}`.trim();

    return (
      <div ref={ref} className={classNames} {...props}>
        <h3 className={styles.skillGroupTitle}>{title}</h3>
        {children}
      </div>
    );
  }
);

SkillGroup.displayName = 'SkillGroup';

/**
 * SkillBarList Component
 * 
 * Container for multiple skill bars with consistent spacing.
 * 
 * @example
 * ```tsx
 * <SkillBarList compact>
 *   <SkillBar name="JavaScript" level={95} />
 *   <SkillBar name="Python" level={80} />
 *   <SkillBar name="Java" level={75} />
 * </SkillBarList>
 * ```
 */
interface SkillBarListProps extends HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
}

export const SkillBarList = forwardRef<HTMLDivElement, SkillBarListProps>(
  ({ compact = false, className = '', children, ...props }, ref) => {
    const classNames = [
      styles.skillBarList,
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

SkillBarList.displayName = 'SkillBarList';

export default SkillBar;
