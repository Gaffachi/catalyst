"use client"

import * as React from "react"
import { ApplicationService } from "@/features/student/services/application.service"
import { Application } from "@/features/student/types/student.types"
import { ApplicationBoard } from "@/features/student/components/ApplicationBoard"
import { Loader2 } from "lucide-react"

export default function StudentApplicationsPage() {
  const [applications, setApplications] = React.useState<Application[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadData() {
      try {
        const data = await ApplicationService.getApplications()
        setApplications(data)
      } catch (err) {
        console.error("Failed to load applications:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading && applications.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading applications pipeline...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Application Tracker
        </h1>
        <p className="text-xs text-muted-foreground">
          Track the status of your internship applications in real-time as recruiters process them.
        </p>
      </div>

      {/* Kanban Board */}
      <ApplicationBoard applications={applications} />

    </div>
  )
}
