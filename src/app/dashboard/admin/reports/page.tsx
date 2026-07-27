"use client"

import * as React from "react"
import { ReportService } from "@/features/admin/services/report.service"
import { AdminReport } from "@/features/admin/types/admin.types"
import { ReportCard } from "@/features/admin/components/ReportCard"
import { Loader2, Check } from "lucide-react"

export default function ReportsPage() {
  const [reports, setReports] = React.useState<AdminReport[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [exportMsg, setExportMsg] = React.useState<string | null>(null)

  const loadReports = React.useCallback(async () => {
    try {
      const data = await ReportService.getReports()
      setReports(data)
    } catch (err) {
      console.error("Failed to load reports:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadReports()
  }, [loadReports])

  const handleExport = (id: string, title: string) => {
    setExportMsg(`Exported report data for "${title}" (Mock CSV file downloaded)`)
    setTimeout(() => setExportMsg(null), 3000)
  }

  if (isLoading && reports.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading report generator...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Operational Governance Reports
        </h1>
        <p className="text-xs text-muted-foreground">
          Generate and export audit reports covering student employability benchmarks, mentorship activity logs, and corporate engagement metrics.
        </p>
      </div>

      {/* Export notification alert */}
      {exportMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse select-none">
          <Check className="size-4 text-emerald-600" />
          {exportMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep) => (
          <ReportCard key={rep.id} report={rep} onExport={handleExport} />
        ))}
      </div>
    </div>
  )
}
