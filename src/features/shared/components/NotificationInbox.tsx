"use client"

import * as React from "react"
import { NotificationService } from "@/features/admin/services/notification.service"
import { PlatformAnnouncement } from "@/features/admin/types/admin.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar, Users, Megaphone, Bell } from "lucide-react"

interface NotificationInboxProps {
  audience: "Students" | "Mentors" | "Employers"
  portalLabel: string
}

export function NotificationInbox({ audience, portalLabel }: NotificationInboxProps) {
  const [announcements, setAnnouncements] = React.useState<PlatformAnnouncement[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadAnnouncements = React.useCallback(async () => {
    try {
      const allData = await NotificationService.getAnnouncements()
      // Filter where target matches portal audience OR is broadcast to "All Users"
      const filtered = allData.filter(
        (item) => item.audience === audience || item.audience === "All Users"
      )
      setAnnouncements(filtered)
    } catch (err) {
      console.error("Failed to load notifications:", err)
    } finally {
      setIsLoading(false)
    }
  }, [audience])

  React.useEffect(() => {
    loadAnnouncements()
  }, [loadAnnouncements])

  const getTypeBadge = (annType: PlatformAnnouncement["type"]) => {
    switch (annType) {
      case "Career Event":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-bold text-[10px]">Career Event</Badge>
      case "Platform Update":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-bold text-[10px]">Platform Update</Badge>
      case "Training Opportunity":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px]">Training Opportunity</Badge>
      case "Maintenance Notice":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-bold text-[10px]">Maintenance Notice</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading platform announcements...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto select-none">
      {/* Header banner */}
      <div className="border-b border-border/40 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-orange-50 text-accent border border-orange-100">
            <Bell className="size-5" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
              {portalLabel} Notifications Inbox
            </h1>
            <p className="text-xs text-muted-foreground">
              Official platform updates, event invitations, training opportunities, and maintenance advisories from Catalyst administrators.
            </p>
          </div>
        </div>
      </div>

      {/* Stream */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-3">
            <div className="flex justify-between items-start border-b border-border/30 pb-2 gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getTypeBadge(ann.type)}
                  <span className="text-[10px] font-bold text-accent bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 uppercase flex items-center gap-1">
                    <Users className="size-3" />
                    Target: {ann.audience}
                  </span>
                </div>
                <h3 className="font-heading text-sm font-extrabold text-slate-850 dark:text-slate-100">
                  {ann.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {ann.message}
            </p>

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1 border-t border-border/20">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                Posted: {ann.date}
              </span>
              <span className="flex items-center gap-1">
                <Megaphone className="size-3 text-accent" />
                Sender: {ann.author}
              </span>
            </div>
          </Card>
        ))}

        {announcements.length === 0 && (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/60 text-slate-500 text-xs italic">
            No active announcements found for {portalLabel}.
          </div>
        )}
      </div>
    </div>
  )
}
