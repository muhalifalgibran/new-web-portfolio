import { useRef, useCallback, useEffect, useState } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export const useMagneticEffect = <T extends HTMLElement>(options: MagneticOptions = {}) => {
  const { strength = 0.3, radius = 100 } = options;
  const elementRef = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const magnetX = distanceX * strength;
        const magnetY = distanceY * strength;
        elementRef.current.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
        setIsHovered(true);
      } else {
        elementRef.current.style.transform = 'translate(0, 0)';
        setIsHovered(false);
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.transform = 'translate(0, 0)';
      setIsHovered(false);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return { elementRef, isHovered, handleMouseLeave };
};

export default useMagneticEffect;
