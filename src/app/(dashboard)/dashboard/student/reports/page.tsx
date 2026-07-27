"use client"

import * as React from "react"
import { useStudentProfile } from "@/features/student/hooks/useStudentProfile"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Award, TrendingUp, Briefcase, FolderGit, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react"

export default function StudentReportsPage() {
  const { profile, isLoading } = useStudentProfile()

  if (isLoading || !profile) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Generating your career progress report...
        </span>
      </div>
    )
  }

  const verifiedProjects = profile.portfolio.filter((p) => p.status === "Completed").length
  const activeApplications = profile.applications.length
  const pendingReviews = profile.portfolio.filter((p) => p.status === "In Progress").length

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border/40 pb-4">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          My Progress & Performance Report
        </h1>
        <p className="text-xs text-muted-foreground">
          Comprehensive analytical breakdown of your career readiness index, verified portfolio projects, and marketplace engagement.
        </p>
      </div>

      {/* KPI Highlight Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Readiness Index */}
        <Card className="p-5 border border-emerald-200/80 bg-emerald-50/20 shadow-sm space-y-2 select-none">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Career Readiness Index</span>
            <Award className="size-5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{profile.readinessScore}%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="size-3" />
              +5% this month
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Weighted index across technical & soft competencies.</p>
        </Card>

        {/* Portfolio Audits */}
        <Card className="p-5 border border-purple-200/80 bg-purple-50/20 shadow-sm space-y-2 select-none">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verified Projects</span>
            <FolderGit className="size-5 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{verifiedProjects} / {profile.portfolio.length}</span>
            <span className="text-xs font-bold text-purple-600">Active</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">{pendingReviews} project(s) currently awaiting audit.</p>
        </Card>

        {/* Applications Ratio */}
        <Card className="p-5 border border-orange-200/80 bg-orange-50/20 shadow-sm space-y-2 select-none">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Marketplace Targets</span>
            <Briefcase className="size-5 text-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{activeApplications}</span>
            <span className="text-xs font-bold text-accent">Submitted</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Active applications in hiring pipelines.</p>
        </Card>
      </div>

      {/* Competency Mastery Spread */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border/30 pb-2">
          <Sparkles className="size-4 text-accent" />
          Validated Skills Mastery
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.skills.map((skill) => (
            <div key={skill.name} className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-200">{skill.name}</span>
                <Badge variant="outline" className="text-[9px] px-2 py-0 font-bold border-slate-200 uppercase">
                  {skill.category}
                </Badge>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-accent to-orange-500 h-2 rounded-full" 
                  style={{ width: `${skill.level}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Advisory Recommendations */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-3">
        <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border/30 pb-2">
          <ShieldCheck className="size-4 text-emerald-600" />
          Advisor Recommendations & Next Steps
        </h3>

        <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed font-medium">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
            <p><span className="font-bold text-slate-800">Portfolio Expansion:</span> Submit your latest placement project for mentor code review to increase your readiness index above 85%.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
            <p><span className="font-bold text-slate-800">Mock Interview Preparation:</span> Book a 45-minute sync with Sarah Johnson to practice technical system design scenarios.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
