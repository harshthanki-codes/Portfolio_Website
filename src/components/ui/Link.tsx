import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { clsx } from 'clsx';
import { ArrowUpRight } from 'lucide-react';

export interface CustomLinkProps extends NextLinkProps {
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
  showArrow?: boolean;
}

export const Link: React.FC<CustomLinkProps> = ({
  href,
  children,
  className,
  isExternal = false,
  showArrow = false,
  ...props
}) => {
  const isExternalComputed =
    isExternal || (typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:')));

  const baseStyles =
    'inline-flex items-center gap-1 font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';

  if (isExternalComputed) {
    return (
      <a
        href={href.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(baseStyles, className)}
      >
        <span>{children}</span>
        {showArrow && <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />}
      </a>
    );
  }

  return (
    <NextLink href={href} className={clsx(baseStyles, className)} {...props}>
      <span>{children}</span>
      {showArrow && <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />}
    </NextLink>
  );
};
