import { cn } from "@/lib/utils"

interface ProgressiveBlurProps {
    className?: string
    direction?: "top" | "bottom" | "left" | "right"
    blurIntensity?: string
}

export function ProgressiveBlur({
    className,
    direction = "bottom",
    blurIntensity = "8px"
}: ProgressiveBlurProps) {
    const getGradient = () => {
        switch (direction) {
            case "top":
                return "linear-gradient(to bottom, black, transparent)"
            case "bottom":
                return "linear-gradient(to top, black, transparent)"
            case "left":
                return "linear-gradient(to right, black, transparent)"
            case "right":
                return "linear-gradient(to left, black, transparent)"
            default:
                return "linear-gradient(to top, black, transparent)"
        }
    }

    return (
        <div
            className={cn("pointer-events-none", className)}
            style={{
                backdropFilter: `blur(${blurIntensity})`,
                WebkitBackdropFilter: `blur(${blurIntensity})`,
                maskImage: getGradient(),
                WebkitMaskImage: getGradient(),
            }}
        />
    )
}
