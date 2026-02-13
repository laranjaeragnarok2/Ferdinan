import * as React from "react"
import { cn } from "@/lib/utils"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { intensity?: 'low' | 'medium' | 'high' }
>(({ className, intensity = 'medium', ...props }, ref) => {
  const intensities = {
    low: "bg-white/5 backdrop-blur-sm border-white/10",
    medium: "bg-white/10 backdrop-blur-md border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
    high: "bg-white/15 backdrop-blur-xl border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border transition-all duration-300",
        intensities[intensity],
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
    className={cn("flex flex-col space-y-1.5 p-6", className)}
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
      "text-2xl font-bold leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60",
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
    className={cn("text-sm text-white/40 font-medium", className)}
    {...props}
  />
))
GlassDescription.displayName = "GlassDescription"

const GlassContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 text-white/80", className)} {...props} />
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
