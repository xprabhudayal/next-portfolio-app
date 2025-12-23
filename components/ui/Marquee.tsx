import { cn } from "@/lib/utils";

export const Marquee = ({ text, className }: { text: string; className?: string }) => {
    return (
        <div className={cn("relative flex overflow-hidden bg-primary py-2 group select-none", className)}>
            <div className="animate-marquee whitespace-nowrap flex-shrink-0 group-hover:[animation-play-state:paused]">
                <span className="mx-4 tracking-widest">
                    {text} • {text} • {text} • {text} •
                </span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex-shrink-0 group-hover:[animation-play-state:paused]">
                <span className="mx-4 tracking-widest">
                    {text} • {text} • {text} • {text} •
                </span>
            </div>
        </div>
    );
};
