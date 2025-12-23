'use client';

import Image from 'next/image';

interface ProfileCardProps {
    imageSrc: string;
    name?: string;
    role?: string;
    className?: string;
}

export default function ProfileCard({
    imageSrc,
    name = "PRABHUDAYAL",
    role = "AI ENGINEER",
    className = "",
}: ProfileCardProps) {
    return (
        <div className={`relative group ${className}`}>
            {/* Shadow layer */}
            <div className="absolute inset-0 bg-border translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />

            {/* Main card */}
            <div className="relative bg-card border-4 border-border overflow-hidden transition-all duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        priority
                    />
                    {/* Yellow overlay on hover */}
                    <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-300" />
                </div>

                {/* Info bar */}
                <div className="bg-foreground text-background p-4 border-t-4 border-border">
                    <p className="font-black text-lg uppercase tracking-wider">{name}</p>
                    <p className="font-mono text-sm text-muted-foreground">{role}</p>
                </div>
            </div>
        </div>
    );
}
