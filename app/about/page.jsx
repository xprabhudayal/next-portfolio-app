// File: app/about/page.jsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Navbar';
import DraggableLanyard from '../../components/DraggableLanyard';
import AnimatedBackground from '../../components/AnimatedBackground';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const contentRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate content on page load
    const tl = gsap.timeline();
    
    // Animate text content
    tl.fromTo(
      textRef.current.querySelectorAll('p, h1, h2, h3'), 
      { y: 30, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.6, 
        ease: 'power3.out',
        delay: 0.3
      }
    );
    
    // Create scroll animations
    if (contentRef.current) {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleClass: { targets: contentRef.current, className: 'in-view' }
      });
    }
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      
      <div 
        ref={contentRef}
        className="container max-w-screen-xl mx-auto px-6 z-10 mt-24 md:mt-32 pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left column: About text */}
          <div ref={textRef} className="text-column">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8">About Me</h1>
            
            <p className="text-lg md:text-xl font-light opacity-80 mb-8">
              I'm a creative developer and digital experience designer focused on crafting innovative web applications that seamlessly blend artistry with technical precision.
            </p>
            
            <p className="text-base md:text-lg font-light opacity-70 mb-8">
              With a background spanning both design and development, I bring a unique perspective to each project, prioritizing user experience while implementing cutting-edge technical solutions.
            </p>
            
            <p className="text-base md:text-lg font-light opacity-70 mb-8">
              My approach combines minimalist aesthetics with interactive elements and thoughtful animations to create engaging digital experiences that leave a lasting impression.
            </p>
            
            <p className="text-base md:text-lg font-light opacity-70">
              Currently focused on frontend development with React, Next.js and exploring the intersection of creative coding and practical application development.
            </p>
          </div>
          
          {/* Right column: Draggable lanyard */}
          <div className="lanyard-column flex justify-center md:justify-end mt-8 md:mt-0">
            <DraggableLanyard 
              name="Your Name"
              title="Creative Developer"
              imageUrl="/profile-photo.jpg"
            />
          </div>
        </div>
      </div>
    </main>
  );
}