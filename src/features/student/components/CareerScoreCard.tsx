import * as React from "react"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Zap, Info } from "lucide-react"

interface CareerScoreCardProps {
  score: number
}

export function CareerScoreCard({ score }: CareerScoreCardProps) {
  // Determine readiness level text
  const getLevel = (val: number) => {
    if (val >= 80) return { label: "Ready for Entry-Level Opportunities", color: "text-emerald-600 bg-emerald-50 border-emerald-100" }
    if (val >= 75) return { label: "Ready for Graduate Roles", color: "text-blue-600 bg-blue-50 border-blue-100" }
    return { label: "Needs Alignment Pathways", color: "text-amber-600 bg-amber-50 border-amber-100" }
  }

  const level = getLevel(score)

  const breakdown = [
    { label: "Skills Tag Coverage", weight: "30%", val: 90 },
    { label: "Vetted Portfolios", weight: "25%", val: 80 },
    { label: "Mentor Session Evaluations", weight: "20%", val: 85 },
    { label: "Profile Completions", weight: "15%", val: 85 },
    { label: "Aligned Career Goals", weight: "10%", val: 100 },
  ]

  return (
    <Card className="border border-border/60 bg-card shadow-sm h-full flex flex-col justify-between p-6 select-none animate-in fade-in duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-border/40 pb-2">
          <h3 className="font-heading text-sm font-bold text-foreground">
            Employment Readiness
          </h3>
          <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-lg uppercase w-fit ${level.color}`}>
            {level.label}
          </span>
        </div>

        {/* Big Score Indicator */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-heading text-4xl font-black text-slate-800">
            {score}%
          </span>
          <span className="text-xs text-muted-foreground font-semibold">Readiness Index</span>
        </div>

        {/* Readiness Bar */}
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500" 
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Calculation breakdown weights lists */}
        <div className="space-y-2 pt-2 border-t border-border/30">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Info className="size-3 text-slate-400" />
            <span>Calculation weights</span>
          </div>
          <div className="space-y-1.5">
            {breakdown.map((item) => (
              <div key={item.label} className="flex justify-between items-center text-[10px] text-slate-500">
                <span className="font-medium text-slate-600">{item.label} ({item.weight})</span>
                <span className="font-bold text-slate-700">{item.val}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights Checkpoints */}
      <div className="border-t border-border/40 mt-4 pt-4 space-y-2">
        <div className="flex gap-2 items-center text-[11px] text-slate-600 dark:text-slate-400">
          <ShieldCheck className="size-3.5 text-accent" />
          <span>Vetted project badges active (+12%)</span>
        </div>
        <div className="flex gap-2 items-center text-[11px] text-slate-600 dark:text-slate-400">
          <Zap className="size-3.5 text-accent" />
          <span>Curriculum skills gap verified</span>
        </div>
      </div>
    </Card>
  )
}
