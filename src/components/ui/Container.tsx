import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
