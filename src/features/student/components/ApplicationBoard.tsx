import * as React from "react"
import { Application } from "../types/student.types"
import { ApplicationCard } from "./ApplicationCard"

interface ApplicationBoardProps {
  applications: Application[]
}

type ColumnStatus = "Applied" | "Under Review" | "Assessment" | "Interview" | "Offer" | "Accepted" | "Rejected"

export function ApplicationBoard({ applications }: ApplicationBoardProps) {
  const columns: { status: ColumnStatus; label: string; color: string }[] = [
    { status: "Applied", label: "Applied", color: "bg-slate-100/60 border-slate-200" },
    { status: "Under Review", label: "In Review", color: "bg-blue-50/40 border-blue-100" },
    { status: "Assessment", label: "Assessment", color: "bg-purple-50/40 border-purple-100" },
    { status: "Interview", label: "Interview", color: "bg-orange-50/40 border-orange-100 text-accent" },
    { status: "Offer", label: "Offers", color: "bg-emerald-50/40 border-emerald-100" },
    { status: "Accepted", label: "Accepted", color: "bg-teal-50/40 border-teal-100" },
    { status: "Rejected", label: "Rejected", color: "bg-rose-50/40 border-rose-100" },
  ]

  return (
    <div className="flex overflow-x-auto gap-4 pb-4 select-none scrollbar-thin max-w-full">
      {columns.map((col) => {
        const colApps = applications.filter((app) => app.status === col.status)

        return (
          <div 
            key={col.status} 
            className={`p-3 rounded-2xl border ${col.color} flex flex-col w-72 shrink-0 min-h-[380px] space-y-3.5`}
          >
            {/* Column Header */}
            <div className="flex justify-between items-center px-1 border-b border-border/40 pb-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {col.label}
              </h4>
              <span className="h-5 w-5 bg-background border border-border rounded-full flex items-center justify-center font-bold text-[9px] text-slate-500">
                {colApps.length}
              </span>
            </div>

            {/* Cards Area */}
            <div className="flex-grow space-y-3 overflow-y-auto max-h-[500px] scrollbar-thin">
              {colApps.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}

              {colApps.length === 0 && (
                <div className="h-full flex items-center justify-center p-6 text-center border border-dashed border-border/40 rounded-xl bg-background/20 select-none">
                  <span className="text-[10px] font-medium text-slate-400 italic">
                    Empty lane
                  </span>
                </div>
              )}
            </div>

          </div>
        )
      })}
    </div>
  )
}
