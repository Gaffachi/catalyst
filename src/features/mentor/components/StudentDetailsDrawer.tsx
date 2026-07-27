import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Student } from "../types/mentor.types"
import { X, Mail, Star, GraduationCap, Briefcase, FileCode2, Clock, CalendarCheck } from "lucide-react"

interface StudentDetailsDrawerProps {
  student: Student | null
  isOpen: boolean
  onClose: () => void
  onReviewPortfolio: (studentId: string, studentName: string) => void
  onAssessReadiness: (studentId: string, studentName: string) => void
  onScheduleSession: (studentId: string, studentName: string) => void
}

export function StudentDetailsDrawer({
  student,
  isOpen,
  onClose,
  onReviewPortfolio,
  onAssessReadiness,
  onScheduleSession,
}: StudentDetailsDrawerProps) {
  if (!isOpen || !student) return null

  // Initials for avatar representation
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Background Backdrop Overlay */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Slider content drawer container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-xl flex flex-col justify-between border-l border-border h-full animate-in slide-in-from-right duration-350">
          
          {/* Header */}
          <div className="p-6 border-b border-border/40 flex items-center justify-between">
            <h2 className="font-heading text-base font-extrabold text-foreground">
              Student Details
            </h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg border border-slate-200 text-slate-400 hover:text-foreground cursor-pointer"
            >
              <X className="size-4.5" />
            </button>
          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Upper profile card widget */}
            <div className="flex flex-col items-center text-center space-y-3 bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-border/50">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/15 to-orange-600/5 text-accent flex items-center justify-center font-black text-lg border border-orange-100 shrink-0">
                {initials}
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100">
                  {student.name}
                </h3>
                <span className="text-xs text-muted-foreground block font-semibold flex items-center gap-1 justify-center">
                  <Mail className="size-3 text-slate-400" />
                  {student.email}
                </span>
              </div>
              <div className="flex gap-2 justify-center">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                  <Star className="size-3.5 fill-emerald-600" />
                  Readiness Score: {student.readinessScore}%
                </span>
              </div>
            </div>

            {/* Academic profile metadata splits */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-border/30 pb-1">
                Academic & Goals
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <GraduationCap className="size-4.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Programme & Division</span>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{student.programme}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="size-4.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Employment Target</span>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{student.employmentGoal}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-4.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Marketplace Applications Submitted</span>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-100">{student.currentApplications} active targets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Verification details */}
            <div className="space-y-4 pt-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-border/30 pb-1">
                Competency & Audits
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-50/10 p-2.5 border border-slate-100 rounded-xl">
                  <span className="text-xs font-semibold text-slate-600">Portfolio Review Status</span>
                  <Badge variant="outline" className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                    student.portfolioStatus === "Verified" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    student.portfolioStatus === "Pending" ? "bg-purple-50 text-purple-700 border-purple-200" :
                    student.portfolioStatus === "Needs Adjustment" ? "bg-amber-50 text-accent border-orange-200" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {student.portfolioStatus}
                  </Badge>
                </div>

                <div className="flex justify-between items-center bg-slate-50/10 p-2.5 border border-slate-100 rounded-xl">
                  <span className="text-xs font-semibold text-slate-600">Mentorship Status</span>
                  <Badge variant="outline" className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                    student.mentorshipStatus === "Active" ? "bg-blue-50 text-blue-700 border-blue-200" :
                    student.mentorshipStatus === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {student.mentorshipStatus}
                  </Badge>
                </div>
              </div>
            </div>

          </div>

          {/* Footer controls */}
          <div className="p-6 border-t border-border/40 space-y-3 shrink-0">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  onReviewPortfolio(student.id, student.name)
                  onClose()
                }}
                className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 border-0 h-9 rounded-xl font-bold text-xs cursor-pointer"
              >
                <FileCode2 className="size-4 mr-2" />
                Review Projects
              </Button>
              <Button
                onClick={() => {
                  onScheduleSession(student.id, student.name)
                  onClose()
                }}
                className="w-full bg-amber-50 hover:bg-amber-100 text-accent border-0 h-9 rounded-xl font-bold text-xs cursor-pointer"
              >
                <CalendarCheck className="size-4 mr-2" />
                Schedule Sync
              </Button>
            </div>
            <Button
              onClick={() => {
                onAssessReadiness(student.id, student.name)
                onClose()
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white border-0 h-10 rounded-xl font-bold text-xs cursor-pointer"
            >
              Assess Competency Readiness
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
