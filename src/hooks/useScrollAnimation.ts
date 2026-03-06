import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export const useScrollAnimation = <T extends HTMLElement>(
  animation: (element: T, timeline: gsap.core.Timeline) => void,
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<T>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !elementRef.current) {
      return;
    }

    const element = elementRef.current;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || element,
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        scrub: options.scrub ?? false,
        pin: options.pin ?? false,
        markers: options.markers ?? false,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      },
    });

    if (timeline.scrollTrigger) {
      triggersRef.current.push(timeline.scrollTrigger);
    }

    animation(element, timeline);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      timeline.kill();
    };
  }, [animation, options]);

  return elementRef;
};

export const useRevealAnimation = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !elementRef.current) {
      if (elementRef.current) {
        elementRef.current.style.opacity = '1';
        elementRef.current.style.transform = 'none';
      }
      return;
    }

    const element = elementRef.current;

    gsap.set(element, {
      opacity: 0,
      y: 30,
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return elementRef;
};

export default useScrollAnimation;
