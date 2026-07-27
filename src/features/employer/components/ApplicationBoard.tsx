import * as React from "react"
import { EmployerApplication, ApplicationStage } from "../types/employer.types"
import { ApplicationCard } from "./ApplicationCard"

interface ApplicationBoardProps {
  applications: EmployerApplication[]
  onMoveStage: (id: string, nextStage: ApplicationStage) => void
  onScheduleInterview?: (candidateId: string, candidateName: string, position: string) => void
}

export function ApplicationBoard({ applications, onMoveStage, onScheduleInterview }: ApplicationBoardProps) {
  const columns: { stage: ApplicationStage; title: string; color: string }[] = [
    { stage: "Applied", title: "Applied", color: "border-slate-300 bg-slate-50/50" },
    { stage: "Reviewing", title: "Reviewing", color: "border-blue-300 bg-blue-50/30" },
    { stage: "Shortlisted", title: "Shortlisted", color: "border-amber-300 bg-amber-50/30" },
    { stage: "Assessment", title: "Assessment", color: "border-purple-300 bg-purple-50/30" },
    { stage: "Interview", title: "Interview", color: "border-orange-300 bg-orange-50/30" },
    { stage: "Offer", title: "Offer Sent", color: "border-indigo-300 bg-indigo-50/30" },
    { stage: "Hired", title: "Hired", color: "border-emerald-300 bg-emerald-50/30" },
  ]

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2 select-none min-h-[550px] items-start">
      {columns.map((col) => {
        const columnApps = applications.filter((app) => app.stage === col.stage)
        return (
          <div
            key={col.stage}
            className={`w-72 shrink-0 rounded-2xl border p-3 ${col.color} space-y-3 flex flex-col max-h-[700px]`}
          >
            <div className="flex justify-between items-center px-1 border-b border-border/40 pb-2">
              <h3 className="font-heading text-xs font-bold text-slate-800 dark:text-slate-200">
                {col.title}
              </h3>
              <span className="text-[10px] font-extrabold bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-border/60 shadow-xs">
                {columnApps.length}
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {columnApps.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onMoveStage={onMoveStage}
                  onScheduleInterview={onScheduleInterview}
                />
              ))}

              {columnApps.length === 0 && (
                <div className="p-6 text-center text-xs text-muted-foreground italic border border-dashed border-border/60 rounded-xl bg-white/40 select-none">
                  No applicants in this stage.
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
