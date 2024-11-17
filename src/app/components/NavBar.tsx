'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo'; // Import the Logo component
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function NavBar() {
  const navRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    // Navbar fade out on scroll
    if (navRef.current) {
      gsap.to(navRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: navRef.current,
          start: 'top top',
          end: '+=100',
          scrub: true,
        },
      });
    }
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-0 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center - Nav Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-baseline space-x-8">
              <Link href="/projects" className="nav-link">
                Projects
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
            </div>
          </div>

          {/* Right Side - Let's Talk Button */}
          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="text-lg font-bold px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors inline-block"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
