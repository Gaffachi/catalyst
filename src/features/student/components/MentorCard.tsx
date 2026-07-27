"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MentorshipSession } from "../types/student.types"
import { Calendar, Clock, MessageCircle, Plus } from "lucide-react"

interface MentorCardProps {
  sessions: MentorshipSession[]
  onBookSession: (session: { mentorName: string; expertise: string; company: string; date: string; time: string; feedbackNotes: string }) => void
}

export function MentorCard({ sessions, onBookSession }: MentorCardProps) {
  const [showBooking, setShowBooking] = React.useState(false)
  const [formData, setFormData] = React.useState({
    mentorName: "Sarah Mentor",
    expertise: "Senior Engineering Manager",
    company: "Google EMEA",
    date: "",
    time: "2:00 PM GMT",
    feedbackNotes: "",
  })
  const [success, setSuccess] = React.useState(false)

  const activeSessions = sessions.filter((s) => s.status === "Scheduled")
  const pastSessions = sessions.filter((s) => s.status === "Completed")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.date || !formData.feedbackNotes) return

    onBookSession(formData)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setShowBooking(false)
      setFormData({
        mentorName: "Sarah Mentor",
        expertise: "Senior Engineering Manager",
        company: "Google EMEA",
        date: "",
        time: "2:00 PM GMT",
        feedbackNotes: "",
      })
    }, 1500)
  }

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-6">
      
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <h3 className="font-heading text-sm font-bold text-foreground">
          Mentorship & Professional Consultation
        </h3>
        <Button 
          size="sm"
          onClick={() => setShowBooking(!showBooking)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-8 rounded-lg text-xs cursor-pointer select-none"
        >
          <Plus className="size-3.5 mr-1" />
          Book Consultation
        </Button>
      </div>

      {/* 2. Dynamic Booking Form Overlay Panel */}
      {showBooking && (
        <form onSubmit={handleSubmit} className="p-4 rounded-xl border border-orange-200 bg-orange-50/20 dark:bg-slate-900/40 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Book Session with Sarah Mentor</h4>
          
          {success && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
              Session successfully scheduled!
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Meeting Date</label>
              <Input 
                type="date" 
                required 
                value={formData.date} 
                onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                className="h-8 text-xs bg-background"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Meeting Time</label>
              <Input 
                type="text" 
                required 
                value={formData.time} 
                onChange={(e) => setFormData({ ...formData, time: e.target.value })} 
                className="h-8 text-xs bg-background"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Discussion Focus / Gaps Notes</label>
            <textarea 
              rows={2} 
              required
              placeholder="E.g. Review my portfolio repository links..."
              value={formData.feedbackNotes} 
              onChange={(e) => setFormData({ ...formData, feedbackNotes: e.target.value })} 
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button 
              size="sm" 
              variant="outline" 
              type="button" 
              onClick={() => setShowBooking(false)}
              className="h-7 text-[10px] border-slate-200"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              type="submit" 
              className="bg-slate-900 text-white hover:bg-slate-800 border-0 h-7 text-[10px]"
            >
              Schedule
            </Button>
          </div>
        </form>
      )}

      {/* 3. Scheduled / Upcoming Sessions */}
      <div className="space-y-3.5">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upcoming Sessions</h4>
        {activeSessions.length > 0 ? (
          activeSessions.map((sess) => (
            <div key={sess.id} className="p-4 rounded-xl border border-border bg-slate-50/30 flex gap-4 items-start select-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent shrink-0">
                <Calendar className="size-4.5" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <h5 className="text-xs font-bold text-foreground">{sess.mentorName}</h5>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-full uppercase">
                    Scheduled
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">{sess.expertise} at {sess.company}</p>
                <div className="flex gap-3 text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {sess.date} @ {sess.time}
                  </span>
                </div>
                {sess.feedbackNotes && (
                  <div className="p-2.5 rounded-lg bg-slate-100/60 text-[10px] text-slate-600 mt-2 flex gap-1.5 items-start">
                    <MessageCircle className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <p className="italic leading-normal">Discussion focus: &quot;{sess.feedbackNotes}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground italic select-none">No upcoming consultations booked.</p>
        )}
      </div>

      {/* 4. Past sessions / feedback history */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Past Feedback Notes</h4>
        <div className="space-y-3 select-none">
          {pastSessions.map((sess) => (
            <div key={sess.id} className="p-3 rounded-lg border border-border/40 bg-card space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-slate-700">{sess.mentorName}</span>
                <span className="text-slate-400">{sess.date}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic">
                &quot;{sess.feedbackNotes}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>

    </Card>
  )
}
