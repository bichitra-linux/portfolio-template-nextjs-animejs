'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import styles from './AboutSection.module.css';

interface AboutSectionProps {
  title?: string;
  description: string[];
  stats?: Array<{
    value: string;
    label: string;
    suffix?: string;
  }>;
  image?: string;
  skills?: string[];
}

/**
 * AboutSection Component
 * 
 * About section with two-column layout, stats, and skill tags.
 * 
 * @example
 * ```tsx
 * <AboutSection
 *   description={["I'm a passionate developer...", "I love creating..."]}
 *   stats={[{ value: "5", label: "Years Experience", suffix: "+" }]}
 *   image="/about.jpg"
 * />
 * ```
 */
export const AboutSection: React.FC<AboutSectionProps> = ({
  title = 'About Me',
  description,
  stats = [],
  image,
  skills = [],
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
                targets: sectionRef.current?.querySelectorAll(`.${styles.stat}`),
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 600,
                delay: anime.stagger(100),
              }, '-=400')
              .add({
                targets: sectionRef.current?.querySelector(`.${styles.image}`),
                opacity: [0, 1],
                scale: [0.95, 1],
                duration: 800,
              }, '-=600')
              .add({
                targets: sectionRef.current?.querySelectorAll(`.${styles.bio} p`),
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                delay: anime.stagger(100),
              }, '-=600');

            // Animate stat numbers
            if (stats.length > 0) {
              stats.forEach((stat, index) => {
                const statElement = sectionRef.current?.querySelectorAll(`.${styles.statValue}`)[index];
                const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
                
                if (statElement && !isNaN(numericValue)) {
                  anime({
                    targets: { value: 0 },
                    value: numericValue,
                    duration: 2000,
                    easing: 'easeOutExpo',
                    round: 1,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    update: function(anim: any) {
                      const currentValue = Math.round(anim.animations[0].currentValue as unknown as number);
                      statElement.textContent = currentValue + (stat.suffix || '');
                    },
                  });
                }
              });
            }
          }
        });
      },
      { threshold: 0.2 }
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
  }, [stats]);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>{title}</h2>

        {/* Stats */}
        {stats.length > 0 && (
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Bio Text */}
          <div className={styles.bio}>
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Skill Tags */}
            {skills.length > 0 && (
              <div className={styles.skillTags}>
                {skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className={styles.imageContainer}>
              <div className={styles.imageDecorator}></div>
              <Image 
                src={image} 
                alt="About" 
                width={600} 
                height={600} 
                className={styles.image}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
