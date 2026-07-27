import * as React from "react"
import { Card } from "@/components/ui/card"
import { Briefcase, Users, Star, CalendarClock, Send, Award } from "lucide-react"

interface EmployerStatsProps {
  activeOpportunities: number
  totalApplicants: number
  shortlistedCandidates: number
  scheduledInterviews: number
  offersSent: number
  successfulPlacements: number
}

export function EmployerStats({
  activeOpportunities,
  totalApplicants,
  shortlistedCandidates,
  scheduledInterviews,
  offersSent,
  successfulPlacements,
}: EmployerStatsProps) {
  const statItems = [
    {
      title: "Active Opportunities",
      value: activeOpportunities,
      icon: Briefcase,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      description: "Live listings accepting applications",
    },
    {
      title: "Total Applicants",
      value: totalApplicants,
      icon: Users,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      description: "Candidates in active pipelines",
    },
    {
      title: "Shortlisted Candidates",
      value: shortlistedCandidates,
      icon: Star,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      description: "Screened & qualified talent",
    },
    {
      title: "Scheduled Interviews",
      value: scheduledInterviews,
      icon: CalendarClock,
      color: "text-accent bg-orange-50 border-orange-100",
      description: "Upcoming candidate syncs",
    },
    {
      title: "Offers Sent",
      value: offersSent,
      icon: Send,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      description: "Pending candidate responses",
    },
    {
      title: "Successful Placements",
      value: successfulPlacements,
      icon: Award,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      description: "Hired & onboarded graduates",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 select-none">
      {statItems.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.title} className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                {item.title}
              </span>
              <div className={`p-2 rounded-xl border ${item.color} shrink-0`}>
                <Icon className="size-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground tracking-tight">
                {item.value}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">{item.description}</p>
          </Card>
        )
      })}
    </div>
  )
}
