import * as React from "react"
import { Card } from "@/components/ui/card"
import { ArrowRight, Lightbulb } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  type: string
}

export function SkillRecommendationCard() {
  const recommendations: Recommendation[] = [
    {
      id: "rec-1",
      title: "Learn AWS Cloud Developer Fundamentals",
      description: "Map target database stacks to secure cloud platforms using S3, RDS, and Lambda functions.",
      difficulty: "Beginner",
      type: "Course Path",
    },
    {
      id: "rec-2",
      title: "Enterprise Systems Architecture Design",
      description: "Improve MVC routing architectures, API rate limiting designs, and cache scaling databases.",
      difficulty: "Advanced",
      type: "Practical Project",
    },
  ]

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-border/40 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 shrink-0">
          <Lightbulb className="size-4.5 animate-pulse text-accent" />
        </div>
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100">
          Recommended Skill Gaps Coverage
        </h3>
      </div>

      <div className="space-y-3.5 select-none">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className="p-4 rounded-xl border border-border bg-slate-50/20 hover:border-slate-300 transition-colors flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-accent bg-orange-50 px-2 py-0.5 rounded-full uppercase">
                  {rec.type}
                </span>
                <span className="text-[9px] font-medium text-slate-400">
                  • {rec.difficulty} Level
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">
                {rec.title}
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xl">
                {rec.description}
              </p>
            </div>
            <button className="flex items-center gap-1 text-[11px] font-bold text-accent hover:text-orange-600 transition-colors cursor-pointer select-none shrink-0 self-end sm:self-center">
              <span>Start Path</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}
