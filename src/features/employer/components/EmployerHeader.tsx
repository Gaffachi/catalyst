import * as React from "react"
import { Building2, ShieldCheck } from "lucide-react"

interface EmployerHeaderProps {
  title: string
  subtitle: string
  companyName?: string
  isVerified?: boolean
}

export function EmployerHeader({
  title,
  subtitle,
  companyName = "Hubtel Ghana",
  isVerified = true,
}: EmployerHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 border border-border/60 rounded-2xl shadow-sm select-none">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-accent bg-orange-50 dark:bg-slate-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border border-orange-200/60">
            <Building2 className="size-3" />
            {companyName}
          </span>
          {isVerified && (
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase flex items-center gap-0.5">
              <ShieldCheck className="size-3" />
              Verified Employer
            </span>
          )}
        </div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
