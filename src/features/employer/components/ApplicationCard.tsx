import * as React from "react"
import { EmployerApplication, ApplicationStage } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, Calendar, ChevronRight, Eye, CalendarCheck } from "lucide-react"

interface ApplicationCardProps {
  application: EmployerApplication
  onMoveStage: (id: string, nextStage: ApplicationStage) => void
  onScheduleInterview?: (candidateId: string, candidateName: string, position: string) => void
}

export function ApplicationCard({ application, onMoveStage, onScheduleInterview }: ApplicationCardProps) {
  const stageOrder: ApplicationStage[] = [
    "Applied", "Reviewing", "Shortlisted", "Assessment", "Interview", "Offer", "Hired"
  ]

  const currentIdx = stageOrder.indexOf(application.stage)
  const nextStage = currentIdx < stageOrder.length - 1 ? stageOrder[currentIdx + 1] : null

  return (
    <Card className="p-4 border border-border/60 bg-card shadow-xs hover:shadow transition-shadow space-y-3 select-none">
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-0.5">
          <h4 className="font-heading text-xs font-bold text-slate-800 dark:text-slate-100">
            {application.candidateName}
          </h4>
          <span className="text-[10px] text-muted-foreground font-semibold block truncate">
            {application.opportunityTitle}
          </span>
        </div>

        <Badge variant="outline" className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
          <Star className="size-2.5 mr-0.5 fill-emerald-600" />
          {application.readinessScore}%
        </Badge>
      </div>

      <div className="flex justify-between items-center text-[9px] text-slate-400 font-semibold border-t border-border/20 pt-2">
        <span className="flex items-center gap-1">
          <Calendar className="size-3" />
          Applied: {application.appliedDate}
        </span>
        <span className="uppercase text-[8px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 font-bold">
          {application.opportunityType}
        </span>
      </div>

      {/* Stage transition controls */}
      <div className="space-y-1.5 pt-1">
        {nextStage && (
          <Button
            onClick={() => onMoveStage(application.id, nextStage)}
            className="w-full h-7 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-[10px] cursor-pointer border-0"
          >
            Advance to {nextStage}
            <ChevronRight className="size-3 ml-1" />
          </Button>
        )}

        <div className="grid grid-cols-2 gap-1.5">
          <Link href={`/dashboard/employer/candidates/${application.candidateId}`}>
            <Button variant="outline" className="w-full h-6 rounded-md font-bold text-[9px] text-slate-600 border-slate-200">
              <Eye className="size-3 mr-1" />
              Candidate Profile
            </Button>
          </Link>

          {onScheduleInterview && (
            <Button
              onClick={() => onScheduleInterview(application.candidateId, application.candidateName, application.opportunityTitle)}
              variant="outline"
              className="w-full h-6 rounded-md font-bold text-[9px] text-accent border-orange-200 bg-orange-50/40"
            >
              <CalendarCheck className="size-3 mr-1" />
              Sync Call
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
