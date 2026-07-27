"use client"

import * as React from "react"
import { EmployerHeader } from "@/features/employer/components/EmployerHeader"
import { EmployerStats } from "@/features/employer/components/EmployerStats"
import { EmployerService } from "@/features/employer/services/employer.service"
import { OpportunityService } from "@/features/employer/services/opportunity.service"
import { ApplicationService } from "@/features/employer/services/application.service"
import { OpportunityCard } from "@/features/employer/components/OpportunityCard"
import { ApplicationCard } from "@/features/employer/components/ApplicationCard"
import { RecruitmentAnalytics, Opportunity, EmployerApplication } from "@/features/employer/types/employer.types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Loader2, Users, Briefcase } from "lucide-react"

export default function EmployerDashboardOverviewPage() {
  const [stats, setStats] = React.useState<RecruitmentAnalytics | null>(null)
  const [opportunities, setOpportunities] = React.useState<Opportunity[]>([])
  const [recentApplications, setRecentApplications] = React.useState<EmployerApplication[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadDashboard = React.useCallback(async () => {
    try {
      const statsData = await EmployerService.getDashboardStats()
      const oppsData = await OpportunityService.getOpportunities()
      const appsData = await ApplicationService.getApplications()

      setStats(statsData)
      setOpportunities(oppsData.filter((o) => o.status === "Active"))
      setRecentApplications(appsData.slice(0, 4))
    } catch (err) {
      console.error("Failed to load employer overview:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const handleCloseOpp = async (id: string) => {
    const updated = await OpportunityService.closeOpportunity(id)
    setOpportunities(updated.filter((o) => o.status === "Active"))
  }

  const handleMoveStage = async (id: string, nextStage: EmployerApplication["stage"]) => {
    const updated = await ApplicationService.updateApplicationStage(id, nextStage)
    setRecentApplications(updated.slice(0, 4))
  }

  if (isLoading && !stats) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading employer recruitment workspace...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <EmployerHeader
        title="Recruitment Console"
        subtitle="Manage active corporate opportunities, discover verified graduate talent, and review hiring pipelines."
        companyName="Hubtel Ghana"
        isVerified={true}
      />

      {/* KPI Cards */}
      {stats && (
        <EmployerStats
          activeOpportunities={stats.activeOpportunities}
          totalApplicants={stats.totalApplicants}
          shortlistedCandidates={stats.shortlistedCandidates}
          scheduledInterviews={stats.scheduledInterviews}
          offersSent={stats.offersSent}
          successfulPlacements={stats.successfulPlacements}
        />
      )}

      {/* Main Grid: Active Opportunities & Recent Applicants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Opportunity Listings (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center border-b border-border/40 pb-2 select-none">
            <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5">
              <Briefcase className="size-4 text-accent" />
              Active Opportunities ({opportunities.length})
            </h3>
            <Link href="/dashboard/employer/opportunities">
              <Button variant="ghost" className="h-7 text-[10px] font-bold cursor-pointer">
                Manage All
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {opportunities.slice(0, 3).map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} onCloseOpportunity={handleCloseOpp} />
            ))}

            {opportunities.length === 0 && (
              <p className="text-xs text-muted-foreground italic text-center py-8">
                No active listings. Create an opportunity to start receiving applications.
              </p>
            )}
          </div>
        </div>

        {/* Right: Recent Applicants Stream (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center border-b border-border/40 pb-2 select-none">
            <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5">
              <Users className="size-4 text-accent" />
              Recent Applicants
            </h3>
            <Link href="/dashboard/employer/applications">
              <Button variant="ghost" className="h-7 text-[10px] font-bold cursor-pointer">
                View Kanban Board
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onMoveStage={handleMoveStage}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
