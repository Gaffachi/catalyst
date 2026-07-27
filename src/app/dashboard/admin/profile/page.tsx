"use client"

import * as React from "react"
import { AdminProfileService } from "@/features/admin/services/admin-profile.service"
import { AdminProfile } from "@/features/admin/types/admin.profile.types"
import { AdminProfileCard } from "@/features/admin/components/AdminProfileCard"
import { Loader2 } from "lucide-react"

export default function AdminProfilePage() {
  const [profile, setProfile] = React.useState<AdminProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const loadProfile = React.useCallback(async () => {
    try {
      const data = await AdminProfileService.getProfile()
      setProfile(data)
    } catch (err) {
      console.error("Failed to load admin profile:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadProfile()
  }, [loadProfile])

  if (isLoading || !profile) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading admin profile credentials...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Administrator Account Profile
        </h1>
        <p className="text-xs text-muted-foreground">
          Personal credentials, system authority role title, and contact details for platform governance.
        </p>
      </div>

      <AdminProfileCard profile={profile} />
    </div>
  )
}
