/**
 * Static 3D Lanyard Component (Layer 1 - Mobile Default)
 *
 * Optimized for low-end mobile devices with minimal computational overhead.
 * Uses CSS transforms and simple easing instead of physics simulation.
 *
 * Features:
 * - No physics engine (zero Rapier overhead)
 * - CSS-based animations with GPU acceleration
 * - Simplified 3D rendering with reduced polygon count
 * - Touch gestures with proper debouncing
 * - Maintains visual appeal without performance compromise
 */

'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Lightformer } from '@react-three/drei';
import { TouchDebouncer } from '@/utils/deviceDetection';

interface DraggableLanyardStaticProps {
  className?: string;
}

// Preload assets
useGLTF.preload('/lanyard.glb');

export default function DraggableLanyardStatic({ className = '' }: DraggableLanyardStaticProps) {
  return (
    <div
      className={`${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 22 }}
        gl={{
          antialias: false, // Disabled for performance
          alpha: true,
          powerPreference: 'low-power', // Optimize for battery
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <ambientLight intensity={Math.PI * 0.8} />
        <StaticCard />
        <Environment background={false} blur={0.75} preset="city" />
      </Canvas>
    </div>
  );
}

function StaticCard() {
  const cardRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/lanyard.glb') as any;

  // Animation state
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dragOffset = useRef(new THREE.Vector3());
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 0));
  const velocity = useRef(new THREE.Vector3());

  // Touch debouncer for optimized mobile interaction
  const touchDebouncer = useRef(new TouchDebouncer(5, 16));

  // Cursor feedback
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = isDragging ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, isDragging]);

  // Smooth animation loop with easing
  useFrame((state, delta) => {
    if (!cardRef.current) return;

    // Update target position when dragging
    if (isDragging) {
      const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
      vec.unproject(state.camera);

      const dir = vec.clone().sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      targetPosition.current.set(
        vec.x - dragOffset.current.x,
        vec.y - dragOffset.current.y,
        vec.z - dragOffset.current.z
      );
    } else {
      // Return to center with spring physics
      targetPosition.current.lerp(new THREE.Vector3(0, 0, 0), delta * 2);
    }

    // Smooth interpolation (critically damped spring)
    const spring = 0.15;
    const damping = 0.8;

    // Calculate velocity
    velocity.current.x += (targetPosition.current.x - currentPosition.current.x) * spring;
    velocity.current.y += (targetPosition.current.y - currentPosition.current.y) * spring;
    velocity.current.z += (targetPosition.current.z - currentPosition.current.z) * spring;

    // Apply damping
    velocity.current.multiplyScalar(damping);

    // Update position
    currentPosition.current.add(velocity.current);

    // Apply to card
    cardRef.current.position.copy(currentPosition.current);

    // Gentle rotation based on velocity (creates natural motion)
    const rotationFactor = 0.5;
    cardRef.current.rotation.x = -velocity.current.y * rotationFactor;
    cardRef.current.rotation.y = velocity.current.x * rotationFactor;

    // Subtle floating animation when idle
    if (!isDragging) {
      const time = state.clock.getElapsedTime();
      cardRef.current.position.y += Math.sin(time * 2) * 0.002;
      cardRef.current.rotation.z = Math.sin(time * 1.5) * 0.02;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();

    // Check touch debouncing for mobile
    const shouldProcess = touchDebouncer.current.shouldProcess(e.clientX || 0, e.clientY || 0);
    if (!shouldProcess && e.pointerType === 'touch') return;

    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);

    // Calculate offset
    if (cardRef.current) {
      const cardPos = new THREE.Vector3();
      cardRef.current.getWorldPosition(cardPos);
      dragOffset.current.copy(e.point).sub(cardPos);
    }
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
    touchDebouncer.current.reset();
  };

  const material = materials['base.001'];

  return (
    <group ref={cardRef} position={[0, 0, 0]}>
      {/* Simplified rope/band representation */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Card group */}
      <group
        scale={2.25}
        position={[0, -1.2, -0.05]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <mesh geometry={nodes.card.geometry}>
          <meshStandardMaterial
            map={material.map}
            map-anisotropy={8} // Reduced from 16
            roughness={0.4}
            metalness={0.4}
          />
        </mesh>
        <mesh geometry={nodes.clip.geometry} material={material} material-roughness={0.3} />
        <mesh geometry={nodes.clamp.geometry} material={material} />
      </group>
    </group>
  );
}
