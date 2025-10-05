'use client';

import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { SkillBar } from '@/components/ui/SkillBar';
import styles from './SkillsSection.module.css';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: React.ReactNode;
  description?: string;
  tags?: string[];
  yearsOfExperience?: number;
  certified?: boolean;
}

interface SkillsSectionProps {
  title?: string;
  skills: Skill[];
  categories?: string[];
}

/**
 * SkillsSection Component
 * 
 * Skills showcase with category filters and animated progress bars.
 * 
 * @example
 * ```tsx
 * <SkillsSection
 *   skills={[
 *     { name: "React", level: 90, category: "Frontend" },
 *     { name: "Node.js", level: 85, category: "Backend" }
 *   ]}
 * />
 * ```
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({
  title = 'Skills & Expertise',
  skills,
  categories,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  // Extract categories from skills if not provided
  const skillCategories = categories || [
    'All',
    ...Array.from(new Set(skills.map((skill) => skill.category))),
  ];

  // Filter skills by active category
  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

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
                targets: sectionRef.current?.querySelectorAll(`.${styles.filterButton}`),
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                delay: anime.stagger(50),
              }, '-=400');
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
  }, []);

  // Animate skill cards when category changes
  useEffect(() => {
    if (hasAnimated.current) {
      anime({
        targets: sectionRef.current?.querySelectorAll(`.${styles.skillCard}`),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        delay: anime.stagger(50),
        easing: 'easeOutQuad',
      });
    }
  }, [activeCategory]);

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div className={styles.container}>
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>{title}</h2>

        {/* Category Filters */}
        <div className={styles.filters}>
          {skillCategories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {filteredSkills.map((skill, index) => (
            <div key={index} className={styles.skillCard}>
              <SkillBar
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
                description={skill.description}
                tags={skill.tags}
                yearsOfExperience={skill.yearsOfExperience}
                certified={skill.certified}
                animate
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className={styles.emptyState}>
            <p>No skills found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
