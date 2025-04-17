// File: app/projects/page.jsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Navbar';
import AnimatedBackground from '../../components/AnimatedBackground';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Project data - replace with data from your xpdv.github.io site
const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'An interactive web application built with React and Three.js',
    image: '/project1.jpg', // Replace with actual path
    tags: ['React', 'Three.js', 'WebGL'],
    url: 'https://github.com/yourusername/project-one'
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A data visualization dashboard with real-time updates',
    image: '/project2.jpg', // Replace with actual path
    tags: ['D3.js', 'Vue', 'Firebase'],
    url: 'https://github.com/yourusername/project-two'
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Mobile-first e-commerce platform with custom CMS',
    image: '/project3.jpg', // Replace with actual path
    tags: ['Next.js', 'Tailwind CSS', 'Stripe'],
    url: 'https://github.com/yourusername/project-three'
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'AI-powered content recommendation engine',
    image: '/project4.jpg', // Replace with actual path
    tags: ['Python', 'TensorFlow', 'React'],
    url: 'https://github.com/yourusername/project-four'
  },
  {
    id: 5,
    title: 'Project Five',
    description: 'Interactive storytelling experience with dynamic animations',
    image: '/project5.jpg', // Replace with actual path
    tags: ['GSAP', 'JavaScript', 'SVG'],
    url: 'https://github.com/yourusername/project-five'
  },
  {
    id: 6,
    title: 'Project Six',
    description: 'Experimental typography and motion design showcase',
    image: '/project6.jpg', // Replace with actual path
    tags: ['CSS', 'Canvas API', 'Animation'],
    url: 'https://github.com/yourusername/project-six'
  }
];

export default function Projects() {
  const gridRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    // Set initial state of projects (hidden)
    gsap.set(projectRefs.current, { y: 30, opacity: 0 });
    
    // Animate each project card when it comes into view
    projectRefs.current.forEach((project, index) => {
      ScrollTrigger.create({
        trigger: project,
        start: 'top bottom-=100',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(project, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1, // Staggered effect
          });
        },
        once: true
      });
    });
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle cursor effects for project cards
  useEffect(() => {
    // Only apply these effects on non-touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      const cards = document.querySelectorAll('.project-card');
      
      cards.forEach(card => {
        // Create custom cursor element for this card
        const viewText = document.createElement('div');
        viewText.className = 'view-project-cursor opacity-0 fixed text-xs uppercase tracking-widest bg-white text-black py-1 px-3 rounded-full pointer-events-none z-50 transition-opacity duration-300';
        viewText.textContent = 'View Project';
        document.body.appendChild(viewText);
        
        // Mouse enter
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Show custom cursor
          viewText.classList.remove('opacity-0');
        });
        
        // Mouse move
        card.addEventListener('mousemove', (e) => {
          gsap.to(viewText, {
            x: e.clientX + 20,
            y: e.clientY,
            duration: 0.1
          });
        });
        
        // Mouse leave
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Hide custom cursor
          viewText.classList.add('opacity-0');
        });
      });
    }
  }, []);

  // Set refs for animation targeting
  const setProjectRef = (el, index) => {
    projectRefs.current[index] = el;
  };

  return (
    <main className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container max-w-screen-xl mx-auto px-6 z-10 mt-24 md:mt-32 pb-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-16">Projects</h1>
        
        {/* Asymmetric grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={(el) => setProjectRef(el, index)}
              className={`project-card group relative ${
                index % 5 === 0 ? 'md:col-span-2' : ''
              } ${
                index % 3 === 0 ? 'lg:col-span-2' : ''
              } opacity-0`}
            >
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <div className="overflow-hidden relative aspect-[4/3] bg-zinc-900 mb-4">
                  {/* Project image with blur placeholder */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Project info */}
                <div className="project-info">
                  <h3 className="text-xl md:text-2xl font-medium mb-2">{project.title}</h3>
                  <p className="text-base opacity-70 mb-4">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs py-1 px-2 border border-white/20 rounded-md opacity-60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}