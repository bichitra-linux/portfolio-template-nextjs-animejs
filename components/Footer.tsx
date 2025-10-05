'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './Footer.module.css';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  brandName?: string;
  tagline?: string;
  links?: {
    services?: FooterLink[];
    company?: FooterLink[];
    resources?: FooterLink[];
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  newsletter?: {
    enabled?: boolean;
    onSubscribe?: (email: string) => Promise<void>;
  };
}

/**
 * Footer Component
 * 
 * Comprehensive footer with navigation, contact info, newsletter, and social links.
 * 
 * @example
 * ```tsx
 * <Footer
 *   brandName="Portfolio"
 *   tagline="Building amazing web experiences"
 *   newsletter={{ enabled: true }}
 * />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  brandName = 'Portfolio',
  tagline = 'Building amazing web experiences',
  links = {},
  contactInfo = {},
  socialLinks = [],
  newsletter = { enabled: false },
}) => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show/hide back-to-top button based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
      return;
    }

    setNewsletterStatus('loading');

    try {
      if (newsletter.onSubscribe) {
        await newsletter.onSubscribe(email);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      
      setNewsletterStatus('success');
      setEmail('');
      
      setTimeout(() => {
        setNewsletterStatus('idle');
      }, 5000);
    } catch {
      setNewsletterStatus('error');
      setTimeout(() => {
        setNewsletterStatus('idle');
      }, 5000);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navHeight = 80;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandName}>{brandName}</span>
            </Link>
            <p className={styles.tagline}>{tagline}</p>
            
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

          {/* Services Links */}
          {links.services && links.services.length > 0 && (
            <div className={styles.linkSection}>
              <h3 className={styles.linkTitle}>Services</h3>
              <ul className={styles.linkList}>
                {links.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={styles.link}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company Links */}
          {links.company && links.company.length > 0 && (
            <div className={styles.linkSection}>
              <h3 className={styles.linkTitle}>Company</h3>
              <ul className={styles.linkList}>
                {links.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={styles.link}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources Links */}
          {links.resources && links.resources.length > 0 && (
            <div className={styles.linkSection}>
              <h3 className={styles.linkTitle}>Resources</h3>
              <ul className={styles.linkList}>
                {links.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={styles.link}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h3 className={styles.linkTitle}>Contact</h3>
            <ul className={styles.contactList}>
              {contactInfo.email && (
                <li>
                  <a href={`mailto:${contactInfo.email}`} className={styles.contactLink}>
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.phone && (
                <li>
                  <a href={`tel:${contactInfo.phone}`} className={styles.contactLink}>
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className={styles.address}>{contactInfo.address}</li>
              )}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        {newsletter.enabled && (
          <div className={styles.newsletter}>
            <h3 className={styles.newsletterTitle}>Stay Updated</h3>
            <p className={styles.newsletterSubtitle}>
              Subscribe to get the latest updates and articles
            </p>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.newsletterInput}
                disabled={newsletterStatus === 'loading'}
              />
              <Button
                type="submit"
                variant="primary"
                loading={newsletterStatus === 'loading'}
              >
                Subscribe
              </Button>
            </form>
            {newsletterStatus === 'success' && (
              <p className={styles.successMessage}>✓ Thanks for subscribing!</p>
            )}
            {newsletterStatus === 'error' && (
              <p className={styles.errorMessage}>✗ Please enter a valid email</p>
            )}
          </div>
        )}

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} {brandName}. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.legalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className={styles.backToTop}
          onClick={handleBackToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
