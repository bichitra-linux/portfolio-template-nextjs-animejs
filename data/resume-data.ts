import { ResumeData } from '@/types';

export const resumeData: ResumeData = {
  personal: {
    name: 'John Doe',
    title: 'Senior Frontend Developer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate Senior Frontend Developer with over 8 years of experience in creating exceptional digital experiences. My expertise spans across modern JavaScript frameworks, responsive design, and performance optimization.',
    avatar: '/images/hero-avatar.jpg'
  },
  
  social: {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    email: 'mailto:john.doe@example.com'
  },
  
  stats: {
    projects: 50,
    experience: 8,
    clients: 25
  },
  
  skills: [
    { name: 'React', level: 95, category: 'Frontend', icon: 'fab fa-react' },
    { name: 'Next.js', level: 90, category: 'Frontend', icon: 'fas fa-code' },
    { name: 'TypeScript', level: 92, category: 'Languages', icon: 'fas fa-code' },
    { name: 'JavaScript', level: 98, category: 'Languages', icon: 'fab fa-js' },
    { name: 'Node.js', level: 85, category: 'Backend', icon: 'fab fa-node' },
    { name: 'CSS/SASS', level: 95, category: 'Frontend', icon: 'fab fa-css3' },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend', icon: 'fas fa-palette' },
    { name: 'Git', level: 93, category: 'Tools', icon: 'fab fa-git' },
    { name: 'Webpack', level: 80, category: 'Tools', icon: 'fas fa-box' },
    { name: 'GraphQL', level: 85, category: 'Backend', icon: 'fas fa-database' },
    { name: 'REST APIs', level: 90, category: 'Backend', icon: 'fas fa-plug' },
    { name: 'Testing', level: 88, category: 'Tools', icon: 'fas fa-check' }
  ],
  
  timeline: [
    {
      id: 'work-1',
      type: 'work',
      title: 'Senior Frontend Developer',
      organization: 'Tech Corp',
      period: '2021 - Present',
      startDate: '2021-03',
      endDate: 'present',
      description: 'Leading the development of enterprise-scale web applications using React and Next.js.',
      achievements: [
        'Architected and developed a micro-frontend platform serving 500K+ users',
        'Improved application performance by 60% through optimization techniques',
        'Mentored a team of 5 junior developers',
        'Implemented CI/CD pipelines reducing deployment time by 40%'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS']
    },
    {
      id: 'work-2',
      type: 'work',
      title: 'Frontend Developer',
      organization: 'Digital Agency',
      period: '2019 - 2021',
      startDate: '2019-06',
      endDate: '2021-03',
      description: 'Developed responsive websites and web applications for various clients.',
      achievements: [
        'Built 20+ client websites with 100% satisfaction rate',
        'Reduced page load times by 50% on average',
        'Implemented accessibility standards (WCAG 2.1 AA)',
        'Led migration from Vue to React for major client project'
      ],
      technologies: ['React', 'Vue.js', 'JavaScript', 'SASS', 'Webpack']
    },
    {
      id: 'work-3',
      type: 'work',
      title: 'Junior Frontend Developer',
      organization: 'StartUp Inc',
      period: '2017 - 2019',
      startDate: '2017-01',
      endDate: '2019-06',
      description: 'Contributed to the development of a SaaS product.',
      achievements: [
        'Developed reusable component library',
        'Implemented responsive designs across all devices',
        'Collaborated with UX team to improve user experience',
        'Participated in code reviews and agile ceremonies'
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'jQuery', 'Bootstrap']
    },
    {
      id: 'edu-1',
      type: 'education',
      title: 'Bachelor of Science in Computer Science',
      organization: 'State University',
      period: '2013 - 2017',
      startDate: '2013-09',
      endDate: '2017-05',
      description: 'Graduated with honors, specializing in web technologies and software engineering.',
      achievements: [
        'GPA: 3.8/4.0',
        'Dean\'s List all semesters',
        'President of Computer Science Club',
        'Winner of University Hackathon 2016'
      ]
    }
  ],
  
  portfolio: [
    {
      id: 'project-1',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with Next.js and Stripe integration.',
      image: '/images/portfolio/ecommerce.jpg',
      category: 'Web Application',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/johndoe/ecommerce',
      featured: true
    },
    {
      id: 'project-2',
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates.',
      image: '/images/portfolio/taskapp.jpg',
      category: 'Web Application',
      technologies: ['React', 'Firebase', 'Material-UI', 'TypeScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/johndoe/taskapp',
      featured: true
    },
    {
      id: 'project-3',
      title: 'Portfolio Template',
      description: 'Modern portfolio template with dark mode and animations.',
      image: '/images/portfolio/portfolio.jpg',
      category: 'Template',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/johndoe/portfolio',
      featured: false
    },
    {
      id: 'project-4',
      title: 'Weather Dashboard',
      description: 'Real-time weather dashboard with interactive maps and forecasts.',
      image: '/images/portfolio/weather.jpg',
      category: 'Web Application',
      technologies: ['React', 'OpenWeather API', 'Chart.js', 'Mapbox'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/johndoe/weather',
      featured: false
    },
    {
      id: 'project-5',
      title: 'Blog CMS',
      description: 'Headless CMS for blog management with markdown support.',
      image: '/images/portfolio/blog.jpg',
      category: 'CMS',
      technologies: ['Next.js', 'MDX', 'Contentful', 'TypeScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/johndoe/blog-cms',
      featured: false
    },
    {
      id: 'project-6',
      title: 'Fitness Tracker',
      description: 'Mobile-first fitness tracking application with progress charts.',
      image: '/images/portfolio/fitness.jpg',
      category: 'Web Application',
      technologies: ['React', 'Chart.js', 'IndexedDB', 'PWA'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/johndoe/fitness',
      featured: false
    }
  ]
};
