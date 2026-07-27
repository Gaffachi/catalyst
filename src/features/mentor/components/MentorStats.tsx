import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, FolderClock, Award, TrendingUp } from "lucide-react"

interface MentorStatsProps {
  totalStudents: number
  upcomingSessions: number
  pendingReviews: number
  completedSessions: number
  averageReadiness: number
}

export function MentorStats({
  totalStudents,
  upcomingSessions,
  pendingReviews,
  completedSessions,
  averageReadiness,
}: MentorStatsProps) {
  const kpis = [
    {
      label: "Assigned Students",
      val: totalStudents,
      icon: Users,
      color: "text-blue-500 bg-blue-50 border-blue-100",
    },
    {
      label: "Upcoming Sessions",
      val: upcomingSessions,
      icon: Calendar,
      color: "text-amber-500 bg-amber-50 border-amber-100",
    },
    {
      label: "Pending Reviews",
      val: pendingReviews,
      icon: FolderClock,
      color: "text-purple-500 bg-purple-50 border-purple-100",
    },
    {
      label: "Completed Syncs",
      val: completedSessions,
      icon: Award,
      color: "text-emerald-500 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Average Readiness",
      val: `${averageReadiness}%`,
      icon: TrendingUp,
      color: "text-accent bg-orange-50 border-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 select-none">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.label} className="border border-border/60 bg-card shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-4 flex flex-col justify-between h-[105px]">
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border ${kpi.color}`}>
                  <Icon className="size-4" />
                </div>
              </div>
              <span className="font-heading text-2xl font-black text-slate-800 dark:text-slate-100">
                {kpi.val}
              </span>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
