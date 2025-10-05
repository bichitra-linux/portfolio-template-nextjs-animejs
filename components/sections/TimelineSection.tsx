'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import styles from './TimelineSection.module.css';

interface TimelineItem {
  type: 'work' | 'education';
  title: string;
  organization: string;
  location?: string;
  period: string;
  current?: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
  icon?: React.ReactNode;
}

interface TimelineSectionProps {
  title?: string;
  items: TimelineItem[];
}

/**
 * TimelineSection Component
 * 
 * Timeline of work experience and education with alternating layout.
 * 
 * @example
 * ```tsx
 * <TimelineSection
 *   items={[
 *     {
 *       type: "work",
 *       title: "Senior Developer",
 *       organization: "Tech Corp",
 *       period: "2020 - Present",
 *       description: "Leading development team..."
 *     }
 *   ]}
 * />
 * ```
 */
export const TimelineSection: React.FC<TimelineSectionProps> = ({
  title = 'Experience & Education',
  items,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Animate section elements
            const timeline = anime.timeline({
              easing: 'easeOutExpo',
            });

            timeline
              .add({
                targets: sectionRef.current?.querySelector(`.${styles.sectionTitle}`),
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
              })
              .add({
                targets: sectionRef.current?.querySelector(`.${styles.timelineLine}`),
                scaleY: [0, 1],
                duration: 1200,
              }, '-=400')
              .add({
                targets: sectionRef.current?.querySelectorAll(`.${styles.timelineItem}`),
                opacity: [0, 1],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                translateX: (_el: any, i: number) => {
                  const isEven = i % 2 === 0;
                  return isEven ? [-50, 0] : [50, 0];
                },
                duration: 600,
                delay: anime.stagger(200),
              }, '-=800');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.timeline}>
      <div className={styles.container}>
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>{title}</h2>

        {/* Timeline */}
        <div className={styles.timelineContainer}>
          {/* Timeline Line */}
          <div className={styles.timelineLine}></div>

          {/* Timeline Items */}
          {items.map((item, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`${styles.timelineItem} ${
                  isLeft ? styles.left : styles.right
                }`}
              >
                {/* Timeline Icon */}
                <div className={styles.timelineIcon}>
                  {item.icon || (
                    <div className={styles.defaultIcon}>
                      {item.type === 'work' ? '💼' : '🎓'}
                    </div>
                  )}
                </div>

                {/* Timeline Content */}
                <Card className={styles.timelineCard} variant="elevated">
                  <CardHeader noBorder>
                    {/* Period Badge */}
                    <div className={styles.period}>
                      {item.period}
                      {item.current && (
                        <span className={styles.currentBadge}>Current</span>
                      )}
                    </div>
                    
                    {/* Title & Organization */}
                    <CardTitle>{item.title}</CardTitle>
                    <div className={styles.organization}>
                      {item.organization}
                      {item.location && (
                        <span className={styles.location}>• {item.location}</span>
                      )}
                    </div>
                  </CardHeader>

                  <CardBody>
                    {/* Description */}
                    <p className={styles.description}>{item.description}</p>

                    {/* Achievements */}
                    {item.achievements && item.achievements.length > 0 && (
                      <ul className={styles.achievements}>
                        {item.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className={styles.technologies}>
                        {item.technologies.map((tech, i) => (
                          <span key={i} className={styles.tech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
