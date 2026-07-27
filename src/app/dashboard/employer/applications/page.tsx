"use client"

import * as React from "react"
import { ApplicationService } from "@/features/employer/services/application.service"
import { EmployerApplication, ApplicationStage } from "@/features/employer/types/employer.types"
import { ApplicationBoard } from "@/features/employer/components/ApplicationBoard"
import { Loader2, Check } from "lucide-react"

export default function ApplicationManagementPage() {
  const [applications, setApplications] = React.useState<EmployerApplication[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [statusMsg, setStatusMsg] = React.useState<string | null>(null)

  const loadApplications = React.useCallback(async () => {
    try {
      const data = await ApplicationService.getApplications()
      setApplications(data)
    } catch (err) {
      console.error("Failed to load applications:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadApplications()
  }, [loadApplications])

  const handleMoveStage = async (id: string, nextStage: ApplicationStage) => {
    try {
      const updated = await ApplicationService.updateApplicationStage(id, nextStage)
      setApplications(updated)
      setStatusMsg(`Candidate advanced to ${nextStage} stage!`)
      setTimeout(() => setStatusMsg(null), 2500)
    } catch (err) {
      console.error("Failed to update application stage:", err)
    }
  }

  if (isLoading && applications.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading application Kanban board...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-full mx-auto">
      {/* Header */}
      <div className="border-b border-border/40 pb-4 select-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Application Management Pipeline
          </h1>
          <p className="text-xs text-muted-foreground">
            Track and advance candidates across the 7-stage recruitment workflow from Applied to Hired.
          </p>
        </div>

        {statusMsg && (
          <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-bounce shrink-0">
            <Check className="size-4 text-emerald-600" />
            {statusMsg}
          </div>
        )}
      </div>

      {/* Kanban Board */}
      <ApplicationBoard applications={applications} onMoveStage={handleMoveStage} />
    </div>
  )
}
