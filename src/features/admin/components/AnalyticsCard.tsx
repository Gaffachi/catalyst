import * as React from "react"
import { PlatformAnalytics } from "../types/admin.types"
import { Card } from "@/components/ui/card"
import { GraduationCap, Users, Building2, TrendingUp, Award, Star, BarChart3 } from "lucide-react"

interface AnalyticsCardProps {
  analytics: PlatformAnalytics
}

export function AnalyticsCard({ analytics }: AnalyticsCardProps) {
  return (
    <div className="space-y-6 select-none">
      {/* 1. Student Metrics Row */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">STUDENT ANALYTICS</span>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-4 border border-blue-200 bg-blue-50/20 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Registered Students</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{analytics.totalStudents.toLocaleString()}</span>
              <GraduationCap className="size-4 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 border border-emerald-200 bg-emerald-50/20 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Avg Readiness Index</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{analytics.averageStudentReadiness}%</span>
              <Star className="size-4 text-emerald-600 fill-emerald-600" />
            </div>
          </Card>

          <Card className="p-4 border border-orange-200 bg-orange-50/20 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Graduate Placement Rate</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{analytics.employmentRate}%</span>
              <TrendingUp className="size-4 text-accent" />
            </div>
          </Card>

          <Card className="p-4 border border-indigo-200 bg-indigo-50/20 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Successful Hires</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{analytics.successfulPlacements}</span>
              <Award className="size-4 text-indigo-600" />
            </div>
          </Card>
        </div>
      </div>

      {/* 2. Mentor & Employer Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Mentor Analytics */}
        <Card className="p-5 border border-border/60 bg-card shadow-sm space-y-4">
          <h3 className="font-heading text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
            <Users className="size-4 text-purple-600" />
            MENTOR ANALYTICS
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Active Mentors</span>
              <span className="text-xl font-black text-purple-900">{analytics.activeMentors}</span>
            </div>
            <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Sessions Completed</span>
              <span className="text-xl font-black text-purple-900">{analytics.sessionsCompleted}</span>
            </div>
          </div>
        </Card>

        {/* Employer Analytics */}
        <Card className="p-5 border border-border/60 bg-card shadow-sm space-y-4">
          <h3 className="font-heading text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
            <Building2 className="size-4 text-accent" />
            EMPLOYER ANALYTICS
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Verified Employers</span>
              <span className="text-xl font-black text-slate-900">{analytics.verifiedEmployers}</span>
            </div>
            <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Active Jobs Posted</span>
              <span className="text-xl font-black text-slate-900">{analytics.activeOpportunities}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Demanded Tech Skills */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border/30 pb-2">
          <BarChart3 className="size-4 text-accent" />
          Top Requested Tech Skills Across Market Listings
        </h3>

        <div className="space-y-3">
          {analytics.topDemandedSkills.map((item) => (
            <div key={item.skill} className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-200">{item.skill}</span>
                <span className="text-accent">{item.count} Active Listings</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-accent to-orange-500 h-2 rounded-full" 
                  style={{ width: `${(item.count / 150) * 100}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
