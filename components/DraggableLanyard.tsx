'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { TouchDebouncer, triggerHaptic } from '@/utils/deviceDetection';

// Extend THREE with MeshLine components
extend({ MeshLineGeometry, MeshLineMaterial });

// Preload assets (important for performance)
useGLTF.preload('/lanyard.glb');
useTexture.preload('/band.jpg');

interface DraggableLanyardProps {
  className?: string;
  enableIntersectionOptimization?: boolean;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isPaused?: boolean;
}

export default function DraggableLanyard({
  className = '',
  enableIntersectionOptimization = true
}: DraggableLanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // IntersectionObserver for viewport-based optimization
  useEffect(() => {
    if (!enableIntersectionOptimization || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Pause physics when 75% out of viewport
          setIsVisible(entry.intersectionRatio > 0.25);
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [enableIntersectionOptimization]);

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`${className}`}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        role="img"
        aria-label="Interactive 3D lanyard card (animation disabled)"
      >
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          opacity: 0.7
        }}>
          <p>3D animation disabled (respecting reduced motion preference)</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
      role="application"
      aria-label="Interactive 3D lanyard card - click and drag to interact"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 22 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        onCreated={(state) => {
          console.log('✓ Canvas created successfully');

          // Handle WebGL context loss
          const canvas = state.gl.domElement;

          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn('⚠ WebGL context lost - attempting recovery...');
          };

          const handleContextRestored = () => {
            console.log('✓ WebGL context restored');
          };

          canvas.addEventListener('webglcontextlost', handleContextLost);
          canvas.addEventListener('webglcontextrestored', handleContextRestored);

          return () => {
            canvas.removeEventListener('webglcontextlost', handleContextLost);
            canvas.removeEventListener('webglcontextrestored', handleContextRestored);
          };
        }}
      >
        <ambientLight intensity={Math.PI} />

        {/* CRITICAL: Physics MUST be wrapped in Suspense (per @react-three/rapier docs) */}
        <Suspense fallback={null}>
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60} paused={!isVisible}>
            <Band isPaused={!isVisible} />
          </Physics>
        </Suspense>
        <Environment background={false} blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10, isPaused = false }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  // Touch debouncer for optimized mobile interaction
  const touchDebouncer = useRef(new TouchDebouncer(10, 16));

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2,
  };

  // Load GLTF and texture (hooks will suspend until loaded)
  const { nodes, materials } = useGLTF('/lanyard.glb') as any;
  const texture = useTexture('/band.jpg');
  const { width, height } = useThree((state) => state.size);

  // Log successful load with details
  useEffect(() => {
    console.log('✓ 3D assets loaded successfully');
    console.log('  - GLTF nodes:', Object.keys(nodes));
    console.log('  - Materials:', Object.keys(materials));
    console.log('  - Texture:', texture);

    // Debug: Check if card geometry exists
    if (nodes.card) {
      console.log('  - Card geometry found:', nodes.card.geometry);
    } else {
      console.error('  ✗ Card geometry NOT found in GLTF!');
    }
  }, [nodes, materials, texture]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    // Skip updates when paused (out of viewport)
    if (isPaused && !dragged) return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      // Fix most of the jitter when over pulling the card
      [j1, j2].forEach((ref) => {
        if (!(ref.current as any).lerped)
          (ref.current as any).lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, (ref.current as any).lerped.distanceTo(ref.current.translation()))
        );
        (ref.current as any).lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      // Calculate catmul curve
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy((j2.current as any).lerped);
      curve.points[2].copy((j1.current as any).lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      // Tilt it back towards the screen
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation() as any);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const material = materials['base.001'];

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
              touchDebouncer.current.reset();
            }}
            onPointerDown={(e: any) => {
              // Touch debouncing for mobile
              const shouldProcess = touchDebouncer.current.shouldProcess(
                e.clientX || 0,
                e.clientY || 0
              );

              if (!shouldProcess && e.pointerType === 'touch') return;

              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));

              // Optional: Haptic feedback on mobile
              triggerHaptic(10);
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={material.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={material} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={material} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
