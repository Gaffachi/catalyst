"use client"

import * as React from "react"
import { OpportunityManagementService } from "@/features/admin/services/opportunity-management.service"
import { OpportunityApproval } from "@/features/admin/types/admin.types"
import { OpportunityApprovalBoard } from "@/features/admin/components/OpportunityApprovalBoard"
import { Loader2 } from "lucide-react"

export default function OpportunityApprovalPage() {
  const [approvals, setApprovals] = React.useState<OpportunityApproval[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadApprovals = React.useCallback(async () => {
    try {
      const data = await OpportunityManagementService.getOpportunityApprovals()
      setApprovals(data)
    } catch (err) {
      console.error("Failed to load opportunity approvals:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadApprovals()
  }, [loadApprovals])

  const handleUpdateStatus = async (id: string, status: OpportunityApproval["status"]) => {
    const updated = await OpportunityManagementService.updateApprovalStatus(id, status)
    setApprovals(updated)
  }

  if (isLoading && approvals.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading opportunity approval queue...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Opportunity Moderation & Approval Board
        </h1>
        <p className="text-xs text-muted-foreground">
          Audit employer-posted internships, graduate rotational programs, full-time positions, and contracts before publication to student marketplaces.
        </p>
      </div>

      <OpportunityApprovalBoard
        approvals={approvals}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  )
}
