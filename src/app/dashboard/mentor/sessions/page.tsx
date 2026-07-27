"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { SessionCard } from "@/features/mentor/components/SessionCard"
import { SessionService } from "@/features/mentor/services/session.service"
import { StudentReviewService } from "@/features/mentor/services/student-review.service"
import { MentorshipSession, Student } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, CalendarClock } from "lucide-react"

export default function MentorSessionsPage() {
  const searchParams = useSearchParams()
  const filterStudentId = searchParams.get("studentId")

  const [sessions, setSessions] = React.useState<MentorshipSession[]>([])
  const [students, setStudents] = React.useState<Student[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "completed" | "cancelled">("upcoming")
  const [showScheduleForm, setShowScheduleForm] = React.useState(false)

  // Scheduling Form States
  const [selectedStudentId, setSelectedStudentId] = React.useState(filterStudentId || "")
  const [topic, setTopic] = React.useState("")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("")
  const [duration, setDuration] = React.useState("45 Mins")

  const loadSessionsData = React.useCallback(async () => {
    try {
      const allSessions = await SessionService.getSessions()
      const allStudents = await StudentReviewService.getStudents()

      setSessions(allSessions)
      setStudents(allStudents)
    } catch (err) {
      console.error("Failed to load sessions data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadSessionsData()
  }, [loadSessionsData])

  React.useEffect(() => {
    if (filterStudentId) {
      setSelectedStudentId(filterStudentId)
      setShowScheduleForm(true)
    }
  }, [filterStudentId])

  // Session Actions
  const handleReschedule = async (id: string, date: string, time: string) => {
    try {
      const updated = await SessionService.rescheduleSession(id, date, time)
      setSessions(updated)
    } catch (err) {
      console.error("Failed to reschedule session:", err)
    }
  }

  const handleCancel = async (id: string, notes?: string) => {
    try {
      const updated = await SessionService.cancelSession(id, notes)
      setSessions(updated)
    } catch (err) {
      console.error("Failed to cancel session:", err)
    }
  }

  const handleComplete = async (id: string, notes: string) => {
    try {
      const updated = await SessionService.completeSession(id, notes)
      setSessions(updated)
    } catch (err) {
      console.error("Failed to complete session:", err)
    }
  }

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const student = students.find((s) => s.id === selectedStudentId)
    if (!student) return

    try {
      const updated = await SessionService.scheduleSession({
        studentId: selectedStudentId,
        studentName: student.name,
        date,
        time,
        topic,
        duration,
      })

      setSessions(updated)
      setShowScheduleForm(false)
      
      // Reset form fields
      setTopic("")
      setDate("")
      setTime("")
    } catch (err) {
      console.error("Failed to schedule session:", err)
    }
  }

  // Filter sessions
  let filteredSessions = sessions
  
  // Apply query filter if present
  if (filterStudentId) {
    filteredSessions = filteredSessions.filter((s) => s.studentId === filterStudentId)
  }

  // Apply tab status filter
  if (activeTab === "upcoming") {
    filteredSessions = filteredSessions.filter((s) => s.status === "Upcoming")
  } else if (activeTab === "completed") {
    filteredSessions = filteredSessions.filter((s) => s.status === "Completed")
  } else if (activeTab === "cancelled") {
    filteredSessions = filteredSessions.filter((s) => s.status === "Cancelled")
  }

  // Sort sessions: Upcoming (chronological), Completed/Cancelled (reverse chronological)
  filteredSessions = filteredSessions.sort((a, b) => {
    const timeA = new Date(`${a.date}`).getTime()
    const timeB = new Date(`${b.date}`).getTime()
    return activeTab === "upcoming" ? timeA - timeB : timeB - timeA
  })

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading scheduled mentorship sessions...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Mentorship Sessions Sync
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage upcoming video sync slots, log notes, and review completed counseling history.
          </p>
        </div>

        <Button
          onClick={() => setShowScheduleForm(!showScheduleForm)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-bold text-xs cursor-pointer shrink-0"
        >
          <Plus className="size-4 mr-1.5" />
          Schedule Session
        </Button>
      </div>

      {/* Interactive scheduling drawer/box inside route */}
      {showScheduleForm && (
        <Card className="p-6 border border-border bg-card shadow-md animate-in slide-in-from-top-3 duration-250 select-none">
          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 border-b border-border/40 pb-2">
              Book New Sync Slot
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Student</span>
                <select
                  value={selectedStudentId}
                  required
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-slate-200 bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="">Select student...</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.programme})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Session Duration</span>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-slate-200 bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="45 Mins">45 Mins Session</option>
                  <option value="60 Mins">60 Mins Session</option>
                  <option value="30 Mins">30 Mins Quick Sync</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Discussion Topic</span>
              <input
                type="text"
                placeholder="E.g. CV Review & Git Commit Audits"
                value={topic}
                required
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 rounded-lg bg-background"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Date</span>
                <input
                  type="date"
                  value={date}
                  required
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg bg-background"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Time Slot</span>
                <input
                  type="text"
                  placeholder="E.g. 2:00 PM GMT"
                  value={time}
                  required
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg bg-background"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <Button
                type="button"
                onClick={() => setShowScheduleForm(false)}
                variant="outline"
                className="h-9 rounded-xl font-bold text-xs cursor-pointer border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-slate-900 text-white h-9 rounded-xl font-bold text-xs cursor-pointer"
              >
                Schedule sync
              </Button>
            </div>

          </form>
        </Card>
      )}

      {/* Tab Filter bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 border border-border/60 rounded-2xl shadow-sm select-none">
        <div className="flex items-center gap-1.5 shrink-0 border border-slate-200 p-1 rounded-xl w-full sm:w-auto justify-center">
          {[
            { id: "upcoming", name: "Upcoming Slots" },
            { id: "completed", name: "Completed History" },
            { id: "cancelled", name: "Cancelled Slots" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "upcoming" | "completed" | "cancelled")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
                activeTab === tab.id ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {filterStudentId && (
          <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
            Filtered by student ID
          </span>
        )}
      </div>

      {/* Grid of sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSessions.map((session) => (
          <SessionCard 
            key={session.id}
            session={session}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
            onComplete={handleComplete}
          />
        ))}

        {filteredSessions.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-border bg-slate-50/10 text-muted-foreground select-none">
            <CalendarClock className="size-8 mx-auto text-slate-300 mb-2 animate-bounce" />
            <p className="text-xs font-bold">No sessions found.</p>
            <p className="text-[10px] text-slate-400">All appointments in this tab category have been synced or completed.</p>
          </div>
        )}
      </div>

    </div>
  )
}
