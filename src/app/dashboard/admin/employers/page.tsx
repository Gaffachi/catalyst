"use client"

import * as React from "react"
import { VerificationService } from "@/features/admin/services/verification.service"
import { EmployerVerification } from "@/features/admin/types/admin.types"
import { EmployerVerificationTable } from "@/features/admin/components/EmployerVerificationTable"
import { Loader2 } from "lucide-react"

export default function EmployerVerificationPage() {
  const [verifications, setVerifications] = React.useState<EmployerVerification[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadEmployers = React.useCallback(async () => {
    try {
      const data = await VerificationService.getEmployerVerifications()
      setVerifications(data)
    } catch (err) {
      console.error("Failed to load employer verifications:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadEmployers()
  }, [loadEmployers])

  const handleUpdateStatus = async (id: string, status: EmployerVerification["status"]) => {
    const updated = await VerificationService.updateEmployerVerificationStatus(id, status)
    setVerifications(updated)
  }

  if (isLoading && verifications.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading employer corporate verification queue...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Employer Verification & Registration Audit
        </h1>
        <p className="text-xs text-muted-foreground">
          Verify company registration documents, corporate legitimacy, and partner organization status.
        </p>
      </div>

      <EmployerVerificationTable
        verifications={verifications}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  )
}
