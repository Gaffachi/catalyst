"use client"

import * as React from "react"
import { AdminHeader } from "@/features/admin/components/AdminHeader"
import { AdminStats } from "@/features/admin/components/AdminStats"
import { AdminService } from "@/features/admin/services/admin.service"
import { VerificationService } from "@/features/admin/services/verification.service"
import { OpportunityManagementService } from "@/features/admin/services/opportunity-management.service"
import { PlatformAnalytics, MentorVerification, EmployerVerification, OpportunityApproval } from "@/features/admin/types/admin.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Loader2, UserCheck, Building2, CheckSquare } from "lucide-react"

export default function AdminDashboardOverviewPage() {
  const [stats, setStats] = React.useState<PlatformAnalytics | null>(null)
  const [pendingMentors, setPendingMentors] = React.useState<MentorVerification[]>([])
  const [pendingEmployers, setPendingEmployers] = React.useState<EmployerVerification[]>([])
  const [pendingOpps, setPendingOpps] = React.useState<OpportunityApproval[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadOverview = React.useCallback(async () => {
    try {
      const statsData = await AdminService.getDashboardStats()
      const mentorsData = await VerificationService.getMentorVerifications()
      const employersData = await VerificationService.getEmployerVerifications()
      const oppsData = await OpportunityManagementService.getOpportunityApprovals()

      setStats(statsData)
      setPendingMentors(mentorsData.filter((m) => m.status === "Pending Review").slice(0, 3))
      setPendingEmployers(employersData.filter((e) => e.status === "Pending" || e.status === "Review").slice(0, 3))
      setPendingOpps(oppsData.filter((o) => o.status === "Pending").slice(0, 3))
    } catch (err) {
      console.error("Failed to load admin overview:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadOverview()
  }, [loadOverview])

  if (isLoading && !stats) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading platform governance workspace...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <AdminHeader
        title="Governance Control Panel"
        subtitle="Monitor platform user growth, perform stakeholder verifications, approve corporate listings, and generate operational reports."
      />

      {/* KPI Stats Grid */}
      {stats && (
        <AdminStats
          totalStudents={stats.totalStudents}
          activeMentors={stats.activeMentors}
          verifiedEmployers={stats.verifiedEmployers}
          activeOpportunities={stats.activeOpportunities}
          successfulPlacements={stats.successfulPlacements}
          pendingReviews={stats.pendingReviews}
        />
      )}

      {/* Verification Queue Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
        
        {/* Pending Mentor Verifications */}
        <Card className="p-5 border border-border/60 bg-card shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <h3 className="font-heading text-xs font-bold text-foreground flex items-center gap-1.5">
              <UserCheck className="size-4 text-purple-600" />
              Pending Mentors ({pendingMentors.length})
            </h3>
            <Link href="/dashboard/admin/mentors">
              <Button variant="ghost" className="h-6 text-[9px] font-bold p-0">
                View All
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            {pendingMentors.map((item) => (
              <div key={item.id} className="p-2.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-0.5">
                <span className="font-bold text-slate-800 dark:text-slate-100 block">{item.mentorName}</span>
                <span className="text-[10px] text-muted-foreground block">{item.company} — {item.experienceYears} yrs exp</span>
              </div>
            ))}
            {pendingMentors.length === 0 && (
              <p className="text-xs text-muted-foreground italic text-center py-4">No pending mentor reviews.</p>
            )}
          </div>
        </Card>

        {/* Pending Employer Verifications */}
        <Card className="p-5 border border-border/60 bg-card shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <h3 className="font-heading text-xs font-bold text-foreground flex items-center gap-1.5">
              <Building2 className="size-4 text-accent" />
              Pending Employers ({pendingEmployers.length})
            </h3>
            <Link href="/dashboard/admin/employers">
              <Button variant="ghost" className="h-6 text-[9px] font-bold p-0">
                View All
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            {pendingEmployers.map((item) => (
              <div key={item.id} className="p-2.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-0.5">
                <span className="font-bold text-slate-800 dark:text-slate-100 block">{item.companyName}</span>
                <span className="text-[10px] text-muted-foreground block">{item.industry} — {item.location}</span>
              </div>
            ))}
            {pendingEmployers.length === 0 && (
              <p className="text-xs text-muted-foreground italic text-center py-4">No pending employer reviews.</p>
            )}
          </div>
        </Card>

        {/* Pending Opportunity Approvals */}
        <Card className="p-5 border border-border/60 bg-card shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <h3 className="font-heading text-xs font-bold text-foreground flex items-center gap-1.5">
              <CheckSquare className="size-4 text-emerald-600" />
              Pending Listings ({pendingOpps.length})
            </h3>
            <Link href="/dashboard/admin/opportunities">
              <Button variant="ghost" className="h-6 text-[9px] font-bold p-0">
                View Board
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            {pendingOpps.map((item) => (
              <div key={item.id} className="p-2.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-0.5">
                <span className="font-bold text-slate-800 dark:text-slate-100 block">{item.title}</span>
                <span className="text-[10px] text-accent block font-semibold">{item.companyName}</span>
              </div>
            ))}
            {pendingOpps.length === 0 && (
              <p className="text-xs text-muted-foreground italic text-center py-4">No pending opportunity listings.</p>
            )}
          </div>
        </Card>

      </div>
    </div>
  )
}
