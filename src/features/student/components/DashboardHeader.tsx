import * as React from "react"
import { School, Mail } from "lucide-react"

interface DashboardHeaderProps {
  name: string
  programme: string
  email: string
  bio: string
}

export function DashboardHeader({ name, programme, email, bio }: DashboardHeaderProps) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-white dark:bg-slate-900 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-border/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-accent bg-orange-50 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase">
              Student Profile
            </span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            {name}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <School className="size-3.5" />
              {programme}
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Mail className="size-3.5" />
              {email}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professional Bio</h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {bio}
        </p>
      </div>
    </div>
  )
}
