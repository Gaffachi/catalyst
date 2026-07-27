import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Application } from "../types/student.types"
import { Calendar, Building2 } from "lucide-react"

interface ApplicationCardProps {
  application: Application
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const getOpportunityBadge = (type: Application["opportunityType"]) => {
    switch (type) {
      case "INTERNSHIP":
        return <Badge variant="outline" className="text-[9px] border-purple-200 text-purple-700 bg-purple-50/20 font-semibold px-1 rounded">Intern</Badge>
      case "GRADUATE_PROGRAM":
        return <Badge variant="outline" className="text-[9px] border-sky-200 text-sky-700 bg-sky-50/20 font-semibold px-1 rounded">Grad</Badge>
      case "FULL_TIME":
        return <Badge variant="outline" className="text-[9px] border-emerald-200 text-emerald-700 bg-emerald-50/20 font-semibold px-1 rounded">Full-Time</Badge>
      case "CONTRACT":
        return <Badge variant="outline" className="text-[9px] border-amber-250 text-accent bg-amber-50/20 font-semibold px-1 rounded">Contract</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="p-4 border border-border/60 bg-card shadow-sm hover:border-slate-350 transition-colors select-none animate-in fade-in duration-150">
      <div className="space-y-2">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
              {application.role}
            </h4>
            <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
              <Building2 className="size-3 text-slate-400" />
              <span className="line-clamp-1">{application.companyName}</span>
            </div>
          </div>
          {getOpportunityBadge(application.opportunityType)}
        </div>

        <div className="flex items-center gap-1 text-[9px] text-slate-400 pt-1 border-t border-border/30">
          <Calendar className="size-3" />
          <span>Applied: {application.appliedDate}</span>
        </div>
      </div>
    </Card>
  )
}
