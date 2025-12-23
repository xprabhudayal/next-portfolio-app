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
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
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
            className={`relative [perspective:800px] ${className}`}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main Card Container */}
            <motion.div
                className="relative bg-white dark:bg-neutral-900 rounded-[25px] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-lg [transform-style:preserve-3d]"
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
                        className="object-cover [transform:translateZ(0)] will-change-transform"
                        priority
                    />
                </div>

                {/* Info Bar */}
                <div className="bg-white dark:bg-neutral-900 p-6 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="font-bold text-xl text-neutral-900 dark:text-white">{name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{role}</p>
                </div>
            </motion.div>
        </div>
    );
}

