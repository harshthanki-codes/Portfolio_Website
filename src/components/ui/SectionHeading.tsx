import React from 'react';
import { clsx } from 'clsx';

export interface SectionHeadingProps {
  number: string;
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  tag,
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={clsx('space-y-2 mb-10', className)}>
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
        <span>{number}</span>
        <span className="text-[var(--text-tertiary)]">//</span>
        <span>{tag}</span>
        <div className="h-px bg-[var(--border)] flex-1 max-w-[120px]" />
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
