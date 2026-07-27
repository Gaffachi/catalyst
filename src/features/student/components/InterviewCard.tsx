"use client"

import * as React from "react"
import { StudentInterview } from "../types/interview.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, User, Building2, ExternalLink, CheckCircle2 } from "lucide-react"

interface InterviewCardProps {
  interview: StudentInterview
}

export function InterviewCard({ interview }: InterviewCardProps) {
  const getStatusBadge = (status: StudentInterview["status"]) => {
    switch (status) {
      case "Scheduled":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px]">Upcoming Interview</Badge>
      case "Completed":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-bold text-[10px]">Completed</Badge>
      case "Cancelled":
        return <Badge className="bg-rose-50 text-rose-700 border-rose-200 font-bold text-[10px]">Cancelled</Badge>
      case "Rescheduled":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-bold text-[10px]">Rescheduled</Badge>
    }
  }

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-4 select-none">
      <div className="flex justify-between items-start border-b border-border/30 pb-3 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getStatusBadge(interview.status)}
            <Badge variant="outline" className="text-[10px] font-extrabold text-slate-600 bg-slate-50">
              {interview.interviewType}
            </Badge>
          </div>
          <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100">
            {interview.role}
          </h3>
          <span className="text-xs text-accent font-bold flex items-center gap-1">
            <Building2 className="size-3.5 text-slate-400" />
            {interview.company}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50/50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
          <Calendar className="size-3.5 text-accent" />
          {interview.date}
        </span>
        <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 justify-end">
          <Clock className="size-3.5 text-accent" />
          {interview.time}
        </span>
      </div>

      {interview.interviewerName && (
        <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium">
          <User className="size-3.5 text-slate-400 shrink-0" />
          Interviewer: <strong className="text-slate-800 dark:text-slate-200">{interview.interviewerName}</strong>
        </p>
      )}

      {interview.notes && (
        <p className="text-[11px] text-slate-500 bg-orange-50/30 p-2.5 rounded-lg border border-orange-100/60 leading-relaxed">
          {interview.notes}
        </p>
      )}

      <div className="flex justify-end pt-2 border-t border-border/20">
        {interview.meetingLink && interview.status === "Scheduled" ? (
          <a href={interview.meetingLink} target="_blank" rel="noreferrer">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white h-8 px-3 rounded-xl font-bold text-xs cursor-pointer border-0">
              <Video className="size-3.5 mr-1.5" />
              Join Video Room
              <ExternalLink className="size-3 ml-1" />
            </Button>
          </a>
        ) : (
          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="size-3 text-emerald-600" /> Recorded in Application History
          </span>
        )}
      </div>
    </Card>
  )
}
