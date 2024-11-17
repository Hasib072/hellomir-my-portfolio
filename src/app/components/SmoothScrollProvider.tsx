// src/components/SmoothScrollProvider.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  let locomotiveScroll: LocomotiveScroll | null = null;

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();

    return () => {
      locomotiveScroll && locomotiveScroll.destroy();
      locomotiveScroll = null;
    };
  }, [pathname]);

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  );
};

export default SmoothScrollProvider;
