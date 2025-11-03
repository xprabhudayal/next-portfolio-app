'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

const Nav3D = () => {
  const mountRef = useRef(null);
  const router = useRouter();
  const [font, setFont] = useState(null);
  const [loadingFont, setLoadingFont] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const navItems = [
    { text: 'ABOUT', path: '/about' },
    { text: 'PROJECTS', path: '/projects' },
    { text: 'RESUME', path: '/cv' },
    { text: 'CONTACT', path: '/contact' },
  ];

  // Load the font - FIXED: Use a known working font path
  useEffect(() => {
    const loader = new FontLoader();
    
    // Using Helvetica font from Three.js examples
    loader.load('/fonts/Switzer-Variable.json', (loadedFont) => {
      setFont(loadedFont);
      setLoadingFont(false);
    }, 
    // Progress callback
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Error callback
    (error) => {
      console.error('Font could not be loaded:', error);
      setLoadingFont(false);
      setLoadingError(true);
      
      // Try fallback font if available
      loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (fallbackFont) => {
        console.log('Loaded fallback font');
        setFont(fallbackFont);
        setLoadingError(false);
      }, undefined, (fallbackError) => {
        console.error('Fallback font also failed:', fallbackError);
      });
    });
  }, []);

  useEffect(() => {
    if (loadingFont || !font || !mountRef.current) return;

    const currentMount = mountRef.current;
    let scene, camera, renderer, raycaster, mouse;
    const textMeshes = []; // To store clickable text meshes
    const textShadows = []; // Store shadow meshes for animation

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background

    // Camera - FIXED: Better positioning
    const aspect = currentMount.clientWidth / currentMount.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    camera.position.set(0, 0, 80); // Adjusted for better viewing

    // Renderer - FIXED: Better renderer settings
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    currentMount.appendChild(renderer.domElement);

    // Lighting - FIXED: Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft ambient light
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(-5, -10, 10);
    scene.add(pointLight);

    // Raycaster for mouse interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Create 3D Text and Shadows - FIXED: Improved materials and positioning
    const create3DText = (text, yPosition, isShadow = false) => {
      const textGeo = new TextGeometry(text, {
        font: font,
        size: 2.5, // Larger size
        height: isShadow ? 0.1 : 0.8, // More height for main text
        curveSegments: 12,
        bevelEnabled: !isShadow,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      
      textGeo.computeBoundingBox();
      const textWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
      textGeo.translate(-textWidth / 2, 0, 0); // Center the text

      let material;
      
      if (isShadow) {
        material = new THREE.MeshStandardMaterial({
          color: 0x333333,
          metalness: 0.2,
          roughness: 0.8,
          transparent: true,
          opacity: 0.6
        });
      } else {
        material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.5,
          roughness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.2,
          reflectivity: 0.5
        });
      }

      const mesh = new THREE.Mesh(textGeo, material);
      mesh.position.y = yPosition;

      if (isShadow) {
        mesh.rotation.x = -Math.PI / 2; // Flat for shadow
        mesh.position.z = -1; // Behind main text
        mesh.position.y -= 0.7; // Adjusted shadow position
        textShadows.push(mesh);
      } else {
        // Store non-shadow meshes for raycasting
        mesh.userData = { 
          path: navItems.find(item => item.text === text)?.path, 
          originalY: yPosition, 
          text: text 
        };
        textMeshes.push(mesh);
      }
      
      return mesh;
    };

    // Position settings - FIXED: Better spacing
    const ySpacing = 5; // More space between items
    const initialY = ((navItems.length - 1) / 2) * ySpacing;

    // Create text meshes with shadows
    navItems.forEach((item, index) => {
      const yPos = initialY - (index * ySpacing); // Position from top to bottom
      const mainText = create3DText(item.text, yPos);
      const shadowText = create3DText(item.text, yPos, true);
      
      // Add rotation for depth
      mainText.rotation.x = -0.15; // Slight tilt for perspective
      
      scene.add(mainText);
      scene.add(shadowText);
    });

    // Handle click - FIXED: Improved animation and feedback
    const handleClick = (event) => {
      mouse.x = (event.clientX / currentMount.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / currentMount.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(textMeshes);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const { path, text } = clickedObject.userData;

        // Click animation sequence
        gsap.timeline()
          .to(clickedObject.scale, {
            duration: 0.1,
            x: 1.2, y: 1.2, z: 1.2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1
          })
          .to(clickedObject.rotation, {
            duration: 0.2,
            y: Math.PI / 16,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1
          })
          .to(clickedObject.material, {
            duration: 0.2,
            emissiveIntensity: 1,
            emissive: new THREE.Color(0xffffff),
            onComplete: () => {
              // Reset
              clickedObject.material.emissiveIntensity = 0;
              
              // Navigate after animation completes
              if (path) {
                router.push(path);
              }
            }
          });
      }
    };

    // Handle mouse move for hover effect - FIXED: Improved hover feedback
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / currentMount.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / currentMount.clientHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(textMeshes);

      // Reset all meshes
      textMeshes.forEach((mesh, index) => {
        gsap.to(mesh.scale, { 
          duration: 0.3, 
          x: 1, y: 1, z: 1,
          ease: "power2.out" 
        });
        gsap.to(mesh.rotation, { 
          duration: 0.3, 
          z: 0,
          ease: "power2.out" 
        });
        gsap.to(mesh.material, {
          duration: 0.3, 
          emissiveIntensity: 0
        });
        
        // Reset shadow too
        if (textShadows[index]) {
          gsap.to(textShadows[index].material, {
            duration: 0.3,
            opacity: 0.6
          });
        }
      });

      // Apply hover effect
      if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;
        const hoveredIndex = textMeshes.indexOf(hoveredObject);
        
        gsap.to(hoveredObject.scale, { 
          duration: 0.3, 
          x: 1.1, y: 1.1, z: 1.1,
          ease: "power2.out" 
        });
        gsap.to(hoveredObject.rotation, { 
          duration: 0.3, 
          z: 0.05,
          ease: "power2.out" 
        });
        gsap.to(hoveredObject.material, {
          duration: 0.3, 
          emissiveIntensity: 0.5,
          emissive: new THREE.Color(0x66ccff)
        });
        
        // Enhance shadow on hover
        if (textShadows[hoveredIndex]) {
          gsap.to(textShadows[hoveredIndex].material, {
            duration: 0.3,
            opacity: 0.8
          });
        }
        
        currentMount.style.cursor = 'pointer';
      } else {
        currentMount.style.cursor = 'default';
      }
    };

    // Gentle floating animation
    const createFloatingAnimation = () => {
      textMeshes.forEach((mesh, index) => {
        const delay = index * 0.2;
        gsap.to(mesh.position, {
          y: mesh.userData.originalY + 0.2,
          duration: 2,
          delay: delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
        
        // Animate shadow too
        if (textShadows[index]) {
          gsap.to(textShadows[index].position, {
            y: mesh.userData.originalY - 0.5 + 0.2,
            duration: 2,
            delay: delay,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });
    };
    
    createFloatingAnimation();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Optional: Subtle camera movement for more dynamic feel
      camera.position .y += Math.sin(Date.now() * 0.0005) * 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    currentMount.addEventListener('click', handleClick);
    currentMount.addEventListener('mousemove', handleMouseMove);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (currentMount) {
        currentMount.removeEventListener('click', handleClick);
        currentMount.removeEventListener('mousemove', handleMouseMove);
        
        if (renderer.domElement && currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
      }
      
      // Dispose resources
      renderer.dispose();
      
      // Dispose geometries and materials
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [font, loadingFont, router]);

  // Loading and error states
  if (loadingFont) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <div className="mb-4">Loading 3D Navigation...</div>
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (loadingError) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Font Loading Error</div>
          <div>Unable to load 3D font. Trying fallback...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-screen flex flex-col items-center justify-center relative bg-black"
    >
      {/* Three.js canvas will be appended here */}
    </div>
  );
};

export default Nav3D;