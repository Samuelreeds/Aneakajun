"use client";

import { subscribeToWaitlist } from '@/lib/actions';
import Link from 'next/link';
import AnimatedTitle from './AnimatedTitle';
import CountdownTimer from "./CountdownTimer";
import SocialLinks from "./SocialLinks";

export default function ComingSoon() {
  const launchDate = process.env.NEXT_PUBLIC_LAUNCH_DATE || "2026-12-31T00:00:00";

  return (
    <div className="landing-body">
      
      {/* HEADER SECTION */}
      <header className="navbar" id="top">
        <Link href="/" className="logo" aria-label="Aneakajun Home">
          <img 
            src="/logo.jpg" 
            alt="Aneakajun Logo" 
            style={{ 
              height: '56px',       
              width: '56px',        
              borderRadius: '50%',  
              objectFit: 'cover'    
            }} 
          />
        </Link>
        <nav className="nav-links">
          <Link href="#top" className="active">Home</Link>
          <Link href="#about">About Us</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/auth#login" className="login">Log in</Link>
          <Link href="/auth#signup" className="signup">Sign up</Link>
        </div>
      </header>
        
      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <img className="layer base" src="/background.jpg" alt="Background" />
        <div className="shade"></div>

        <AnimatedTitle />
        
        <img className="layer front" src="/foreground.png" alt="Foreground" />
        <div className="shade-bottom"></div>
                
        <div className="center">
          <CountdownTimer targetDate={launchDate} />
          
          <form action={async (formData) => { await subscribeToWaitlist(formData); }} className="notify-form open">
            <input type="email" name="email" placeholder="Enter your email" required />
            <button type="submit">Notify Me</button>
          </form>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" style={{
        backgroundColor: '#000000',
        padding: '120px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '80vh',
        position: 'relative',
        zIndex: 20
      }}>
        <span style={{
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontSize: '0.85rem',
          color: '#a1a1aa',
          fontStyle: 'italic',
          marginBottom: '48px'
        }}>
          Introduction
        </span>

        <h2 style={{
          color: '#ffffff',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: '1.4',
          maxWidth: '900px',
          marginBottom: '64px'
        }}>
          Aneakajun helps you navigate your return to Cambodia, from finding work and housing to starting a business, investing, volunteering, and more.
        </h2>

        <Link href="/auth#signup" style={{
          backgroundColor: '#ffffff',
          color: '#000000',
          padding: '16px 32px',
          borderRadius: '12px',
          fontSize: '1.05rem',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'transform 0.2s ease, opacity 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = '1';
        }}
        >
          Subscribe to be updated
        </Link>
      </section>

      {/* SOCIAL LINKS (Fixed at bottom right) */}
      <SocialLinks />
      
    </div>
  );
}