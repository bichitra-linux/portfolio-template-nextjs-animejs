// Animation Configuration Constants
const ANIME_CONFIG = {
    // Duration settings
    duration: {
        fast: 300,
        normal: 800,
        slow: 1200,
        typing: 3000
    },
    
    // Easing functions
    easing: {
        primary: 'easeOutExpo',
        bounce: 'easeOutElastic(1, .6)',
        back: 'easeOutBack',
        smooth: 'easeOutQuart',
        elastic: 'easeOutElastic(1, .8)'
    },
    
    // Stagger delays
    stagger: {
        fast: 50,
        normal: 100,
        slow: 150,
        timeline: 200
    },
    
    // Default animation settings
    defaults: {
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 0
    },
    
    // Specific animation presets
    presets: {
        fadeUp: {
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        },
        fadeDown: {
            translateY: [-30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        },
        fadeLeft: {
            translateX: [-30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        },
        fadeRight: {
            translateX: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        },
        scaleIn: {
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutElastic(1, .6)'
        },
        slideUp: {
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutBack'
        }
    },
    
    // Scroll animation settings
    scroll: {
        threshold: 0.1,
        triggerOnce: true,
        offset: 100
    },
    
    // Performance settings
    performance: {
        useTransforms: true,
        willChange: true,
        gpuAcceleration: true
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ANIME_CONFIG;
}