import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { latestArticlesConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const LatestArticles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Null check: if config is empty, return null
  if (!latestArticlesConfig.sectionTitle && latestArticlesConfig.articles.length === 0) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !trackRef.current || !triggerRef.current) {
      return;
    }

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const scrollTween = gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            setProgress(self.progress);

            // Tilt cards based on scroll velocity
            const velocity = self.getVelocity() / 1000;
            const cards = track.querySelectorAll('.article-card');
            cards.forEach((card) => {
              gsap.to(card, {
                skewX: Math.max(-10, Math.min(10, velocity * 0.5)),
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          },
        },
      });

      return () => {
        scrollTween.scrollTrigger?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number | null) => {
    setHoveredIndex(index);
  };

  return (
    <section ref={sectionRef} className="relative">
      {/* Section title */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20 lg:pt-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-20">
          <h2 className="font-oswald font-light text-4xl lg:text-5xl xl:text-6xl text-brand-text">
            {latestArticlesConfig.sectionTitle}
          </h2>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div ref={triggerRef} className="relative min-h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-6 lg:gap-12 pl-6 lg:pl-32 pr-6 lg:pr-12 py-20 lg:py-0"
          style={{ width: 'fit-content' }}
        >
          {latestArticlesConfig.articles.map((article, index) => (
            <div
              key={article.id}
              className={`article-card relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[400px] cursor-hover transition-all duration-500 ${
                hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : 'opacity-100'
              }`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardHover(null)}
            >
              <div className={`relative overflow-hidden transition-transform duration-500 ease-expo-out ${
                hoveredIndex === index ? 'scale-105' : 'scale-100'
              }`}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-expo-out hover:scale-110"
                  />
                </div>

                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-brand-pure-black/20 transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>

              {/* Title - floats outside on hover */}
              <div className={`mt-4 transition-all duration-500 ease-expo-out ${
                hoveredIndex === index ? '-translate-y-2' : 'translate-y-0'
              }`}>
                <span className="font-roboto text-xs uppercase tracking-wider text-brand-dark-gray">
                  {article.category}
                </span>
                <h3 className="font-oswald font-light text-xl lg:text-2xl text-brand-text mt-1">
                  {article.title}
                </h3>
                <p className="font-roboto text-sm text-brand-dark-gray mt-1">
                  {article.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-48 h-px bg-brand-border z-30 hidden lg:block">
        <div
          ref={progressRef}
          className="h-full bg-brand-text transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </section>
  );
};

export default LatestArticles;
