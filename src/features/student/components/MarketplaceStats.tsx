import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Sparkles, Send, CalendarCheck, Award } from "lucide-react"

interface MarketplaceStatsProps {
  totalCount: number
  matchingCount: number
  submittedCount: number
  interviewCount: number
  offerCount: number
}

export function MarketplaceStats({
  totalCount,
  matchingCount,
  submittedCount,
  interviewCount,
  offerCount,
}: MarketplaceStatsProps) {
  const stats = [
    {
      label: "Total Openings",
      val: totalCount,
      icon: Briefcase,
      color: "text-blue-500 bg-blue-50",
    },
    {
      label: "Matching Your Skills",
      val: matchingCount,
      icon: Sparkles,
      color: "text-accent bg-orange-50",
    },
    {
      label: "Applied Roles",
      val: submittedCount,
      icon: Send,
      color: "text-purple-500 bg-purple-50",
    },
    {
      label: "Interviews Booked",
      val: interviewCount,
      icon: CalendarCheck,
      color: "text-amber-500 bg-amber-50",
    },
    {
      label: "Offers Received",
      val: offerCount,
      icon: Award,
      color: "text-emerald-500 bg-emerald-50",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 select-none">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="border border-border/60 bg-card shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-4 flex flex-col justify-between h-[105px]">
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                  <Icon className="size-4" />
                </div>
              </div>
              <span className="font-heading text-2xl font-black text-slate-800 dark:text-slate-100">
                {stat.val}
              </span>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
