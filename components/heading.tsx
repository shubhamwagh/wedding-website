import React from 'react';
import { cn } from '@/lib/utils';
import { Meow_Script } from 'next/font/google';

const meow = Meow_Script({ subsets: ['latin'], weight: '400' });

type Heading = {
  children: React.ReactNode;
};

export default function Heading({ children }: Heading) {
  return (
    <h2
      className={cn(
        'mb-8 text-center text-4xl leading-tight lg:text-6xl xl:text-7xl',
        meow.className,
      )}
    >
      {children}
    </h2>
  );
}
