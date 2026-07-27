import * as React from "react"
import { RecruitmentAnalytics } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Award, TrendingUp, BarChart3, Star } from "lucide-react"

interface AnalyticsCardProps {
  analytics: RecruitmentAnalytics
}

export function AnalyticsCard({ analytics }: AnalyticsCardProps) {
  return (
    <div className="space-y-6 select-none">
      {/* Upper Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 border border-emerald-200 bg-emerald-50/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Average Candidate Readiness</span>
            <Star className="size-5 text-emerald-600 fill-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{analytics.averageCandidateReadiness}%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="size-3" />
              Verified Competency
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Based on mentor audits across candidate pool.</p>
        </Card>

        <Card className="p-5 border border-blue-200 bg-blue-50/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hiring Conversion Rate</span>
            <TrendingUp className="size-5 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{analytics.hiringConversionRate}%</span>
            <span className="text-xs font-bold text-blue-600">Applied to Placed</span>
          </div>
          <p className="text-[10px] text-slate-500">Pipeline conversion efficiency metric.</p>
        </Card>

        <Card className="p-5 border border-orange-200 bg-orange-50/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Successful Placements</span>
            <Award className="size-5 text-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{analytics.successfulPlacements}</span>
            <span className="text-xs font-bold text-accent">Hired Graduates</span>
          </div>
          <p className="text-[10px] text-slate-500">Total Catalyst talent placed at Hubtel.</p>
        </Card>
      </div>

      {/* Top Requested Skills Bar Breakdown */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border/30 pb-2">
          <BarChart3 className="size-4 text-accent" />
          Most In-Demand Candidate Tech Skills
        </h3>

        <div className="space-y-3">
          {analytics.topRequestedSkills.map((item) => (
            <div key={item.skill} className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-200">{item.skill}</span>
                <span className="text-accent">{item.count} Candidates Match</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-accent to-orange-500 h-2 rounded-full" 
                  style={{ width: `${(item.count / 20) * 100}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
