import React from 'react';
import NextLink from 'next/link';

export type ButtonVariant = 'coral' | 'ink' | 'outline' | 'primary' | 'secondary' | 'ghost';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg' | string;
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button: React.FC<ButtonProps> = ({
  variant = 'coral',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  href,
  disabled,
  ...props
}) => {
  // Map legacy variants to Ink and Coral design system
  const normalizedVariant =
    variant === 'primary' ? 'coral' :
    variant === 'secondary' ? 'ink' :
    variant === 'ghost' ? 'outline' :
    variant;

  const variantClasses: Record<'coral' | 'ink' | 'outline', string> = {
    coral:
      'bg-[#FF5A36] text-[#16161D] font-bold border border-[#FF5A36] hover:bg-[#e64e2c] active:bg-[#cc4222]',
    ink:
      'bg-[#16161D] text-[#F7F5F2] font-bold border border-[#16161D] hover:bg-[#252530] active:bg-[#0E0E12]',
    outline:
      'bg-transparent text-current font-bold border border-current hover:bg-current/10 active:bg-current/20',
  };

  const baseClasses =
    'inline-flex items-center justify-center gap-2 min-h-[48px] px-6 text-base tracking-tight transition-colors select-none font-display cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const content = (
    <>
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a
          href={href}
          className={`${baseClasses} ${variantClasses[normalizedVariant]} ${className}`}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <NextLink
        href={href}
        className={`${baseClasses} ${variantClasses[normalizedVariant]} ${className}`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </NextLink>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[normalizedVariant]} ${className}`}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};
