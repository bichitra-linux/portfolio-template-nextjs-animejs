// Hover Effects Module
class HoverEffects {
    constructor() {
        this.init();
    }
    
    /**
     * Initialize hover effects
     */
    init() {
        this.setupHoverLift();
        this.setupHoverScale();
        this.setupHoverGlow();
        this.setupHoverColor();
        this.setupButtonRipples();
        this.setupCardHovers();
        this.setupImageHovers();
        this.setupNavigationHovers();
        this.setupSocialLinkHovers();
    }
    
    /**
     * Setup hover lift effects
     */
    setupHoverLift() {
        const hoverLiftElements = DOMHelpers.$$('.hover-lift');
        
        hoverLiftElements.forEach(element => {
            this.addHoverEffect(element, {
                enter: () => {
                    if (anime) {
                        anime({
                            targets: element,
                            translateY: -5,
                            duration: 300,
                            easing: 'easeOutExpo'
                        });
                    } else {
                        element.style.transform = 'translateY(-5px)';
                    }
                },
                leave: () => {
                    if (anime) {
                        anime({
                            targets: element,
                            translateY: 0,
                            duration: 300,
                            easing: 'easeOutExpo'
                        });
                    } else {
                        element.style.transform = 'translateY(0)';
                    }
                }
            });
        });
    }
    
    /**
     * Setup hover scale effects
     */
    setupHoverScale() {
        const hoverScaleElements = DOMHelpers.$$('.hover-scale');
        
        hoverScaleElements.forEach(element => {
            this.addHoverEffect(element, {
                enter: () => {
                    if (anime) {
                        anime({
                            targets: element,
                            scale: 1.05,
                            duration: 300,
                            easing: 'easeOutExpo'
                        });
                    } else {
                        element.style.transform = 'scale(1.05)';
                    }
                },
                leave: () => {
                    if (anime) {
                        anime({
                            targets: element,
                            scale: 1,
                            duration: 300,
                            easing: 'easeOutExpo'
                        });
                    } else {
                        element.style.transform = 'scale(1)';
                    }
                }
            });
        });
    }
    
    /**
     * Setup hover glow effects
     */
    setupHoverGlow() {
        const hoverGlowElements = DOMHelpers.$$('.hover-glow');
        
        hoverGlowElements.forEach(element => {
            this.addHoverEffect(element, {
                enter: () => {
                    if (anime) {
                        anime({
                            targets: element,
                            translateY: -2,
                            duration: 300,
                            easing: 'easeOutExpo'
                        });
                    }
                    element.style.boxShadow = '0 0 20px rgba(79, 70, 229, 0.4)';
                },
                leave: () => {
                    if (anime) {
                        anime({
                            targets: element,
                            translateY: 0,
                            duration: 300,
                            easing: 'easeOutExpo'
                        });
                    }
                    element.style.boxShadow = 'none';
                }
            });
        });
    }
    
    /**
     * Setup hover color effects
     */
    setupHoverColor() {
        const hoverColorElements = DOMHelpers.$$('.hover-color');
        
        hoverColorElements.forEach(element => {
            const originalColor = window.getComputedStyle(element).color;
            
            this.addHoverEffect(element, {
                enter: () => {
                    element.style.color = 'var(--color-primary)';
                },
                leave: () => {
                    element.style.color = originalColor;
                }
            });
        });
    }
    
    /**
     * Setup button ripple effects
     */
    setupButtonRipples() {
        const buttons = DOMHelpers.$$('.btn, button');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(button, e);
            });
        });
    }
    
    /**
     * Create ripple effect on click
     */
    createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = DOMHelpers.createElement('span', {
            class: 'ripple-effect'
        });
        
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
            z-index: 1;
        `;
        
        element.appendChild(ripple);
        
        if (anime) {
            anime({
                targets: ripple,
                scale: 2,
                opacity: 0,
                duration: 600,
                easing: 'easeOutExpo',
                complete: () => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }
            });
        } else {
            // Fallback animation
            ripple.style.animation = 'ripple 0.6s ease-out forwards';
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        }
    }
    
    /**
     * Setup card hover effects
     */
    setupCardHovers() {
        const cards = DOMHelpers.$$('.timeline-card, .portfolio-item, .skill-item');
        
        cards.forEach(card => {
            this.addHoverEffect(card, {
                enter: () => {
                    if (anime) {
                        anime({
                            targets: card,
                            translateY: -10,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            duration: 300,
                            easing: 'easeOutExpo'
                        });
                    }
                },
                leave: () => {
                    if (anime) {
                        anime({
                            targets: card,
                            translateY: 0,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            duration: 300,
                            easing: 'easeOutExpo'
                        });
                    }
                }
            });
        });
    }
    
    /**
     * Setup image hover effects
     */
    setupImageHovers() {
        const portfolioImages = DOMHelpers.$$('.portfolio-image img');
        
        portfolioImages.forEach(img => {
            const parent = img.closest('.portfolio-item');
            if (!parent) return;
            
            this.addHoverEffect(parent, {
                enter: () => {
                    if (anime) {
                        anime({
                            targets: img,
                            scale: 1.1,
                            duration: 400,
                            easing: 'easeOutExpo'
                        });
                    }
                },
                leave: () => {
                    if (anime) {
                        anime({
                            targets: img,
                            scale: 1,
                            duration: 400,
                            easing: 'easeOutExpo'
                        });
                    }
                }
            });
        });
        
        // About image hover
        const aboutImage = DOMHelpers.$('.about-image img');
        if (aboutImage) {
            this.addHoverEffect(aboutImage.parentElement, {
                enter: () => {
                    if (anime) {
                        anime({
                            targets: aboutImage,
                            scale: 1.05,
                            duration: 400,
                            easing: 'easeOutExpo'
                        });
                    }
                },
                leave: () => {
                    if (anime) {
                        anime({
                            targets: aboutImage,
                            scale: 1,
                            duration: 400,
                            easing: 'easeOutExpo'
                        });
                    }
                }
            });
        }
    }
    
    /**
     * Setup navigation hover effects
     */
    setupNavigationHovers() {
        const navLinks = DOMHelpers.$$('.nav-link');
        
        navLinks.forEach(link => {
            this.addHoverEffect(link, {
                enter: () => {
                    if (anime) {
                        anime({
                            targets: link,
                            scale: 1.05,
                            duration: 200,
                            easing: 'easeOutExpo'
                        });
                    }
                },
                leave: () => {
                    if (anime) {
                        anime({
                            targets: link,
                            scale: 1,
                            duration: 200,
                            easing: 'easeOutExpo'
                        });
                    }
                }
            });
        });
    }
    
    /**
     * Setup social link hover effects
     */
    setupSocialLinkHovers() {
        const socialLinks = DOMHelpers.$$('.social-link');
        
        socialLinks.forEach(link => {
            this.addHoverEffect(link, {
                enter: () => {
                    if (anime) {
                        anime({
                            targets: link,
                            scale: 1.2,
                            rotate: 5,
                            duration: 300,
                            easing: 'easeOutElastic(1, .6)'
                        });
                    }
                },
                leave: () => {
                    if (anime) {
                        anime({
                            targets: link,
                            scale: 1,
                            rotate: 0,
                            duration: 300,
                            easing: 'easeOutElastic(1, .6)'
                        });
                    }
                }
            });
        });
    }
    
    /**
     * Add hover effect to element
     */
    addHoverEffect(element, effects) {
        if (!element) return;
        
        let isHovering = false;
        
        element.addEventListener('mouseenter', () => {
            if (isHovering) return;
            isHovering = true;
            
            if (effects.enter) {
                effects.enter();
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (!isHovering) return;
            isHovering = false;
            
            if (effects.leave) {
                effects.leave();
            }
        });
        
        // Handle focus for accessibility
        element.addEventListener('focus', () => {
            if (effects.enter) {
                effects.enter();
            }
        });
        
        element.addEventListener('blur', () => {
            if (effects.leave) {
                effects.leave();
            }
        });
    }
    
    /**
     * Setup form input focus effects
     */
    setupFormEffects() {
        const formInputs = DOMHelpers.$$('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            if (!formGroup) return;
            
            input.addEventListener('focus', () => {
                DOMHelpers.addClass(formGroup, 'focused');
                
                if (anime) {
                    anime({
                        targets: input,
                        scale: 1.02,
                        duration: 200,
                        easing: 'easeOutExpo'
                    });
                }
            });
            
            input.addEventListener('blur', () => {
                DOMHelpers.removeClass(formGroup, 'focused');
                
                if (anime) {
                    anime({
                        targets: input,
                        scale: 1,
                        duration: 200,
                        easing: 'easeOutExpo'
                    });
                }
            });
        });
    }
    
    /**
     * Setup category button hover effects
     */
    setupCategoryButtonEffects() {
        const categoryButtons = DOMHelpers.$$('.category-btn');
        
        categoryButtons.forEach(button => {
            this.addHoverEffect(button, {
                enter: () => {
                    if (!DOMHelpers.hasClass(button, 'active')) {
                        if (anime) {
                            anime({
                                targets: button,
                                scale: 1.05,
                                duration: 200,
                                easing: 'easeOutExpo'
                            });
                        }
                    }
                },
                leave: () => {
                    if (!DOMHelpers.hasClass(button, 'active')) {
                        if (anime) {
                            anime({
                                targets: button,
                                scale: 1,
                                duration: 200,
                                easing: 'easeOutExpo'
                            });
                        }
                    }
                }
            });
        });
    }
    
    /**
     * Create magnetic effect for elements
     */
    createMagneticEffect(elements) {
        if (!elements) return;
        
        const elementsArray = Array.isArray(elements) ? elements : [elements];
        
        elementsArray.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                const moveX = x * strength;
                const moveY = y * strength;
                
                if (anime) {
                    anime({
                        targets: element,
                        translateX: moveX,
                        translateY: moveY,
                        duration: 200,
                        easing: 'easeOutExpo'
                    });
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (anime) {
                    anime({
                        targets: element,
                        translateX: 0,
                        translateY: 0,
                        duration: 400,
                        easing: 'easeOutElastic(1, .6)'
                    });
                }
            });
        });
    }
    
    /**
     * Setup tilt effect for cards
     */
    setupTiltEffect() {
        const cards = DOMHelpers.$$('.portfolio-item, .timeline-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                if (anime) {
                    anime({
                        targets: card,
                        rotateX: rotateX,
                        rotateY: rotateY,
                        duration: 200,
                        easing: 'easeOutExpo'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (anime) {
                    anime({
                        targets: card,
                        rotateX: 0,
                        rotateY: 0,
                        duration: 400,
                        easing: 'easeOutElastic(1, .6)'
                    });
                }
            });
        });
    }
    
    /**
     * Disable hover effects on touch devices
     */
    disableOnTouch() {
        if ('ontouchstart' in window) {
            const hoverElements = DOMHelpers.$$('[class*="hover-"]');
            hoverElements.forEach(element => {
                element.style.pointerEvents = 'auto';
            });
        }
    }
    
    /**
     * Initialize all hover effects
     */
    initializeAll() {
        this.setupFormEffects();
        this.setupCategoryButtonEffects();
        this.createMagneticEffect(DOMHelpers.$$('.btn-primary'));
        this.setupTiltEffect();
        this.disableOnTouch();
    }
    
    /**
     * Destroy hover effects and cleanup
     */
    destroy() {
        // Remove all event listeners
        // This is a simplified cleanup - in a real implementation,
        // you'd want to store references to the event handlers
        const allElements = DOMHelpers.$$('*');
        allElements.forEach(element => {
            element.removeEventListener('mouseenter', null);
            element.removeEventListener('mouseleave', null);
            element.removeEventListener('focus', null);
            element.removeEventListener('blur', null);
            element.removeEventListener('click', null);
            element.removeEventListener('mousemove', null);
        });
    }
}

// Initialize hover effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.hoverEffects = new HoverEffects();
    window.hoverEffects.initializeAll();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HoverEffects;
} else {
    window.HoverEffects = HoverEffects;
}