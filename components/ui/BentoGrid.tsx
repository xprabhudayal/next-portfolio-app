import { cn } from "@/utils/cn";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 border-2 border-border bg-card text-card-foreground p-6 neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-200 justify-between flex flex-col space-y-4",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-1 transition duration-200">
                <div className="mb-2 w-10 h-10 bg-primary border-2 border-border flex items-center justify-center neo-shadow">
                    {icon}
                </div>
                <div className="font-sans font-black text-xl uppercase mb-1 mt-2">
                    {title}
                </div>
                <div className="font-mono font-normal text-sm text-muted-foreground leading-tight">
                    {description}
                </div>
            </div>
        </div>
    );
};
