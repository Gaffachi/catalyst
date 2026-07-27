import * as React from "react"
import { AdminReport } from "../types/admin.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Calendar, CheckCircle2 } from "lucide-react"

interface ReportCardProps {
  report: AdminReport
  onExport: (id: string, title: string) => void
}

export function ReportCard({ report, onExport }: ReportCardProps) {
  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-4 select-none">
      <div className="flex justify-between items-start border-b border-border/30 pb-3 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100 font-bold text-[10px] uppercase">
              {report.type}
            </Badge>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase flex items-center gap-0.5">
              <CheckCircle2 className="size-3" />
              {report.status}
            </span>
          </div>
          <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100">
            {report.title}
          </h3>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        {report.summary}
      </p>

      <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-2 border-t border-border/20">
        <span className="flex items-center gap-1">
          <Calendar className="size-3" />
          Generated: {report.generatedDate} ({report.recordCount} Records)
        </span>

        <Button
          onClick={() => onExport(report.id, report.title)}
          className="bg-slate-900 hover:bg-slate-800 text-white h-7 px-3 rounded-lg font-bold text-[10px] cursor-pointer border-0"
        >
          <Download className="size-3 mr-1" />
          Export Mock CSV / PDF
        </Button>
      </div>
    </Card>
  )
}
