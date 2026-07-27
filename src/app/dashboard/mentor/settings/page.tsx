"use client"

import * as React from "react"
import { MentorDashboardHeader } from "@/features/mentor/components/MentorDashboardHeader"
import { MentorService } from "@/features/mentor/services/mentor.service"
import { MentorSettings } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Bell, Shield, Clock, Save, Check } from "lucide-react"

export default function MentorSettingsPage() {
  const [settings, setSettings] = React.useState<MentorSettings | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [showSuccess, setShowSuccess] = React.useState(false)

  // Settings State parameters
  const [emailNotif, setEmailNotif] = React.useState(true)
  const [browserNotif, setBrowserNotif] = React.useState(true)
  const [sessionNotif, setSessionNotif] = React.useState(true)
  const [visibility, setVisibility] = React.useState<MentorSettings["profileVisibility"]>("internal")
  const [minNotice, setMinNotice] = React.useState(24)
  const [maxSessions, setMaxSessions] = React.useState(4)
  const [theme, setTheme] = React.useState<MentorSettings["theme"]>("system")

  const loadSettings = React.useCallback(async () => {
    try {
      const data = await MentorService.getSettings()
      setSettings(data)

      setEmailNotif(data.notifications.email)
      setBrowserNotif(data.notifications.browser)
      setSessionNotif(data.notifications.sessions)
      setVisibility(data.profileVisibility)
      setMinNotice(data.availabilityPreferences.minNoticeHours)
      setMaxSessions(data.availabilityPreferences.maxSessionsPerDay)
      setTheme(data.theme)
    } catch (err) {
      console.error("Failed to load mentor settings:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadSettings()
  }, [loadSettings])

  const handleSave = async () => {
    try {
      const updated = await MentorService.updateSettings({
        notifications: {
          email: emailNotif,
          browser: browserNotif,
          sessions: sessionNotif
        },
        profileVisibility: visibility,
        availabilityPreferences: {
          minNoticeHours: minNotice,
          maxSessionsPerDay: maxSessions
        },
        theme
      })
      
      setSettings(updated)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (err) {
      console.error("Failed to save settings:", err)
    }
  }

  if (isLoading || !settings) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading workspace settings...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header welcome */}
      <MentorDashboardHeader 
        title="Account Configurations"
        subtitle="Review security access, notification logs, theme settings, and booking preferences."
      />

      {/* Main settings form */}
      <div className="space-y-6 select-none">
        
        {/* 1. Notifications card */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
            <Bell className="size-4.5 text-accent" />
            Alert Preferences
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block">Email Alerts notifications</span>
                <span className="text-[10px] text-muted-foreground block">Receive emails when students schedule mentorship appointments.</span>
              </div>
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-border/10">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block">Browser Push alerts</span>
                <span className="text-[10px] text-muted-foreground block">Receive browser alerts for pending portfolio review submissions.</span>
              </div>
              <input
                type="checkbox"
                checked={browserNotif}
                onChange={(e) => setBrowserNotif(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-border/10">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block">Sessions Reminder alerts</span>
                <span className="text-[10px] text-muted-foreground block">Remind me 15 minutes before video counseling starts.</span>
              </div>
              <input
                type="checkbox"
                checked={sessionNotif}
                onChange={(e) => setSessionNotif(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
              />
            </div>
          </div>
        </Card>

        {/* 2. Privacy & visibility card */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
            <Shield className="size-4.5 text-accent" />
            Security & Visibility
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block">Profile Visibility Scope</span>
              <p className="text-[10px] text-muted-foreground pb-1">Specify which student categories or employers can discover your availability calendar.</p>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as "public" | "internal" | "private")}
                className="flex h-9 w-full rounded-lg border border-slate-200 bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="public">Public (All students and employers can book)</option>
                <option value="internal">Internal (Only assigned cohort students can book)</option>
                <option value="private">Private (Invite-only sessions, bookings blocked)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* 3. Availability preferences card */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
            <Clock className="size-4.5 text-accent" />
            Booking Limits Preferences
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block">Minimum Booking Notice</span>
              <p className="text-[10px] text-slate-400">Prevent bookings made within this time range.</p>
              <select
                value={minNotice}
                onChange={(e) => setMinNotice(Number(e.target.value))}
                className="flex h-9 w-full rounded-lg border border-slate-200 bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="12">12 Hours in advance</option>
                <option value="24">24 Hours in advance</option>
                <option value="48">48 Hours in advance</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block">Maximum Sessions Daily Limit</span>
              <p className="text-[10px] text-slate-400">Cap maximum completed counseling events daily.</p>
              <select
                value={maxSessions}
                onChange={(e) => setMaxSessions(Number(e.target.value))}
                className="flex h-9 w-full rounded-lg border border-slate-200 bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="2">2 Slots per day</option>
                <option value="4">4 Slots per day</option>
                <option value="6">6 Slots per day</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Form controls save triggers */}
        <div className="flex justify-end gap-3 items-center">
          {showSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
              <Check className="size-4" />
              Settings Saved!
            </span>
          )}
          
          <Button
            onClick={handleSave}
            className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-10 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer"
          >
            <Save className="size-3.5 mr-2" />
            Save Workspace Settings
          </Button>
        </div>

      </div>

    </div>
  )
}
