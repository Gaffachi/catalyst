"use client"

import * as React from "react"
import { StudentInterviewService } from "@/features/student/services/interview.service"
import { StudentInterview } from "@/features/student/types/interview.types"
import { InterviewCard } from "@/features/student/components/InterviewCard"
import { Loader2 } from "lucide-react"

export default function StudentInterviewsPage() {
  const [interviews, setInterviews] = React.useState<StudentInterview[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadInterviews = React.useCallback(async () => {
    try {
      const data = await StudentInterviewService.getInterviews()
      setInterviews(data)
    } catch (err) {
      console.error("Failed to load student interviews:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadInterviews()
  }, [loadInterviews])

  if (isLoading && interviews.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading scheduled recruitment interviews...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          My Scheduled Interviews
        </h1>
        <p className="text-xs text-muted-foreground">
          Track upcoming video calls, technical screens, and completed interview rounds with prospective tech employers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviews.map((item) => (
          <InterviewCard key={item.id} interview={item} />
        ))}
      </div>
    </div>
  )
}
