// Skill Animations Module
class SkillAnimations {
    constructor() {
        this.skillsContainer = null;
        this.skillItems = [];
        this.categoryButtons = [];
        this.observer = null;
        this.resumeData = null;
        this.activeCategory = 'all';
        
        this.init();
    }
    
    /**
     * Initialize skill animations
     */
    async init() {
        try {
            await this.loadData();
            this.setupElements();
            this.createSkills();
            this.setupScrollAnimations();
            this.setupCategoryFilters();
        } catch (error) {
            console.error('Skills initialization failed:', error);
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
            this.resumeData = { skills: [] };
        }
    }
    
    /**
     * Setup DOM elements
     */
    setupElements() {
        this.skillsContainer = DOMHelpers.$('.skills-grid');
        this.categoryButtons = DOMHelpers.$$('.category-btn');
        
        if (!this.skillsContainer) {
            console.warn('Skills container not found');
            return;
        }
    }
    
    /**
     * Create skills HTML structure
     */
    createSkills() {
        if (!this.skillsContainer || !this.resumeData?.skills) return;
        
        this.skillsContainer.innerHTML = '';
        
        this.resumeData.skills.forEach((skill, index) => {
            const skillItem = this.createSkillItem(skill, index);
            this.skillsContainer.appendChild(skillItem);
        });
        
        this.skillItems = DOMHelpers.$$('.skill-item', this.skillsContainer);
    }
    
    /**
     * Create individual skill item
     */
    createSkillItem(skill, index) {
        const skillElement = DOMHelpers.createElement('div', {
            class: 'skill-item',
            'data-category': skill.category,
            'data-index': index
        });
        
        skillElement.innerHTML = `
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-width="${skill.percentage}"></div>
            </div>
        `;
        
        return skillElement;
    }
    
    /**
     * Setup scroll animations for skill items
     */
    setupScrollAnimations() {
        if (!this.skillItems.length) return;
        
        this.observer = AnimationHelpers.createScrollObserver(
            (entries) => this.handleScrollAnimation(entries),
            { threshold: 0.5, rootMargin: '0px 0px -50px 0px' }
        );
        
        this.skillItems.forEach(item => {
            this.observer.observe(item);
        });
    }
    
    /**
     * Handle scroll animation for skill items
     */
    handleScrollAnimation(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateSkillItem(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    /**
     * Animate individual skill item
     */
    animateSkillItem(item) {
        if (!anime) return;
        
        const progressBar = DOMHelpers.$('.skill-progress', item);
        const percentage = progressBar?.dataset.width || 0;
        const index = parseInt(item.dataset.index);
        
        // Animate the container first
        anime({
            targets: item,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutExpo',
            delay: index * 100
        });
        
        // Animate the progress bar
        if (progressBar) {
            anime({
                targets: progressBar,
                width: `${percentage}%`,
                duration: 1200,
                easing: 'easeOutExpo',
                delay: (index * 100) + 300
            });
            
            // Animate percentage counter
            this.animatePercentageCounter(item, percentage, (index * 100) + 300);
        }
        
        // Add hover effect
        this.addSkillHoverEffect(item);
    }
    
    /**
     * Animate percentage counter
     */
    animatePercentageCounter(item, targetPercentage, delay = 0) {
        const percentageElement = DOMHelpers.$('.skill-percentage', item);
        if (!percentageElement || !anime) return;
        
        const counter = { value: 0 };
        
        anime({
            targets: counter,
            value: targetPercentage,
            duration: 1200,
            easing: 'easeOutExpo',
            delay: delay,
            round: 1,
            update: () => {
                percentageElement.textContent = `${Math.round(counter.value)}%`;
            }
        });
    }
    
    /**
     * Add hover effects to skill items
     */
    addSkillHoverEffect(item) {
        if (!item) return;
        
        item.addEventListener('mouseenter', () => {
            if (anime) {
                anime({
                    targets: item,
                    translateY: -5,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            }
            
            // Add glow effect to progress bar
            const progressBar = DOMHelpers.$('.skill-progress', item);
            if (progressBar) {
                progressBar.style.boxShadow = '0 0 15px rgba(79, 70, 229, 0.5)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (anime) {
                anime({
                    targets: item,
                    translateY: 0,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            }
            
            // Remove glow effect
            const progressBar = DOMHelpers.$('.skill-progress', item);
            if (progressBar) {
                progressBar.style.boxShadow = 'none';
            }
        });
    }
    
    /**
     * Setup category filter functionality
     */
    setupCategoryFilters() {
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const category = button.dataset.category;
                this.filterSkills(category);
                this.setActiveCategory(button);
            });
        });
    }
    
    /**
     * Filter skills by category
     */
    filterSkills(category) {
        if (this.activeCategory === category) return;
        
        this.activeCategory = category;
        
        this.skillItems.forEach((item, index) => {
            const itemCategory = item.dataset.category;
            const shouldShow = category === 'all' || itemCategory === category;
            
            if (anime) {
                anime({
                    targets: item,
                    opacity: shouldShow ? [item.style.opacity || 0, 1] : [1, 0],
                    scale: shouldShow ? [0.8, 1] : [1, 0.8],
                    translateY: shouldShow ? [20, 0] : [0, 20],
                    duration: 400,
                    easing: 'easeOutExpo',
                    delay: shouldShow ? index * 50 : 0,
                    complete: () => {
                        item.style.display = shouldShow ? 'block' : 'none';
                    }
                });
            } else {
                // Fallback without anime.js
                item.style.opacity = shouldShow ? '1' : '0';
                item.style.transform = shouldShow ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)';
                item.style.display = shouldShow ? 'block' : 'none';
            }
        });
        
        // Re-trigger animations for visible items
        setTimeout(() => {
            this.retriggerVisibleAnimations(category);
        }, 500);
    }
    
    /**
     * Re-trigger animations for visible items after filtering
     */
    retriggerVisibleAnimations(category) {
        const visibleItems = this.skillItems.filter(item => {
            const itemCategory = item.dataset.category;
            return category === 'all' || itemCategory === category;
        });
        
        visibleItems.forEach((item, index) => {
            const progressBar = DOMHelpers.$('.skill-progress', item);
            const percentage = progressBar?.dataset.width || 0;
            
            if (progressBar && anime) {
                // Reset progress bar
                progressBar.style.width = '0%';
                
                // Re-animate
                anime({
                    targets: progressBar,
                    width: `${percentage}%`,
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: index * 100
                });
                
                // Re-animate counter
                this.animatePercentageCounter(item, percentage, index * 100);
            }
        });
    }
    
    /**
     * Set active category button
     */
    setActiveCategory(activeButton) {
        this.categoryButtons.forEach(button => {
            DOMHelpers.removeClass(button, 'active');
        });
        
        DOMHelpers.addClass(activeButton, 'active');
    }
    
    /**
     * Create skill comparison chart
     */
    createSkillChart() {
        const chartContainer = DOMHelpers.createElement('div', {
            class: 'skill-chart',
            id: 'skillChart'
        });
        
        // Add to skills section
        const skillsSection = DOMHelpers.$('#skills .container');
        if (skillsSection) {
            skillsSection.appendChild(chartContainer);
        }
        
        // Simple bar chart animation
        this.animateSkillChart(chartContainer);
    }
    
    /**
     * Animate skill chart
     */
    animateSkillChart(container) {
        if (!this.resumeData?.skills || !anime) return;
        
        const topSkills = this.resumeData.skills
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 6);
        
        container.innerHTML = '<h3>Top Skills</h3>';
        
        topSkills.forEach((skill, index) => {
            const bar = DOMHelpers.createElement('div', {
                class: 'chart-bar'
            });
            
            bar.innerHTML = `
                <div class="chart-label">${skill.name}</div>
                <div class="chart-progress">
                    <div class="chart-fill" data-width="${skill.percentage}"></div>
                </div>
                <div class="chart-value">${skill.percentage}%</div>
            `;
            
            container.appendChild(bar);
            
            // Animate bar
            const fill = DOMHelpers.$('.chart-fill', bar);
            if (fill) {
                anime({
                    targets: fill,
                    width: `${skill.percentage}%`,
                    duration: 1000,
                    easing: 'easeOutExpo',
                    delay: index * 200
                });
            }
        });
    }
    
    /**
     * Highlight specific skill
     */
    highlightSkill(skillName) {
        const skillItem = this.skillItems.find(item => {
            const nameElement = DOMHelpers.$('.skill-name', item);
            return nameElement && nameElement.textContent.trim() === skillName;
        });
        
        if (skillItem && anime) {
            anime({
                targets: skillItem,
                scale: [1, 1.1, 1],
                duration: 600,
                easing: 'easeOutElastic(1, .6)'
            });
        }
    }
    
    /**
     * Get skill proficiency level
     */
    getSkillLevel(percentage) {
        if (percentage >= 90) return 'Expert';
        if (percentage >= 80) return 'Advanced';
        if (percentage >= 70) return 'Intermediate';
        if (percentage >= 60) return 'Beginner';
        return 'Learning';
    }
    
    /**
     * Add skill level indicators
     */
    addSkillLevels() {
        this.skillItems.forEach(item => {
            const progressBar = DOMHelpers.$('.skill-progress', item);
            const percentage = parseInt(progressBar?.dataset.width || 0);
            const level = this.getSkillLevel(percentage);
            
            const levelIndicator = DOMHelpers.createElement('span', {
                class: `skill-level level-${level.toLowerCase()}`
            }, level);
            
            const skillInfo = DOMHelpers.$('.skill-info', item);
            if (skillInfo) {
                skillInfo.appendChild(levelIndicator);
            }
        });
    }
    
    /**
     * Destroy skill animations and cleanup
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        this.skillItems.forEach(item => {
            item.removeEventListener('mouseenter', null);
            item.removeEventListener('mouseleave', null);
        });
        
        this.categoryButtons.forEach(button => {
            button.removeEventListener('click', null);
        });
        
        this.skillItems = [];
        this.categoryButtons = [];
        this.resumeData = null;
    }
    
    /**
     * Refresh skills with new data
     */
    async refresh() {
        this.destroy();
        await this.init();
    }
}

// Initialize skill animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.skillAnimations = new SkillAnimations();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillAnimations;
} else {
    window.SkillAnimations = SkillAnimations;
}