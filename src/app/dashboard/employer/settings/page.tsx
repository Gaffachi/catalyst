"use client"

import * as React from "react"
import { EmployerService } from "@/features/employer/services/employer.service"
import { EmployerSettings } from "@/features/employer/types/employer.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Eye, Save, Check, Loader2 } from "lucide-react"

export default function EmployerSettingsPage() {
  const [settings, setSettings] = React.useState<EmployerSettings | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const loadSettings = React.useCallback(async () => {
    try {
      const data = await EmployerService.getSettings()
      setSettings(data)
    } catch (err) {
      console.error("Failed to load settings:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadSettings()
  }, [loadSettings])

  const handleSave = async () => {
    if (!settings) return
    setIsLoading(true)
    try {
      const updated = await EmployerService.updateSettings(settings)
      setSettings(updated)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (err) {
      console.error("Failed to save settings:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !settings) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading employer settings...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-border/40 pb-4">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Portal Settings
        </h1>
        <p className="text-xs text-muted-foreground">
          Configure corporate notification preferences, candidate application alerts, and company directory visibility.
        </p>
      </div>

      {/* 1. Notifications card */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
          <Bell className="size-4.5 text-accent" />
          Recruitment Notification Alerts
        </h3>
        
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Applicant Alerts</span>
              <span className="text-[10px] text-muted-foreground block">Notify recruitment team immediately when a new student application is submitted.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.applicantAlerts}
              onChange={(e) => setSettings({ ...settings, applicantAlerts: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-border/10">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Interview Schedule Reminders</span>
              <span className="text-[10px] text-muted-foreground block">Send email calendar reminders 30 minutes before candidate interviews start.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.interviewReminders}
              onChange={(e) => setSettings({ ...settings, interviewReminders: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-border/10">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Daily Digest Email</span>
              <span className="text-[10px] text-muted-foreground block">Receive a morning summary of active pipeline movements and upcoming candidate syncs.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* 2. Directory & Profile Visibility Card */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
          <Eye className="size-4.5 text-accent" />
          Directory & Profile Visibility
        </h3>
        
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Listed in Public Employer Directory</span>
              <span className="text-[10px] text-muted-foreground block">Allow students to discover your company profile and view open internship listings.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.companyDirectoryListed}
              onChange={(e) => setSettings({ ...settings, companyDirectoryListed: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3 items-center">
        {showSuccess && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
            <Check className="size-4" />
            Employer Preferences Saved!
          </span>
        )}
        
        <Button
          onClick={handleSave}
          className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-10 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer"
        >
          <Save className="size-3.5 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
