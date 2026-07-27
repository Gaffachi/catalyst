import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, ThumbsUp, CalendarRange, CheckCircle2 } from "lucide-react"

interface ReportCardProps {
  metrics: {
    totalStudents: number
    activeStudents: number
    completedStudents: number
    totalReviews: number
    approvedReviews: number
    approvalRate: number
    totalSessions: number
    completedSessions: number
    cancelledSessions: number
    averageReadiness: number
    averageFeedbackRating: number
  }
}

export function ReportCard({ metrics }: ReportCardProps) {
  const cardsList = [
    {
      label: "Portfolio Approval Ratio",
      val: `${metrics.approvalRate}%`,
      sub: `${metrics.approvedReviews} out of ${metrics.totalReviews} projects approved`,
      icon: CheckCircle2,
      color: "text-purple-650 bg-purple-50",
    },
    {
      label: "Mentoring Sync Completion",
      val: `${metrics.completedSessions} Syncs`,
      sub: `${metrics.cancelledSessions} sessions cancelled in database`,
      icon: CalendarRange,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Average Student Rating",
      val: `${metrics.averageFeedbackRating} / 5.0`,
      sub: "Consistently rated high on communication and tech guidelines",
      icon: ThumbsUp,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Average Readiness Trend",
      val: `${metrics.averageReadiness}%`,
      sub: "Assigned student readiness index overall average",
      icon: TrendingUp,
      color: "text-accent bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      
      {/* Upper grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cardsList.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.label} className="p-6 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow flex items-start gap-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 ${card.color}`}>
                <Icon className="size-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{card.label}</span>
                <span className="font-heading text-xl font-black text-slate-800 dark:text-slate-100 block">{card.val}</span>
                <span className="text-[10px] text-muted-foreground font-semibold block leading-relaxed">{card.sub}</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Analytical Visual Trend Representation card */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-border/40 pb-3">
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <BarChart3 className="size-4.5 text-accent" />
              Readiness Performance Distribution
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Progress representation mapping current cohort student readiness score divisions.
            </p>
          </div>
          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
            Target: 80% Min
          </Badge>
        </div>

        {/* Visual progress bar layout */}
        <div className="space-y-3.5 pt-2">
          {[
            { label: "Cohort Excellence (Readiness >= 85%)", count: 8, percentage: 32, color: "bg-emerald-500" },
            { label: "Cohort Target Vetted (Readiness 70% - 84%)", count: 12, percentage: 48, color: "bg-blue-500" },
            { label: "Cohort Development (Readiness < 70%)", count: 5, percentage: 20, color: "bg-amber-500" },
          ].map((bar) => (
            <div key={bar.label} className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold text-slate-650">
                <span>{bar.label}</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{bar.count} Students ({bar.percentage}%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${bar.color}`}
                  style={{ width: `${bar.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}
