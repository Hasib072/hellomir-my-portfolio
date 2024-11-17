// src/hooks/useTextScramble.ts

import { useEffect, useRef } from 'react';

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

interface UseTextScrambleOptions {
  texts: string[];
  revealDuration?: number; // in milliseconds
  hideDuration?: number;   // in milliseconds
}

export const useTextScramble = (
  textRef: React.RefObject<HTMLElement>,
  { texts, revealDuration = 800, hideDuration = 800 }: UseTextScrambleOptions
) => {
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const frameRequest = useRef<number | null>(null);
  const queue = useRef<QueueItem[]>([]);
  const frame = useRef(0);
  const resolvePromise = useRef<() => void>();

  const randomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const update = () => {
    if (!textRef.current) return;
    let output = '';
    let complete = 0;
    for (let i = 0, n = queue.current.length; i < n; i++) {
      const { from, to, start, end } = queue.current[i];
      let char = queue.current[i].char;
      if (frame.current >= end) {
        complete++;
        output += to;
      } else if (frame.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar();
          queue.current[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    textRef.current.innerHTML = output;
    if (complete === queue.current.length) {
      if (resolvePromise.current) {
        resolvePromise.current();
      }
    } else {
      frame.current++;
      frameRequest.current = requestAnimationFrame(update);
    }
  };

  const setText = (newText: string, durationMs: number) => {
    if (!textRef.current) return Promise.resolve();
    const oldText = textRef.current.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (resolvePromise.current = resolve));
    queue.current = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * (durationMs / 40));
      const end = start + Math.floor(Math.random() * (durationMs / 40));
      queue.current.push({ from, to, start, end });
    }
    if (frameRequest.current !== null) {
      cancelAnimationFrame(frameRequest.current);
    }
    frame.current = 0;
    update();
    return promise;
  };

  useEffect(() => {
    const handleMouseEnter = () => {
      setText(texts[1], revealDuration);
    };

    const handleMouseLeave = () => {
      setText(texts[0], hideDuration);
    };

    const el = textRef.current;
    if (el) {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (el) {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (frameRequest.current !== null) {
        cancelAnimationFrame(frameRequest.current);
      }
    };
  }, [textRef, texts, revealDuration, hideDuration]);
};
