// Application Constants
const CONSTANTS = {
    // Breakpoints
    BREAKPOINTS: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        wide: 1200
    },
    
    // Element selectors
    SELECTORS: {
        nav: '.nav',
        navMenu: '.nav-menu',
        navToggle: '.nav-toggle',
        navLinks: '.nav-link',
        sections: 'section[id]',
        animateElements: '[data-animate]',
        skillBars: '.skill-progress',
        timelineItems: '.timeline-item',
        portfolioItems: '.portfolio-item',
        contactForm: '.contact-form',
        scrollIndicator: '.scroll-indicator',
        preloader: '.preloader',
        heroTitle: '.hero-title',
        typingText: '.typing-text'
    },
    
    // CSS Classes
    CLASSES: {
        active: 'active',
        visible: 'visible',
        animated: 'animated',
        revealed: 'revealed',
        completed: 'completed',
        loading: 'loading',
        error: 'error',
        success: 'success',
        hidden: 'hidden',
        navScrolled: 'scrolled'
    },
    
    // Data attributes
    DATA_ATTRIBUTES: {
        animate: 'data-animate',
        delay: 'data-delay',
        width: 'data-width',
        count: 'data-count',
        category: 'data-category',
        section: 'data-section'
    },
    
    // Animation types
    ANIMATION_TYPES: {
        fadeUp: 'fade-up',
        fadeDown: 'fade-down',
        fadeLeft: 'fade-left',
        fadeRight: 'fade-right',
        scaleIn: 'scale-in',
        slideUp: 'slide-up',
        bounce: 'bounce',
        skillBar: 'skill-bar'
    },
    
    // Timing constants
    TIMING: {
        debounce: 250,
        throttle: 16,
        typingSpeed: 100,
        navTransition: 300,
        preloaderDelay: 1000,
        counterDuration: 2000,
        skillBarDelay: 500
    },
    
    // URLs and paths
    PATHS: {
        resumeData: './data/resume-data.json',
        images: './images/',
        icons: './icons/'
    },
    
    // Form settings
    FORM: {
        emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        minNameLength: 2,
        minMessageLength: 10,
        maxMessageLength: 1000
    },
    
    // Scroll settings
    SCROLL: {
        offset: 80,
        smooth: true,
        threshold: 0.1
    },
    
    // Performance settings
    PERFORMANCE: {
        maxAnimationDuration: 3000,
        throttleDelay: 16,
        debounceDelay: 250,
        observerThreshold: 0.1,
        observerRootMargin: '0px 0px -100px 0px'
    },
    
    // Local storage keys
    STORAGE_KEYS: {
        theme: 'resume_theme',
        lang: 'resume_lang',
        visitCount: 'resume_visit_count'
    },
    
    // API endpoints (if needed)
    API: {
        contact: '/api/contact',
        analytics: '/api/analytics'
    },
    
    // Error messages
    MESSAGES: {
        loadError: 'Failed to load content. Please refresh the page.',
        networkError: 'Network error. Please check your connection.',
        formError: 'Please check the form and try again.',
        formSuccess: 'Message sent successfully!',
        genericError: 'Something went wrong. Please try again.'
    },
    
    // Feature flags
    FEATURES: {
        analytics: false,
        darkMode: false,
        animations: true,
        preloader: true,
        progressBar: true
    }
};

// Utility function to check if mobile
CONSTANTS.isMobile = () => window.innerWidth <= CONSTANTS.BREAKPOINTS.mobile;
CONSTANTS.isTablet = () => window.innerWidth <= CONSTANTS.BREAKPOINTS.tablet;
CONSTANTS.isDesktop = () => window.innerWidth > CONSTANTS.BREAKPOINTS.tablet;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONSTANTS;
}