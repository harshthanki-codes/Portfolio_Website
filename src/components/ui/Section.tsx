import React from 'react';

export type SectionTone = 'paper' | 'ink' | 'coral';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  as?: 'section' | 'div' | 'article' | 'header' | 'footer';
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  tone = 'paper',
  as: Component = 'section',
  className = '',
  children,
  ...props
}) => {
  const toneClasses: Record<SectionTone, string> = {
    paper: 'bg-[#F7F5F2] text-[#16161D]',
    ink: 'bg-[#16161D] text-[#F7F5F2]',
    coral: 'bg-[#FF5A36] text-[#16161D]',
  };

  return (
    <Component
      data-tone={tone}
      className={`w-full relative ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
