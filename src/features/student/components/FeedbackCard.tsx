import * as React from "react"
import { Card } from "@/components/ui/card"
import { MentorshipSession } from "../types/student.types"
import { MessageCircle, User } from "lucide-react"

interface FeedbackCardProps {
  session: MentorshipSession
}

export function FeedbackCard({ session }: FeedbackCardProps) {
  return (
    <Card className="p-4 border border-border/60 bg-card shadow-sm hover:border-slate-350 transition-colors select-none">
      <div className="space-y-2.5">
        {/* Header */}
        <div className="flex justify-between items-center text-[10px] border-b border-border/30 pb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <User className="size-3.5 text-slate-400" />
            <span>{session.mentorName}</span>
          </div>
          <span className="text-slate-400">{session.date}</span>
        </div>

        {/* Content body */}
        <div className="flex gap-2 items-start pt-0.5">
          <MessageCircle className="size-4 text-accent shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
            &quot;{session.feedbackNotes}&quot;
          </p>
        </div>
      </div>
    </Card>
  )
}
