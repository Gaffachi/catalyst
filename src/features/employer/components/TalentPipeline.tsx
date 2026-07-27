import * as React from "react"
import { EmployerApplication } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, ChevronRight } from "lucide-react"

interface TalentPipelineProps {
  applications: EmployerApplication[]
}

export function TalentPipeline({ applications }: TalentPipelineProps) {
  const pipelineStages = [
    { key: "Applied", label: "Applicants Pool", color: "bg-slate-100 border-slate-300 text-slate-700" },
    { key: "Shortlisted", label: "Shortlisted Talent", color: "bg-amber-50 border-amber-300 text-amber-800" },
    { key: "Interview", label: "Interview Stage", color: "bg-orange-50 border-orange-300 text-orange-800" },
    { key: "Offer", label: "Offers Sent", color: "bg-indigo-50 border-indigo-300 text-indigo-800" },
    { key: "Hired", label: "Successful Placements", color: "bg-emerald-50 border-emerald-300 text-emerald-800" },
  ]

  return (
    <div className="space-y-6 select-none">
      {/* Visual Pipeline Funnel */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {pipelineStages.map((st, idx) => {
          const count = applications.filter((a) => a.stage === st.key).length
          return (
            <Card key={st.key} className={`p-4 border ${st.color} space-y-2 text-center relative`}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider block">{st.label}</span>
              <span className="text-3xl font-black block">{count}</span>
              {idx < pipelineStages.length - 1 && (
                <div className="hidden sm:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="size-5 text-slate-400" />
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Stage Candidates Detailed Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pipelineStages.map((st) => {
          const stageApps = applications.filter((a) => a.stage === st.key)
          return (
            <Card key={st.key} className="p-5 border border-border/60 bg-card shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b border-border/40 pb-2">
                <h3 className="font-heading text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Users className="size-3.5 text-accent" />
                  {st.label} ({stageApps.length})
                </h3>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {stageApps.map((app) => (
                  <div key={app.id} className="p-2.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{app.candidateName}</span>
                      <span className="text-[10px] text-muted-foreground block">{app.opportunityTitle}</span>
                    </div>

                    <Badge variant="outline" className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                      <Star className="size-2.5 mr-0.5 fill-emerald-600" />
                      {app.readinessScore}%
                    </Badge>
                  </div>
                ))}

                {stageApps.length === 0 && (
                  <p className="text-xs text-muted-foreground italic text-center py-4">
                    No candidates currently in this stage.
                  </p>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
