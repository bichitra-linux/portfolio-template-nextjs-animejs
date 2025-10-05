// DOM Helper Functions
class DOMHelpers {
    /**
     * Query selector with error handling
     */
    static $(selector, parent = document) {
        try {
            return parent.querySelector(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`);
            return null;
        }
    }
    
    /**
     * Query selector all with error handling
     */
    static $$(selector, parent = document) {
        try {
            return Array.from(parent.querySelectorAll(selector));
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`);
            return [];
        }
    }
    
    /**
     * Add event listener with cleanup
     */
    static addEventListener(element, event, handler, options = {}) {
        if (!element) return null;
        
        element.addEventListener(event, handler, options);
        
        // Return cleanup function
        return () => element.removeEventListener(event, handler, options);
    }
    
    /**
     * Add class with existence check
     */
    static addClass(element, className) {
        if (!element || !className) return;
        element.classList.add(className);
    }
    
    /**
     * Remove class with existence check
     */
    static removeClass(element, className) {
        if (!element || !className) return;
        element.classList.remove(className);
    }
    
    /**
     * Toggle class with existence check
     */
    static toggleClass(element, className, force) {
        if (!element || !className) return;
        return element.classList.toggle(className, force);
    }
    
    /**
     * Check if element has class
     */
    static hasClass(element, className) {
        if (!element || !className) return false;
        return element.classList.contains(className);
    }
    
    /**
     * Set multiple attributes
     */
    static setAttributes(element, attributes) {
        if (!element || !attributes) return;
        
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    
    /**
     * Get element's offset from document top
     */
    static getOffset(element) {
        if (!element) return { top: 0, left: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset
        };
    }
    
    /**
     * Check if element is in viewport
     */
    static isInViewport(element, threshold = 0) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top <= (windowHeight - threshold) &&
            rect.bottom >= threshold &&
            rect.left <= (windowWidth - threshold) &&
            rect.right >= threshold
        );
    }
    
    /**
     * Smooth scroll to element
     */
    static scrollTo(element, offset = 0, behavior = 'smooth') {
        if (!element) return;
        
        const elementTop = this.getOffset(element).top - offset;
        
        window.scrollTo({
            top: elementTop,
            behavior: behavior
        });
    }
    
    /**
     * Create element with attributes and content
     */
    static createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        this.setAttributes(element, attributes);
        
        if (content) {
            if (typeof content === 'string') {
                element.textContent = content;
            } else if (content instanceof Node) {
                element.appendChild(content);
            }
        }
        
        return element;
    }
    
    /**
     * Insert HTML safely
     */
    static insertHTML(element, html, position = 'beforeend') {
        if (!element || typeof html !== 'string') return;
        
        // Basic XSS protection
        const sanitizedHTML = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        element.insertAdjacentHTML(position, sanitizedHTML);
    }
    
    /**
     * Get computed style property
     */
    static getStyle(element, property) {
        if (!element) return null;
        return window.getComputedStyle(element).getPropertyValue(property);
    }
    
    /**
     * Wait for element to be available
     */
    static waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = this.$(selector);
            if (element) {
                resolve(element);
                return;
            }
            
            const observer = new MutationObserver((mutations, obs) => {
                const element = this.$(selector);
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }
    
    /**
     * Debounce function calls
     */
    static debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    }
    
    /**
     * Throttle function calls
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /**
     * Get all siblings of an element
     */
    static getSiblings(element) {
        if (!element || !element.parentNode) return [];
        
        return Array.from(element.parentNode.children).filter(child => child !== element);
    }
    
    /**
     * Check if element is visible
     */
    static isVisible(element) {
        if (!element) return false;
        
        return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    }
    
    /**
     * Get element's dimensions
     */
    static getDimensions(element) {
        if (!element) return { width: 0, height: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        };
    }
    
    /**
     * Copy text to clipboard
     */
    static async copyToClipboard(text) {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            }
        } catch (error) {
            console.error('Failed to copy text:', error);
            return false;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOMHelpers;
} else {
    window.DOMHelpers = DOMHelpers;
}