'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();
  
  // Update IST time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options) + ' IST');
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle menu animations with GSAP
  useEffect(() => {
    if (isMenuOpen) {
      // Animate menu opening
      const tl = gsap.timeline();
      tl.to('.menu-overlay', {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        display: 'flex',
      });
      
      tl.fromTo('.menu-item', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power3.out'
      }, '-=0.1');
    } else {
      // Animate menu closing
      gsap.to('.menu-overlay', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set('.menu-overlay', { display: 'none' });
        }
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center">
        <div className="clock-container hidden md:block text-sm font-light">
          {currentTime}
        </div>
        
        <button 
          className="hamburger-menu relative z-50 w-8 h-8 flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`w-6 h-0.5 bg-white block transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
          <span className={`w-6 h-0.5 bg-white block transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-0.5 bg-white block transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
        </button>
      </nav>
      
      {/* Full screen menu overlay */}
      <div className="menu-overlay fixed inset-0 bg-black z-40 hidden opacity-0 flex-col justify-center items-center">
        <div className="menu-container flex flex-col gap-6 md:gap-8">
          {[
            { name: 'HOME', path: '/' },
            { name: 'ABOUT', path: '/about' },
            { name: 'PROJECTS', path: '/projects' },
            { name: 'CV', path: '/cv' },
            { name: 'CONTACT', path: '/contact' }
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`menu-item text-3xl md:text-4xl font-medium hover:text-gray-300 transition-colors ${
                pathname === item.path ? 'opacity-100' : 'opacity-80'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
              {pathname === item.path && <span className="ml-2">•</span>}
            </Link>
          ))}
        </div>
        
        <div className="social-links mt-16 flex gap-6">
          {[
            { name: 'EMAIL', href: 'mailto:your@email.com' },
            { name: 'GITHUB', href: 'https://github.com/yourusername' },
            { name: 'LINKEDIN', href: 'https://linkedin.com/in/yourusername' }
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-item text-sm uppercase opacity-80 hover:opacity-100 transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}