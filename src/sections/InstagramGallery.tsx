import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ExternalLink } from 'lucide-react';
import { instagramGalleryConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const InstagramGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Null check: if config is empty, return null
  if (!instagramGalleryConfig.handle && instagramGalleryConfig.images.length === 0) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Grid items fade in animation
      const gridItems = gridRef.current?.querySelectorAll('.insta-item');
      if (gridItems) {
        gridItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              scale: 0.8,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
              },
              delay: index * 0.06,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <a
            href={instagramGalleryConfig.handleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 group cursor-hover"
          >
            <Instagram size={24} className="text-brand-text" />
            <h2 className="font-oswald font-light text-3xl lg:text-4xl text-brand-text group-hover:text-brand-dark-gray transition-colors">
              {instagramGalleryConfig.handle}
            </h2>
            <ExternalLink size={16} className="text-brand-dark-gray opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <p className="font-roboto text-sm text-brand-dark-gray mt-2">
            {instagramGalleryConfig.description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div>
          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-3"
          >
            {instagramGalleryConfig.images.map((item) => (
              <div
                key={item.id}
                className="insta-item relative aspect-square overflow-hidden cursor-hover group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  src={item.image}
                  alt={`Instagram post ${item.id}`}
                  className={`w-full h-full object-cover transition-all duration-500 ease-expo-out ${
                    hoveredItem === item.id ? 'scale-110' : 'scale-100'
                  }`}
                />

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-brand-pure-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="text-center">
                    <Instagram size={24} className="text-white mx-auto mb-2" />
                    <p className="font-roboto text-sm text-white">
                      {item.likes.toLocaleString()} {instagramGalleryConfig.likesSuffix}
                    </p>
                  </div>
                </div>

                {/* Warp streak effect on fast scroll - CSS only version */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    transform: 'skewX(-15deg)',
                    animation: hoveredItem === item.id ? 'streak 0.5s ease-out' : 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Follow CTA */}
        <div className="mt-12 text-center">
          <a
            href={instagramGalleryConfig.handleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-linen transition-all duration-300 cursor-hover group"
          >
            <Instagram size={18} />
            <span className="font-roboto text-sm uppercase tracking-wider">
              {instagramGalleryConfig.followText}
            </span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes streak {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 1;
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default InstagramGallery;
