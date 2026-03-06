import { forwardRef } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  center?: boolean;
}

const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ title, subtitle, badge, className = '', center = true }, ref) => {
    return (
      <div ref={ref} className={`mb-12 ${center ? 'text-center' : ''} ${className}`}>
        {badge && (
          <span className="badge-modern mb-4 inline-flex">{badge}</span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
        {center && (
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        )}
      </div>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';

export default SectionHeading;
