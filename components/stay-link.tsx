'use client';
import React, { useRef } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

type StayLinkT = {
  title: string;
  href: string;
  label: string;
  align?: 'left' | 'middle' | 'right';
  children: React.ReactNode;
};
export default function StayLink({
  title,
  href,
  label,
  align = 'left',
  children,
}: StayLinkT) {
  const variants = {
    left: '',
    middle: 'xl:row-start-2 xl:col-start-2',
    right: 'xl:row-start-3 xl:col-start-3',
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className={cn(
        'mx-auto w-full max-w-lg text-center xl:max-w-xs',
        variants[align],
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ delay: 0.5 }}
      ref={ref}
    >
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-4 text-sm">{children}</p>
      <Button variant="default" asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Button>
    </motion.div>
  );
}
