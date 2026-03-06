import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Instagram, Twitter } from 'lucide-react';
import { authorsConfig } from '@/config';

const AuthorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef(0);

  // Null check: if config is empty, return null
  if (!authorsConfig.sectionTitle && authorsConfig.authors.length === 0) {
    return null;
  }

  const authors = authorsConfig.authors;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        '.author-avatar',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragStartRef.current;

    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        setActiveIndex((prev) => (prev - 1 + authors.length) % authors.length);
      } else {
        setActiveIndex((prev) => (prev + 1) % authors.length);
      }
      dragStartRef.current = clientX;
    }
  }, [isDragging, authors.length]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleAvatarClick = (index: number) => {
    setActiveIndex(index);
  };

  const getAvatarStyle = (index: number) => {
    const totalAuthors = authors.length;
    const relativeIndex = (index - activeIndex + totalAuthors) % totalAuthors;

    // Normalize to -2 to 2 range for 5 items
    let normalizedIndex = relativeIndex;
    if (normalizedIndex > totalAuthors / 2) {
      normalizedIndex -= totalAuthors;
    }

    const radius = 450;
    const x = normalizedIndex * (radius / 2);

    const scale = normalizedIndex === 0 ? 1.5 : 1 - Math.abs(normalizedIndex) * 0.15;
    const opacity = normalizedIndex === 0 ? 1 : 0.5 + (1 - Math.abs(normalizedIndex) / 3) * 0.3;

    return {
      transform: `translateX(${x}px) scale(${scale})`,
      opacity,
      zIndex: 100 - Math.abs(normalizedIndex) * 10,
    };
  };

  const activeAuthor = authors[activeIndex];
  if (!activeAuthor) return null;

  return (
    <section
      ref={sectionRef}
      id="authors"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="font-oswald font-light text-4xl lg:text-5xl xl:text-6xl text-brand-text">
            {authorsConfig.sectionTitle}
          </h2>
          <p className="font-roboto text-sm text-brand-dark-gray mt-4">
            {authorsConfig.sectionSubtitle}
          </p>
        </div>

        {/* Orbit Container */}
        <div
          ref={orbitRef}
          className="relative h-[400px] lg:h-[500px] perspective-2000 cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Avatars */}
          <div className="absolute inset-0 flex items-center justify-center preserve-3d">
            {authors.map((author, index) => (
              <div
                key={author.id}
                className="author-avatar absolute cursor-pointer transition-all duration-500 ease-expo-out"
                style={getAvatarStyle(index)}
                onClick={() => handleAvatarClick(index)}
              >
                <div
                  className={`relative overflow-hidden transition-all duration-500 ${
                    index === activeIndex
                      ? 'w-32 h-32 lg:w-40 lg:h-40'
                      : 'w-20 h-20 lg:w-24 lg:h-24'
                  }`}
                  style={{
                    borderRadius: index === activeIndex ? '30%' : '50%',
                  }}
                >
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Active Author Info */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <h3 className="font-oswald font-medium text-2xl lg:text-3xl text-brand-text">
              {activeAuthor.name}
            </h3>
            <p className="font-roboto text-sm text-brand-dark-gray mt-1">
              {activeAuthor.role}
            </p>
            <p className="font-roboto text-xs text-brand-light-gray mt-2">
              {activeAuthor.articles} {authorsConfig.articlesSuffix}
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <a
                href={activeAuthor.social.instagram}
                className="text-brand-dark-gray hover:text-brand-text transition-colors cursor-hover"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={activeAuthor.social.twitter}
                className="text-brand-dark-gray hover:text-brand-text transition-colors cursor-hover"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {authors.map((_, index) => (
            <button
              key={index}
              onClick={() => handleAvatarClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-hover ${
                index === activeIndex
                  ? 'bg-brand-text w-6'
                  : 'bg-brand-border hover:bg-brand-light-gray'
              }`}
              aria-label={`View author ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;
