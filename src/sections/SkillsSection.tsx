import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalInfo } from '@/data/personal';
import { sectionLabels } from '@/data/personal';
import SectionHeading from '@/components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const skillCards = skillsRef.current?.children;
      if (skillCards) {
        gsap.fromTo(
          skillCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        certsRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: certsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getLevelDots = (level: number) => {
    const dots = 5;
    const filled = Math.round((level / 100) * dots);
    return Array.from({ length: dots }, (_, i) => i < filled);
  };

  return (
    <section ref={sectionRef} className="section-modern">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          ref={headingRef}
          title={t(sectionLabels.skills.en, sectionLabels.skills.id)}
          subtitle={t('Technologies and tools I work with', 'Teknologi dan alat yang saya gunakan')}
        />

        {/* Skills Grid */}
        <div className="mb-16">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 text-center">
            {t('Technical Skills', 'Keterampilan Teknis')}
          </h3>
          <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {personalInfo.skills.map((skill) => (
              <div
                key={skill.name}
                className="glass-card p-4 flex flex-col items-center text-center gap-3"
              >
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <div className="flex gap-1.5">
                  {getLevelDots(skill.level).map((filled, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        filled ? 'bg-primary' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Awards */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 text-center">
            {t(sectionLabels.certifications.en, sectionLabels.certifications.id)}
          </h3>
          <div ref={certsRef} className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {personalInfo.certifications.map((cert) => (
              <div
                key={cert.name}
                className="glass-card p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <span className="badge-modern">{cert.year}</span>
                </div>
              </div>
            ))}

            {personalInfo.awards.map((award) => (
              <a
                key={award.name}
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 border-l-2 border-l-primary hover:border-l-primary/80"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-primary">
                      {award.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{award.achievement}</p>
                  </div>
                  <span className="badge-modern bg-primary/10 text-primary border-primary/20">Award</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
