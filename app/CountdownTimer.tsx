"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Set the launch target
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) return null; 

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', // Centers content internally
      alignItems: 'center',
      width: 'fit-content',     // Hugs the exact width of the numbers
      margin: '0 auto',         // Centers the pill itself on the page
      gap: '16px', 
      color: '#fff', 
      textAlign: 'center', 
      fontFamily: '"Inter", sans-serif',
      zIndex: 10, 
      position: 'relative',
      background: 'rgba(20, 14, 10, 0.4)',
      backdropFilter: 'blur(8px)',
      padding: '16px 32px',
      borderRadius: '50px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 600 }}>{String(timeLeft.days).padStart(2, '0')}</span>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>Days</span>
      </div>
      <span style={{ fontSize: '1.75rem', fontWeight: 600, opacity: 0.3 }}>:</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 600 }}>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>Hours</span>
      </div>
      <span style={{ fontSize: '1.75rem', fontWeight: 600, opacity: 0.3 }}>:</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 600 }}>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>Mins</span>
      </div>
      <span style={{ fontSize: '1.75rem', fontWeight: 600, opacity: 0.3 }}>:</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 600 }}>{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>Secs</span>
      </div>
    </div>
  );
}