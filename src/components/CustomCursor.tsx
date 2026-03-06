import { useCustomCursor } from '@/hooks/useCustomCursor';

const CustomCursor = () => {
  const { dotRef, ringRef, isVisible } = useCustomCursor();

  // Check if device supports hover (not touch)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform, width, height' }}
      />
    </>
  );
};

export default CustomCursor;
