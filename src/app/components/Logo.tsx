// src/components/Logo.tsx

'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useTextScramble } from '../hooks/useTextScramble';
import localFont from 'next/font/local';
import '../styles/Logo.css';

// Configure the custom font (ensure the path and font file are correct)
const antonSC = localFont({
  src: '../../app/fonts/AntonSC.ttf', // Adjust the path based on your project structure
  weight: '500',
  style: 'normal',
  variable: '--font-anton-sc',
});

const Logo: React.FC = () => {
  const textRef = useRef<HTMLAnchorElement>(null);

  useTextScramble(textRef, {
    texts: ['MIR', 'MIR HASIBUL RAHMAN'],
    revealDuration: 2000, // Duration in milliseconds
    hideDuration: 1000,    // Duration in milliseconds
  });

  return (
    <Link
      href="/"
      ref={textRef}
      className={`logo ${antonSC.className}`}
      aria-label="Home"
    >
      MIR
    </Link>
  );
};

export default Logo;
