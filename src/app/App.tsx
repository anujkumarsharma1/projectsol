import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import '../index.css';
import '../styles/fonts.css';
// import { Navbar } from './components/Navbar'; // Commented out to use ThreeHero's internal nav
import { ThreeHero } from './components/ThreeHero'; // Import the new 3D component
import { EventsTimeline } from './components/EventsTimeline';
import { PrizePool } from './components/PrizePool';
import { Tracks } from './components/Tracks';
import { RacingJourney } from './components/RacingJourney';
import { Testimonials } from './components/Testimonials';
import { Sponsors } from './components/Sponsors';
import { SponsorshipRequest } from './components/SponsorshipRequest';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

// Updated Thick Neon Separator
const Separator = () => (
  <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
);

function App() {
  // F1 Racing Cursor with Advanced Animations
  useEffect(() => {
    const cursorCore = document.createElement('div');
    cursorCore.className = 'cursor-core';
    document.body.appendChild(cursorCore);

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let coreX = 0, coreY = 0;
    let ringX = 0, ringY = 0;
    let lastX = 0, lastY = 0;
    let trails: HTMLElement[] = [];
    let isMoving = false;
    let moveTimeout: any;

    const createTrail = (x: number, y: number) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      document.body.appendChild(trail);
      trails.push(trail);
      
      setTimeout(() => {
        trail.remove();
        trails = trails.filter(t => t !== trail);
      }, 600);
    };

    const createSpeedLine = (x: number, y: number, angle: number) => {
      const line = document.createElement('div');
      line.className = 'speed-line';
      line.style.left = x + 'px';
      line.style.top = y + 'px';
      line.style.transform = `rotate(${angle}deg)`;
      document.body.appendChild(line);
      
      setTimeout(() => line.remove(), 400);
    };

    let trailCounter = 0;
    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 2) {
        isMoving = true;
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => { isMoving = false; }, 100);
        
        // Create trails less frequently
        trailCounter++;
        if (trailCounter % 3 === 0) {
          createTrail(mouseX, mouseY);
        }
        
        // Create speed lines on fast movement
        if (distance > 8) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          createSpeedLine(mouseX, mouseY, angle + 180);
        }
      }
      
      lastX = mouseX;
      lastY = mouseY;
    };

    const animateCursor = () => {
      // Smooth follow for core
      coreX += (mouseX - coreX) * 0.2;
      coreY += (mouseY - coreY) * 0.2;
      cursorCore.style.left = coreX + 'px';
      cursorCore.style.top = coreY + 'px';
      
      // Slower follow for ring
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      
      requestAnimationFrame(animateCursor);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('button') || target.closest('a') || 
          target.getAttribute('role') === 'button') {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      cursorCore.remove();
      cursorRing.remove();
      trails.forEach(trail => trail.remove());
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-poppins selection:bg-red-500 selection:text-white overflow-x-hidden">
      <Toaster position="top-right" theme="dark" toastOptions={{
        style: {
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'white',
          backdropFilter: 'blur(10px)'
        }
      }} />

      {/* NOTE: The original <Navbar /> is commented out because <ThreeHero /> 
        contains its own navigation bar that reveals after the loader. 
      */}
      {/* <Navbar /> */}

      {/* New 3D Landing Section */}
      <ThreeHero />
      
      <Separator />
      <EventsTimeline />
      <Separator />
      <PrizePool />
      <Separator />
      <Tracks />
      <Separator />
      <RacingJourney />
      <Separator />
      <Testimonials />
      <Separator />
      <Sponsors />
      <Separator />
      <SponsorshipRequest />
      <Separator />
      <FAQ />
      <Separator />
      <Footer />
    </div>
  );
}

export default App;