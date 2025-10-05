// Animation Helper Functions
class AnimationHelpers {
    /**
     * Create scroll-triggered animation observer
     */
    static createScrollObserver(callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observerOptions = { ...defaultOptions, ...options };
        
        return new IntersectionObserver(callback, observerOptions);
    }
    
    /**
     * Animate elements on scroll
     */
    static animateOnScroll(elements, animationType = 'fadeUp') {
        if (!elements || elements.length === 0) return;
        
        const observer = this.createScrollObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, animationType);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
        
        return observer;
    }
    
    /**
     * Trigger specific animation using Anime.js
     */
    static triggerAnimation(element, type, customOptions = {}) {
        if (!element || !anime) return;
        
        const config = ANIME_CONFIG?.presets?.[type] || ANIME_CONFIG?.presets?.fadeUp || {};
        const options = {
            targets: element,
            ...config,
            ...customOptions
        };
        
        return anime(options);
    }
    
    /**
     * Staggered animation for multiple elements
     */
    static staggerAnimation(elements, animationType = 'fadeUp', staggerDelay = 100) {
        if (!elements || elements.length === 0 || !anime) return;
        
        const config = ANIME_CONFIG?.presets?.[animationType] || ANIME_CONFIG?.presets?.fadeUp || {};
        
        return anime({
            targets: elements,
            ...config,
            delay: anime.stagger(staggerDelay)
        });
    }
    
    /**
     * Typing animation effect
     */
    static typeText(element, text, options = {}) {
        if (!element || !text) return Promise.resolve();
        
        const defaultOptions = {
            speed: 100,
            cursor: true,
            cursorChar: '|',
            onComplete: null
        };
        
        const settings = { ...defaultOptions, ...options };
        
        return new Promise((resolve) => {
            let index = 0;
            element.textContent = '';
            
            // Add cursor if enabled
            if (settings.cursor) {
                element.style.borderRight = `2px solid ${settings.cursorChar}`;
                element.style.paddingRight = '5px';
            }
            
            const timer = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(timer);
                    
                    // Remove cursor after completion
                    if (settings.cursor) {
                        setTimeout(() => {
                            element.style.borderRight = 'none';
                            element.classList.add('completed');
                        }, 1000);
                    }
                    
                    if (settings.onComplete) {
                        settings.onComplete();
                    }
                    
                    resolve();
                }
            }, settings.speed);
        });
    }
    
    /**
     * Counter animation
     */
    static animateCounter(element, targetValue, options = {}) {
        if (!element || !anime) return;
        
        const defaultOptions = {
            duration: 2000,
            easing: 'easeOutExpo',
            round: true
        };
        
        const settings = { ...defaultOptions, ...options };
        const counter = { value: 0 };
        
        return anime({
            targets: counter,
            value: targetValue,
            duration: settings.duration,
            easing: settings.easing,
            round: settings.round ? 1 : 0.01,
            update: () => {
                element.textContent = Math.round(counter.value);
            }
        });
    }
    
    /**
     * Progress bar animation
     */
    static animateProgressBar(element, percentage, options = {}) {
        if (!element || !anime) return;
        
        const defaultOptions = {
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 0
        };
        
        const settings = { ...defaultOptions, ...options };
        
        return anime({
            targets: element,
            width: `${percentage}%`,
            duration: settings.duration,
            easing: settings.easing,
            delay: settings.delay
        });
    }
    
    /**
     * Parallax scroll effect
     */
    static parallaxScroll(elements, options = {}) {
        if (!elements || elements.length === 0) return;
        
        const defaultOptions = {
            speed: 0.5,
            direction: 'vertical'
        };
        
        const settings = { ...defaultOptions, ...options };
        
        const updateParallax = DOMHelpers.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            elements.forEach(element => {
                const elementTop = DOMHelpers.getOffset(element).top;
                const elementHeight = element.offsetHeight;
                const windowHeight = window.innerHeight;
                
                // Calculate if element is in viewport
                if (elementTop < scrollTop + windowHeight && elementTop + elementHeight > scrollTop) {
                    const yPos = -(scrollTop - elementTop) * settings.speed;
                    const transform = settings.direction === 'vertical' 
                        ? `translateY(${yPos}px)` 
                        : `translateX(${yPos}px)`;
                    
                    element.style.transform = transform;
                }
            });
        }, 16);
        
        window.addEventListener('scroll', updateParallax);
        
        // Return cleanup function
        return () => window.removeEventListener('scroll', updateParallax);
    }
    
    /**
     * Create ripple effect
     */
    static createRipple(element, event) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        element.appendChild(ripple);
        
        if (anime) {
            anime({
                targets: ripple,
                scale: 2,
                opacity: 0,
                duration: 600,
                easing: 'easeOutExpo',
                complete: () => ripple.remove()
            });
        } else {
            // Fallback without anime.js
            ripple.style.animation = 'ripple 0.6s ease-out forwards';
            setTimeout(() => ripple.remove(), 600);
        }
    }
    
    /**
     * Floating animation
     */
    static floatingAnimation(elements, options = {}) {
        if (!elements || elements.length === 0 || !anime) return;
        
        const defaultOptions = {
            translateY: [-10, 10],
            duration: 3000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        };
        
        const settings = { ...defaultOptions, ...options };
        
        return anime({
            targets: elements,
            ...settings,
            delay: anime.stagger(200)
        });
    }
    
    /**
     * Card flip animation
     */
    static flipCard(card, options = {}) {
        if (!card || !anime) return;
        
        const defaultOptions = {
            duration: 600,
            easing: 'easeInOutExpo'
        };
        
        const settings = { ...defaultOptions, ...options };
        
        return anime({
            targets: card,
            rotateY: '180deg',
            duration: settings.duration,
            easing: settings.easing
        });
    }
    
    /**
     * Preloader animation
     */
    static hidePreloader(preloader, options = {}) {
        if (!preloader) return Promise.resolve();
        
        const defaultOptions = {
            duration: 800,
            easing: 'easeOutExpo',
            delay: 1000
        };
        
        const settings = { ...defaultOptions, ...options };
        
        return new Promise((resolve) => {
            if (anime) {
                anime({
                    targets: preloader,
                    opacity: 0,
                    scale: 0.8,
                    duration: settings.duration,
                    easing: settings.easing,
                    delay: settings.delay,
                    complete: () => {
                        preloader.style.display = 'none';
                        resolve();
                    }
                });
            } else {
                // Fallback without anime.js
                setTimeout(() => {
                    preloader.style.transition = `opacity ${settings.duration}ms ease-out`;
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        resolve();
                    }, settings.duration);
                }, settings.delay);
            }
        });
    }
    
    /**
     * Check if animations should be reduced based on user preference
     */
    static shouldReduceMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    /**
     * Get optimized animation settings for performance
     */
    static getOptimizedSettings(baseSettings = {}) {
        const reduced = this.shouldReduceMotion();
        const isMobile = CONSTANTS?.isMobile?.() || window.innerWidth <= 768;
        
        if (reduced) {
            return {
                ...baseSettings,
                duration: 1,
                delay: 0,
                easing: 'linear'
            };
        }
        
        if (isMobile) {
            return {
                ...baseSettings,
                duration: Math.min(baseSettings.duration * 0.8, 800),
                delay: Math.min(baseSettings.delay * 0.8, 100)
            };
        }
        
        return baseSettings;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationHelpers;
} else {
    window.AnimationHelpers = AnimationHelpers;
}