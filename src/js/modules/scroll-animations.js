// Scroll Animations Module
class ScrollAnimations {
    constructor() {
        this.scrollElements = [];
        this.observer = null;
        this.navbar = null;
        this.sections = [];
        this.currentSection = '';
        this.scrollIndicator = null;
        
        this.init();
    }
    
    /**
     * Initialize scroll animations
     */
    init() {
        this.setupElements();
        this.setupScrollObserver();
        this.setupNavbarScroll();
        this.setupSmoothScroll();
        this.setupScrollIndicator();
        this.setupScrollToTop();
        this.setupParallaxEffects();
    }
    
    /**
     * Setup DOM elements
     */
    setupElements() {
        this.navbar = DOMHelpers.$('.nav');
        this.sections = DOMHelpers.$$('section[id]');
        this.scrollIndicator = DOMHelpers.$('.scroll-indicator');
        this.scrollElements = DOMHelpers.$$('[data-animate]');
    }
    
    /**
     * Setup intersection observer for scroll animations
     */
    setupScrollObserver() {
        this.observer = AnimationHelpers.createScrollObserver(
            (entries) => this.handleScrollAnimation(entries),
            { 
                threshold: 0.1, 
                rootMargin: '0px 0px -100px 0px' 
            }
        );
        
        // Observe elements with animation attributes
        this.scrollElements.forEach(element => {
            this.observer.observe(element);
        });
        
        // Observe sections for navigation
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }
    
    /**
     * Handle scroll animations
     */
    handleScrollAnimation(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Handle section navigation
                if (element.tagName === 'SECTION') {
                    this.updateNavigation(element.id);
                }
                
                // Handle element animations
                const animationType = element.dataset.animate;
                if (animationType) {
                    this.triggerScrollAnimation(element, animationType);
                    this.observer.unobserve(element);
                }
            }
        });
    }
    
    /**
     * Trigger scroll animation for element
     */
    triggerScrollAnimation(element, animationType) {
        if (!anime) return;
        
        const delay = this.getAnimationDelay(element);
        const config = this.getAnimationConfig(animationType);
        
        anime({
            targets: element,
            ...config,
            delay: delay
        });
    }
    
    /**
     * Get animation configuration based on type
     */
    getAnimationConfig(type) {
        const configs = {
            'fade-up': {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'fade-up-delay': {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'fade-up-delay-2': {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'fade-up-delay-3': {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'fade-left': {
                translateX: [-30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'fade-left-delay': {
                translateX: [-30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'fade-left-delay-2': {
                translateX: [-30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'fade-left-delay-3': {
                translateX: [-30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'fade-right': {
                translateX: [30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            },
            'scale-in': {
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutElastic(1, .6)'
            },
            'bounce': {
                translateY: [-10, 10],
                duration: 2000,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'
            }
        };
        
        return configs[type] || configs['fade-up'];
    }
    
    /**
     * Get animation delay based on element attributes
     */
    getAnimationDelay(element) {
        const animationType = element.dataset.animate;
        const customDelay = element.dataset.delay;
        
        if (customDelay) {
            return parseInt(customDelay);
        }
        
        const delayMap = {
            'fade-up': 0,
            'fade-up-delay': 200,
            'fade-up-delay-2': 400,
            'fade-up-delay-3': 600,
            'fade-left': 0,
            'fade-left-delay': 200,
            'fade-left-delay-2': 400,
            'fade-left-delay-3': 600
        };
        
        return delayMap[animationType] || 0;
    }
    
    /**
     * Setup navbar scroll behavior
     */
    setupNavbarScroll() {
        if (!this.navbar) return;
        
        const handleScroll = DOMHelpers.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 50) {
                DOMHelpers.addClass(this.navbar, 'scrolled');
            } else {
                DOMHelpers.removeClass(this.navbar, 'scrolled');
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > this.lastScrollTop && scrollTop > 200) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScrollTop = scrollTop;
        }, 16);
        
        this.lastScrollTop = 0;
        window.addEventListener('scroll', handleScroll);
    }
    
    /**
     * Update navigation active state
     */
    updateNavigation(sectionId) {
        if (this.currentSection === sectionId) return;
        
        this.currentSection = sectionId;
        
        // Update navigation links
        const navLinks = DOMHelpers.$$('.nav-link');
        navLinks.forEach(link => {
            DOMHelpers.removeClass(link, 'active');
            
            if (link.getAttribute('href') === `#${sectionId}`) {
                DOMHelpers.addClass(link, 'active');
            }
        });
    }
    
    /**
     * Setup smooth scroll for navigation links
     */
    setupSmoothScroll() {
        const navLinks = DOMHelpers.$$('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = DOMHelpers.$(`#${targetId}`);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                    
                    // Close mobile menu if open
                    const navMenu = DOMHelpers.$('.nav-menu');
                    if (navMenu) {
                        DOMHelpers.removeClass(navMenu, 'active');
                    }
                }
            });
        });
    }
    
    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element, offset = 80) {
        const elementTop = DOMHelpers.getOffset(element).top - offset;
        
        if (anime) {
            anime({
                targets: document.documentElement,
                scrollTop: elementTop,
                duration: 1000,
                easing: 'easeOutExpo'
            });
        } else {
            // Fallback smooth scroll
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * Setup scroll indicator
     */
    setupScrollIndicator() {
        if (!this.scrollIndicator) return;
        
        this.scrollIndicator.addEventListener('click', () => {
            const aboutSection = DOMHelpers.$('#about');
            if (aboutSection) {
                this.smoothScrollTo(aboutSection);
            }
        });
        
        // Hide indicator after scroll
        const handleScroll = DOMHelpers.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 200) {
                if (anime) {
                    anime({
                        targets: this.scrollIndicator,
                        opacity: 0,
                        translateY: 20,
                        duration: 400,
                        easing: 'easeOutExpo'
                    });
                } else {
                    this.scrollIndicator.style.opacity = '0';
                    this.scrollIndicator.style.transform = 'translateY(20px)';
                }
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    }
    
    /**
     * Setup scroll to top functionality
     */
    setupScrollToTop() {
        // Create scroll to top button
        const scrollTopBtn = DOMHelpers.createElement('button', {
            class: 'scroll-to-top',
            'aria-label': 'Scroll to top'
        });
        
        scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(scrollTopBtn);
        
        // Show/hide based on scroll position
        const handleScroll = DOMHelpers.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 500) {
                DOMHelpers.addClass(scrollTopBtn, 'visible');
            } else {
                DOMHelpers.removeClass(scrollTopBtn, 'visible');
            }
        }, 16);
        
        window.addEventListener('scroll', handleScroll);
        
        // Click handler
        scrollTopBtn.addEventListener('click', () => {
            if (anime) {
                anime({
                    targets: document.documentElement,
                    scrollTop: 0,
                    duration: 800,
                    easing: 'easeOutExpo'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    /**
     * Setup parallax effects
     */
    setupParallaxEffects() {
        const parallaxElements = DOMHelpers.$$('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        const handleParallax = DOMHelpers.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);
        
        window.addEventListener('scroll', handleParallax);
    }
    
    /**
     * Create scroll progress indicator
     */
    createScrollProgress() {
        const progressBar = DOMHelpers.createElement('div', {
            class: 'scroll-progress'
        });
        
        document.body.appendChild(progressBar);
        
        const updateProgress = DOMHelpers.throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = `${scrollPercent}%`;
        }, 16);
        
        window.addEventListener('scroll', updateProgress);
    }
    
    /**
     * Setup scroll spy for sections
     */
    setupScrollSpy() {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateNavigation(sectionId);
                    
                    // Trigger section-specific animations
                    this.triggerSectionAnimations(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        this.sections.forEach(section => {
            spyObserver.observe(section);
        });
    }
    
    /**
     * Trigger section-specific animations
     */
    triggerSectionAnimations(section) {
        const sectionId = section.id;
        
        // Custom animations for specific sections
        switch (sectionId) {
            case 'hero':
                this.animateHeroSection();
                break;
            case 'about':
                this.animateAboutSection();
                break;
            case 'skills':
                this.animateSkillsSection();
                break;
            case 'timeline':
                this.animateTimelineSection();
                break;
            case 'portfolio':
                this.animatePortfolioSection();
                break;
            case 'contact':
                this.animateContactSection();
                break;
        }
    }
    
    /**
     * Animate hero section
     */
    animateHeroSection() {
        const heroElements = DOMHelpers.$$('#hero [data-animate]');
        this.staggerElementAnimation(heroElements, 'fadeUp', 200);
    }
    
    /**
     * Animate about section
     */
    animateAboutSection() {
        const aboutImage = DOMHelpers.$('#about .about-image');
        const aboutText = DOMHelpers.$('#about .about-text');
        
        if (aboutImage && anime) {
            anime({
                targets: aboutImage,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });
        }
        
        if (aboutText) {
            const textElements = DOMHelpers.$$('[data-animate]', aboutText);
            this.staggerElementAnimation(textElements, 'fadeLeft', 150);
        }
    }
    
    /**
     * Animate skills section
     */
    animateSkillsSection() {
        // Handled by SkillAnimations module
    }
    
    /**
     * Animate timeline section
     */
    animateTimelineSection() {
        // Handled by TimelineAnimations module
    }
    
    /**
     * Animate portfolio section
     */
    animatePortfolioSection() {
        const portfolioItems = DOMHelpers.$$('#portfolio .portfolio-item');
        this.staggerElementAnimation(portfolioItems, 'scaleIn', 100);
    }
    
    /**
     * Animate contact section
     */
    animateContactSection() {
        const contactInfo = DOMHelpers.$('#contact .contact-info');
        const contactForm = DOMHelpers.$('#contact .contact-form');
        
        if (contactInfo && anime) {
            anime({
                targets: contactInfo,
                translateX: [-50, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });
        }
        
        if (contactForm && anime) {
            anime({
                targets: contactForm,
                translateX: [50, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo',
                delay: 200
            });
        }
    }
    
    /**
     * Stagger animation for multiple elements
     */
    staggerElementAnimation(elements, animationType, staggerDelay = 100) {
        if (!elements.length || !anime) return;
        
        const config = this.getAnimationConfig(animationType);
        
        anime({
            targets: elements,
            ...config,
            delay: anime.stagger(staggerDelay)
        });
    }
    
    /**
     * Destroy scroll animations and cleanup
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', null);
        
        this.scrollElements = [];
        this.sections = [];
    }
    
    /**
     * Refresh scroll animations
     */
    refresh() {
        this.destroy();
        this.init();
    }
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scrollAnimations = new ScrollAnimations();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollAnimations;
} else {
    window.ScrollAnimations = ScrollAnimations;
}