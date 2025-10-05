'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Navigation.module.css';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#timeline', label: 'Experience' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={cn(styles.navbar, isScrolled && styles.scrolled)} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink} aria-label="Go to homepage">
            <span className={styles.brandText}>JD</span>
          </Link>
        </div>

        <button
          className={cn(styles.mobileToggle, isMobileMenuOpen && styles.active)}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-menu"
          type="button"
        >
          <span className={styles.toggleLine}></span>
          <span className={styles.toggleLine}></span>
          <span className={styles.toggleLine}></span>
        </button>

        <div id="main-menu" className={cn(styles.menu, isMobileMenuOpen && styles.active)} role="menubar">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                styles.navLink,
                activeSection === link.href.slice(1) && styles.navLinkActive
              )}
              onClick={(e) => scrollToSection(e, link.href)}
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
