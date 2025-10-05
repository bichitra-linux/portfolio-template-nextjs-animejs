'use client';

import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Card, CardHeader, CardTitle, CardBody, CardImage, CardBadge, CardOverlay, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from './PortfolioSection.module.css';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
}

interface PortfolioSectionProps {
  title?: string;
  projects: Project[];
  categories?: string[];
}

/**
 * PortfolioSection Component
 * 
 * Portfolio grid with project cards, filters, and hover effects.
 * 
 * @example
 * ```tsx
 * <PortfolioSection
 *   projects={[
 *     {
 *       title: "E-commerce Platform",
 *       description: "Full-stack online store",
 *       image: "/project1.jpg",
 *       technologies: ["React", "Node.js"],
 *       category: "Web"
 *     }
 *   ]}
 * />
 * ```
 */
export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  title = 'Featured Projects',
  projects,
  categories,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  // Extract categories from projects if not provided
  const projectCategories = categories || [
    'All',
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  // Filter projects by active category
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

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

  // Animate project cards when category changes
  useEffect(() => {
    if (hasAnimated.current) {
      anime({
        targets: sectionRef.current?.querySelectorAll(`.${styles.projectCard}`),
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 400,
        delay: anime.stagger(100),
        easing: 'easeOutQuad',
      });
    }
  }, [activeCategory]);

  return (
    <section id="portfolio" ref={sectionRef} className={styles.portfolio}>
      <div className={styles.container}>
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>{title}</h2>

        {/* Category Filters */}
        <div className={styles.filters}>
          {projectCategories.map((category) => (
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

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className={styles.projectCard}
              variant="elevated"
              interactive
            >
              {/* Project Image */}
              <div className={styles.imageWrapper}>
                <CardImage src={project.image} alt={project.title} cover />
                
                {/* Featured Badge */}
                {project.featured && (
                  <CardBadge variant="primary">Featured</CardBadge>
                )}

                {/* Overlay */}
                <CardOverlay>
                  <div className={styles.overlayContent}>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                    
                    {/* Action Buttons */}
                    <div className={styles.projectActions}>
                      {project.liveUrl && (
                        <Button
                          as="a"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="small"
                        >
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          as="a"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          size="small"
                        >
                          GitHub
                        </Button>
                      )}
                      {project.caseStudyUrl && (
                        <Button
                          as="a"
                          href={project.caseStudyUrl}
                          variant="ghost"
                          size="small"
                        >
                          Case Study
                        </Button>
                      )}
                    </div>
                  </div>
                </CardOverlay>
              </div>

              {/* Project Info */}
              <CardBody>
                <CardHeader noBorder>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardDescription className={styles.projectDescription}>
                  {project.description}
                </CardDescription>

                {/* Technologies */}
                <div className={styles.technologies}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
