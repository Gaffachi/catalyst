"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MentorAvailability } from "../types/mentor.types"
import { Clock, CalendarRange, Globe, Check, Save } from "lucide-react"

interface AvailabilityCalendarProps {
  availability: MentorAvailability
  onSave: (availability: MentorAvailability) => void
}

export function AvailabilityCalendar({
  availability,
  onSave,
}: AvailabilityCalendarProps) {
  const [selectedDays, setSelectedDays] = React.useState<string[]>(availability.availableDays)
  const [startHour, setStartHour] = React.useState(availability.workingHours.start)
  const [endHour, setEndHour] = React.useState(availability.workingHours.end)
  const [breakStart, setBreakStart] = React.useState(availability.breaks[0]?.start || "12:00")
  const [breakEnd, setBreakEnd] = React.useState(availability.breaks[0]?.end || "13:00")
  const [timezone, setTimezone] = React.useState(availability.timezone)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => 
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleSaveSubmit = () => {
    onSave({
      availableDays: selectedDays,
      workingHours: { start: startHour, end: endHour },
      breaks: [{ start: breakStart, end: breakEnd }],
      unavailableDates: availability.unavailableDates,
      timezone
    })
    
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-6 select-none animate-in fade-in duration-200">
      
      {/* Header Info */}
      <div className="flex justify-between items-start gap-4 pb-4 border-b border-border/40">
        <div className="space-y-1">
          <h3 className="font-heading text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <CalendarRange className="size-5 text-accent" />
            Calendar Booking Settings
          </h3>
          <p className="text-xs text-muted-foreground">
            Manage your weekday availability blocks and break limits for student scheduling.
          </p>
        </div>
      </div>

      {/* Week Days Checkboxes */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Workdays</label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => {
            const isSelected = selectedDays.includes(day)
            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-accent border-accent text-white"
                    : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Working Hours & Breaks Range Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-border/20">
        
        {/* Working Hours */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Clock className="size-3.5 text-slate-400" />
            Working Hours Range
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Shift Start</span>
              <input 
                type="time" 
                value={startHour} 
                onChange={(e) => setStartHour(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-background"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Shift End</span>
              <input 
                type="time" 
                value={endHour} 
                onChange={(e) => setEndHour(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-background"
              />
            </div>
          </div>
        </div>

        {/* Lunch Breaks */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Clock className="size-3.5 text-slate-400" />
            Shift Lunch Break
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Break Start</span>
              <input 
                type="time" 
                value={breakStart} 
                onChange={(e) => setBreakStart(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-background"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Break End</span>
              <input 
                type="time" 
                value={breakEnd} 
                onChange={(e) => setBreakEnd(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-background"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Timezone Setting */}
      <div className="space-y-2 pt-2 border-t border-border/20">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
          <Globe className="size-3.5 text-slate-400" />
          Timezone Reference
        </label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="flex h-10 w-full rounded-lg border border-slate-200 bg-background px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="GMT (Accra)">GMT (Accra, Lagos, London)</option>
          <option value="EST (New York)">EST (New York, Toronto)</option>
          <option value="PST (San Francisco)">PST (San Francisco, Vancouver)</option>
          <option value="CET (Paris, Berlin)">CET (Paris, Berlin, Rome)</option>
        </select>
      </div>

      {/* Save Action Footer */}
      <div className="pt-2 border-t border-border/30 flex justify-end items-center gap-3">
        {showSuccess && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
            <Check className="size-4" />
            Calendar Updated!
          </span>
        )}
        <Button
          onClick={handleSaveSubmit}
          className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-10 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer"
        >
          <Save className="size-3.5 mr-2" />
          Save Schedule Availability
        </Button>
      </div>

    </Card>
  )
}
