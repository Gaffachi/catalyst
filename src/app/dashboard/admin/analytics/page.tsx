"use client"

import * as React from "react"
import { AnalyticsService } from "@/features/admin/services/analytics.service"
import { PlatformAnalytics } from "@/features/admin/types/admin.types"
import { AnalyticsCard } from "@/features/admin/components/AnalyticsCard"
import { Loader2 } from "lucide-react"

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = React.useState<PlatformAnalytics | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const loadAnalytics = React.useCallback(async () => {
    try {
      const data = await AnalyticsService.getAnalytics()
      setAnalytics(data)
    } catch (err) {
      console.error("Failed to load platform analytics:", err)
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
          Gathering platform analytics metrics...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Platform-Wide Intelligence & Analytics
        </h1>
        <p className="text-xs text-muted-foreground">
          Comprehensive multi-stakeholder governance report tracking Student growth, Mentor engagement, Employer activity, and Placement conversion rates.
        </p>
      </div>

      <AnalyticsCard analytics={analytics} />
    </div>
  )
}
