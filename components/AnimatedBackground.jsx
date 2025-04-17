'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Track mouse position
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create gradient animation
    const animate = () => {
      // Create gradient that shifts based on time and subtle mouse movement
      const time = Date.now() * 0.001;
      const gradientCenterX = canvas.width / 2 + Math.sin(time * 0.2) * (canvas.width * 0.1) + (mouseX - canvas.width / 2) * 0.02;
      const gradientCenterY = canvas.height / 2 + Math.cos(time * 0.1) * (canvas.height * 0.1) + (mouseY - canvas.height / 2) * 0.02;
      
      const gradient = ctx.createRadialGradient(
        gradientCenterX, gradientCenterY, 0,
        gradientCenterX, gradientCenterY, canvas.width * 0.8
      );
      
      // Pure black and white with varying opacity
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      // Clear canvas and draw gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 bg-black" 
        aria-hidden="true"
      />
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}