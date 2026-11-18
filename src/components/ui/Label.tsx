import React from 'react';

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'muted' | 'coral';
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  tone = 'default',
  className = '',
  children,
  ...props
}) => {
  // On paper, coral text is forbidden.
  // 'default': inherits context text
  // 'muted': #55555F on paper, #B9B9C4 on ink
  // 'coral': only used on ink where contrast is strong
  const toneClasses = {
    default: 'text-current',
    muted: 'text-[#55555F] [data-tone="ink"]_&:text-[#B9B9C4]',
    coral: 'text-[#FF5A36]',
  };

  return (
    <span
      className={`type-label font-mono inline-block font-medium ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
