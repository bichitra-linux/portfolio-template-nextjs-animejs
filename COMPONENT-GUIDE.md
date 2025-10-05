# 🎨 Component Architecture & Creation Guide

This guide shows you exactly how to create each component for your Next.js animated resume website.

---

## 📐 Component Hierarchy

```
App
├── Navigation (✅ Created)
└── Main
    ├── HeroSection
    ├── AboutSection
    ├── SkillsSection
    ├── TimelineSection
    ├── PortfolioSection
    ├── ContactSection
    └── Footer
```

---

## 🔧 Component Templates

### Template 1: Section Component (Server Component)

```typescript
// components/sections/ExampleSection.tsx
import styles from './ExampleSection.module.css';

interface ExampleSectionProps {
  // Define your props
  title: string;
  data: any[];
}

export default function ExampleSection({ title, data }: ExampleSectionProps) {
  return (
    <section id="example" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>Section subtitle</p>
        </div>
        
        <div className={styles.content}>
          {/* Section content */}
        </div>
      </div>
    </section>
  );
}
```

### Template 2: Animated Component (Client Component)

```typescript
// components/sections/AnimatedSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { fadeInUp } from '@/lib/animations';
import styles from './AnimatedSection.module.css';

interface AnimatedSectionProps {
  title: string;
}

export default function AnimatedSection({ title }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current, { delay: 200 });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Content */}
    </section>
  );
}
```

### Template 3: UI Component

```typescript
// components/ui/Button.tsx
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  className,
}: ButtonProps) {
  const classes = cn(
    styles.button,
    styles[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

---

## 📝 Component Creation Checklist

### For Each Component:

- [ ] Create TypeScript file (.tsx)
- [ ] Create CSS Module (.module.css)
- [ ] Define TypeScript interfaces
- [ ] Add 'use client' if using hooks/animations
- [ ] Import required dependencies
- [ ] Implement component logic
- [ ] Add CSS styles
- [ ] Export component

---

## 🎯 Specific Component Requirements

### 1. HeroSection
**Purpose**: Landing section with name, title, and CTA buttons

**Required Props**:
```typescript
interface HeroSectionProps {
  data: PersonalInfo;
}
```

**Key Features**:
- Typing animation for name
- Animated background
- CTA buttons
- Scroll indicator
- Profile image with float animation

**Animations**:
- Use `typeText()` for name typing
- Use `fadeInUp()` for content
- Use CSS keyframes for float effect

---

### 2. AboutSection
**Purpose**: About me section with stats and bio

**Required Props**:
```typescript
interface AboutSectionProps {
  personal: PersonalInfo;
  stats: Stats;
  social: SocialLinks;
}
```

**Key Features**:
- Profile photo
- Bio paragraphs
- Animated stats counters
- Social media links

**Animations**:
- Use `animateCounter()` for stats
- Use `scaleIn()` for profile photo
- Use `fadeIn()` for text

---

### 3. SkillsSection
**Purpose**: Display technical skills with proficiency levels

**Required Props**:
```typescript
interface SkillsSectionProps {
  skills: Skill[];
}
```

**Key Features**:
- Skill bars with percentages
- Category filtering
- Animated progress bars
- Skill icons

**Animations**:
- Use `animateSkillBar()` for progress bars
- Use Intersection Observer for scroll trigger
- Use `staggerAnimation()` for skill items

---

### 4. TimelineSection
**Purpose**: Work experience and education timeline

**Required Props**:
```typescript
interface TimelineSectionProps {
  timeline: TimelineItem[];
}
```

**Key Features**:
- Vertical timeline line
- Animated markers
- Work/education cards
- Achievement lists
- Technology tags

**Animations**:
- Use `fadeInLeft/Right()` alternating
- Animate timeline markers
- Card flip on hover

---

### 5. PortfolioSection
**Purpose**: Showcase projects and work

**Required Props**:
```typescript
interface PortfolioSectionProps {
  projects: PortfolioProject[];
}
```

**Key Features**:
- Project cards with images
- Hover overlays
- Technology tags
- Links to live demo & code
- Category filtering

**Animations**:
- Use `staggerAnimation()` for cards
- Image zoom on hover
- Overlay fade animations

---

### 6. ContactSection
**Purpose**: Contact form and information

**Required Props**:
```typescript
interface ContactSectionProps {
  personal: PersonalInfo;
}
```

**Key Features**:
- Contact form with validation
- Floating labels
- Contact information display
- Form submission handling

**Animations**:
- Floating label animations
- Form validation feedback
- Success/error messages

---

### 7. Footer
**Purpose**: Website footer with links

**Required Props**:
```typescript
// No props needed (or minimal props)
```

**Key Features**:
- Copyright notice
- Footer links
- Social media icons
- Back to top button

---

## 🎨 CSS Module Structure

### Standard CSS Module Template

```css
/* ComponentName.module.css */

/* Section Container */
.section {
  padding: var(--section-padding);
  position: relative;
}

/* Container */
.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

/* Section Header */
.header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.title {
  font-family: var(--font-family-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
}

/* Content */
.content {
  /* Component-specific styles */
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
}
```

---

## 🔄 Step-by-Step Creation Process

### Example: Creating HeroSection

#### Step 1: Create the TypeScript File

```bash
# Create the file
touch components/sections/HeroSection.tsx
```

#### Step 2: Add Imports and Types

```typescript
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { PersonalInfo } from '@/types';
import { typeText, fadeInUp } from '@/lib/animations';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  data: PersonalInfo;
}
```

#### Step 3: Create Component Structure

```typescript
export default function HeroSection({ data }: HeroSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const textElement = titleRef.current.querySelector('.typing-text');
      if (textElement instanceof HTMLElement) {
        typeText(textElement, data.name, 100);
      }
    }
  }, [data.name]);

  return (
    <section id="home" className={styles.hero}>
      {/* Component JSX */}
    </section>
  );
}
```

#### Step 4: Create CSS Module

```bash
touch components/sections/HeroSection.module.css
```

#### Step 5: Add Styles

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  /* More styles */
}
```

#### Step 6: Test the Component

```bash
npm run dev
```

---

## ⚡ Quick Creation Commands

```bash
# Create all section components at once
mkdir -p components/sections
touch components/sections/HeroSection.tsx
touch components/sections/HeroSection.module.css
touch components/sections/AboutSection.tsx
touch components/sections/AboutSection.module.css
touch components/sections/SkillsSection.tsx
touch components/sections/SkillsSection.module.css
touch components/sections/TimelineSection.tsx
touch components/sections/TimelineSection.module.css
touch components/sections/PortfolioSection.tsx
touch components/sections/PortfolioSection.module.css
touch components/sections/ContactSection.tsx
touch components/sections/ContactSection.module.css

# Create UI components
mkdir -p components/ui
touch components/ui/Button.tsx
touch components/ui/Button.module.css
touch components/ui/Card.tsx
touch components/ui/Card.module.css
touch components/ui/SkillBar.tsx
touch components/ui/SkillBar.module.css

# Create Footer
touch components/Footer.tsx
touch components/Footer.module.css
```

**Windows PowerShell:**
```powershell
# Create all section components
New-Item -ItemType Directory -Force -Path "components\sections"
New-Item -ItemType File -Force -Path "components\sections\HeroSection.tsx"
New-Item -ItemType File -Force -Path "components\sections\HeroSection.module.css"
# ... repeat for other components
```

---

## 📊 Progress Tracking

### Components Status

- [x] ✅ Navigation (Created)
- [ ] ⏳ HeroSection
- [ ] ⏳ AboutSection  
- [ ] ⏳ SkillsSection
- [ ] ⏳ TimelineSection
- [ ] ⏳ PortfolioSection
- [ ] ⏳ ContactSection
- [ ] ⏳ Footer
- [ ] ⏳ Button (UI)
- [ ] ⏳ Card (UI)
- [ ] ⏳ SkillBar (UI)

### Estimated Time

- Each section component: ~30-45 minutes
- Each UI component: ~15-20 minutes
- Total time: ~4-6 hours

---

## 💡 Pro Tips

1. **Start with the simplest component** (Footer) to get comfortable
2. **Copy CSS from the original project** and adapt to CSS Modules
3. **Test each component** as you create it
4. **Use the TypeScript types** - they'll help catch errors early
5. **Reference the original HTML** structure for layout inspiration
6. **Keep animations subtle** on first implementation, enhance later
7. **Use browser DevTools** to debug styling issues
8. **Ask for help** if you get stuck on a specific component

---

## 🎓 Learning Path

### Beginner Path
1. Create Footer (simplest)
2. Create HeroSection (minimal animation)
3. Create AboutSection (counter animation)
4. Create other sections

### Intermediate Path
1. Create all section structures first
2. Add basic styling
3. Add animations
4. Polish and refine

### Advanced Path
1. Create sections with full animations from start
2. Extract reusable components as you go
3. Optimize performance
4. Add advanced features

---

**You've got this! Start with one component and build momentum! 🚀**
