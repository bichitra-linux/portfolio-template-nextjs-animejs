'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import { Button } from '@/components/ui/Button';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  ctaButtons?: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  }>;
  socialLinks?: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  avatar?: string;
}

/**
 * HeroSection Component
 * 
 * Main hero section with animated gradient background and typing effect.
 * 
 * @example
 * ```tsx
 * <HeroSection
 *   name="John Doe"
 *   title="Full Stack Developer"
 *   description="Building amazing web experiences"
 * />
 * ```
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  title,
  subtitle,
  description,
  ctaButtons = [],
  socialLinks = [],
  avatar,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero elements on mount
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
    });

    timeline
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
      })
      .add({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
      }, '-=600')
      .add({
        targets: ctaRef.current?.children,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: anime.stagger(100),
      }, '-=400');

    // Animate gradient background
    anime({
      targets: heroRef.current?.querySelector(`.${styles.gradientOverlay}`),
      opacity: [0, 1],
      duration: 2000,
      easing: 'linear',
    });
  }, []);

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" ref={heroRef} className={styles.hero}>
      {/* Animated gradient background */}
      <div className={styles.gradientOverlay}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Avatar */}
          {avatar && (
            <div className={styles.avatarContainer}>
              <Image 
                src={avatar} 
                alt={name} 
                width={200} 
                height={200} 
                className={styles.avatar}
                priority
              />
              <div className={styles.avatarBorder}></div>
            </div>
          )}

          {/* Title */}
          <h1 ref={titleRef} className={styles.title}>
            Hi, I'm <span className={styles.highlight}>{name}</span>
          </h1>

          {/* Subtitle with typing effect */}
          <p ref={subtitleRef} className={styles.subtitle}>
            {title}
            <span className={styles.typingCursor}>|</span>
          </p>

          {/* Secondary subtitle if provided */}
          {subtitle && (
            <p className={styles.secondarySubtitle}>{subtitle}</p>
          )}

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* CTA Buttons */}
          {ctaButtons.length > 0 && (
            <div ref={ctaRef} className={styles.ctaButtons}>
              {ctaButtons.map((button, index) => (
                <Button
                  key={index}
                  as="a"
                  href={button.href}
                  variant={button.variant || 'primary'}
                  size="large"
                  onClick={button.href.startsWith('#') ? handleScrollToContact : undefined}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.mouse}>
            <div className={styles.mouseWheel}></div>
          </div>
          <span className={styles.scrollText}>Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
