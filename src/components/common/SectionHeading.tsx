import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  badge?: string
  align?: "center" | "left"
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <span className="inline-block text-xs font-bold text-accent uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full dark:bg-slate-900/60 dark:text-accent">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
