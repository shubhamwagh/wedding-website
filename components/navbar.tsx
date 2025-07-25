'use client';
import { cn } from '@/lib/utils';
import React from 'react';

function NavLink({
  href,
  children,
  isLogo,
  hideOnMobile,
}: {
  href: string;
  children: React.ReactNode;
  isLogo?: boolean;
  hideOnMobile?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        'rounded-full px-3 py-1',
        !isLogo &&
          'hover:transition-color hover:bg-gold/30 hover:backdrop-blur',
        hideOnMobile && 'hidden lg:block',
      )}
    >
      {children}
    </a>
  );
}

export default function Navbar({ isFixed }: { isFixed: boolean }) {
  return (
    <div
      className={cn(
        'mt-4 w-full lg:w-auto',
        isFixed && 'fixed left-1/2 top-4 z-[100] mt-0 -translate-x-1/2 px-2',
      )}
    >
      <nav
        className={cn(
          'flex w-full snap-x items-center justify-between gap-4 overflow-x-auto whitespace-nowrap px-4 py-0 text-green font-bold lg:justify-center lg:gap-12',
          isFixed &&
            'rounded-full bg-white/50 text-sm text-gray ring-1 ring-light-gray/50 backdrop-blur-md',
        )}
      >
        <NavLink href="#our-story" hideOnMobile>
          Our Story
        </NavLink>
        <NavLink href="#schedule" hideOnMobile>
          Schedule
        </NavLink>
        <NavLink href="#stay" hideOnMobile>
          Stay
        </NavLink>
        <NavLink href="#top" isLogo>
          <img
            src="/logo_3.png"
            alt="Logo"
            className={cn('lg:mx-auto', isFixed ? 'w-20' : 'w-20 lg:w-32')}
          />
        </NavLink>
        <NavLink href="#faq" hideOnMobile>
          FAQ
        </NavLink>
        <NavLink href="#registry" hideOnMobile>
          Registry
        </NavLink>
        <NavLink href="#rsvp">RSVP</NavLink>
      </nav>
    </div>
  );
}
