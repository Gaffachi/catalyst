import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Star } from "lucide-react"

interface StudentOverviewCardProps {
  name: string
  programme: string
  readinessScore: number
  profileCompletion: number
  applicationsCount: number
  employmentStatus: string
}

export function StudentOverviewCard({
  name,
  programme,
  readinessScore,
  profileCompletion,
  applicationsCount,
  employmentStatus,
}: StudentOverviewCardProps) {
  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-3 select-none">
      <div className="flex justify-between items-start border-b border-border/30 pb-3 gap-2">
        <div className="space-y-1">
          <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100">
            {name}
          </h3>
          <span className="text-xs text-muted-foreground font-semibold block flex items-center gap-1">
            <GraduationCap className="size-3.5 text-slate-400" />
            {programme}
          </span>
        </div>

        <Badge variant="outline" className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
          <Star className="size-3 mr-1 fill-emerald-600" />
          {readinessScore}% Readiness
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[9px] text-slate-400 uppercase block">Profile</span>
          <p className="font-bold text-slate-800 dark:text-slate-200">{profileCompletion}%</p>
        </div>
        <div>
          <span className="text-[9px] text-slate-400 uppercase block">Applications</span>
          <p className="font-bold text-slate-800 dark:text-slate-200">{applicationsCount} Submitted</p>
        </div>
        <div>
          <span className="text-[9px] text-slate-400 uppercase block">Status</span>
          <p className="font-bold text-emerald-700 truncate">{employmentStatus}</p>
        </div>
      </div>
    </Card>
  )
}
