'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function AnimatedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the component is mounted and ref is assigned
    if (!sectionRef.current) return;

    // Create a GSAP timeline
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power1.out' } });

    // Add animations to the timeline
    tl.from(sectionRef.current.querySelectorAll('.fade-in'), {
      opacity: 0,
      y: 50,
      stagger: 0.2,
    });

    // Clean up the timeline on unmount
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="animated-section">
      <h1 className="fade-in text-white">Welcome to My Portfolio</h1>
      <p className="fade-in">I'm excited to share my work with you.</p>
      <button className="fade-in">Learn More</button>
    </section>
  );
}
