import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Student } from "../types/mentor.types"
import { Mail, Star, FileCheck2, Calendar, ClipboardCheck, ArrowRight } from "lucide-react"

interface StudentTableProps {
  students: Student[]
  onViewDetails: (id: string) => void
  onReviewPortfolio: (studentId: string, studentName: string) => void
  onAssessReadiness: (studentId: string, studentName: string) => void
  onScheduleSession: (studentId: string, studentName: string) => void
}

export function StudentTable({
  students,
  onViewDetails,
  onReviewPortfolio,
  onAssessReadiness,
  onScheduleSession,
}: StudentTableProps) {
  
  const getPortfolioBadge = (status: Student["portfolioStatus"]) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Verified</Badge>
      case "Pending":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-100 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border animate-pulse">Pending Review</Badge>
      case "Needs Adjustment":
        return <Badge className="bg-amber-50 text-accent border-orange-100 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Needs Edit</Badge>
      default:
        return <Badge className="bg-slate-50 text-slate-500 border-slate-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Unsubmitted</Badge>
    }
  }

  const getMentorshipBadge = (status: Student["mentorshipStatus"]) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-100 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Active</Badge>
      case "Completed":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Completed</Badge>
      default:
        return <Badge className="bg-slate-50 text-slate-400 border-slate-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border">Inactive</Badge>
    }
  }

  return (
    <div className="w-full overflow-x-auto border border-border/60 rounded-2xl bg-white dark:bg-slate-900 shadow-sm select-none">
      <table className="w-full border-collapse text-left text-xs text-slate-600 dark:text-slate-400">
        <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-400 dark:text-slate-450 uppercase tracking-wider border-b border-border/40">
          <tr>
            <th className="px-6 py-4">Student</th>
            <th className="px-4 py-4">Programme</th>
            <th className="px-4 py-4">Readiness</th>
            <th className="px-4 py-4">Goal</th>
            <th className="px-4 py-4 text-center">Applications</th>
            <th className="px-4 py-4">Portfolio</th>
            <th className="px-4 py-4">Mentorship</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {students.map((student) => {
            const initials = student.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
              
            return (
              <tr key={student.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors">
                {/* User avatar & name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-orange-50 text-accent flex items-center justify-center font-bold text-xs border border-orange-100 shrink-0">
                      {initials}
                    </div>
                    <div>
                      <span className="font-bold text-slate-850 dark:text-slate-200 block">{student.name}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                        <Mail className="size-3 text-slate-400" />
                        {student.email}
                      </span>
                    </div>
                  </div>
                </td>
                
                {/* Programme */}
                <td className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  {student.programme}
                </td>
                
                {/* Readiness Score */}
                <td className="px-4 py-4">
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center justify-center w-14 gap-0.5">
                    <Star className="size-3 fill-emerald-600" />
                    {student.readinessScore}%
                  </span>
                </td>
                
                {/* Goal */}
                <td className="px-4 py-4 font-semibold text-slate-600 dark:text-slate-350">
                  {student.employmentGoal}
                </td>
                
                {/* Applications Count */}
                <td className="px-4 py-4 text-center font-black text-slate-800 dark:text-slate-100">
                  {student.currentApplications}
                </td>
                
                {/* Portfolio Status */}
                <td className="px-4 py-4">
                  {getPortfolioBadge(student.portfolioStatus)}
                </td>
                
                {/* Mentorship Status */}
                <td className="px-4 py-4">
                  {getMentorshipBadge(student.mentorshipStatus)}
                </td>
                
                {/* Actions row cell */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      onClick={() => onReviewPortfolio(student.id, student.name)}
                      className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-0 h-7 px-2.5 rounded-lg font-bold text-[10px] cursor-pointer"
                      title="Review projects"
                    >
                      <FileCheck2 className="size-3 mr-1" />
                      Review
                    </Button>
                    <Button
                      onClick={() => onAssessReadiness(student.id, student.name)}
                      className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-7 px-2.5 rounded-lg font-bold text-[10px] cursor-pointer"
                      title="Assess readiness"
                    >
                      <ClipboardCheck className="size-3 mr-1" />
                      Assess
                    </Button>
                    <Button
                      onClick={() => onScheduleSession(student.id, student.name)}
                      className="bg-amber-50 hover:bg-amber-100 text-accent border-0 h-7 px-2.5 rounded-lg font-bold text-[10px] cursor-pointer"
                      title="Book appointment sync"
                    >
                      <Calendar className="size-3 mr-1" />
                      Sync
                    </Button>
                    <Button
                      onClick={() => onViewDetails(student.id)}
                      variant="outline"
                      className="h-7 w-7 p-0 flex items-center justify-center rounded-lg border-slate-200 cursor-pointer"
                      title="View details"
                    >
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
