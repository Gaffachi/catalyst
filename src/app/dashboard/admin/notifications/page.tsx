"use client"

import * as React from "react"
import { NotificationService } from "@/features/admin/services/notification.service"
import { PlatformAnnouncement } from "@/features/admin/types/admin.types"
import { NotificationManager } from "@/features/admin/components/NotificationManager"
import { Loader2 } from "lucide-react"

export default function NotificationsPage() {
  const [announcements, setAnnouncements] = React.useState<PlatformAnnouncement[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadAnnouncements = React.useCallback(async () => {
    try {
      const data = await NotificationService.getAnnouncements()
      setAnnouncements(data)
    } catch (err) {
      console.error("Failed to load announcements:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadAnnouncements()
  }, [loadAnnouncements])

  const handleCreateAnnouncement = async (
    data: Omit<PlatformAnnouncement, "id" | "date" | "author">
  ) => {
    setIsLoading(true)
    try {
      const updated = await NotificationService.createAnnouncement(data)
      setAnnouncements(updated)
    } catch (err) {
      console.error("Failed to create announcement:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && announcements.length === 0) {
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
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Platform Notifications & Announcements
        </h1>
        <p className="text-xs text-muted-foreground">
          Broadcast system updates, tech career fair invitations, and maintenance notices across stakeholder portals.
        </p>
      </div>

      <NotificationManager
        announcements={announcements}
        onCreateAnnouncement={handleCreateAnnouncement}
      />
    </div>
  )
}
