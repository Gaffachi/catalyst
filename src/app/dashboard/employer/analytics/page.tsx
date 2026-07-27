"use client"

import * as React from "react"
import { AnalyticsService } from "@/features/employer/services/analytics.service"
import { RecruitmentAnalytics } from "@/features/employer/types/employer.types"
import { AnalyticsCard } from "@/features/employer/components/AnalyticsCard"
import { Loader2 } from "lucide-react"

export default function EmployerAnalyticsPage() {
  const [analytics, setAnalytics] = React.useState<RecruitmentAnalytics | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const loadAnalytics = React.useCallback(async () => {
    try {
      const data = await AnalyticsService.getAnalytics()
      setAnalytics(data)
    } catch (err) {
      console.error("Failed to load analytics:", err)
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
          Generating recruitment analytics report...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Recruitment Analytics & Insights
        </h1>
        <p className="text-xs text-muted-foreground">
          Monitor applicant conversion metrics, candidate readiness benchmarks, and top demanded technical skills.
        </p>
      </div>

      <AnalyticsCard analytics={analytics} />
    </div>
  )
}
