'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// Extend Three.js with custom components
extend({ MeshLineGeometry, MeshLineMaterial });

// Preload assets
const preloadAssets = () => {
  useGLTF.preload('/tag.glb');
  useTexture.preload('/band.jpg');
};

function Band({ maxSpeed = 50, minSpeed = 10, userName = "Your Name", userImage = "/profile-photo.jpg" }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };
  const { nodes, materials } = useGLTF('/lanyard-tag.glb');
  const texture = useTexture('/lanyard-band.jpg');
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Create physics joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  // Handle cursor changes
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // Animation frame updates
  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ 
        x: vec.x - dragged.x, 
        y: vec.y - dragged.y, 
        z: vec.z - dragged.z 
      });
    }
    
    if (fixed.current) {
      // Fix most of the jitter when over pulling the card
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      
      // Calculate catmull curve
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      
      // Tilt it back towards the screen
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ 
        x: ang.x, 
        y: ang.y - rot.y * 0.25, 
        z: ang.z 
      });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  // Create material for front and back of card
  const [frontMaterial] = useState(() => {
    const mat = new THREE.MeshPhysicalMaterial({ 
      clearcoat: 1, 
      clearcoatRoughness: 0.15, 
      roughness: 0.3, 
      metalness: 0.5 
    });
    return mat;
  });

  // Create a texture with name and image
  useEffect(() => {
    if (!nodes || !materials) return;
    
    // Create custom texture for the card front
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add border
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Load and draw user image
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      // Draw image in center top
      const imgWidth = canvas.width - 40;
      const imgHeight = (img.height / img.width) * imgWidth;
      ctx.drawImage(img, 20, 60, imgWidth, imgHeight);
      
      // Add user name
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(userName, canvas.width / 2, imgHeight + 120);
      
      // Add some sample text
      ctx.font = '24px Arial';
      ctx.fillText('Portfolio', canvas.width / 2, imgHeight + 170);
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      frontMaterial.map = texture;
      frontMaterial.needsUpdate = true;
    };
    img.src = userImage;
    
  }, [nodes, materials, userName, userImage, frontMaterial]);

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
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <primitive object={frontMaterial} />
            </mesh>
            <mesh geometry={nodes.clip.geometry}>
              <meshPhysicalMaterial color="#888" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh geometry={nodes.clamp.geometry}>
              <meshPhysicalMaterial color="#888" roughness={0.3} metalness={0.8} />
            </mesh>
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

export default function DraggableLanyard({ userName = "Your Name", userImage = "/profile-photo.jpg", className = "" }) {
  // Call preload on component mount
  useEffect(() => {
    preloadAssets();
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band userName={userName} userImage={userImage} />
        </Physics>
        <Environment background blur={0.75}>
          <color attach="background" args={['black']} />
          <Lightformer 
            intensity={2} 
            color="white" 
            position={[0, -1, 5]} 
            rotation={[0, 0, Math.PI / 3]} 
            scale={[100, 0.1, 1]} 
          />
          <Lightformer 
            intensity={3} 
            color="white" 
            position={[-1, -1, 1]} 
            rotation={[0, 0, Math.PI / 3]} 
            scale={[100, 0.1, 1]} 
          />
          <Lightformer 
            intensity={3} 
            color="white" 
            position={[1, 1, 1]} 
            rotation={[0, 0, Math.PI / 3]} 
            scale={[100, 0.1, 1]} 
          />
          <Lightformer 
            intensity={10} 
            color="white" 
            position={[-10, 0, 14]} 
            rotation={[0, Math.PI / 2, Math.PI / 3]} 
            scale={[100, 10, 1]} 
          />
        </Environment>
      </Canvas>
    </div>
  );
}