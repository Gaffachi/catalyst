import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, GraduationCap, Briefcase, CalendarRange } from "lucide-react"

interface OpportunityCategoryStatsProps {
  internshipsCount: number
  gradProgramsCount: number
  fullTimeCount: number
  contractsCount: number
}

export function OpportunityCategoryStats({
  internshipsCount,
  gradProgramsCount,
  fullTimeCount,
  contractsCount,
}: OpportunityCategoryStatsProps) {
  const categories = [
    {
      label: "Internships",
      count: internshipsCount,
      icon: Compass,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      label: "Graduate Programs",
      count: gradProgramsCount,
      icon: GraduationCap,
      color: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      label: "Full-Time Employment",
      count: fullTimeCount,
      icon: Briefcase,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      label: "Contract Roles",
      count: contractsCount,
      icon: CalendarRange,
      color: "bg-amber-50 text-accent border-orange-200",
    },
  ]

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4 select-none h-full">
      <div>
        <h3 className="font-heading text-sm font-bold text-foreground">
          Marketplace Distribution
        </h3>
        <p className="text-[10px] text-muted-foreground">
          Real-time counts of active listings across different employment formats.
        </p>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <div key={cat.label} className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-slate-50/15">
              <div className="flex items-center gap-2">
                <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${cat.color.split(" ")[0]} ${cat.color.split(" ")[1]}`}>
                  <Icon className="size-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{cat.label}</span>
              </div>
              <Badge variant="outline" className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${cat.color}`}>
                {cat.count} Roles
              </Badge>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
