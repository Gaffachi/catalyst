import * as React from "react"
import { Calendar } from "lucide-react"

interface MentorDashboardHeaderProps {
  title: string
  subtitle: string
  role?: string
}

export function MentorDashboardHeader({
  title,
  subtitle,
  role = "Advisor Workspace",
}: MentorDashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-border/40 select-none">
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-accent bg-orange-50 dark:bg-slate-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {role}
        </span>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground mt-1">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-border px-3.5 py-1.5 rounded-xl shadow-sm">
        <Calendar className="size-4 text-slate-400 shrink-0" />
        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
          {currentDate}
        </span>
      </div>
    </div>
  )
}
