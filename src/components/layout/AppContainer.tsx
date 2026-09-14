import React from 'react';
import { cn } from '@/lib/utils';

export interface AppContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function AppContainer({
  children,
  className = '',
  as: Component = 'div',
  ...props
}: AppContainerProps) {
  return (
    <Component
      className={cn(
        'w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default AppContainer;
