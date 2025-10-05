import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import TimelineSection from '@/components/sections/TimelineSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import { resumeData } from '@/data/resume-data';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection 
          name={resumeData.personal.name}
          title={resumeData.personal.title}
          description={resumeData.personal.bio}
          avatar={resumeData.personal.avatar}
          ctaButtons={[
            { label: 'View My Work', href: '#portfolio', variant: 'primary' },
            { label: 'Contact Me', href: '#contact', variant: 'outline' }
          ]}
        />
        <AboutSection 
          description={[resumeData.personal.bio]}
          stats={[
            { value: `${resumeData.stats.experience}`, label: 'Years Experience', suffix: '+' },
            { value: `${resumeData.stats.projects}`, label: 'Projects Completed', suffix: '+' },
            { value: `${resumeData.stats.clients}`, label: 'Happy Clients', suffix: '+' }
          ]}
          image="/images/about.jpg"
        />
        <SkillsSection skills={resumeData.skills} />
        <TimelineSection items={resumeData.timeline} />
        <PortfolioSection projects={resumeData.portfolio} />
        <ContactSection 
          contactInfo={[
            { icon: <span>📧</span>, label: 'Email', value: resumeData.personal.email, href: `mailto:${resumeData.personal.email}` },
            { icon: <span>📱</span>, label: 'Phone', value: resumeData.personal.phone, href: `tel:${resumeData.personal.phone}` },
            { icon: <span>📍</span>, label: 'Location', value: resumeData.personal.location }
          ]}
        />
      </main>
      <Footer 
        brandName={resumeData.personal.name}
        tagline="Building amazing web experiences"
        contactInfo={{
          email: resumeData.personal.email,
          phone: resumeData.personal.phone,
          address: resumeData.personal.location
        }}
      />
    </>
  );
}
