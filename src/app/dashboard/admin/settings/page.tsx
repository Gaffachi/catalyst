"use client"

import * as React from "react"
import { AdminService } from "@/features/admin/services/admin.service"
import { AdminSettings } from "@/features/admin/types/admin.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Save, Check, Loader2, Sliders } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<AdminSettings | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const loadSettings = React.useCallback(async () => {
    try {
      const data = await AdminService.getSettings()
      setSettings(data)
    } catch (err) {
      console.error("Failed to load admin settings:", err)
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
      const updated = await AdminService.updateSettings(settings)
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
          Loading platform security settings...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-border/40 pb-4">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Platform Governance Settings
        </h1>
        <p className="text-xs text-muted-foreground">
          Configure automated verification parameters, maintenance mode flags, and security audit log preferences.
        </p>
      </div>

      {/* Verification Policy Card */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
          <Sliders className="size-4.5 text-accent" />
          Verification & Policy Thresholds
        </h3>
        
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Require Mentor Credential Upload</span>
              <span className="text-[10px] text-muted-foreground block">Mandate PDF document upload before approving mentor registrations.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.requireMentorCredentialUpload}
              onChange={(e) => setSettings({ ...settings, requireMentorCredentialUpload: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-border/10">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Require Employer Registration Documents</span>
              <span className="text-[10px] text-muted-foreground block">Require corporate tax ID or registration docs for employer verification.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.requireEmployerDocUpload}
              onChange={(e) => setSettings({ ...settings, requireEmployerDocUpload: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* Platform Operations Card */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-border/30 pb-2">
          <Shield className="size-4.5 text-accent" />
          Security Audit & Maintenance Mode
        </h3>
        
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Security Audit Logging</span>
              <span className="text-[10px] text-muted-foreground block">Log all administrative status changes and user role modifications to system audit log.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.securityAuditLogging}
              onChange={(e) => setSettings({ ...settings, securityAuditLogging: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-border/10">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-700 dark:text-rose-400 block">Platform Maintenance Mode</span>
              <span className="text-[10px] text-muted-foreground block">Restrict portal access to administrators during database maintenance.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.platformMaintenanceMode}
              onChange={(e) => setSettings({ ...settings, platformMaintenanceMode: e.target.checked })}
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
            Admin Settings Saved!
          </span>
        )}
        
        <Button
          onClick={handleSave}
          className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-10 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer"
        >
          <Save className="size-3.5 mr-2" />
          Save Governance Configuration
        </Button>
      </div>
    </div>
  )
}
