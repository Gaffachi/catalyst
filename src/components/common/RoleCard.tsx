import * as React from "react"
import { LucideIcon, CheckCircle2 } from "lucide-react"

interface RoleCardProps {
  title: string
  subtitle: string
  items: string[]
  icon: LucideIcon
  badgeText: string
}

export function RoleCard({ title, subtitle, items, icon: Icon, badgeText }: RoleCardProps) {
  return (
    <div className="flex flex-col justify-between p-8 rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
      <div className="space-y-6">
        {/* Card Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-accent shadow-sm">
            <Icon className="size-6" />
          </div>
          <div>
            <span className="inline-block text-[10px] font-bold tracking-wider text-accent uppercase bg-orange-50 px-2.5 py-0.5 rounded-full dark:bg-slate-800 dark:text-accent mb-1">
              {badgeText}
            </span>
            <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
              {title}
            </h3>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {subtitle}
        </p>

        {/* Benefits Checklist */}
        <ul className="space-y-3.5 pt-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="size-4.5 text-accent shrink-0 mt-0.5" />
              <span className="text-slate-700 dark:text-slate-300 leading-normal">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
