"use client"

import * as React from "react"
import { ApplicationService } from "@/features/employer/services/application.service"
import { EmployerApplication } from "@/features/employer/types/employer.types"
import { TalentPipeline } from "@/features/employer/components/TalentPipeline"
import { Loader2 } from "lucide-react"

export default function TalentPipelinePage() {
  const [applications, setApplications] = React.useState<EmployerApplication[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadPipeline = React.useCallback(async () => {
    try {
      const data = await ApplicationService.getApplications()
      setApplications(data)
    } catch (err) {
      console.error("Failed to load talent pipeline:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadPipeline()
  }, [loadPipeline])

  if (isLoading && applications.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading talent conversion pipeline...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Talent Pipeline Funnel
        </h1>
        <p className="text-xs text-muted-foreground">
          High-level visual breakdown of candidate distribution across conversion stages from application submission to final hire placement.
        </p>
      </div>

      <TalentPipeline applications={applications} />
    </div>
  )
}
