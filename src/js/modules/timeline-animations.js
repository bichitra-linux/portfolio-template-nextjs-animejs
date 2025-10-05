// Timeline Animations Module
class TimelineAnimations {
    constructor() {
        this.timelineContainer = null;
        this.timelineItems = [];
        this.observer = null;
        this.resumeData = null;
        
        this.init();
    }
    
    /**
     * Initialize timeline animations
     */
    async init() {
        try {
            await this.loadData();
            this.setupElements();
            this.createTimeline();
            this.setupScrollAnimations();
        } catch (error) {
            console.error('Timeline initialization failed:', error);
        }
    }
    
    /**
     * Load resume data
     */
    async loadData() {
        try {
            const response = await fetch('./data/resume-data.json');
            if (!response.ok) throw new Error('Failed to load resume data');
            this.resumeData = await response.json();
        } catch (error) {
            console.error('Error loading resume data:', error);
            // Fallback data if JSON fails to load
            this.resumeData = { timeline: [] };
        }
    }
    
    /**
     * Setup DOM elements
     */
    setupElements() {
        this.timelineContainer = DOMHelpers.$('#timeline-items');
        if (!this.timelineContainer) {
            console.warn('Timeline container not found');
            return;
        }
    }
    
    /**
     * Create timeline HTML structure
     */
    createTimeline() {
        if (!this.timelineContainer || !this.resumeData?.timeline) return;
        
        this.timelineContainer.innerHTML = '';
        
        this.resumeData.timeline.forEach((item, index) => {
            const timelineItem = this.createTimelineItem(item, index);
            this.timelineContainer.appendChild(timelineItem);
        });
        
        this.timelineItems = DOMHelpers.$$('.timeline-item', this.timelineContainer);
    }
    
    /**
     * Create individual timeline item
     */
    createTimelineItem(item, index) {
        const isWork = item.type === 'work';
        const isEven = index % 2 === 0;
        
        const itemElement = DOMHelpers.createElement('div', {
            class: 'timeline-item',
            'data-index': index
        });
        
        itemElement.innerHTML = `
            <div class="timeline-content-wrapper">
                <div class="timeline-card">
                    <div class="timeline-header">
                        <h3 class="timeline-title">${isWork ? item.position : item.degree}</h3>
                        <div class="timeline-meta">
                            <span class="timeline-company">${isWork ? item.company : item.institution}</span>
                            <span class="timeline-period">${item.period}</span>
                            <span class="timeline-location">${item.location}</span>
                        </div>
                    </div>
                    <div class="timeline-content">
                        <p class="timeline-description">${item.description}</p>
                        ${item.achievements ? `
                            <ul class="timeline-achievements">
                                ${item.achievements.map(achievement => `
                                    <li>${achievement}</li>
                                `).join('')}
                            </ul>
                        ` : ''}
                        ${item.technologies ? `
                            <div class="timeline-technologies">
                                ${item.technologies.map(tech => `
                                    <span class="tech-tag">${tech}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="timeline-marker"></div>
        `;
        
        return itemElement;
    }
    
    /**
     * Setup scroll animations for timeline items
     */
    setupScrollAnimations() {
        if (!this.timelineItems.length) return;
        
        this.observer = AnimationHelpers.createScrollObserver(
            (entries) => this.handleScrollAnimation(entries),
            { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
        );
        
        this.timelineItems.forEach(item => {
            this.observer.observe(item);
        });
    }
    
    /**
     * Handle scroll animation for timeline items
     */
    handleScrollAnimation(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateTimelineItem(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    /**
     * Animate individual timeline item
     */
    animateTimelineItem(item) {
        if (!anime) return;
        
        const index = parseInt(item.dataset.index);
        const isEven = index % 2 === 0;
        const card = DOMHelpers.$('.timeline-card', item);
        const marker = DOMHelpers.$('.timeline-marker', item);
        
        // Animate marker first
        if (marker) {
            anime({
                targets: marker,
                scale: [0, 1],
                duration: 400,
                easing: 'easeOutElastic(1, .6)',
                delay: 0
            });
        }
        
        // Animate card
        if (card) {
            const slideDirection = isEven ? -50 : 50;
            
            anime({
                targets: card,
                translateX: [slideDirection, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo',
                delay: 200
            });
        }
        
        // Animate technologies tags with stagger
        const techTags = DOMHelpers.$$('.tech-tag', item);
        if (techTags.length > 0) {
            anime({
                targets: techTags,
                scale: [0, 1],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutBack',
                delay: anime.stagger(50, { start: 600 })
            });
        }
        
        // Animate achievements with stagger
        const achievements = DOMHelpers.$$('.timeline-achievements li', item);
        if (achievements.length > 0) {
            anime({
                targets: achievements,
                translateX: [-20, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutExpo',
                delay: anime.stagger(100, { start: 400 })
            });
        }
    }
    
    /**
     * Animate timeline line drawing
     */
    animateTimelineLine() {
        const timelineLine = DOMHelpers.$('.timeline-line');
        if (!timelineLine || !anime) return;
        
        anime({
            targets: timelineLine,
            height: [0, '100%'],
            duration: 2000,
            easing: 'easeOutExpo',
            delay: 500
        });
    }
    
    /**
     * Add hover effects to timeline items
     */
    addHoverEffects() {
        this.timelineItems.forEach(item => {
            const card = DOMHelpers.$('.timeline-card', item);
            if (!card) return;
            
            // Mouse enter
            card.addEventListener('mouseenter', () => {
                if (anime) {
                    anime({
                        targets: card,
                        translateY: -10,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        duration: 300,
                        easing: 'easeOutExpo'
                    });
                }
            });
            
            // Mouse leave
            card.addEventListener('mouseleave', () => {
                if (anime) {
                    anime({
                        targets: card,
                        translateY: 0,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        duration: 300,
                        easing: 'easeOutExpo'
                    });
                }
            });
        });
    }
    
    /**
     * Filter timeline by type (work/education)
     */
    filterTimeline(type = 'all') {
        if (!this.timelineItems.length) return;
        
        this.timelineItems.forEach(item => {
            const itemData = this.resumeData.timeline[parseInt(item.dataset.index)];
            const shouldShow = type === 'all' || itemData.type === type;
            
            if (anime) {
                anime({
                    targets: item,
                    opacity: shouldShow ? 1 : 0.3,
                    scale: shouldShow ? 1 : 0.95,
                    duration: 400,
                    easing: 'easeOutExpo'
                });
            } else {
                item.style.opacity = shouldShow ? '1' : '0.3';
                item.style.transform = shouldShow ? 'scale(1)' : 'scale(0.95)';
            }
        });
    }
    
    /**
     * Highlight timeline item
     */
    highlightItem(index) {
        if (!this.timelineItems[index]) return;
        
        const item = this.timelineItems[index];
        const card = DOMHelpers.$('.timeline-card', item);
        
        if (card && anime) {
            anime({
                targets: card,
                scale: [1, 1.05, 1],
                duration: 600,
                easing: 'easeOutElastic(1, .6)'
            });
        }
    }
    
    /**
     * Create timeline navigation dots
     */
    createTimelineNavigation() {
        const navContainer = DOMHelpers.createElement('div', {
            class: 'timeline-navigation'
        });
        
        this.resumeData.timeline.forEach((item, index) => {
            const dot = DOMHelpers.createElement('button', {
                class: 'timeline-nav-dot',
                'data-index': index,
                'aria-label': `Go to ${item.type === 'work' ? item.position : item.degree}`
            });
            
            dot.addEventListener('click', () => {
                this.scrollToTimelineItem(index);
                this.highlightItem(index);
            });
            
            navContainer.appendChild(dot);
        });
        
        // Insert navigation after timeline
        const timelineSection = DOMHelpers.$('#timeline');
        if (timelineSection) {
            timelineSection.appendChild(navContainer);
        }
    }
    
    /**
     * Scroll to specific timeline item
     */
    scrollToTimelineItem(index) {
        if (!this.timelineItems[index]) return;
        
        const item = this.timelineItems[index];
        DOMHelpers.scrollTo(item, 100);
    }
    
    /**
     * Destroy timeline animations and cleanup
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        this.timelineItems.forEach(item => {
            const card = DOMHelpers.$('.timeline-card', item);
            if (card) {
                card.removeEventListener('mouseenter', null);
                card.removeEventListener('mouseleave', null);
            }
        });
        
        this.timelineItems = [];
        this.resumeData = null;
    }
    
    /**
     * Refresh timeline with new data
     */
    async refresh() {
        this.destroy();
        await this.init();
    }
}

// Initialize timeline animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.timelineAnimations = new TimelineAnimations();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimelineAnimations;
} else {
    window.TimelineAnimations = TimelineAnimations;
}