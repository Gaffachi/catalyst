"use client"

import * as React from "react"
import { MentorDashboardHeader } from "@/features/mentor/components/MentorDashboardHeader"
import { MentorStats } from "@/features/mentor/components/MentorStats"
import { ReportService, MentorReportMetrics } from "@/features/mentor/services/report.service"
import { SessionService } from "@/features/mentor/services/session.service"
import { StudentReviewService } from "@/features/mentor/services/student-review.service"
import { MentorshipSession, PortfolioReview } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, BookOpen, FileCheck2, ArrowRight, Loader2 } from "lucide-react"

export default function MentorDashboardOverviewPage() {
  const [metrics, setMetrics] = React.useState<MentorReportMetrics | null>(null)
  const [sessions, setSessions] = React.useState<MentorshipSession[]>([])
  const [reviews, setReviews] = React.useState<PortfolioReview[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadDashboardData = React.useCallback(async () => {
    try {
      const reportMetrics = await ReportService.getReportMetrics()
      const allSessions = await SessionService.getSessions()
      const allReviews = await StudentReviewService.getPortfolioReviews()

      setMetrics(reportMetrics)
      setSessions(allSessions.filter((s) => s.status === "Upcoming"))
      setReviews(allReviews.filter((r) => r.status === "Pending"))
    } catch (err) {
      console.error("Failed to load mentor overview data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading advisor overview data...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header welcome */}
      <MentorDashboardHeader 
        title="Welcome Back, Sarah Johnson"
        subtitle="Track assigned cohort readiness scores, schedule sessions, and verify student portfolios."
      />

      {/* KPI Stats */}
      <MentorStats 
        totalStudents={metrics?.totalStudents || 0}
        upcomingSessions={sessions.length}
        pendingReviews={reviews.length}
        completedSessions={metrics?.completedSessions || 0}
        averageReadiness={metrics?.averageReadiness || 0}
      />

      {/* Main split details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Upcoming session queue */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-border/40 pb-3">
            <div>
              <h3 className="font-heading text-sm font-bold text-foreground">
                Upcoming Mentorship Syncs
              </h3>
              <p className="text-[10px] text-muted-foreground">
                Review your next scheduled video counseling slots with mentees.
              </p>
            </div>
            <Link href="/dashboard/mentor/sessions">
              <Button variant="ghost" className="h-7 text-[10px] font-bold cursor-pointer">
                View All
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {sessions.slice(0, 3).map((sess) => (
              <div key={sess.id} className="flex items-center justify-between p-3 border border-border rounded-xl bg-slate-50/15">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {sess.studentName}
                  </span>
                  <span className="text-[10px] text-slate-450 block flex items-center gap-1">
                    <BookOpen className="size-3 text-slate-400" />
                    {sess.topic}
                  </span>
                </div>
                
                <div className="text-right space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-600 block flex items-center gap-1 justify-end">
                    <Calendar className="size-3 text-slate-450" />
                    {sess.date}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 block flex items-center gap-1 justify-end">
                    <Clock className="size-3 text-slate-400" />
                    {sess.time}
                  </span>
                </div>
              </div>
            ))}

            {sessions.length === 0 && (
              <p className="text-xs text-muted-foreground italic text-center py-6">
                No upcoming sessions scheduled.
              </p>
            )}
          </div>
        </Card>

        {/* 2. Pending reviews queue */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-border/40 pb-3">
            <div>
              <h3 className="font-heading text-sm font-bold text-foreground">
                Pending Portfolio Reviews
              </h3>
              <p className="text-[10px] text-muted-foreground">
                Students awaiting project verification audits.
              </p>
            </div>
            <Link href="/dashboard/mentor/portfolio-reviews">
              <Button variant="ghost" className="h-7 text-[10px] font-bold cursor-pointer">
                View All
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="flex items-center justify-between p-3 border border-border rounded-xl bg-slate-50/15">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {rev.title}
                  </span>
                  <span className="text-[10px] text-slate-450 block">
                    Submitted by: {rev.studentName}
                  </span>
                </div>
                
                <Link href="/dashboard/mentor/portfolio-reviews">
                  <Button className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-0 h-7 rounded-lg font-bold text-[10px] cursor-pointer">
                    <FileCheck2 className="size-3 mr-1" />
                    Audit
                  </Button>
                </Link>
              </div>
            ))}

            {reviews.length === 0 && (
              <p className="text-xs text-muted-foreground italic text-center py-6">
                All portfolios reviewed! Outstanding work.
              </p>
            )}
          </div>
        </Card>

      </div>

    </div>
  )
}
