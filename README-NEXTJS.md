# Animated Resume Website - Next.js Edition

A modern, responsive, and animated resume website built with **Next.js 14**, **TypeScript**, and **Anime.js**. This project showcases your professional experience with sophisticated animations and interactive elements while maintaining excellent performance and accessibility.

## 🚀 Features

- ✨ **Smooth Animations**: Powered by Anime.js for fluid, performant animations
- ⚡ **Next.js 14 App Router**: Latest Next.js features with TypeScript
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ♿ **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- 🎨 **Modern Design**: Clean, professional UI with attention to detail
- 🚀 **Performance Optimized**: Lazy loading, efficient animations, and code splitting
- 🌙 **Dark Mode Support**: Respects system preferences
- 🎯 **SEO Optimized**: Proper meta tags and semantic HTML

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Variables
- **Animations**: Anime.js
- **Font**: Google Fonts (Inter & Poppins)
- **Icons**: Font Awesome (CDN)

## 🛠️ Installation

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- next@^14.2.0
- react@^18.3.0
- react-dom@^18.3.0
- animejs@^3.2.2
- clsx@^2.1.0
- TypeScript and type definitions

### Step 2: Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
animated-resume-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx             # Main page
├── components/
│   ├── Navigation.tsx       # Navigation bar
│   ├── Footer.tsx           # Footer component
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── SkillBar.tsx
├── lib/
│   ├── animations.ts        # Anime.js animation utilities
│   ├── dom-helpers.ts       # DOM manipulation helpers
│   └── utils.ts             # General utilities
├── data/
│   └── resume-data.ts       # Resume content data
├── types/
│   └── index.ts             # TypeScript type definitions
├── styles/
│   └── globals.css          # Global styles
├── public/
│   ├── images/              # Image assets
│   └── icons/               # Favicon and icons
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Customization

### 1. Personal Information

Edit `data/resume-data.ts` to update:
- Personal details (name, title, contact info)
- Skills and proficiency levels
- Work experience and education
- Portfolio projects
- Social media links
- Statistics

```typescript
export const resumeData: ResumeData = {
  personal: {
    name: 'Your Name',
    title: 'Your Title',
    // ... more fields
  },
  // ... more data
};
```

### 2. Colors & Theme

Modify CSS variables in `styles/globals.css`:

```css
:root {
  --color-primary: #4f46e5;
  --color-secondary: #f59e0b;
  /* ... more variables */
}
```

### 3. Animations

Customize animations in `lib/animations.ts`:

```typescript
export const ANIMATION_DURATION = {
  FAST: 300,
  BASE: 800,
  SLOW: 1000,
};
```

### 4. Images

Add your images to the `public/images/` directory:
- `hero-avatar.jpg` - Your profile photo
- `about-photo.jpg` - Professional photo
- `og-image.jpg` - Open Graph image for social sharing
- `portfolio/*.jpg` - Portfolio project images

### 5. Metadata

Update SEO and metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your description',
  // ... more metadata
};
```

## 🎯 Key Components

### Navigation
- Smooth scroll navigation
- Active section highlighting
- Mobile-responsive hamburger menu
- Sticky header with scroll effects

### Hero Section
- Typing animation for name
- Animated background
- Call-to-action buttons
- Scroll indicator

### About Section
- Profile photo with animations
- Stats counter animations
- Social media links
- Animated text reveal

### Skills Section
- Animated skill bars
- Percentage display
- Category filtering
- Scroll-triggered animations

### Timeline Section
- Work experience & education
- Animated timeline markers
- Card flip animations
- Technology tags

### Portfolio Section
- Project cards with hover effects
- Image overlays
- Technology stack display
- Live demo & code links

### Contact Section
- Floating label form
- Form validation
- Success/error messages
- Contact information

## 🚀 Performance Features

- **Intersection Observer API** for efficient scroll animations
- **Code Splitting** with Next.js dynamic imports
- **Image Optimization** with next/image
- **Font Optimization** with next/font
- **GPU Acceleration** for smooth animations
- **Lazy Loading** for images and components
- **Reduced Motion Support** for accessibility

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip links for screen readers
- Focus management
- High contrast mode support
- Reduced motion preferences
- Screen reader friendly

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and up

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- AWS Amplify
- Digital Ocean
- Heroku
- Railway

## 📝 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Anime.js](https://animejs.com/) - Animation library
- [Google Fonts](https://fonts.google.com/) - Typography
- [Font Awesome](https://fontawesome.com/) - Icons

## 📞 Support

If you have questions or need help with customization:

1. Check the documentation above
2. Review the code comments
3. Check Next.js documentation
4. Open an issue on GitHub

---

**Built with ❤️ using Next.js and Anime.js**

Happy coding! 🚀
