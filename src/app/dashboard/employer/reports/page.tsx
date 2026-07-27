"use client"

import * as React from "react"
import { EmployerReportService } from "@/features/employer/services/report.service"
import { AdminReport } from "@/features/admin/types/admin.types"
import { EmployerReportCard } from "@/features/employer/components/EmployerReportCard"
import { Loader2, Check } from "lucide-react"

export default function EmployerReportsPage() {
  const [reports, setReports] = React.useState<AdminReport[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [exportMsg, setExportMsg] = React.useState<string | null>(null)

  const loadReports = React.useCallback(async () => {
    try {
      const data = await EmployerReportService.getReports()
      setReports(data)
    } catch (err) {
      console.error("Failed to load employer reports:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadReports()
  }, [loadReports])

  const handleExport = (id: string, title: string) => {
    setExportMsg(`Exported report data for "${title}" (Mock CSV downloaded)`)
    setTimeout(() => setExportMsg(null), 3000)
  }

  if (isLoading && reports.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading employer recruitment reports...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Recruitment Audit & Talent Reports
        </h1>
        <p className="text-xs text-muted-foreground">
          Export-ready reports covering candidate screening funnels, offer conversion rates, and applicant skill distributions.
        </p>
      </div>

      {exportMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse select-none">
          <Check className="size-4 text-emerald-600" />
          {exportMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep) => (
          <EmployerReportCard key={rep.id} report={rep} onExport={handleExport} />
        ))}
      </div>
    </div>
  )
}
