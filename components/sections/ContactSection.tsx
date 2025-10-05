'use client';

import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Button } from '@/components/ui/Button';
import styles from './ContactSection.module.css';

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo[];
  socialLinks?: SocialLink[];
  onSubmit?: (data: FormData) => Promise<void>;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * ContactSection Component
 * 
 * Contact form with validation, contact information, and social links.
 * 
 * @example
 * ```tsx
 * <ContactSection
 *   contactInfo={[
 *     { icon: <EmailIcon />, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" }
 *   ]}
 *   onSubmit={async (data) => { await sendEmail(data); }}
 * />
 * ```
 */
export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Get In Touch",
  subtitle = "Have a project in mind? Let's work together!",
  contactInfo = [],
  socialLinks = [],
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
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
                targets: sectionRef.current?.querySelector(`.${styles.subtitle}`),
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
              }, '-=400')
              .add({
                targets: sectionRef.current?.querySelector(`.${styles.contactInfo}`),
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 600,
              }, '-=400')
              .add({
                targets: sectionRef.current?.querySelector(`.${styles.form}`),
                opacity: [0, 1],
                translateX: [30, 0],
                duration: 600,
              }, '-=600');
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

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch {
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      {/* Animated gradient background */}
      <div className={styles.gradientOverlay}></div>

      <div className={styles.container}>
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.contentGrid}>
          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <h3 className={styles.infoTitle}>Contact Information</h3>
            
            {contactInfo.map((info, index) => (
              <div key={index} className={styles.infoItem}>
                <div className={styles.infoIcon}>{info.icon}</div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>{info.label}</div>
                  {info.href ? (
                    <a href={info.href} className={styles.infoValue}>
                      {info.value}
                    </a>
                  ) : (
                    <div className={styles.infoValue}>{info.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                <h4 className={styles.socialTitle}>Follow Me</h4>
                <div className={styles.socialIcons}>
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
              </div>
            )}
          </div>

          {/* Contact Form */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Name Field */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                placeholder="Your name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
              )}
            </div>

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
              )}
            </div>

            {/* Subject Field */}
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`${styles.input} ${errors.subject ? styles.error : ''}`}
                placeholder="What's this about?"
                disabled={isSubmitting}
              />
              {errors.subject && (
                <span className={styles.errorMessage}>{errors.subject}</span>
              )}
            </div>

            {/* Message Field */}
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                placeholder="Your message..."
                rows={6}
                disabled={isSubmitting}
              />
              {errors.message && (
                <span className={styles.errorMessage}>{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className={styles.errorMessageBox}>
                ✗ Failed to send message. Please try again or email me directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
