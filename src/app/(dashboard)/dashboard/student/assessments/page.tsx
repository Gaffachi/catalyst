"use client"

import * as React from "react"
import { AssessmentService } from "@/features/mentor/services/assessment.service"
import { CareerAssessment } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Star, Calendar, User, ClipboardCheck, Sparkles, CheckCircle2, Award } from "lucide-react"

export default function StudentAssessmentsPage() {
  const [assessments, setAssessments] = React.useState<CareerAssessment[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadAssessments = React.useCallback(async () => {
    try {
      const data = await AssessmentService.getAssessments()
      // Filter for student view (or mock default student Alex Mensah)
      setAssessments(data)
    } catch (err) {
      console.error("Failed to load career assessments:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadAssessments()
  }, [loadAssessments])

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading your competency scorecards...
        </span>
      </div>
    )
  }

  const latestAssessment = assessments[0]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border/40 pb-4">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Career Readiness Assessments
        </h1>
        <p className="text-xs text-muted-foreground">
          Review official evaluation scorecards published by industry mentors assessing your technical and professional competencies.
        </p>
      </div>

      {/* Latest Score Overview Banner */}
      {latestAssessment && (
        <Card className="p-6 border border-emerald-200/80 bg-gradient-to-br from-emerald-50/40 via-white to-orange-50/20 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-600 text-[10px] font-extrabold uppercase px-2 py-0.5">
                  Latest Evaluation
                </Badge>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Calendar className="size-3 text-slate-400" />
                  {latestAssessment.date}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-800">
                Official Employability Readiness Index
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-emerald-100/60 text-emerald-800 px-4 py-2 rounded-2xl border border-emerald-200 shrink-0 select-none">
              <Award className="size-6 text-emerald-600" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-700">Overall Index</span>
                <span className="text-2xl font-black">{latestAssessment.overallReadiness}%</span>
              </div>
            </div>
          </div>

          {/* Detailed 8 Rubrics Breakdown */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Competency Rubric Breakdown</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Technical Skills", score: latestAssessment.ratings?.technicalSkills || 85 },
                { label: "Communication", score: latestAssessment.ratings?.communication || 80 },
                { label: "Problem Solving", score: latestAssessment.ratings?.problemSolving || 88 },
                { label: "Professionalism", score: latestAssessment.ratings?.professionalism || 90 },
                { label: "Teamwork", score: latestAssessment.ratings?.teamwork || 85 },
                { label: "Leadership", score: latestAssessment.ratings?.leadership || 75 },
                { label: "Time Management", score: latestAssessment.ratings?.timeManagement || 82 },
                { label: "Portfolio Quality", score: latestAssessment.ratings?.portfolioQuality || 88 },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-border/60 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block truncate">{item.label}</span>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mr-2 overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-200">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Feedback Notes */}
          <div className="text-xs bg-white/80 p-3.5 rounded-xl border border-emerald-150 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px] flex items-center gap-1">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              Mentor Feedback Notes:
            </span>
            <p className="italic text-slate-700 leading-relaxed font-medium">{latestAssessment.notes}</p>
          </div>
        </Card>
      )}

      {/* Historical Evaluations List */}
      <div className="space-y-4">
        <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border/40 pb-2 select-none">
          <ClipboardCheck className="size-4 text-accent" />
          Evaluation History Log
        </h3>

        <div className="space-y-3">
          {assessments.map((ass) => (
            <Card key={ass.id} className="p-4 border border-border/50 bg-card shadow-sm hover:shadow transition-shadow space-y-3">
              <div className="flex justify-between items-start gap-2 border-b border-border/20 pb-2">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    <User className="size-3.5 text-slate-400" />
                    Evaluated for: {ass.studentName}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="size-3 text-slate-400" />
                    {ass.date}
                  </span>
                </div>

                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1 shrink-0">
                  <Star className="size-3.5 fill-emerald-600" />
                  {ass.overallReadiness}% Readiness Score
                </span>
              </div>

              <div className="text-[11px] text-slate-600 bg-slate-50/40 p-3 border border-slate-100 rounded-xl space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[9px]">Summary Notes:</span>
                <p className="italic leading-relaxed">{ass.notes}</p>
              </div>
            </Card>
          ))}

          {assessments.length === 0 && (
            <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-slate-50/10 text-muted-foreground select-none">
              <Sparkles className="size-8 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-bold">No evaluation scorecards published yet.</p>
              <p className="text-[10px] text-slate-400">Once your mentor audits your skills and code, evaluations will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
