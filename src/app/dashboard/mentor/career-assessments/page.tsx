"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { MentorDashboardHeader } from "@/features/mentor/components/MentorDashboardHeader"
import { AssessmentCard } from "@/features/mentor/components/AssessmentCard"
import { AssessmentService } from "@/features/mentor/services/assessment.service"
import { StudentReviewService } from "@/features/mentor/services/student-review.service"
import { CareerAssessment, Student } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Star, Calendar, User, NotepadText, Loader2 } from "lucide-react"

export default function MentorCareerAssessmentsPage() {
  const searchParams = useSearchParams()
  const filterStudentId = searchParams.get("studentId") || undefined

  const [students, setStudents] = React.useState<Student[]>([])
  const [assessments, setAssessments] = React.useState<CareerAssessment[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showAssessmentSuccess, setShowAssessmentSuccess] = React.useState(false)

  const loadAssessmentsData = React.useCallback(async () => {
    try {
      const allStudents = await StudentReviewService.getStudents()
      const allAssessments = await AssessmentService.getAssessments()

      setStudents(allStudents)
      setAssessments(allAssessments)
    } catch (err) {
      console.error("Failed to load assessments data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadAssessmentsData()
  }, [loadAssessmentsData])

  const handleSaveAssessment = async (assessment: Omit<CareerAssessment, "id" | "date">) => {
    try {
      await AssessmentService.saveAssessment(assessment)
      
      // Reload lists to synchronize updated student global scores
      const allAssessments = await AssessmentService.getAssessments()
      const allStudents = await StudentReviewService.getStudents()
      
      setAssessments(allAssessments)
      setStudents(allStudents)
      
      setShowAssessmentSuccess(true)
      setTimeout(() => setShowAssessmentSuccess(false), 2000)
    } catch (err) {
      console.error("Failed to save assessment:", err)
    }
  }

  // Filter history
  const filteredHistory = assessments
    .filter((ass) => !filterStudentId || ass.studentId === filterStudentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading student career assessment scores...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Welcome header info */}
      <MentorDashboardHeader 
        title="Career Readiness Evaluations"
        subtitle="Grade cohort technical skills, communication, system design knowledge, and sync scorecards."
      />

      {/* Main split: evaluation form on the left, history on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Form: Evaluator Form (occupies 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <AssessmentCard 
            students={students}
            selectedStudentId={filterStudentId}
            onSaveAssessment={handleSaveAssessment}
          />
          {showAssessmentSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-150 text-center animate-bounce">
              Readiness Scorecard Published Successfully! Student index has been updated.
            </div>
          )}
        </div>

        {/* Right list: Evaluation History Log (occupies 1 col) */}
        <div className="space-y-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-heading text-sm font-bold text-foreground">
              Evaluation History Log
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Audit trails of recently saved student readiness scorecards.
            </p>
          </div>

          <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredHistory.map((ass) => (
              <Card key={ass.id} className="p-4 border border-border/50 bg-card shadow-sm hover:shadow transition-shadow space-y-3">
                <div className="flex justify-between items-start gap-2 border-b border-border/20 pb-2">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                      <User className="size-3.5 text-slate-400" />
                      {ass.studentName}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="size-3 text-slate-400" />
                      {ass.date}
                    </span>
                  </div>
                  
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5 select-none shrink-0">
                    <Star className="size-3 fill-emerald-600 animate-spin" style={{ animationDuration: "3s" }} />
                    {ass.overallReadiness}%
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 bg-slate-50/10 p-2.5 border border-slate-100 rounded-lg space-y-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                    <NotepadText className="size-3 text-slate-450" />
                    Review Comments:
                  </span>
                  <p className="italic leading-normal text-slate-655 font-semibold">
                    {ass.notes}
                  </p>
                </div>
              </Card>
            ))}

            {filteredHistory.length === 0 && (
              <div className="p-8 text-center border border-dashed border-border rounded-xl bg-slate-50/20 text-muted-foreground text-xs italic">
                No evaluation history found.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}
