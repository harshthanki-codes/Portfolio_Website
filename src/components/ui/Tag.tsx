import React from 'react';
import { clsx } from 'clsx';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export const Tag: React.FC<TagProps> = ({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
  };

  const variantStyles = {
    default: 'bg-[var(--surface-raised)] text-[var(--text-secondary)] border border-[var(--border)]',
    accent: 'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)] font-semibold',
    success: 'bg-emerald-950/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-950/20 text-amber-400 border border-amber-500/30',
    error: 'bg-red-950/20 text-red-400 border border-red-500/30',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center font-mono uppercase select-none rounded-[var(--radius-xs)] font-medium',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
