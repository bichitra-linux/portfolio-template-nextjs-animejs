# 🚀 Getting Started with Your Animated Resume Website

This guide will help you set up and customize your new Next.js animated resume website.

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies

**Windows:**
```bash
# Double-click setup.bat
# OR run in terminal:
npm install
```

**Mac/Linux:**
```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

### Step 3: Customize Your Content

Edit `data/resume-data.ts` with your information.

---

## 📝 Detailed Setup Guide

### Prerequisites Checklist

- [ ] Node.js 18.0 or higher installed
- [ ] npm 9.0 or higher installed
- [ ] Text editor (VS Code recommended)
- [ ] Modern web browser

### Installation Steps

1. **Open Terminal/Command Prompt** in the project directory

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - Next.js 14
   - React 18
   - TypeScript
   - Anime.js
   - Other required packages

3. **Verify Installation**
   ```bash
   npm run type-check
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   - Navigate to: http://localhost:3000
   - You should see the resume website!

---

## 🎨 Customization Guide

### 1. Personal Information

**File:** `data/resume-data.ts`

Update these sections:

#### Personal Details
```typescript
personal: {
  name: 'Your Full Name',
  title: 'Your Job Title',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'Your City, State',
  bio: 'Your professional bio...',
  avatar: '/images/your-avatar.jpg'
}
```

#### Social Links
```typescript
social: {
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourhandle',
  email: 'mailto:your.email@example.com'
}
```

#### Stats
```typescript
stats: {
  projects: 50,      // Number of completed projects
  experience: 8,     // Years of experience
  clients: 25        // Number of clients
}
```

#### Skills
```typescript
skills: [
  { 
    name: 'React', 
    level: 95,                    // Percentage (0-100)
    category: 'Frontend',         // Category for filtering
    icon: 'fab fa-react'          // Font Awesome icon class
  },
  // Add more skills...
]
```

#### Timeline (Work & Education)
```typescript
timeline: [
  {
    id: 'work-1',
    type: 'work',                 // 'work' or 'education'
    title: 'Senior Developer',
    organization: 'Company Name',
    period: '2021 - Present',
    startDate: '2021-03',
    endDate: 'present',
    description: 'Brief description of role...',
    achievements: [
      'Achievement 1',
      'Achievement 2'
    ],
    technologies: ['React', 'Node.js']
  },
  // Add more timeline items...
]
```

#### Portfolio Projects
```typescript
portfolio: [
  {
    id: 'project-1',
    title: 'Project Name',
    description: 'Project description...',
    image: '/images/portfolio/project.jpg',
    category: 'Web Application',
    technologies: ['Next.js', 'TypeScript'],
    liveUrl: 'https://project-demo.com',
    githubUrl: 'https://github.com/you/project',
    featured: true
  },
  // Add more projects...
]
```

### 2. Add Your Images

**Directory:** `public/images/`

Required images:
- `hero-avatar.jpg` - Your main profile photo (square, 800x800px)
- `about-photo.jpg` - Professional photo (800x1000px)
- `og-image.jpg` - Social sharing image (1200x630px)
- `favicon.ico` - Website favicon

Portfolio images:
- `portfolio/project-1.jpg`
- `portfolio/project-2.jpg`
- etc.

**Image Tips:**
- Use JPEG for photos
- Optimize images (compress before adding)
- Use consistent sizing
- Max file size: 500KB per image

### 3. Customize Colors

**File:** `styles/globals.css`

Find and modify CSS variables:

```css
:root {
  /* Primary Brand Color */
  --color-primary: #4f46e5;        /* Change to your brand color */
  --color-primary-light: #6366f1;
  --color-primary-dark: #3730a3;
  
  /* Secondary Color */
  --color-secondary: #f59e0b;
  
  /* Text Colors */
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  
  /* Background Colors */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9fafb;
}
```

**Color Scheme Examples:**

Professional Blue:
```css
--color-primary: #2563eb;
--color-secondary: #7c3aed;
```

Creative Purple:
```css
--color-primary: #7c3aed;
--color-secondary: #ec4899;
```

Tech Green:
```css
--color-primary: #10b981;
--color-secondary: #3b82f6;
```

### 4. Update SEO & Metadata

**File:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your professional description for search engines...',
  keywords: ['your', 'key', 'words'],
  
  openGraph: {
    title: 'Your Name - Portfolio',
    description: 'Your description',
    url: 'https://yourdomain.com',
    // ... more fields
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name',
    // ... more fields
  },
};
```

### 5. Customize Animations

**File:** `lib/animations.ts`

Adjust animation speeds:

```typescript
export const ANIMATION_DURATION = {
  FAST: 300,     // Quick animations (ms)
  BASE: 800,     // Default animations (ms)
  SLOW: 1000,    // Slow animations (ms)
  SLOWER: 1500,  // Very slow animations (ms)
};
```

Adjust animation styles:

```typescript
export const ANIMATION_EASING = {
  LINEAR: 'linear',
  EASE: 'easeInOutQuad',       // Smooth
  BOUNCE: 'easeOutBounce',     // Bouncy
  ELASTIC: 'easeOutElastic(1, .5)',  // Springy
  BACK: 'easeOutBack',         // Overshoot
};
```

---

## 🔧 Development Workflow

### Daily Development

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files
   - Save
   - Browser auto-refreshes!

3. **Check Types**
   ```bash
   npm run type-check
   ```

4. **Run Linter**
   ```bash
   npm run lint
   ```

### Before Deployment

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Test Production Build**
   ```bash
   npm start
   ```

3. **Verify Everything Works**
   - Check all pages
   - Test animations
   - Verify links
   - Test on mobile

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'next'"

**Solution:**
```bash
npm install
```

### Issue: Port 3000 is already in use

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: Images not loading

**Solution:**
- Check file paths
- Ensure images are in `public/images/`
- Use forward slashes: `/images/photo.jpg`

### Issue: Animations not working

**Solution:**
- Check browser console for errors
- Ensure animejs is installed
- Clear browser cache

### Issue: TypeScript errors

**Solution:**
```bash
# Check types
npm run type-check

# Fix formatting
npm run lint --fix
```

---

## 📚 Next Steps

### Beginner Tasks
- [ ] Update personal information
- [ ] Add your photos
- [ ] Change colors
- [ ] Add your projects
- [ ] Update social links

### Intermediate Tasks
- [ ] Customize animations
- [ ] Add new sections
- [ ] Modify component styles
- [ ] Add blog section
- [ ] Implement dark mode toggle

### Advanced Tasks
- [ ] Add backend API
- [ ] Connect contact form to email service
- [ ] Add analytics
- [ ] Implement CMS
- [ ] Add i18n (multiple languages)

---

## 🚀 Deployment

### Deploy to Vercel (Easiest)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

Your site is now live! 🎉

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag `.next` folder to Netlify

OR

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

---

## 💡 Tips & Tricks

### Performance Tips
- Optimize images before adding them
- Use lazy loading for heavy components
- Minimize animation complexity on mobile
- Enable code splitting

### Design Tips
- Keep it simple and clean
- Use consistent spacing
- Maintain good contrast ratios
- Test on real devices
- Get feedback from others

### SEO Tips
- Use descriptive page titles
- Write meaningful meta descriptions
- Add alt text to all images
- Use semantic HTML
- Submit sitemap to search engines

---

## 📞 Need Help?

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Anime.js Documentation](https://animejs.com/documentation/)
- [React Documentation](https://react.dev/)

### Community
- [Next.js Discord](https://nextjs.org/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
- [GitHub Issues](https://github.com/vercel/next.js/issues)

---

**Good luck with your animated resume website! 🌟**

Remember: Start simple, make it work, then make it beautiful!
