"use client"

import * as React from "react"
import { VerificationService } from "@/features/admin/services/verification.service"
import { MentorVerification } from "@/features/admin/types/admin.types"
import { MentorVerificationTable } from "@/features/admin/components/MentorVerificationTable"
import { Loader2 } from "lucide-react"

export default function MentorVerificationPage() {
  const [verifications, setVerifications] = React.useState<MentorVerification[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadMentors = React.useCallback(async () => {
    try {
      const data = await VerificationService.getMentorVerifications()
      setVerifications(data)
    } catch (err) {
      console.error("Failed to load mentor verifications:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadMentors()
  }, [loadMentors])

  const handleUpdateStatus = async (id: string, status: MentorVerification["status"]) => {
    const updated = await VerificationService.updateMentorVerificationStatus(id, status)
    setVerifications(updated)
  }

  if (isLoading && verifications.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading mentor credentials review queue...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Mentor Verification Queue
        </h1>
        <p className="text-xs text-muted-foreground">
          Audit industry mentor applications, experience years, and technical credentials before granting coaching access.
        </p>
      </div>

      <MentorVerificationTable
        verifications={verifications}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  )
}
