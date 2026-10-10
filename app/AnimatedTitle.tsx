"use client";

import { useEffect, useState } from "react";

const PHRASES = ["Aneakajun", "Coming Soon"];
// Find the longest word so we can pad the shorter ones
const MAX_LENGTH = Math.max(...PHRASES.map(p => p.length));

export default function AnimatedTitle() {
  const [index, setIndex] = useState(0);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    // Trigger initial pop up slightly after page load
    const initialTimeout = setTimeout(() => setIsIn(true), 100);

    const interval = setInterval(() => {
      // Trigger the slide-down exit animation
      setIsIn(false);
      
      // Wait for exit to finish, swap the word, then slide-up again
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length);
        setIsIn(true);
      }, 800); 
    }, 4000); // Swap phrase every 4 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Pad the current word with empty spaces so the array is always 11 characters long.
  // This prevents React from unmounting the last few letters and snapping abruptly.
  const currentWord = PHRASES[index].padEnd(MAX_LENGTH, ' ');

  return (
    <div 
      aria-hidden="true" 
      style={{ 
        zIndex: 3, 
        position: 'absolute', 
        top: '20vh', // Lifts the text high into the sky to clear the central temple towers
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{ 
        display: 'flex', 
        fontSize: '11vw', 
        fontWeight: 800, 
        color: '#fff',
        fontFamily: '"Inter", sans-serif',
        lineHeight: 1.1,
        whiteSpace: 'nowrap'
      }}>
        {currentWord.split('').map((char, i) => (
          <span 
            key={i} 
            style={{ 
              display: 'inline-block', 
              overflow: 'hidden', 
              verticalAlign: 'bottom' 
            }}
          >
            <span 
              style={{ 
                display: 'inline-block', 
                transform: isIn ? 'translateY(0)' : 'translateY(100%)',
                transition: `transform ${isIn ? '0.85s' : '0.7s'} cubic-bezier(${isIn ? '0.22, 1, 0.36, 1' : '0.65, 0, 0.35, 1'})`,
                transitionDelay: `${i * (isIn ? 60 : 40)}ms`,
                minWidth: char === ' ' ? '2.5vw' : 'auto'
              }}
            >
              {char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}