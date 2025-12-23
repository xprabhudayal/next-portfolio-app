'use client';

import type { SpringOptions } from 'motion/react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Image from 'next/image';

interface TiltedCardProps {
    imageSrc: string;
    name: string;
    role: string;
    className?: string;
    scaleOnHover?: number;
    rotateAmplitude?: number;
}

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

export default function TiltedCard({
    imageSrc,
    name,
    role,
    className = '',
    scaleOnHover = 1.05,
    rotateAmplitude = 8,
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);

    const [lastY, setLastY] = useState(0);

    function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
    }

    function handleMouseLeave() {
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
    }

    return (
        <div
            ref={ref}
            className={`relative group [perspective:800px] ${className}`}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Neobrutal Shadow Layer */}
            <div className="absolute inset-0 bg-border translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />

            {/* Main Card Container */}
            <motion.div
                className="relative bg-card border-4 border-border overflow-hidden transition-all duration-200 [transform-style:preserve-3d]"
                style={{
                    rotateX,
                    rotateY,
                    scale
                }}
            >
                {/* Profile Image */}
                <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 [transform:translateZ(0)]"
                        priority
                    />
                    {/* Yellow overlay on hover */}
                    <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-300" />
                </div>

                {/* Info Bar */}
                <div className="bg-foreground text-background p-4 border-t-4 border-border">
                    <p className="font-black text-lg uppercase tracking-wider">{name}</p>
                    <p className="font-mono text-sm text-muted-foreground">{role}</p>
                </div>
            </motion.div>
        </div>
    );
}
