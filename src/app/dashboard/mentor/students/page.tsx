"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MentorDashboardHeader } from "@/features/mentor/components/MentorDashboardHeader"
import { StudentTable } from "@/features/mentor/components/StudentTable"
import { StudentCard } from "@/features/mentor/components/StudentCard"
import { StudentDetailsDrawer } from "@/features/mentor/components/StudentDetailsDrawer"
import { StudentReviewService } from "@/features/mentor/services/student-review.service"
import { Student } from "@/features/mentor/types/mentor.types"
import { LayoutGrid, List, Search, Loader2 } from "lucide-react"

export default function MentorStudentsPage() {
  const router = useRouter()
  const [students, setStudents] = React.useState<Student[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [viewMode, setViewMode] = React.useState<"table" | "grid">("table")
  const [searchQuery, setSearchQuery] = React.useState("")
  
  // Drawer States
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const loadStudents = React.useCallback(async () => {
    try {
      const data = await StudentReviewService.getStudents()
      setStudents(data)
    } catch (err) {
      console.error("Failed to load students:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadStudents()
  }, [loadStudents])

  // Drawer triggers
  const handleOpenDrawer = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    if (student) {
      setSelectedStudent(student)
      setIsDrawerOpen(true)
    }
  }

  const handleReviewPortfolio = (studentId: string) => {
    router.push(`/dashboard/mentor/portfolio-reviews?studentId=${studentId}`)
  }

  const handleAssessReadiness = (studentId: string) => {
    router.push(`/dashboard/mentor/career-assessments?studentId=${studentId}`)
  }

  const handleScheduleSession = (studentId: string) => {
    router.push(`/dashboard/mentor/sessions?studentId=${studentId}`)
  }

  // Filter students by search queries
  const filteredStudents = students.filter((s) => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.programme.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.employmentGoal.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading assigned students database...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Welcome info header */}
      <MentorDashboardHeader 
        title="Assigned Students Cohort"
        subtitle="Monitor student progress, check application pipelines, and launch competency reviews."
      />

      {/* Filter and layout triggers bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 border border-border/60 rounded-2xl shadow-sm">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search cohort by name, programme, goal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs w-full bg-background border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* View switcher toggles */}
        <div className="flex items-center gap-1.5 shrink-0 border border-slate-200 p-1 rounded-xl w-full sm:w-auto justify-center">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center justify-center gap-1 px-3 py-1 text-[11px] font-bold rounded-lg cursor-pointer ${
              viewMode === "table" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <List className="size-3.5" />
            Table List
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center justify-center gap-1 px-3 py-1 text-[11px] font-bold rounded-lg cursor-pointer ${
              viewMode === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <LayoutGrid className="size-3.5" />
            Grid Cards
          </button>
        </div>
      </div>

      {/* Primary list mapping section */}
      {viewMode === "table" ? (
        <div className="hidden sm:block">
          <StudentTable 
            students={filteredStudents}
            onViewDetails={handleOpenDrawer}
            onReviewPortfolio={handleReviewPortfolio}
            onAssessReadiness={handleAssessReadiness}
            onScheduleSession={handleScheduleSession}
          />
        </div>
      ) : null}

      {(viewMode === "grid" || !filteredStudents.length) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard 
              key={student.id}
              student={student}
              onViewDetails={handleOpenDrawer}
              onReviewPortfolio={handleReviewPortfolio}
              onAssessReadiness={handleAssessReadiness}
              onScheduleSession={handleScheduleSession}
            />
          ))}
        </div>
      )}

      {/* Fallback to cards on small screens */}
      {viewMode === "table" && filteredStudents.length > 0 && (
        <div className="block sm:hidden grid grid-cols-1 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard 
              key={student.id}
              student={student}
              onViewDetails={handleOpenDrawer}
              onReviewPortfolio={handleReviewPortfolio}
              onAssessReadiness={handleAssessReadiness}
              onScheduleSession={handleScheduleSession}
            />
          ))}
        </div>
      )}

      {/* Drawer Overlay for Profile Details */}
      <StudentDetailsDrawer 
        student={selectedStudent}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onReviewPortfolio={handleReviewPortfolio}
        onAssessReadiness={handleAssessReadiness}
        onScheduleSession={handleScheduleSession}
      />

    </div>
  )
}
