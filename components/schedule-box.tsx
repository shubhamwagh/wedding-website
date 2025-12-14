'use client';
import React, { useRef } from 'react';
import AnimatedScrable from './scrable';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

type Vars = {
  [x: number]: string;
};
const variants: Vars = {
  1: 'xl:col-start-1',
  2: 'xl:row-start-2 xl:col-start-2',
  3: 'xl:row-start-3 xl:col-start-1',
  4: 'xl:row-start-4 xl:col-start-2',
  5: 'xl:row-start-5 xl:col-start-1',
};

type ScheduleBoxT = {
  title: string;
  time: string;
  variant: number;
  children: React.ReactNode;
};
export default function ScheduleBox({
  title,
  time,
  variant,
  children,
}: ScheduleBoxT) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className={cn(
        'relative mx-auto w-full max-w-2xl xl:max-w-sm',
        variants[variant],
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ delay: 0.5 }}
      ref={ref}
    >
      <h4 className="text-lg font-bold before:absolute before:-ml-4 before:-translate-x-full before:content-['❤︎']">
        {title}
      </h4>
      <span className="mb-4 block text-sm font-bold text-gold">{time}</span>
      <p>{children}</p>
      {variant < 3 ? <AnimatedScrable variant={variant} /> : null}
    </motion.div>
  );
}
