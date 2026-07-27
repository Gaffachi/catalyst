"use client"

import * as React from "react"
import { MentorAnalyticsService } from "@/features/mentor/services/analytics.service"
import { MentorAnalytics } from "@/features/mentor/types/analytics.types"
import { MentorAnalyticsCard } from "@/features/mentor/components/MentorAnalyticsCard"
import { Loader2 } from "lucide-react"

export default function MentorAnalyticsPage() {
  const [analytics, setAnalytics] = React.useState<MentorAnalytics | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const loadAnalytics = React.useCallback(async () => {
    try {
      const data = await MentorAnalyticsService.getAnalytics()
      setAnalytics(data)
    } catch (err) {
      console.error("Failed to load mentor analytics:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadAnalytics()
  }, [loadAnalytics])

  if (isLoading || !analytics) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading mentorship impact analytics...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Mentorship Impact & Coaching Analytics
        </h1>
        <p className="text-xs text-muted-foreground">
          Track mentee readiness gains, session hours completed, portfolio reviews conducted, and top technical skills coached.
        </p>
      </div>

      <MentorAnalyticsCard analytics={analytics} />
    </div>
  )
}
