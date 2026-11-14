import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'raised' | 'bordered';
  showCrosshairs?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  showCrosshairs = false,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)]',
    raised: 'bg-[var(--surface-raised)] border border-[var(--border)] shadow-[var(--shadow-md)]',
    bordered: 'bg-transparent border border-[var(--border-strong)]',
  };

  return (
    <div
      className={clsx(
        'relative rounded-[var(--radius-sm)] p-5 transition-all duration-200',
        variantStyles[variant],
        showCrosshairs && 'blueprint-crosshair',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
