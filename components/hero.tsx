'use client';
import { cn } from '@/lib/utils';
import Countdown from '@/components/countdown';
import { Meow_Script } from 'next/font/google';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Navbar from './navbar';

const meow = Meow_Script({ subsets: ['latin'], weight: '400' });

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 2], [-distance, distance]);
}

export default function Hero() {
  const ref = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const { scrollYProgress, scrollY } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 200);

  scrollY.on('change', (position) => {
    if (position > window.innerHeight) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  });

  return (
    <header
      className="relative h-[65vh] w-full overflow-hidden sm:h-[110vh] lg:h-[75vh] xl:h-[85vh] 2xl:h-[120vh]"
      id="top"
    >
      <motion.img
        src="/main-hero.png"
        className="absolute left-0 top-32 -z-10 h-full w-full object-cover object-bottom sm:top-20 xl:top-auto xl:h-auto"
        style={{ y }}
      />
      <Navbar isFixed={isFixed} />
      <div className="mt-8 sm:-mt-4 lg:mt-20 xl:mt-12">
        <h1
          className={cn(
            'mb-5 text-center text-5xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] lg:text-[100px] xl:text-[180px]',
            meow.className,
          )}
        >
          Shilpa & Shubham
        </h1>
        <Countdown />
      </div>
      <div ref={ref} />
    </header>
  );
}
