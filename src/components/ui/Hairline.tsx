import React from 'react';

interface HairlineProps extends React.HTMLAttributes<HTMLHRElement> {
  tone?: 'sand' | 'ink' | 'subtle-ink';
  className?: string;
}

export const Hairline: React.FC<HairlineProps> = ({
  tone = 'sand',
  className = '',
  ...props
}) => {
  const toneClasses = {
    sand: 'border-[#E8E3DC]',
    ink: 'border-[#16161D]',
    'subtle-ink': 'border-[#2D2D38]',
  };

  return (
    <hr
      className={`border-t border-0 w-full m-0 ${toneClasses[tone]} ${className}`}
      {...props}
    />
  );
};
