"use client"

import * as React from "react"
import { MentorAnalytics } from "../types/analytics.types"
import { Card } from "@/components/ui/card"
import { Users, CalendarClock, FolderCheck, TrendingUp, BarChart3 } from "lucide-react"

interface MentorAnalyticsCardProps {
  analytics: MentorAnalytics
}

export function MentorAnalyticsCard({ analytics }: MentorAnalyticsCardProps) {
  return (
    <div className="space-y-6 select-none">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 border border-purple-200 bg-purple-50/20 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Assigned Mentees</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{analytics.totalStudents}</span>
            <Users className="size-4 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4 border border-blue-200 bg-blue-50/20 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Sessions Completed</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{analytics.completedSessions}</span>
            <CalendarClock className="size-4 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4 border border-emerald-200 bg-emerald-50/20 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Avg Readiness Gain</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700">+{analytics.avgStudentReadinessImprovement}%</span>
            <TrendingUp className="size-4 text-emerald-600" />
          </div>
        </Card>

        <Card className="p-4 border border-orange-200 bg-orange-50/20 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Portfolios Reviewed</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{analytics.portfoliosReviewed}</span>
            <FolderCheck className="size-4 text-accent" />
          </div>
        </Card>
      </div>

      {/* Top Skills Coached Chart */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border/30 pb-2">
          <BarChart3 className="size-4 text-accent" />
          Top Technical & Career Skills Coached
        </h3>

        <div className="space-y-3">
          {analytics.topSkillsCoached.map((item) => (
            <div key={item.skill} className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-200">{item.skill}</span>
                <span className="text-accent">{item.count} Guidance Hours</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-accent to-purple-600 h-2 rounded-full" 
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
