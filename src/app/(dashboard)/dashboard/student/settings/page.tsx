"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Eye, Save, Check } from "lucide-react"

export default function StudentSettingsPage() {
  const [emailNotif, setEmailNotif] = React.useState(true)
  const [sessionNotif, setSessionNotif] = React.useState(true)
  const [appNotif, setAppNotif] = React.useState(true)
  const [employerVisible, setEmployerVisible] = React.useState(true)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const handleSave = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-border/40 pb-4">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Account Settings
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage your notification alerts, marketplace discovery preferences, and profile visibility controls.
        </p>
      </div>

      {/* 1. Notifications preferences card */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
          <Bell className="size-4.5 text-accent" />
          Notification Alerts
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Mentor Review Updates</span>
              <span className="text-[10px] text-muted-foreground block">Receive emails when an advisor audits or approves your portfolio code.</span>
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
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Session Reminders</span>
              <span className="text-[10px] text-muted-foreground block">Send calendar alerts 15 minutes before 1-on-1 mentor syncs start.</span>
            </div>
            <input
              type="checkbox"
              checked={sessionNotif}
              onChange={(e) => setSessionNotif(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-border/10">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Application Status Alerts</span>
              <span className="text-[10px] text-muted-foreground block">Notify me when an employer updates my hiring stage status.</span>
            </div>
            <input
              type="checkbox"
              checked={appNotif}
              onChange={(e) => setAppNotif(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* 2. Employer Discovery Visibility Card */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
          <Eye className="size-4.5 text-accent" />
          Employer Discovery & Privacy
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Public Employer Discovery</span>
            <span className="text-[10px] text-muted-foreground block">Allow corporate recruiters to discover your verified portfolio and invite you to positions.</span>
          </div>
          <input
            type="checkbox"
            checked={employerVisible}
            onChange={(e) => setEmployerVisible(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
          />
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3 items-center">
        {showSuccess && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
            <Check className="size-4" />
            Settings Saved Successfully!
          </span>
        )}
        
        <Button
          onClick={handleSave}
          className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-10 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer"
        >
          <Save className="size-3.5 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
