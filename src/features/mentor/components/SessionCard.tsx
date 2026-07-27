"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MentorshipSession } from "../types/mentor.types"
import { Calendar, Clock, BookOpen, CheckCircle, XCircle, User, MessageSquare } from "lucide-react"

interface SessionCardProps {
  session: MentorshipSession
  onReschedule: (id: string, date: string, time: string) => void
  onCancel: (id: string, notes?: string) => void
  onComplete: (id: string, notes: string) => void
}

export function SessionCard({
  session,
  onReschedule,
  onCancel,
  onComplete,
}: SessionCardProps) {
  const [showReschedule, setShowReschedule] = React.useState(false)
  const [showComplete, setShowComplete] = React.useState(false)
  const [newDate, setNewDate] = React.useState(session.date)
  const [newTime, setNewTime] = React.useState(session.time)
  const [completionNotes, setCompletionNotes] = React.useState("")
  const [cancellationNotes, setCancellationNotes] = React.useState("")
  const [showCancel, setShowCancel] = React.useState(false)

  const getStatusBadge = (status: MentorshipSession["status"]) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-250 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border">Completed</Badge>
      case "Cancelled":
        return <Badge className="bg-rose-50 text-rose-600 border-rose-250 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border">Cancelled</Badge>
      default:
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border animate-pulse">Upcoming</Badge>
    }
  }

  const handleRescheduleSubmit = () => {
    onReschedule(session.id, newDate, newTime)
    setShowReschedule(false)
  }

  const handleCompleteSubmit = () => {
    onComplete(session.id, completionNotes)
    setShowComplete(false)
    setCompletionNotes("")
  }

  const handleCancelSubmit = () => {
    onCancel(session.id, cancellationNotes)
    setShowCancel(false)
    setCancellationNotes("")
  }

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-4 select-none animate-in fade-in duration-200">
      
      {/* Header Info */}
      <div className="flex justify-between items-start gap-3 pb-3 border-b border-border/40">
        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <User className="size-4 text-slate-400 shrink-0" />
            {session.studentName}
          </h4>
          <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
            <BookOpen className="size-3 text-slate-400" />
            Topic: {session.topic}
          </span>
        </div>
        {getStatusBadge(session.status)}
      </div>

      {/* Date, Time, Duration Info */}
      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-500 font-semibold pt-1">
        <div className="flex items-center gap-1">
          <Calendar className="size-3.5 text-slate-400 shrink-0" />
          <span>{session.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="size-3.5 text-slate-400 shrink-0" />
          <span>{session.time}</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-slate-200">
            {session.duration}
          </Badge>
        </div>
      </div>

      {/* Complete session text notes */}
      {session.notes && (
        <div className="p-3 bg-slate-50/10 border border-slate-100 rounded-xl space-y-1 text-xs">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <MessageSquare className="size-3 text-slate-400" />
            Meeting Notes
          </span>
          <p className="text-slate-600 dark:text-slate-400 italic">
            {session.notes}
          </p>
        </div>
      )}

      {/* Reschedule Drawer Panel inside card */}
      {showReschedule && (
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-3 animate-in slide-in-from-top-2 duration-150">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Reschedule appointment</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="p-1.5 border border-slate-200 rounded-lg bg-background"
            />
            <input
              type="text"
              value={newTime}
              placeholder="e.g. 10:00 AM GMT"
              onChange={(e) => setNewTime(e.target.value)}
              className="p-1.5 border border-slate-200 rounded-lg bg-background"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setShowReschedule(false)}
              variant="outline"
              className="h-7 rounded-lg text-[9px] font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRescheduleSubmit}
              className="bg-slate-900 text-white h-7 rounded-lg text-[9px] font-bold cursor-pointer"
            >
              Update Sync
            </Button>
          </div>
        </div>
      )}

      {/* Complete Session Notes Drawer Panel inside card */}
      {showComplete && (
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-3 animate-in slide-in-from-top-2 duration-150">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Record Completion Notes</span>
          <textarea
            value={completionNotes}
            onChange={(e) => setCompletionNotes(e.target.value)}
            placeholder="Record review items discussed, student goal alignments, or CV preparation tasks..."
            className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-background h-14"
          />
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setShowComplete(false)}
              variant="outline"
              className="h-7 rounded-lg text-[9px] font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCompleteSubmit}
              disabled={!completionNotes.trim()}
              className="bg-emerald-600 text-white h-7 rounded-lg text-[9px] font-bold cursor-pointer disabled:opacity-50"
            >
              Log Complete
            </Button>
          </div>
        </div>
      )}

      {/* Cancel Session Drawer Panel inside card */}
      {showCancel && (
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-3 animate-in slide-in-from-top-2 duration-150">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Reason for cancellation</span>
          <textarea
            value={cancellationNotes}
            onChange={(e) => setCancellationNotes(e.target.value)}
            placeholder="Reason for cancellation..."
            className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-background h-14"
          />
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setShowCancel(false)}
              variant="outline"
              className="h-7 rounded-lg text-[9px] font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCancelSubmit}
              className="bg-rose-600 text-white h-7 rounded-lg text-[9px] font-bold cursor-pointer"
            >
              Cancel Sync
            </Button>
          </div>
        </div>
      )}

      {/* Action triggers footer */}
      {session.status === "Upcoming" && !showReschedule && !showComplete && !showCancel && (
        <div className="pt-3 border-t border-border/30 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Button
              onClick={() => setShowCancel(true)}
              className="bg-rose-50 hover:bg-rose-100 text-rose-600 border-0 h-8 px-2.5 rounded-lg font-bold text-[10px] cursor-pointer"
            >
              <XCircle className="size-3.5 mr-1" />
              Cancel
            </Button>
            <Button
              onClick={() => setShowReschedule(true)}
              variant="outline"
              className="h-8 px-2.5 rounded-lg font-bold text-[10px] border-slate-200 cursor-pointer"
            >
              Reschedule
            </Button>
          </div>
          
          <Button
            onClick={() => setShowComplete(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 h-8 px-2.5 rounded-lg font-bold text-[10px] cursor-pointer"
          >
            <CheckCircle className="size-3.5 mr-1" />
            Complete
          </Button>
        </div>
      )}

    </Card>
  )
}
