"use client"

import * as React from "react"
import { MentorDashboardHeader } from "@/features/mentor/components/MentorDashboardHeader"
import { ReportCard } from "@/features/mentor/components/ReportCard"
import { ReportService, MentorReportMetrics } from "@/features/mentor/services/report.service"
import { Loader2 } from "lucide-react"

export default function MentorReportsPage() {
  const [metrics, setMetrics] = React.useState<MentorReportMetrics | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const loadReport = React.useCallback(async () => {
    try {
      const data = await ReportService.getReportMetrics()
      setMetrics(data)
    } catch (err) {
      console.error("Failed to load report metrics:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadReport()
  }, [loadReport])

  if (isLoading || !metrics) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Aggregating performance reports...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Info */}
      <MentorDashboardHeader 
        title="Cohort Analytical Reports"
        subtitle="Review overall portfolio approval metrics, completing sessions ratios, and cohort excellence spreads."
      />

      {/* Main Stats widgets */}
      <ReportCard metrics={metrics} />

    </div>
  )
}
