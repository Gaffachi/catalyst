"use client"

import * as React from "react"
import { InterviewService } from "@/features/employer/services/interview.service"
import { Interview } from "@/features/employer/types/employer.types"
import { InterviewCard } from "@/features/employer/components/InterviewCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, CalendarClock } from "lucide-react"

export default function InterviewManagementPage() {
  const [interviews, setInterviews] = React.useState<Interview[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showScheduleForm, setShowScheduleForm] = React.useState(false)

  // New Interview Form state
  const [candidateName, setCandidateName] = React.useState("Alex Mensah")
  const [position, setPosition] = React.useState("Junior Backend Engineer")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("10:00 AM GMT")
  const [interviewType, setInterviewType] = React.useState<Interview["interviewType"]>("Technical Screen")
  const [locationOrLink, setLocationOrLink] = React.useState("https://meet.google.com/hubtel-sync")
  const [notes, setNotes] = React.useState("")

  const loadInterviews = React.useCallback(async () => {
    try {
      const data = await InterviewService.getInterviews()
      setInterviews(data)
    } catch (err) {
      console.error("Failed to load interviews:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadInterviews()
  }, [loadInterviews])

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!candidateName || !date) return
    setIsLoading(true)
    try {
      const updated = await InterviewService.scheduleInterview({
        candidateId: "cand-alex-mensah",
        candidateName,
        opportunityId: "opp-1",
        position,
        date,
        time,
        interviewType,
        locationOrLink,
        notes,
      })
      setInterviews(updated)
      setShowScheduleForm(false)
      setDate("")
      setNotes("")
    } catch (err) {
      console.error("Failed to schedule interview:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: Interview["status"]) => {
    const updated = await InterviewService.updateInterviewStatus(id, status)
    setInterviews(updated)
  }

  if (isLoading && interviews.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading scheduled interviews...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-4 select-none">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Interview Management
          </h1>
          <p className="text-xs text-muted-foreground">
            Schedule technical screens, system design rounds, and behavioral syncs with shortlisted candidates.
          </p>
        </div>

        <Button
          onClick={() => setShowScheduleForm(!showScheduleForm)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-bold text-xs cursor-pointer shrink-0"
        >
          <Plus className="size-4 mr-1.5" />
          Schedule Interview
        </Button>
      </div>

      {/* Form overlay */}
      {showScheduleForm && (
        <Card className="p-6 border border-orange-200 bg-orange-50/20 shadow-md select-none space-y-4 animate-in slide-in-from-top-3 duration-250">
          <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
            <h3 className="font-heading text-sm font-bold text-slate-800 border-b border-orange-200/60 pb-2">
              Schedule Candidate Interview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Candidate Name</label>
                <Input value={candidateName} onChange={(e) => setCandidateName(e.target.value)} required className="h-9 text-xs bg-background" />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Target Position</label>
                <Input value={position} onChange={(e) => setPosition(e.target.value)} required className="h-9 text-xs bg-background" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Interview Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="h-9 text-xs bg-background" />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Interview Time</label>
                <Input value={time} onChange={(e) => setTime(e.target.value)} required className="h-9 text-xs bg-background" />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Round Type</label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value as Interview["interviewType"])}
                  className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none"
                >
                  <option value="Technical Screen">Technical Screen</option>
                  <option value="System Design">System Design</option>
                  <option value="Behavioral / Cultural">Behavioral / Cultural</option>
                  <option value="Final HR">Final HR</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-600 uppercase text-[10px]">Google Meet Link / Meeting Location</label>
              <Input value={locationOrLink} onChange={(e) => setLocationOrLink(e.target.value)} required className="h-9 text-xs bg-background" />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-600 uppercase text-[10px]">Agenda / Evaluator Notes</label>
              <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="E.g. Focus on Node.js REST API design..." className="h-9 text-xs bg-background" />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <Button type="button" onClick={() => setShowScheduleForm(false)} variant="outline" className="h-9 rounded-xl font-bold text-xs cursor-pointer border-slate-200">
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white h-9 rounded-xl font-bold text-xs cursor-pointer border-0">
                Confirm Interview
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Interview List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviews.map((item) => (
          <InterviewCard key={item.id} interview={item} onUpdateStatus={handleUpdateStatus} />
        ))}

        {interviews.length === 0 && (
          <div className="col-span-full p-12 text-center border border-dashed border-border rounded-2xl bg-slate-50/10 text-muted-foreground select-none">
            <CalendarClock className="size-8 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-bold">No interviews scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
