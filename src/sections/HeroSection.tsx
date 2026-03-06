import { useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalInfo } from '@/data/personal';

const FloatingMesh = lazy(() => import('@/components/FloatingMesh'));

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        meshRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email' },
    { href: personalInfo.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: personalInfo.social.github, icon: Github, label: 'GitHub' },
    { href: personalInfo.social.twitter, icon: Twitter, label: 'Twitter' },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center pt-20 pb-16 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 md:order-1">
            {/* Availability Badge */}
            <div className="badge-modern mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>
                {t('Available for opportunities', 'Tersedia untuk kesempatan')}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              {personalInfo.name.split(' ').slice(0, 2).join(' ')}
              <br />
              <span className="gradient-text">
                {personalInfo.name.split(' ').slice(2).join(' ')}
              </span>
            </h1>

            {/* Title */}
            <p className="text-lg md:text-xl text-primary mb-6 font-medium">
              {t(personalInfo.title.en, personalInfo.title.id)}
            </p>

            {/* Bio */}
            <p className="text-muted-foreground leading-relaxed mb-8 whitespace-pre-line max-w-lg">
              {t(personalInfo.bio.en, personalInfo.bio.id)}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{personalInfo.location}</span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:border-primary/50 transition-all group"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* 3D Floating Mesh */}
          <div ref={meshRef} className="order-1 md:order-2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Suspense fallback={
                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 animate-pulse" />
              }>
                <FloatingMesh />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
