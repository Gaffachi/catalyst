"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle2 } from "lucide-react"

export function MentorAvailabilityView() {
  const schedule = [
    { day: "Monday", slots: ["09:00 AM - 11:00 AM", "02:00 PM - 04:00 PM"], available: true },
    { day: "Tuesday", slots: ["10:00 AM - 12:00 PM"], available: true },
    { day: "Wednesday", slots: ["01:00 PM - 05:00 PM"], available: true },
    { day: "Thursday", slots: ["09:00 AM - 11:30 AM", "03:00 PM - 05:00 PM"], available: true },
    { day: "Friday", slots: ["10:00 AM - 01:00 PM"], available: true },
    { day: "Saturday", slots: [], available: false },
    { day: "Sunday", slots: [], available: false },
  ]

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm space-y-4 select-none">
      <div className="flex justify-between items-center border-b border-border/30 pb-3">
        <div>
          <h3 className="font-heading text-sm font-extrabold text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
            <Clock className="size-4 text-accent" />
            Assigned Mentor Availability Schedule
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Live weekly office hours when Dr. Sarah Johnson accepts 1-on-1 coaching bookings.
          </p>
        </div>
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px]">
          <CheckCircle2 className="size-3 mr-1" /> Active Office Hours
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {schedule.filter(s => s.available).map((item) => (
          <div key={item.day} className="p-3 bg-slate-50/60 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 border-b border-slate-200/40 pb-1">
              <Calendar className="size-3 text-accent" />
              {item.day}
            </span>

            <div className="space-y-1">
              {item.slots.map((slot) => (
                <span key={slot} className="block text-[9px] font-bold px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-100 text-center">
                  {slot}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
