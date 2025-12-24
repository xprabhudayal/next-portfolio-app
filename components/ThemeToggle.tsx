'use client';

import { AnimatedThemeToggler } from './ui/animated-theme-toggler';

export default function ThemeToggle() {
    return (
        <AnimatedThemeToggler
            className="
                h-12 px-6 flex items-center gap-2 font-bold text-sm border-2 border-border 
                bg-background text-foreground 
                neo-shadow
                hover:bg-primary hover:text-primary-foreground hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                transition-all uppercase tracking-wide
                focus:outline-none focus:ring-0
                active:animate-blink
            "
        />
    );
}
