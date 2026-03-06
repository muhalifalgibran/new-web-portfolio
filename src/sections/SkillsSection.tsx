import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalInfo } from '@/data/personal';
import { sectionLabels } from '@/data/personal';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skills animation
      const skillBars = skillsRef.current?.querySelectorAll('.skill-bar');
      skillBars?.forEach((bar, index) => {
        gsap.fromTo(
          bar,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate the progress bar
        const progress = bar.querySelector('.skill-progress');
        const level = personalInfo.skills[index]?.level || 0;
        gsap.fromTo(
          progress,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1,
            delay: index * 0.1 + 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Certifications animation
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

  return (
    <section ref={sectionRef} className="section-brutal bg-paper-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-mono font-bold mb-12 text-center"
        >
          {t(sectionLabels.skills.en, sectionLabels.skills.id)}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Skills */}
          <div ref={skillsRef}>
            <h3 className="font-mono text-lg uppercase tracking-wider mb-6 text-ink-light">
              {t('Technical Skills', 'Keterampilan Teknis')}
            </h3>
            <div className="space-y-5">
              {personalInfo.skills.map((skill) => (
                <div key={skill.name} className="skill-bar">
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm uppercase">{skill.name}</span>
                    <span className="font-mono text-sm text-ink-light">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-paper border-2 border-ink">
                    <div
                      className="skill-progress h-full bg-ink transition-all duration-1000"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Awards */}
          <div>
            <h3 className="font-mono text-lg uppercase tracking-wider mb-6 text-ink-light">
              {t(sectionLabels.certifications.en, sectionLabels.certifications.id)}
            </h3>
            <div ref={certsRef} className="space-y-4">
              {personalInfo.certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="card-brutal hover:shadow-brutal-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-mono font-bold uppercase">{cert.name}</h4>
                      <p className="text-sm text-ink-light">{cert.issuer}</p>
                    </div>
                    <span className="tag-brutal bg-paper-dark">{cert.year}</span>
                  </div>
                </div>
              ))}

              {personalInfo.awards.map((award) => (
                <a
                  key={award.name}
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-brutal hover:shadow-brutal-lg transition-shadow block border-accent-red"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-mono font-bold uppercase text-accent-red">
                        {award.name}
                      </h4>
                      <p className="text-sm text-ink-light">{award.achievement}</p>
                    </div>
                    <span className="tag-brutal bg-accent-red text-white">🏆</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
