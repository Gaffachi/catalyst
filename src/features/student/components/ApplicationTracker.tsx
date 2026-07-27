import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Application } from "../types/student.types"
import { Calendar, Building } from "lucide-react"

interface ApplicationTrackerProps {
  applications: Application[]
}

export function ApplicationTracker({ applications }: ApplicationTrackerProps) {
  // Map statuses to visual color badges
  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "Applied":
        return <Badge className="bg-slate-100 border-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase">Applied</Badge>
      case "Under Review":
        return <Badge className="bg-blue-50 border-blue-200 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase">In Review</Badge>
      case "Interview":
        return <Badge className="bg-orange-50 border-orange-200 text-accent font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase animate-pulse">Interviewing</Badge>
      case "Offer":
        return <Badge className="bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase">Offered</Badge>
      case "Assessment":
        return <Badge className="bg-purple-50 border-purple-200 text-purple-700 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase">Assessment</Badge>
      case "Accepted":
        return <Badge className="bg-teal-50 border-teal-200 text-teal-700 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase">Accepted</Badge>
      case "Rejected":
        return <Badge className="bg-rose-50 border-rose-200 text-rose-700 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase">Closed</Badge>
    }
  }

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <h3 className="font-heading text-sm font-bold text-foreground">
          Employment Applications Tracker
        </h3>
        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase">
          {applications.length} Active
        </span>
      </div>

      <div className="divide-y divide-border/40 select-none">
        {applications.map((app, idx) => (
          <div 
            key={app.id} 
            className={`flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-4 ${
              idx === 0 ? "pt-0" : ""
            } ${idx === applications.length - 1 ? "pb-0" : ""}`}
          >
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-1">
                {app.role}
              </h4>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-0.5">
                <span className="flex items-center gap-1">
                  <Building className="size-3" />
                  {app.companyName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {app.appliedDate}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start sm:justify-end">
              {getStatusBadge(app.status)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
