import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MentorshipSession } from "../types/student.types"
import { Calendar, Clock, MessageSquare } from "lucide-react"

interface SessionCardProps {
  session: MentorshipSession
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <Card className="p-4 border border-border/60 bg-card shadow-sm hover:border-slate-300 transition-colors select-none">
      <div className="space-y-3">
        {/* Header Title */}
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              {session.mentorName}
            </h4>
            <p className="text-[10px] text-muted-foreground">
              {session.expertise} at {session.company}
            </p>
          </div>
          <Badge className="bg-slate-50 border-slate-200 text-slate-650 text-[9px] font-bold rounded-full uppercase">
            {session.status}
          </Badge>
        </div>

        {/* Date Time info */}
        <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 pt-1 border-t border-border/30">
          <span className="flex items-center gap-1">
            <Calendar className="size-3 text-slate-400" />
            {session.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3 text-slate-400" />
            {session.time}
          </span>
        </div>

        {/* Focus Discussion notes */}
        {session.feedbackNotes && (
          <div className="p-2.5 rounded-lg bg-slate-50/50 border border-border/30 text-[10px] text-slate-600 flex gap-1.5 items-start">
            <MessageSquare className="size-3.5 text-accent shrink-0 mt-0.5" />
            <p className="italic leading-normal">
              Topic: &quot;{session.feedbackNotes}&quot;
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
