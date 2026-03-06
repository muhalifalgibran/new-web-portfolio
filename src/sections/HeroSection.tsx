import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalInfo } from '@/data/personal';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
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

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center pt-20 pb-16 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 md:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border-2 border-ink px-3 py-1.5 mb-6">
              <span className="w-2 h-2 bg-accent-green animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider">
                {t('Available for opportunities', 'Tersedia untuk kesempatan')}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-4 leading-tight">
              {personalInfo.name.split(' ').slice(0, 2).join(' ')}
              <br />
              <span className="text-ink-light">
                {personalInfo.name.split(' ').slice(2).join(' ')}
              </span>
            </h1>

            {/* Title */}
            <p className="font-mono text-lg md:text-xl text-accent-red mb-6 uppercase tracking-wide">
              {t(personalInfo.title.en, personalInfo.title.id)}
            </p>

            {/* Bio */}
            <p className="text-ink-light leading-relaxed mb-8 whitespace-pre-line">
              {t(personalInfo.bio.en, personalInfo.bio.id)}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-ink-light mb-8">
              <MapPin className="w-4 h-4" />
              <span className="font-mono text-sm">{personalInfo.location}</span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-brutal-outline"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal-outline"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal-outline"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal-outline"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div ref={imageRef} className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              {/* Pixel art placeholder */}
              <div className="w-64 h-64 md:w-80 md:h-80 brutal-border bg-paper-dark flex items-center justify-center relative overflow-hidden">
                {/* Pixel grid pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(#1a1a1a 1px, transparent 1px),
                      linear-gradient(90deg, #1a1a1a 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
                
                {/* Profile photo */}
                <img
                  src="/images/profile.jpeg"
                  alt={personalInfo.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Decorative pixels */}
                <div className="absolute top-4 left-4 w-4 h-4 bg-accent-red" />
                <div className="absolute top-4 right-4 w-4 h-4 bg-accent-blue" />
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-accent-green" />
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-ink" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 brutal-border bg-accent-red text-white px-3 py-1.5 font-mono text-xs uppercase">
                Flutter
              </div>
              <div className="absolute -bottom-4 -left-4 brutal-border bg-ink text-paper px-3 py-1.5 font-mono text-xs uppercase">
                5+ Years
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
