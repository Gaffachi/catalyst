import * as React from "react"
import { Interview } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Video, CheckCircle2, XCircle, RefreshCw, User } from "lucide-react"

interface InterviewCardProps {
  interview: Interview
  onUpdateStatus: (id: string, status: Interview["status"]) => void
}

export function InterviewCard({ interview, onUpdateStatus }: InterviewCardProps) {
  const getStatusBadge = (status: Interview["status"]) => {
    switch (status) {
      case "Scheduled":
        return <Badge className="bg-orange-50 text-accent border-orange-200 hover:bg-orange-50 font-bold text-[10px]">Scheduled</Badge>
      case "Completed":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-bold text-[10px]">Completed</Badge>
      case "Rescheduled":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 font-bold text-[10px]">Rescheduled</Badge>
      case "Cancelled":
        return <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50 font-bold text-[10px]">Cancelled</Badge>
    }
  }

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm space-y-4 select-none">
      <div className="flex justify-between items-start border-b border-border/30 pb-3 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getStatusBadge(interview.status)}
            <span className="text-[10px] font-bold text-slate-400 uppercase">{interview.interviewType}</span>
          </div>
          <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
            <User className="size-4 text-slate-400" />
            {interview.candidateName}
          </h3>
          <span className="text-xs text-accent font-bold block">{interview.position}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50/50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
            <Calendar className="size-3" />
            Date & Time
          </span>
          <p className="font-bold text-slate-700 dark:text-slate-200">{interview.date} at {interview.time}</p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
            <Video className="size-3" />
            Meeting Access
          </span>
          <a href={interview.locationOrLink} target="_blank" rel="noreferrer" className="font-bold text-accent hover:underline truncate block">
            {interview.locationOrLink}
          </a>
        </div>
      </div>

      {interview.notes && (
        <div className="text-[11px] text-slate-600 bg-white/60 p-2.5 rounded-lg border border-slate-100 space-y-0.5">
          <span className="text-[9px] font-bold text-slate-400 uppercase block">Interview Agenda / Focus:</span>
          <p className="italic">{interview.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2 border-t border-border/20">
        {interview.status === "Scheduled" && (
          <>
            <Button
              onClick={() => onUpdateStatus(interview.id, "Completed")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 px-3 rounded-lg font-bold text-[10px] cursor-pointer border-0"
            >
              <CheckCircle2 className="size-3 mr-1" />
              Mark Completed
            </Button>
            <Button
              onClick={() => onUpdateStatus(interview.id, "Rescheduled")}
              variant="outline"
              className="h-7 px-3 rounded-lg font-bold text-[10px] text-slate-600 border-slate-200"
            >
              <RefreshCw className="size-3 mr-1" />
              Reschedule
            </Button>
            <Button
              onClick={() => onUpdateStatus(interview.id, "Cancelled")}
              variant="ghost"
              className="h-7 px-3 rounded-lg font-bold text-[10px] text-rose-600 hover:bg-rose-50"
            >
              <XCircle className="size-3 mr-1" />
              Cancel Call
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
