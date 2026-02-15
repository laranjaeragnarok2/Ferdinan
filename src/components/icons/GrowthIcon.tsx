import { cn } from "@/lib/utils";

export default function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 110"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
      role="img"
      aria-hidden="true"
    >
      <path d="M10,95 L25,95 L25,60 L10,60 L10,95 Z M40,95 L55,95 L55,40 L40,40 L40,95 Z M70,95 L85,95 L85,20 L70,20 L70,95 Z" />
      <path d="M15,50 L45,30 L75,10 L95,25" stroke="currentColor" strokeWidth="8" fill="none" />
      <circle cx="95" cy="25" r="15" fill="currentColor" />
      <text
        x="95"
        y="32"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="hsl(var(--background))"
      >
        $
      </text>
    </svg>
  );
}
