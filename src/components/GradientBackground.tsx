import { lazy, Suspense } from 'react';

const ShaderBackground = lazy(() => import('./ShaderBackground'));

function CSSFallback() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full animate-float opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full animate-float opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '-3s',
        }}
      />
    </div>
  );
}

export default function GradientBackground() {
  return (
    <Suspense fallback={<CSSFallback />}>
      <ShaderBackground />
    </Suspense>
  );
}
