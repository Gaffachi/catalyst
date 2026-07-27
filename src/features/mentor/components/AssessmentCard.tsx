"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CareerAssessment, Student } from "../types/mentor.types"
import { ClipboardCheck, Star, Send } from "lucide-react"

interface AssessmentCardProps {
  students: Student[]
  selectedStudentId?: string
  onSaveAssessment: (assessment: Omit<CareerAssessment, "id" | "date">) => void
}

export function AssessmentCard({
  students,
  selectedStudentId = "",
  onSaveAssessment,
}: AssessmentCardProps) {
  const [studentId, setStudentId] = React.useState(selectedStudentId)
  const [notes, setNotes] = React.useState("")
  
  // Rating states (0 to 100)
  const [tech, setTech] = React.useState(75)
  const [comm, setComm] = React.useState(75)
  const [prob, setProb] = React.useState(75)
  const [prof, setProf] = React.useState(80)
  const [team, setTeam] = React.useState(80)
  const [lead, setLead] = React.useState(70)
  const [timeM, setTimeM] = React.useState(75)
  const [port, setPort] = React.useState(70)

  React.useEffect(() => {
    if (selectedStudentId) {
      setStudentId(selectedStudentId)
    }
  }, [selectedStudentId])

  // Dynamically calculate average readiness index
  const averageReadiness = Math.round(
    (tech + comm + prob + prof + team + lead + timeM + port) / 8
  )

  const handleSave = () => {
    const student = students.find((s) => s.id === studentId)
    if (!student) return

    onSaveAssessment({
      studentId,
      studentName: student.name,
      ratings: {
        technicalSkills: tech,
        communication: comm,
        problemSolving: prob,
        professionalism: prof,
        teamwork: team,
        leadership: lead,
        timeManagement: timeM,
        portfolioQuality: port
      },
      overallReadiness: averageReadiness,
      notes
    })

    // Reset notes
    setNotes("")
  }

  const selectedStudent = students.find((s) => s.id === studentId)

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-6 select-none animate-in fade-in duration-200">
      
      {/* Header Info */}
      <div className="flex justify-between items-start gap-4 pb-4 border-b border-border/40">
        <div className="space-y-1">
          <h3 className="font-heading text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <ClipboardCheck className="size-5 text-accent" />
            Employability Evaluation Form
          </h3>
          <p className="text-xs text-muted-foreground">
            Audit student competency indices and sync scores directly to their dashboard profiles.
          </p>
        </div>

        <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 flex items-center gap-0.5 animate-bounce">
          <Star className="size-4 fill-emerald-600" />
          {averageReadiness}% Calculated
        </span>
      </div>

      {/* Select Student Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Student</label>
        {selectedStudentId ? (
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
            Evaluating student: {selectedStudent?.name} ({selectedStudent?.programme})
          </div>
        ) : (
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="flex h-10 w-full rounded-lg border border-slate-200 bg-background px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">Select a student to evaluate...</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.programme} (Current: {s.readinessScore}%)
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Rating Sliders List */}
      <div className="space-y-4 pt-2 border-t border-border/20">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Competency Assessment Rubrics</span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Technical Skills", val: tech, set: setTech },
            { label: "Communication Skills", val: comm, set: setComm },
            { label: "Critical Problem Solving", val: prob, set: setProb },
            { label: "Professionalism & Integrity", val: prof, set: setProf },
            { label: "Teamwork & Collaboration", val: team, set: setTeam },
            { label: "Leadership & Initiative", val: lead, set: setLead },
            { label: "Time Management", val: timeM, set: setTimeM },
            { label: "Portfolio Quality & Completeness", val: port, set: setPort },
          ].map((slider) => (
            <div key={slider.label} className="space-y-1 bg-slate-50/10 p-3.5 border border-slate-100 rounded-xl">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">{slider.label}</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{slider.val}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={slider.val}
                onChange={(e) => slider.set(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Counselor Notes */}
      <div className="space-y-2 pt-2 border-t border-border/20">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Advisor Evaluation Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record specific mentoring advice, recommended development actions, or skill gaps to address before applying for jobs..."
          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-background focus:outline-none focus:ring-1 focus:ring-accent h-20 leading-relaxed"
        />
      </div>

      {/* Save Action */}
      <div className="pt-2 border-t border-border/30 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={!studentId || !notes.trim()}
          className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-10 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer disabled:opacity-50"
        >
          <Send className="size-3.5 mr-2" />
          Publish Assessment Index
        </Button>
      </div>

    </Card>
  )
}
