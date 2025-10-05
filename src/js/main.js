// Main Application Entry Point
class ResumeApp {
    constructor() {
        this.modules = {};
        this.resumeData = null;
        this.isLoaded = false;
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            // Show preloader
            this.showPreloader();
            
            // Load resume data
            await this.loadResumeData();
            
            // Initialize modules
            await this.initializeModules();
            
            // Setup global features
            this.setupGlobalFeatures();
            
            // Setup navigation
            this.setupNavigation();
            
            // Setup portfolio
            this.setupPortfolio();
            
            // Setup contact form
            this.setupContactForm();
            
            // Setup typing animation
            this.setupTypingAnimation();
            
            // Setup counters
            this.setupCounters();
            
            // Hide preloader
            await this.hidePreloader();
            
            // Mark as loaded
            this.isLoaded = true;
            
            console.log('Resume website loaded successfully!');
            Performance.logSummary();
            
        } catch (error) {
            console.error('Application initialization failed:', error);
            this.showErrorMessage('Failed to load the website. Please refresh the page.');
        }
    }
    
    /**
     * Load resume data from JSON
     */
    async loadResumeData() {
        try {
            const response = await fetch('./data/resume-data.json');
            if (!response.ok) throw new Error('Failed to load resume data');
            this.resumeData = await response.json();
            
            // Update page title and meta description
            this.updatePageMeta();
            
        } catch (error) {
            console.error('Error loading resume data:', error);
            // Use fallback data
            this.resumeData = this.getFallbackData();
        }
    }
    
    /**
     * Initialize all modules
     */
    async initializeModules() {
        // Module initialization is handled by individual module files
        // We just need to wait for them to be ready
        
        return new Promise((resolve) => {
            const checkModules = () => {
                const requiredModules = [
                    'ScrollAnimations',
                    'SkillAnimations', 
                    'TimelineAnimations',
                    'HoverEffects'
                ];
                
                const loadedModules = requiredModules.filter(moduleName => 
                    window[moduleName.toLowerCase() + 'Instance'] || window[moduleName.toLowerCase()]
                );
                
                if (loadedModules.length === requiredModules.length) {
                    resolve();
                } else {
                    setTimeout(checkModules, 100);
                }
            };
            
            checkModules();
        });
    }
    
    /**
     * Setup global features
     */
    setupGlobalFeatures() {
        // Setup mobile navigation
        this.setupMobileNavigation();
        
        // Setup keyboard navigation
        this.setupKeyboardNavigation();
        
        // Setup reduced motion support
        this.setupReducedMotionSupport();
        
        // Setup error handling
        this.setupErrorHandling();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
    }
    
    /**
     * Update page metadata
     */
    updatePageMeta() {
        if (!this.resumeData?.personal) return;
        
        const { name, title, bio } = this.resumeData.personal;
        
        // Update title
        document.title = `${name} - ${title}`;
        
        // Update meta description
        const metaDescription = DOMHelpers.$('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', bio);
        }
        
        // Update hero content
        this.updateHeroContent();
        
        // Update about content
        this.updateAboutContent();
        
        // Update contact content
        this.updateContactContent();
    }
    
    /**
     * Update hero section content
     */
    updateHeroContent() {
        const { name, title, bio } = this.resumeData.personal;
        
        const heroTitle = DOMHelpers.$('.hero-title .typing-text');
        const heroSubtitle = DOMHelpers.$('.hero-subtitle');
        const heroDescription = DOMHelpers.$('.hero-description');
        
        if (heroTitle) heroTitle.dataset.text = name;
        if (heroSubtitle) heroSubtitle.textContent = title;
        if (heroDescription) heroDescription.textContent = bio;
    }
    
    /**
     * Update about section content
     */
    updateAboutContent() {
        const { bio, avatar } = this.resumeData.personal;
        const { projects, experience, clients } = this.resumeData.stats;
        
        // Update bio paragraphs
        const paragraphs = DOMHelpers.$$('.about-paragraph');
        if (paragraphs.length >= 2 && bio) {
            const sentences = bio.split('. ');
            const midPoint = Math.ceil(sentences.length / 2);
            
            paragraphs[0].textContent = sentences.slice(0, midPoint).join('. ') + '.';
            paragraphs[1].textContent = sentences.slice(midPoint).join('. ');
        }
        
        // Update avatar
        const aboutImage = DOMHelpers.$('.about-image img');
        if (aboutImage && avatar) {
            aboutImage.src = avatar;
            aboutImage.alt = `${this.resumeData.personal.name} Profile Picture`;
        }
        
        // Update stats
        const statNumbers = DOMHelpers.$$('.stat-number');
        if (statNumbers.length >= 3) {
            statNumbers[0].dataset.count = projects;
            statNumbers[1].dataset.count = experience;
            statNumbers[2].dataset.count = clients;
        }
        
        // Update social links
        this.updateSocialLinks();
    }
    
    /**
     * Update social links
     */
    updateSocialLinks() {
        const socialLinks = DOMHelpers.$$('.social-link');
        const socialData = this.resumeData.social;
        
        if (!socialData) return;
        
        socialLinks.forEach((link, index) => {
            const icons = ['linkedin', 'github', 'twitter', 'envelope'];
            const urls = [
                socialData.linkedin,
                socialData.github,
                socialData.twitter,
                socialData.email
            ];
            
            if (urls[index]) {
                link.href = urls[index];
            }
        });
    }
    
    /**
     * Update contact section content
     */
    updateContactContent() {
        const { email, phone, location } = this.resumeData.personal;
        
        const contactItems = DOMHelpers.$$('.contact-item p');
        if (contactItems.length >= 3) {
            if (email) contactItems[0].textContent = email;
            if (phone) contactItems[1].textContent = phone;
            if (location) contactItems[2].textContent = location;
        }
    }
    
    /**
     * Setup mobile navigation
     */
    setupMobileNavigation() {
        const navToggle = DOMHelpers.$('.nav-toggle');
        const navMenu = DOMHelpers.$('.nav-menu');
        
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', () => {
            const isActive = DOMHelpers.hasClass(navMenu, 'active');
            
            DOMHelpers.toggleClass(navToggle, 'active');
            DOMHelpers.toggleClass(navMenu, 'active');
            
            // Animate menu items
            if (!isActive) {
                this.animateMenuItems();
            }
        });
        
        // Close menu when clicking on links
        const navLinks = DOMHelpers.$$('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                DOMHelpers.removeClass(navToggle, 'active');
                DOMHelpers.removeClass(navMenu, 'active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                DOMHelpers.removeClass(navToggle, 'active');
                DOMHelpers.removeClass(navMenu, 'active');
            }
        });
    }
    
    /**
     * Animate mobile menu items
     */
    animateMenuItems() {
        const navLinks = DOMHelpers.$$('.nav-link');
        
        if (anime) {
            anime({
                targets: navLinks,
                translateX: [-50, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutExpo',
                delay: anime.stagger(100)
            });
        }
    }
    
    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip to main content
            if (e.key === 'Tab' && e.shiftKey && document.activeElement === document.body) {
                const skipLink = DOMHelpers.$('.skip-link');
                if (skipLink) {
                    skipLink.focus();
                }
            }
            
            // Navigate sections with arrow keys
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                this.navigateSections(e.key === 'ArrowDown' ? 1 : -1);
            }
            
            // Close mobile menu with Escape
            if (e.key === 'Escape') {
                const navToggle = DOMHelpers.$('.nav-toggle');
                const navMenu = DOMHelpers.$('.nav-menu');
                
                if (DOMHelpers.hasClass(navMenu, 'active')) {
                    DOMHelpers.removeClass(navToggle, 'active');
                    DOMHelpers.removeClass(navMenu, 'active');
                }
            }
        });
    }
    
    /**
     * Navigate between sections
     */
    navigateSections(direction) {
        const sections = DOMHelpers.$$('section[id]');
        const currentScroll = window.pageYOffset;
        
        let currentIndex = 0;
        
        // Find current section
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom > 100) {
                currentIndex = index;
            }
        });
        
        // Navigate to next/previous section
        const targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
        const targetSection = sections[targetIndex];
        
        if (targetSection) {
            DOMHelpers.scrollTo(targetSection, 80);
        }
    }
    
    /**
     * Setup portfolio functionality
     */
    setupPortfolio() {
        if (!this.resumeData?.portfolio) return;
        
        const portfolioGrid = DOMHelpers.$('#portfolio-grid');
        if (!portfolioGrid) return;
        
        // Clear existing content
        portfolioGrid.innerHTML = '';
        
        // Create portfolio items
        this.resumeData.portfolio.forEach((project, index) => {
            const portfolioItem = this.createPortfolioItem(project, index);
            portfolioGrid.appendChild(portfolioItem);
        });
        
        // Setup portfolio filters if needed
        this.setupPortfolioFilters();
    }
    
    /**
     * Create portfolio item
     */
    createPortfolioItem(project, index) {
        const item = DOMHelpers.createElement('div', {
            class: 'portfolio-item',
            'data-category': project.category,
            'data-index': index
        });
        
        item.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="portfolio-actions">
                        <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary">
                            <i class="fab fa-github"></i> Code
                        </a>
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${project.description}</p>
                <div class="portfolio-technologies">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
            </div>
        `;
        
        return item;
    }
    
    /**
     * Setup portfolio filters
     */
    setupPortfolioFilters() {
        // This could be extended to add filtering functionality
        // For now, we'll just ensure all items are visible
        const portfolioItems = DOMHelpers.$$('.portfolio-item');
        
        portfolioItems.forEach((item, index) => {
            // Add scroll animation
            const observer = AnimationHelpers.createScrollObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        AnimationHelpers.triggerAnimation(entry.target, 'scaleIn', {
                            delay: index * 100
                        });
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(item);
        });
    }
    
    /**
     * Setup contact form
     */
    setupContactForm() {
        const contactForm = DOMHelpers.$('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = DOMHelpers.$('button[type="submit"]', contactForm);
            const originalText = submitBtn.textContent;
            
            try {
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());
                
                // Validate form
                if (!this.validateContactForm(data)) {
                    throw new Error('Please fill in all required fields correctly.');
                }
                
                // Simulate API call (replace with actual implementation)
                await this.submitContactForm(data);
                
                // Show success message
                this.showSuccessMessage('Message sent successfully! I\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                this.showErrorMessage(error.message || 'Failed to send message. Please try again.');
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Setup floating labels
        this.setupFloatingLabels();
    }
    
    /**
     * Validate contact form
     */
    validateContactForm(data) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || data.name.length < 2) {
            this.highlightField('name', 'Name must be at least 2 characters long');
            return false;
        }
        
        if (!data.email || !emailPattern.test(data.email)) {
            this.highlightField('email', 'Please enter a valid email address');
            return false;
        }
        
        if (!data.subject || data.subject.length < 3) {
            this.highlightField('subject', 'Subject must be at least 3 characters long');
            return false;
        }
        
        if (!data.message || data.message.length < 10) {
            this.highlightField('message', 'Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }
    
    /**
     * Highlight form field with error
     */
    highlightField(fieldName, message) {
        const field = DOMHelpers.$(`#${fieldName}`);
        const formGroup = field?.closest('.form-group');
        
        if (formGroup) {
            DOMHelpers.addClass(formGroup, 'error');
            
            // Remove error class after user starts typing
            field.addEventListener('input', () => {
                DOMHelpers.removeClass(formGroup, 'error');
            }, { once: true });
        }
    }
    
    /**
     * Submit contact form (placeholder implementation)
     */
    async submitContactForm(data) {
        // This is a placeholder - replace with actual form submission logic
        return new Promise((resolve) => {
            setTimeout(resolve, 1000); // Simulate network delay
        });
    }
    
    /**
     * Setup floating labels for form inputs
     */
    setupFloatingLabels() {
        const formInputs = DOMHelpers.$$('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            // Check initial state
            this.updateFloatingLabel(input);
            
            // Update on input
            input.addEventListener('input', () => {
                this.updateFloatingLabel(input);
            });
            
            input.addEventListener('focus', () => {
                this.updateFloatingLabel(input);
            });
            
            input.addEventListener('blur', () => {
                this.updateFloatingLabel(input);
            });
        });
    }
    
    /**
     * Update floating label state
     */
    updateFloatingLabel(input) {
        const formGroup = input.closest('.form-group');
        const label = DOMHelpers.$('label', formGroup);
        
        if (input.value.trim() !== '' || document.activeElement === input) {
            DOMHelpers.addClass(formGroup, 'has-content');
        } else {
            DOMHelpers.removeClass(formGroup, 'has-content');
        }
    }
    
    /**
     * Setup typing animation
     */
    setupTypingAnimation() {
        const typingElement = DOMHelpers.$('.typing-text');
        if (!typingElement) return;
        
        const text = typingElement.dataset.text || 'John Doe';
        
        // Start typing animation after a delay
        setTimeout(() => {
            AnimationHelpers.typeText(typingElement, text, {
                speed: 150,
                cursor: true,
                onComplete: () => {
                    // Start other hero animations
                    this.animateHeroElements();
                }
            });
        }, 500);
    }
    
    /**
     * Animate hero elements after typing completes
     */
    animateHeroElements() {
        const heroElements = DOMHelpers.$$('.hero-subtitle, .hero-description, .hero-cta');
        
        if (anime) {
            anime({
                targets: heroElements,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo',
                delay: anime.stagger(200)
            });
        }
    }
    
    /**
     * Setup counter animations
     */
    setupCounters() {
        const counters = DOMHelpers.$$('[data-count]');
        
        counters.forEach(counter => {
            const observer = AnimationHelpers.createScrollObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetValue = parseInt(counter.dataset.count);
                        AnimationHelpers.animateCounter(counter, targetValue);
                        observer.unobserve(counter);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
    
    /**
     * Setup reduced motion support
     */
    setupReducedMotionSupport() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionPreference = (mq) => {
            if (mq.matches) {
                document.body.classList.add('reduce-motion');
                console.log('Reduced motion mode enabled');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        };
        
        handleMotionPreference(prefersReducedMotion);
        prefersReducedMotion.addEventListener('change', handleMotionPreference);
    }
    
    /**
     * Setup error handling
     */
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            // Could send to analytics service
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // Could send to analytics service
        });
    }
    
    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor FPS
        Performance.monitorFPS((fps) => {
            if (fps < 30) {
                console.warn(`Low FPS detected: ${fps}`);
                // Could disable some animations
            }
        });
        
        // Log performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                Performance.logSummary();
            }, 1000);
        });
    }
    
    /**
     * Show preloader
     */
    showPreloader() {
        let preloader = DOMHelpers.$('.preloader');
        
        if (!preloader) {
            preloader = DOMHelpers.createElement('div', { class: 'preloader' });
            preloader.innerHTML = `
                <div class="preloader-spinner"></div>
                <p>Loading amazing things...</p>
            `;
            document.body.appendChild(preloader);
        }
        
        DOMHelpers.removeClass(preloader, 'hidden');
    }
    
    /**
     * Hide preloader
     */
    async hidePreloader() {
        const preloader = DOMHelpers.$('.preloader');
        if (!preloader) return;
        
        return AnimationHelpers.hidePreloader(preloader);
    }
    
    /**
     * Show success message
     */
    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }
    
    /**
     * Show error message
     */
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }
    
    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = DOMHelpers.createElement('div', {
            class: `notification notification-${type}`
        });
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        if (anime) {
            anime({
                targets: notification,
                translateY: [-100, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutExpo'
            });
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
        
        // Close button handler
        const closeBtn = DOMHelpers.$('.notification-close', notification);
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }
    
    /**
     * Remove notification
     */
    removeNotification(notification) {
        if (anime) {
            anime({
                targets: notification,
                translateY: [0, -100],
                opacity: [1, 0],
                duration: 400,
                easing: 'easeOutExpo',
                complete: () => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }
            });
        } else {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }
    }
    
    /**
     * Get fallback data if JSON fails to load
     */
    getFallbackData() {
        return {
            personal: {
                name: 'John Doe',
                title: 'Senior Frontend Developer',
                email: 'john.doe@example.com',
                phone: '+1 (555) 123-4567',
                location: 'San Francisco, CA',
                bio: 'Passionate Senior Frontend Developer with expertise in modern web technologies.',
                avatar: 'https://via.placeholder.com/300x300?text=Profile'
            },
            stats: {
                projects: 50,
                experience: 8,
                clients: 25
            },
            social: {
                linkedin: '#',
                github: '#',
                twitter: '#',
                email: 'mailto:john.doe@example.com'
            },
            skills: [],
            timeline: [],
            portfolio: []
        };
    }
    
    /**
     * Destroy the application and cleanup
     */
    destroy() {
        // Cleanup modules
        Object.values(this.modules).forEach(module => {
            if (module.destroy) {
                module.destroy();
            }
        });
        
        // Remove event listeners
        window.removeEventListener('error', null);
        window.removeEventListener('unhandledrejection', null);
        window.removeEventListener('load', null);
        
        this.modules = {};
        this.resumeData = null;
        this.isLoaded = false;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.resumeApp = new ResumeApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - could pause animations
        console.log('Page hidden - pausing non-essential operations');
    } else {
        // Page is visible - resume operations
        console.log('Page visible - resuming operations');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResumeApp;
} else {
    window.ResumeApp = ResumeApp;
}