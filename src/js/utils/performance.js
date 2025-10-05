// Performance Optimization Utilities
class Performance {
    /**
     * Initialize performance monitoring
     */
    static init() {
        this.metrics = {
            loadTime: 0,
            domContentLoaded: 0,
            firstContentfulPaint: 0,
            animationFrames: 0,
            memory: null
        };
        
        this.measureLoadTime();
        this.measureDOMContentLoaded();
        this.measureFCP();
        this.monitorMemory();
    }
    
    /**
     * Measure page load time
     */
    static measureLoadTime() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Page load time: ${this.metrics.loadTime.toFixed(2)}ms`);
        });
    }
    
    /**
     * Measure DOM content loaded time
     */
    static measureDOMContentLoaded() {
        document.addEventListener('DOMContentLoaded', () => {
            this.metrics.domContentLoaded = performance.now();
            console.log(`DOM content loaded: ${this.metrics.domContentLoaded.toFixed(2)}ms`);
        });
    }
    
    /**
     * Measure First Contentful Paint
     */
    static measureFCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaint = entry.startTime;
                        console.log(`First Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
                        observer.disconnect();
                    }
                }
            });
            
            observer.observe({ entryTypes: ['paint'] });
        } catch (error) {
            console.warn('Performance Observer not supported');
        }
    }
    
    /**
     * Monitor memory usage
     */
    static monitorMemory() {
        if ('memory' in performance) {
            this.metrics.memory = {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
            
            console.log('Memory usage:', this.metrics.memory);
        }
    }
    
    /**
     * Optimize images for performance
     */
    static optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                img.classList.add('loading');
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('loading');
            });
        }
    }
    
    /**
     * Preload critical resources
     */
    static preloadResources(resources = []) {
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as || 'fetch';
            
            if (resource.type) {
                link.type = resource.type;
            }
            
            document.head.appendChild(link);
        });
    }
    
    /**
     * Debounce function for performance
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
     * Throttle function for performance
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
     * Request animation frame with fallback
     */
    static requestAnimFrame(callback) {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        )(callback);
    }
    
    /**
     * Cancel animation frame with fallback
     */
    static cancelAnimFrame(id) {
        return (
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            function(id) {
                clearTimeout(id);
            }
        )(id);
    }
    
    /**
     * Check if device supports touch
     */
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    /**
     * Get device pixel ratio
     */
    static getPixelRatio() {
        return window.devicePixelRatio || 1;
    }
    
    /**
     * Check if device is mobile
     */
    static isMobile() {
        return window.innerWidth <= 768 || this.isTouchDevice();
    }
    
    /**
     * Check if reduced motion is preferred
     */
    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    /**
     * Optimize animations based on device capabilities
     */
    static getOptimizedAnimationSettings(baseSettings) {
        const isMobile = this.isMobile();
        const prefersReduced = this.prefersReducedMotion();
        const pixelRatio = this.getPixelRatio();
        
        if (prefersReduced) {
            return {
                ...baseSettings,
                duration: 1,
                delay: 0,
                easing: 'linear'
            };
        }
        
        if (isMobile || pixelRatio < 2) {
            return {
                ...baseSettings,
                duration: Math.min(baseSettings.duration * 0.8, 1000),
                delay: Math.min(baseSettings.delay, 100)
            };
        }
        
        return baseSettings;
    }
    
    /**
     * Monitor FPS
     */
    static monitorFPS(callback, duration = 1000) {
        let frames = 0;
        let lastTime = performance.now();
        
        const countFrame = (currentTime) => {
            frames++;
            
            if (currentTime >= lastTime + duration) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                callback(fps);
                frames = 0;
                lastTime = currentTime;
            }
            
            this.requestAnimFrame(countFrame);
        };
        
        this.requestAnimFrame(countFrame);
    }
    
    /**
     * Enable GPU acceleration for elements
     */
    static enableGPUAcceleration(elements) {
        if (!elements) return;
        
        const elementsArray = Array.isArray(elements) ? elements : [elements];
        
        elementsArray.forEach(element => {
            if (element && element.style) {
                element.style.transform = element.style.transform || 'translateZ(0)';
                element.style.willChange = 'transform, opacity';
            }
        });
    }
    
    /**
     * Disable GPU acceleration to free resources
     */
    static disableGPUAcceleration(elements) {
        if (!elements) return;
        
        const elementsArray = Array.isArray(elements) ? elements : [elements];
        
        elementsArray.forEach(element => {
            if (element && element.style) {
                element.style.willChange = 'auto';
            }
        });
    }
    
    /**
     * Batch DOM operations for better performance
     */
    static batchDOMOperations(operations) {
        return new Promise((resolve) => {
            this.requestAnimFrame(() => {
                operations.forEach(operation => {
                    if (typeof operation === 'function') {
                        operation();
                    }
                });
                resolve();
            });
        });
    }
    
    /**
     * Get performance metrics
     */
    static getMetrics() {
        return {
            ...this.metrics,
            currentMemory: 'memory' in performance ? {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            } : null,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : null
        };
    }
    
    /**
     * Log performance summary
     */
    static logSummary() {
        const metrics = this.getMetrics();
        console.group('Performance Summary');
        console.log('Load Time:', metrics.loadTime.toFixed(2) + 'ms');
        console.log('DOM Content Loaded:', metrics.domContentLoaded.toFixed(2) + 'ms');
        if (metrics.firstContentfulPaint) {
            console.log('First Contentful Paint:', metrics.firstContentfulPaint.toFixed(2) + 'ms');
        }
        if (metrics.currentMemory) {
            console.log('Memory Usage:', Math.round(metrics.currentMemory.used / 1048576) + 'MB');
        }
        if (metrics.connection) {
            console.log('Connection:', metrics.connection.effectiveType);
        }
        console.groupEnd();
    }
}

// Initialize performance monitoring when script loads
if (typeof window !== 'undefined') {
    Performance.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Performance;
} else {
    window.Performance = Performance;
}