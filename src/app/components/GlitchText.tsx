// src/components/GlitchText.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import localFont from 'next/font/local';

// Configure the custom font (ensure the path and font file are correct)
const antonSC = localFont({
  src: '../../app/fonts/AntonSC.ttf', // Adjust the path based on your project structure
  weight: '500', // Numeric weight, e.g., '400', '500'
  style: 'normal', // 'normal' or 'italic'
  variable: '--font-anton-sc', // Optional: Define a CSS variable for the font
});

interface GlitchTextProps {
  text: string;
  hoverText?: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, hoverText = '', className = '' }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Function to generate random character for glitch effect
  const generateRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  // Function to handle typing effect with optional glitch
  const typeWriterEffect = (fullText: string, currentIndex: number = 0) => {
    if (currentIndex <= fullText.length) {
      setDisplayedText(fullText.slice(0, currentIndex));

      // Optionally add glitch effect to the current character
      if (currentIndex < fullText.length) {
        const glitchTimeout = setTimeout(() => {
          setDisplayedText((prev) =>
            prev.slice(0, -1) + generateRandomChar()
          );
          setTimeout(() => {
            setDisplayedText(fullText.slice(0, currentIndex));
          }, 100); // Glitch duration per character
        }, Math.random() * 100);

        glitchTimeoutsRef.current.push(glitchTimeout);
      }

      typingTimeoutRef.current = setTimeout(() => {
        typeWriterEffect(fullText, currentIndex + 1);
      }, 100); // Typing speed
    }
  };

  const handleMouseEnter = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    glitchTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    glitchTimeoutsRef.current = [];
    // Start the typewriter effect with hoverText
    typeWriterEffect(hoverText || text, 0);
  };

  const handleMouseLeave = () => {
    // Clear any existing timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    glitchTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    glitchTimeoutsRef.current = [];

    // Revert back to the original text
    setDisplayedText(text);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      glitchTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      glitchTimeoutsRef.current = [];
    };
  }, []);

  return (
    <span
      className={`${antonSC.className} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayedText}
    </span>
  );
};

export default GlitchText;
