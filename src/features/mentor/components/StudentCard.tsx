import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Student } from "../types/mentor.types"
import { Briefcase, Mail, Star, FileCheck2, Calendar } from "lucide-react"

interface StudentCardProps {
  student: Student
  onViewDetails: (id: string) => void
  onReviewPortfolio: (studentId: string, studentName: string) => void
  onAssessReadiness: (studentId: string, studentName: string) => void
  onScheduleSession: (studentId: string, studentName: string) => void
}

export function StudentCard({
  student,
  onViewDetails,
  onReviewPortfolio,
  onAssessReadiness,
  onScheduleSession,
}: StudentCardProps) {
  
  const getPortfolioBadge = (status: Student["portfolioStatus"]) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Verified</Badge>
      case "Pending":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border animate-pulse">Pending Review</Badge>
      case "Needs Adjustment":
        return <Badge className="bg-amber-50 text-accent border-orange-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Needs Edit</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-600 border-slate-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Unsubmitted</Badge>
    }
  }

  const getMentorshipBadge = (status: Student["mentorshipStatus"]) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Active</Badge>
      case "Completed":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Completed</Badge>
      default:
        return <Badge className="bg-slate-50 text-slate-500 border-slate-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Inactive</Badge>
    }
  }

  // Generate initials for avatar representation
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-[300px] select-none">
      
      {/* Upper Section */}
      <div className="space-y-3">
        {/* Avatar, Name, Email, Readiness Score */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent/15 to-orange-600/5 text-accent flex items-center justify-center font-bold text-xs border border-orange-100 shrink-0">
              {initials}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                {student.name}
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold line-clamp-1 flex items-center gap-1">
                <Mail className="size-3 text-slate-400" />
                {student.email}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0 border border-emerald-100">
            <Star className="size-3 fill-emerald-600" />
            {student.readinessScore}%
          </span>
        </div>

        {/* Programme and Goals */}
        <div className="space-y-1 text-[11px] pt-1 border-t border-border/20">
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">Programme:</span>
            <span className="text-slate-700 dark:text-slate-350 font-bold line-clamp-1 max-w-[170px] text-right">{student.programme}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">Career Goal:</span>
            <span className="text-slate-700 dark:text-slate-350 font-bold flex items-center gap-1">
              <Briefcase className="size-3 text-slate-400" />
              {student.employmentGoal}
            </span>
          </div>
        </div>

        {/* Statuses Badges row */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/15">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Portfolio</span>
            {getPortfolioBadge(student.portfolioStatus)}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mentorship</span>
            {getMentorshipBadge(student.mentorshipStatus)}
          </div>
        </div>
      </div>

      {/* Button controls wrapper */}
      <div className="pt-4 border-t border-border/40 shrink-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onReviewPortfolio(student.id, student.name)}
            className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-0 h-8 rounded-lg font-bold text-[10px] cursor-pointer"
          >
            <FileCheck2 className="size-3 mr-1" />
            Portfolio
          </Button>
          <Button
            onClick={() => onScheduleSession(student.id, student.name)}
            className="bg-amber-50 hover:bg-amber-100 text-accent border-0 h-8 rounded-lg font-bold text-[10px] cursor-pointer"
          >
            <Calendar className="size-3 mr-1" />
            Schedule
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onViewDetails(student.id)}
            variant="outline"
            className="h-8 rounded-lg font-bold text-[10px] cursor-pointer border-slate-200"
          >
            View Details
          </Button>
          <Button
            onClick={() => onAssessReadiness(student.id, student.name)}
            className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-8 rounded-lg font-bold text-[10px] cursor-pointer"
          >
            Assess
          </Button>
        </div>
      </div>

    </Card>
  )
}
