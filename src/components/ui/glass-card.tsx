import * as React from "react"
import { cn } from "@/lib/utils"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    intensity?: 'low' | 'medium' | 'high' | 'vanguard',
    withGlow?: boolean
  }
>(({ className, intensity = 'medium', withGlow = false, ...props }, ref) => {
  const intensities = {
    low: "bg-white/[0.01] backdrop-blur-sm border-white/5",
    medium: "bg-white/[0.03] backdrop-blur-xl border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
    high: "bg-white/[0.05] backdrop-blur-2xl border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]",
    vanguard: "bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.1)]",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border transition-all duration-500 group",
        intensities[intensity],
        withGlow && "before:absolute before:inset-0 before:-z-10 before:bg-primary/5 before:blur-3xl before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className
      )}
      {...props}
    />
  )
})
GlassCard.displayName = "GlassCard"

const GlassHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-8", className)}
    {...props}
  />
))
GlassHeader.displayName = "GlassHeader"

const GlassTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40",
      className
    )}
    {...props}
  />
))
GlassTitle.displayName = "GlassTitle"

const GlassDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-white/50 font-medium tracking-wide uppercase", className)}
    {...props}
  />
))
GlassDescription.displayName = "GlassDescription"

const GlassContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-8 pt-0 text-white/70 leading-relaxed", className)} {...props} />
))
GlassContent.displayName = "GlassContent"

const GlassFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 border-t border-white/5 mt-4", className)}
    {...props}
  />
))
GlassFooter.displayName = "GlassFooter"

export { GlassCard, GlassHeader, GlassFooter, GlassTitle, GlassDescription, GlassContent }
