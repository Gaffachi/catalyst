import * as React from "react"
import { Card } from "@/components/ui/card"
import { GraduationCap, Users, Building2, Briefcase, Award, Clock } from "lucide-react"

interface AdminStatsProps {
  totalStudents: number
  activeMentors: number
  verifiedEmployers: number
  activeOpportunities: number
  successfulPlacements: number
  pendingReviews: number
}

export function AdminStats({
  totalStudents,
  activeMentors,
  verifiedEmployers,
  activeOpportunities,
  successfulPlacements,
  pendingReviews,
}: AdminStatsProps) {
  const statsList = [
    {
      title: "Total Students",
      value: totalStudents.toLocaleString(),
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      description: "Enrolled across 6 universities",
    },
    {
      title: "Active Mentors",
      value: activeMentors.toLocaleString(),
      icon: Users,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      description: "Verified industry advisors",
    },
    {
      title: "Verified Employers",
      value: verifiedEmployers.toLocaleString(),
      icon: Building2,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      description: "Corporate recruitment partners",
    },
    {
      title: "Active Opportunities",
      value: activeOpportunities.toLocaleString(),
      icon: Briefcase,
      color: "text-accent bg-orange-50 border-orange-100",
      description: "Live internships & career roles",
    },
    {
      title: "Successful Placements",
      value: successfulPlacements.toLocaleString(),
      icon: Award,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      description: "Hired graduate candidates",
    },
    {
      title: "Pending Approvals",
      value: pendingReviews.toLocaleString(),
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      description: "Verifications awaiting review",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 select-none">
      {statsList.map((st) => {
        const Icon = st.icon
        return (
          <Card key={st.title} className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                {st.title}
              </span>
              <div className={`p-2 rounded-xl border ${st.color} shrink-0`}>
                <Icon className="size-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground tracking-tight">
                {st.value}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">{st.description}</p>
          </Card>
        )
      })}
    </div>
  )
}
