import * as React from "react"
import { Card } from "@/components/ui/card"
import { Compass, ArrowRight, Star } from "lucide-react"

export function CareerRecommendationCard() {
  const recommendations = [
    {
      id: "rec-career-1",
      role: "Junior Backend Developer",
      company: "Hubtel Ghana",
      match: "87%",
      reason: "Matches Python + SQL database skills",
      type: "Full-Time",
    },
    {
      id: "rec-career-2",
      role: "Associate Cloud Systems Administrator",
      company: "Google EMEA Labs",
      match: "82%",
      reason: "Matches AWS Practitioner certification and networking coursework",
      type: "Graduate Program",
    },
  ]

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4 select-none animate-in fade-in duration-200">
      <div className="flex items-center gap-2 border-b border-border/40 pb-3 justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 shrink-0">
            <Compass className="size-4.5 text-accent" />
          </div>
          <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100">
            Recommended Career Opportunities
          </h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase">
          AI Matching Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className="p-4 rounded-xl border border-border bg-slate-50/20 hover:border-slate-350 transition-colors flex flex-col justify-between h-[135px]"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-2">
                <span className="text-[10px] font-bold text-accent bg-orange-50 px-2 py-0.5 rounded uppercase">
                  {rec.type}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 select-none">
                  <Star className="size-3 fill-emerald-600" />
                  {rec.match} Match
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                {rec.role}
              </h4>
              <p className="text-[10px] text-slate-400 font-semibold line-clamp-1">
                {rec.company}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border/30">
              <p className="text-[10px] text-slate-500 italic line-clamp-1 max-w-[170px]">
                Reason: {rec.reason}
              </p>
              <button className="flex items-center gap-1 text-[10px] font-bold text-slate-700 hover:text-foreground cursor-pointer">
                <span>View Job</span>
                <ArrowRight className="size-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
