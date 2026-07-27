"use client"

import * as React from "react"
import { MentorshipService } from "@/features/student/services/mentorship.service"
import { MentorshipSession } from "@/features/student/types/student.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, CalendarClock, User, Clock, BookOpen } from "lucide-react"

export default function StudentSessionsPage() {
  const [sessions, setSessions] = React.useState<MentorshipSession[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "completed" | "cancelled">("upcoming")
  const [showBookingForm, setShowBookingForm] = React.useState(false)

  // Booking Form State
  const [mentorName, setMentorName] = React.useState("Sarah Johnson")
  const [expertise, setExpertise] = React.useState("Senior Software Engineer, Google Ghana")
  const [company, setCompany] = React.useState("Google Ghana")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("2:00 PM GMT")
  const [topic, setTopic] = React.useState("")

  const loadSessionsData = React.useCallback(async () => {
    try {
      const data = await MentorshipService.getSessions()
      setSessions(data)
    } catch (err) {
      console.error("Failed to load mentorship sessions:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadSessionsData()
  }, [loadSessionsData])

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !topic) return
    setIsLoading(true)
    try {
      const updated = await MentorshipService.bookSession({
        mentorName,
        expertise,
        company,
        date,
        time,
        feedbackNotes: topic,
      })
      setSessions(updated)
      setShowBookingForm(false)
      setDate("")
      setTopic("")
    } catch (err) {
      console.error("Failed to book session:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter sessions by active tab
  const filteredSessions = sessions.filter((s) => {
    if (activeTab === "upcoming") return s.status === "Scheduled"
    if (activeTab === "completed") return s.status === "Completed"
    if (activeTab === "cancelled") return s.status === "Cancelled"
    return true
  })

  if (isLoading && sessions.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading student sessions history...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Mentorship Sessions
          </h1>
          <p className="text-xs text-muted-foreground">
            View all your scheduled consultation slots, past feedback notes, and book new 1-on-1 mentor syncs.
          </p>
        </div>

        <Button
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-bold text-xs cursor-pointer shrink-0"
        >
          <Plus className="size-4 mr-1.5" />
          Book New Session
        </Button>
      </div>

      {/* Booking Form Overlay Card */}
      {showBookingForm && (
        <Card className="p-6 border border-orange-200 bg-orange-50/20 shadow-md animate-in slide-in-from-top-3 duration-250 select-none">
          <form onSubmit={handleBookSession} className="space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-800 border-b border-orange-200/60 pb-2">
              Schedule 1-on-1 Consultation Sync
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Assigned Mentor</span>
                <select
                  value={mentorName}
                  onChange={(e) => {
                    setMentorName(e.target.value)
                    if (e.target.value === "Sarah Johnson") {
                      setExpertise("Senior Software Engineer")
                      setCompany("Google Ghana")
                    } else if (e.target.value === "David Mentor") {
                      setExpertise("Lead DevOps Specialist")
                      setCompany("Hubtel Ghana")
                    } else {
                      setExpertise("Academic Internship Coordinator")
                      setCompany("University ICT Dept")
                    }
                  }}
                  className="flex h-10 w-full rounded-lg border border-slate-200 bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="Sarah Johnson">Sarah Johnson (Senior Software Engineer, Google Ghana)</option>
                  <option value="David Mentor">David Mentor (Lead DevOps Specialist, Hubtel)</option>
                  <option value="Kofi Advisor">Kofi Advisor (Academic Internship Coordinator)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Time Slot</span>
                <Input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-10 text-xs bg-background"
                  placeholder="E.g. 2:00 PM GMT"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Meeting Date</span>
                <Input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-10 text-xs bg-background"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Discussion Focus / Gaps</span>
                <Input
                  type="text"
                  required
                  placeholder="E.g. Code review on placement system & resume feedback..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-10 text-xs bg-background"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <Button
                type="button"
                onClick={() => setShowBookingForm(false)}
                variant="outline"
                className="h-9 rounded-xl font-bold text-xs cursor-pointer border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-slate-900 text-white h-9 rounded-xl font-bold text-xs cursor-pointer"
              >
                Confirm Booking
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab Filter bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 border border-border/60 rounded-2xl shadow-sm select-none">
        <div className="flex items-center gap-1.5 shrink-0 border border-slate-200 p-1 rounded-xl w-full sm:w-auto justify-center">
          {[
            { id: "upcoming", name: "Upcoming Syncs" },
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

        <span className="text-[10px] bg-orange-50 text-accent border border-orange-200 px-2.5 py-1 rounded-full font-bold uppercase shrink-0">
          {filteredSessions.length} {activeTab} session(s)
        </span>
      </div>

      {/* Grid of sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-4">
            <div className="flex justify-between items-start border-b border-border/30 pb-3">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <User className="size-3.5 text-slate-400" />
                  {session.mentorName}
                </span>
                <span className="text-[10px] text-muted-foreground block font-semibold">
                  {session.expertise} ({session.company})
                </span>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase shrink-0 ${
                session.status === "Scheduled" ? "bg-purple-50 text-purple-700 border-purple-200" :
                session.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                "bg-rose-50 text-rose-700 border-rose-200"
              }`}>
                {session.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                  <CalendarClock className="size-3" />
                  Date & Time
                </span>
                <p className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">{session.date} at {session.time}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                  <Clock className="size-3" />
                  Duration
                </span>
                <p className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">45 Mins</p>
              </div>
            </div>

            {session.feedbackNotes && (
              <div className="text-[11px] text-slate-600 bg-slate-50/50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[9px] flex items-center gap-1">
                  <BookOpen className="size-3" />
                  Notes / Discussion Focus:
                </span>
                <p className="italic leading-relaxed">{session.feedbackNotes}</p>
              </div>
            )}
          </Card>
        ))}

        {filteredSessions.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-border bg-slate-50/10 text-muted-foreground select-none">
            <CalendarClock className="size-8 mx-auto text-slate-300 mb-2 animate-bounce" />
            <p className="text-xs font-bold">No sessions found in this view.</p>
            <p className="text-[10px] text-slate-400">Click &quot;Book New Session&quot; to schedule your next mentor consultation.</p>
          </div>
        )}
      </div>
    </div>
  )
}
