import * as React from "react"
import { LucideIcon } from "lucide-react"

interface ImpactCardProps {
  title: string
  description: string
  stepNumber: string
  icon: LucideIcon
}

export function ImpactCard({ title, description, stepNumber, icon: Icon }: ImpactCardProps) {
  return (
    <div className="relative p-6 rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-border transition-all duration-200 group">
      {/* Background step watermark */}
      <span className="absolute top-4 right-4 text-3xl font-black tracking-tight text-slate-100 select-none group-hover:text-orange-100/50 transition-colors dark:text-slate-800 dark:group-hover:text-slate-800/80">
        {stepNumber}
      </span>
      <div className="flex flex-col gap-4">
        {/* Icon wrapper */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent shadow-sm">
          <Icon className="size-5" />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-heading text-base font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
