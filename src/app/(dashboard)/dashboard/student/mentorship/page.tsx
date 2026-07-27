"use client"

import * as React from "react"
import { MentorshipService } from "@/features/student/services/mentorship.service"
import { MentorshipSession } from "@/features/student/types/student.types"
import { MentorProfileCard } from "@/features/student/components/MentorProfileCard"
import { SessionCard } from "@/features/student/components/SessionCard"
import { FeedbackCard } from "@/features/student/components/FeedbackCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MentorAvailabilityView } from "@/features/student/components/MentorAvailabilityView"
import { Loader2, Users, CalendarCheck, HelpCircle } from "lucide-react"

export default function StudentMentorshipPage() {
  const [sessions, setSessions] = React.useState<MentorshipSession[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showBookingForm, setShowBookingForm] = React.useState(false)
  
  // Booking Form State
  const [mentorName, setMentorName] = React.useState("Sarah Mentor")
  const [expertise, setExpertise] = React.useState("Senior Engineering Manager")
  const [company, setCompany] = React.useState("Google EMEA")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("2:00 PM GMT")
  const [topic, setTopic] = React.useState("")

  const mentorsList = [
    {
      name: "Sarah Mentor",
      expertise: "Senior Engineering Manager",
      company: "Google EMEA",
      availability: "Mondays & Wednesdays (2:00 - 4:00 PM GMT)",
    },
    {
      name: "David Mentor",
      expertise: "Lead DevOps Specialist",
      company: "Hubtel Ghana",
      availability: "Tuesdays & Thursdays (10:00 - 12:00 PM GMT)",
    },
    {
      name: "Kofi Advisor",
      expertise: "Academic Internship Coordinator",
      company: "University ICT Dept",
      availability: "Fridays (9:00 AM - 1:00 PM GMT)",
    }
  ]

  React.useEffect(() => {
    async function loadData() {
      try {
        const data = await MentorshipService.getSessions()
        setSessions(data)
      } catch (err) {
        console.error("Failed to load mentorship sessions:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

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

  const upcomingSessions = sessions.filter((s) => s.status === "Scheduled")
  const pastSessions = sessions.filter((s) => s.status === "Completed")

  const handleSelectMentor = (m: typeof mentorsList[0]) => {
    setMentorName(m.name)
    setExpertise(m.expertise)
    setCompany(m.company)
    setShowBookingForm(true)
  }

  if (isLoading && sessions.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading mentorship scheduler...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Mentorship Console
        </h1>
        <p className="text-xs text-muted-foreground">
          Connect with industry professionals for feedback on your technical skills, CV, and portfolios.
        </p>
      </div>

      {/* Live Availability View */}
      <MentorAvailabilityView />

      {/* Booking Form Overlay */}
      {showBookingForm && (
        <form onSubmit={handleBookSession} className="p-5 rounded-xl border border-orange-200 bg-orange-50/20 max-w-lg space-y-4 animate-in fade-in duration-200">
          <h4 className="text-xs font-bold text-slate-800">Book Session with {mentorName}</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Meeting Date</label>
              <Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="h-8 text-xs bg-background" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Meeting Time</label>
              <Input type="text" required value={time} onChange={(e) => setTime(e.target.value)} className="h-8 text-xs bg-background" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Discussion Focus / Gaps Notes</label>
            <textarea 
              rows={2} 
              required
              placeholder="E.g. Code review on placement system frontend components..."
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-sm focus-visible:outline-none"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="outline" type="button" onClick={() => setShowBookingForm(false)} className="h-7 text-[10px]">
              Cancel
            </Button>
            <Button size="sm" type="submit" className="bg-slate-900 text-white hover:bg-slate-800 border-0 h-7 text-[10px]">
              Schedule Call
            </Button>
          </div>
        </form>
      )}

      {/* Grid: Mentor recommendations and schedules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left: Recommended Mentors (2 columns) */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border/40 pb-2 select-none">
            <Users className="size-4 text-accent" />
            Recommended Advisors & Mentors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mentorsList.map((mentor) => (
              <MentorProfileCard 
                key={mentor.name} 
                mentor={mentor} 
                onBook={() => handleSelectMentor(mentor)} 
              />
            ))}
          </div>
        </div>

        {/* Right: Upcoming sessions */}
        <div className="space-y-4">
          <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border/40 pb-2 select-none">
            <CalendarCheck className="size-4 text-accent" />
            Upcoming Bookings
          </h3>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}

            {upcomingSessions.length === 0 && (
              <p className="text-xs text-muted-foreground italic select-none">No consultation slots booked.</p>
            )}
          </div>
        </div>

      </div>

      {/* Bottom: Feedback History */}
      <div className="space-y-4 pt-4 border-t border-border/40">
        <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5 select-none">
          <HelpCircle className="size-4 text-accent" />
          Review Session Evaluations & Logs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastSessions.map((session) => (
            <FeedbackCard key={session.id} session={session} />
          ))}

          {pastSessions.length === 0 && (
            <p className="text-xs text-muted-foreground italic col-span-2 select-none">No feedback records found.</p>
          )}
        </div>
      </div>

    </div>
  )
}
