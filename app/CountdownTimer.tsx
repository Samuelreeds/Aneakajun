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
    <div className="countdown-pill">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className="num">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="lbl">Days</span>
      </div>
      <span className="colon">:</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className="num">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="lbl">Hours</span>
      </div>
      <span className="colon">:</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className="num">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="lbl">Mins</span>
      </div>
      <span className="colon">:</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className="num">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="lbl">Secs</span>
      </div>
    </div>
  );
}