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
      <Navbar className="absolute top-0 left-0 w-full z-20"/>
      
      <div 
        ref={contentRef}
        className="container top-0 bottom-0 md:mt-32"
      >
        <div className="absolute top-0 left-0 w-full z-0">
          <DraggableLanyard
            className='w-screen h-screen pointer-events-auto select-none'
          />
        </div>

        <div className="pointer-events-none relative z-20 h-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center px-12">
          <div ref={textRef} className="text-column">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8">About Me</h1>
            
            <p className="text-lg md:text-xl font-light opacity-80 mb-8">
            I am a proactive and communicative individual currently engaged in a Research Internship at ESIEA Paris remotely via India.
            </p>
            
            <p className="text-base md:text-lg font-light opacity-70 mb-8">
            With a solid foundation in C++, React JS, Python, and Data Structures and Algorithms, I enjoy tackling complex problems and finding innovative solutions. 
            </p>
            
            <p className="text-base md:text-lg font-light opacity-70 mb-8">
              My approach combines minimalist aesthetics with interactive elements to create breakthrough digital experiences that leave a lasting impression.
            </p>
            
            <p className="text-base md:text-lg font-light opacity-70">
              Currently being focused on frontend development with React, Next.js and exploring the intersection of AI and practical application development.
            </p>
          </div>
          
        </div>

        
        
      </div>
    </main>
  );
}