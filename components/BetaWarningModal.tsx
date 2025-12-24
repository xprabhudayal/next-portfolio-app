'use client';

import { AlertTriangle, Link as LinkIcon, Mic } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BetaWarningModalProps {
    onClose: () => void;
    onStart: () => void;
}

export default function BetaWarningModal({ onClose, onStart }: BetaWarningModalProps) {
    const router = useRouter();
    const [isBlinkingStart, setIsBlinkingStart] = useState(false);
    const [isBlinkingLinks, setIsBlinkingLinks] = useState(false);

    const handleLinks = () => {
        setIsBlinkingLinks(true);
        setTimeout(() => {
            setIsBlinkingLinks(false);
            router.push('/links');
            onClose();
        }, 200);
    };

    const handleStart = () => {
        setIsBlinkingStart(true);
        setTimeout(() => {
            setIsBlinkingStart(false);
            onStart();
        }, 200);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in duration-200">
            {/* Modal Card */}
            <div className="bg-background text-foreground border-2 border-border p-8 w-full max-w-md neo-shadow relative flex flex-col gap-6">

                {/* Close Button (Optional, but good UX) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-muted transition-colors border-2 border-transparent hover:border-border"
                >
                    <span className="font-black text-xl leading-none">X</span>
                </button>

                {/* Header */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-primary">
                        <AlertTriangle size={48} strokeWidth={2.5} />
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground">
                            Attention
                        </h2>
                    </div>
                    <p className="font-mono text-sm font-bold leading-relaxed text-muted-foreground">
                        This feature is currently in <span className="text-primary bg-foreground px-1">BETA</span>. It is experimental and may break unexpectedly.
                    </p>
                    <p className="font-mono text-sm font-bold leading-relaxed text-muted-foreground">
                        Please feel free to provide feedback via social media if you encounter any bugs.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 mt-2">
                    {/* Start Voice Chat (Primary) */}
                    <button
                        onClick={handleStart}
                        className={`
                            h-14 flex items-center justify-center gap-3 px-6 font-black text-base border-2 border-border transition-all duration-200 uppercase tracking-wide
                            bg-primary text-primary-foreground neo-shadow 
                            hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none
                            ${isBlinkingStart ? 'animate-blink' : ''}
                        `}
                    >
                        <Mic size={20} />
                        Start Voice Chat
                    </button>

                    {/* Go to Links (Secondary) */}
                    <button
                        onClick={handleLinks}
                        className={`
                            h-14 flex items-center justify-center gap-3 px-6 font-black text-base border-2 border-border transition-all duration-200 uppercase tracking-wide
                            bg-background text-foreground neo-shadow 
                            hover:bg-muted hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none
                            ${isBlinkingLinks ? 'animate-blink' : ''}
                        `}
                    >
                        <LinkIcon size={20} />
                        Visit Links Page
                    </button>
                </div>
            </div>
        </div>
    );
}
