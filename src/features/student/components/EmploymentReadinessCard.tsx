import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface EmploymentReadinessCardProps {
  score: number
  eligibleInternships: number
  eligibleGradPrograms: number
  eligibleFullTime: number
}

export function EmploymentReadinessCard({
  score,
  eligibleInternships,
  eligibleGradPrograms,
  eligibleFullTime,
}: EmploymentReadinessCardProps) {
  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4 select-none h-full">
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <div>
          <h3 className="font-heading text-sm font-bold text-foreground">
            Eligibility & Score
          </h3>
          <p className="text-[10px] text-muted-foreground">
            Opening match eligibilities matched to your readiness scorecard.
          </p>
        </div>
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
          Vetted Index
        </Badge>
      </div>

      {/* Readiness gauge index progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employment Readiness</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">{score}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Eligible lists checkboxes */}
      <div className="space-y-2 pt-2 border-t border-border/30">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Eligible Opportunities</span>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50/10 p-2 border border-slate-100 rounded-lg">
            <span className="flex items-center gap-2 font-medium text-slate-600">
              <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
              Internships
            </span>
            <span className="font-bold text-slate-700">{eligibleInternships} Openings</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50/10 p-2 border border-slate-100 rounded-lg">
            <span className="flex items-center gap-2 font-medium text-slate-600">
              <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
              Graduate Programs
            </span>
            <span className="font-bold text-slate-700">{eligibleGradPrograms} Openings</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50/10 p-2 border border-slate-100 rounded-lg">
            <span className="flex items-center gap-2 font-medium text-slate-600">
              <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
              Full-Time Roles
            </span>
            <span className="font-bold text-slate-700">{eligibleFullTime} Openings</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
