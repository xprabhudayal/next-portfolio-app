'use client';

import TiltedCard from './ui/TiltedCard';

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
        <TiltedCard
            imageSrc={imageSrc}
            name={name}
            role={role}
            className={className}
        />
    );
}
