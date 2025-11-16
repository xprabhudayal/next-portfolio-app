/**
 * Light Physics Lanyard Component (Layer 2 - Mid-tier Devices)
 *
 * Optimized for mid-range mobile devices with reduced physics calculations.
 *
 * Features:
 * - Reduced physics timestep (30fps instead of 60fps)
 * - Simplified collision detection
 * - Optimized rope joint calculations
 * - Touch gesture debouncing (16ms threshold)
 * - Reduced rendering quality
 * - On-demand rendering for better battery life
 */

'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { TouchDebouncer } from '@/utils/deviceDetection';

// Extend THREE with MeshLine components
extend({ MeshLineGeometry, MeshLineMaterial });

// Preload assets
useGLTF.preload('/lanyard.glb');
useTexture.preload('/band.jpg');

interface DraggableLanyardLightProps {
  className?: string;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
}

export default function DraggableLanyardLight({ className = '' }: DraggableLanyardLightProps) {
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
          powerPreference: 'default', // Balanced performance
          stencil: false,
        }}
        dpr={[1, 1.5]} // Limit device pixel ratio
        frameloop="demand" // On-demand rendering
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <ambientLight intensity={Math.PI * 0.9} />

        <Suspense fallback={null}>
          {/* Reduced physics timestep and independent update loop */}
          <Physics
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 30} // 30fps physics instead of 60fps
            updateLoop="independent" // Physics runs independently
          >
            <Band maxSpeed={40} minSpeed={8} />
          </Physics>
        </Suspense>

        {/* Simplified lighting */}
        <Environment background={false} blur={0.75} preset="city" />
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 40, minSpeed = 8 }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  // Optimized segment properties with higher damping
  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 3, // Increased damping for stability
    linearDamping: 3,
  };

  // Load GLTF and texture
  const { nodes, materials } = useGLTF('/lanyard.glb') as any;
  const texture = useTexture('/band.jpg');
  const { width, height, invalidate } = useThree((state) => ({
    width: state.size.width,
    height: state.size.height,
    invalidate: state.invalidate,
  }));

  // Simplified curve with fewer points
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  // Touch debouncer
  const touchDebouncer = useRef(new TouchDebouncer(8, 16));

  // Simplified rope joints (3 segments instead of 4)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j2, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // Throttled update counter
  const updateCounter = useRef(0);

  useFrame((state, delta) => {
    updateCounter.current++;

    // Update every frame when dragging, every other frame when idle
    const shouldUpdate = dragged || updateCounter.current % 2 === 0;
    if (!shouldUpdate) return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, fixed].forEach((ref) => ref.current?.wakeUp());

      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });

      invalidate(); // Trigger render on demand
    }

    if (fixed.current) {
      // Simplified lerping (only j1)
      if (!(j1.current as any).lerped) {
        (j1.current as any).lerped = new THREE.Vector3().copy(j1.current.translation());
      }

      const clampedDistance = Math.max(
        0.1,
        Math.min(1, (j1.current as any).lerped.distanceTo(j1.current.translation()))
      );

      (j1.current as any).lerped.lerp(
        j1.current.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
      );

      // Simplified catmull curve with fewer points
      curve.points[0].copy(j2.current.translation());
      curve.points[1].copy((j1.current as any).lerped);
      curve.points[2].copy(fixed.current.translation());

      // Fewer curve points (16 instead of 32)
      band.current.geometry.setPoints(curve.getPoints(16));

      // Tilt correction
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation() as any);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);

      if (dragged) {
        invalidate(); // Ensure render when active
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const material = materials['base.001'];

  const handlePointerDown = (e: any) => {
    // Touch debouncing for mobile
    const shouldProcess = touchDebouncer.current.shouldProcess(
      e.clientX || 0,
      e.clientY || 0
    );

    if (!shouldProcess && e.pointerType === 'touch') return;

    e.target.setPointerCapture(e.pointerId);
    drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
    invalidate();
  };

  const handlePointerUp = (e: any) => {
    e.target.releasePointerCapture(e.pointerId);
    drag(false);
    touchDebouncer.current.reset();
    invalidate();
  };

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
        <RigidBody
          position={[1.5, 0, 0]}
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
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
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
