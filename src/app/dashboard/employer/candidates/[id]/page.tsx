"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { CandidateService } from "@/features/employer/services/candidate.service"
import { CandidateProfile as CandidateProfileType } from "@/features/employer/types/employer.types"
import { CandidateProfile } from "@/features/employer/components/CandidateProfile"
import { Loader2, Check } from "lucide-react"

export default function CandidateDetailPage() {
  const params = useParams()
  const candidateId = params?.id as string

  const [candidate, setCandidate] = React.useState<CandidateProfileType | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [inviteSuccessMsg, setInviteSuccessMsg] = React.useState<string | null>(null)

  const loadCandidate = React.useCallback(async () => {
    if (!candidateId) return
    try {
      const data = await CandidateService.getCandidateById(candidateId)
      setCandidate(data)
    } catch (err) {
      console.error("Failed to load candidate profile:", err)
    } finally {
      setIsLoading(false)
    }
  }, [candidateId])

  React.useEffect(() => {
    loadCandidate()
  }, [loadCandidate])

  const handleInvite = () => {
    if (!candidate) return
    setInviteSuccessMsg(`Application invitation sent to ${candidate.name}!`)
    setTimeout(() => setInviteSuccessMsg(null), 3000)
  }

  if (isLoading || !candidate) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading candidate record...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {inviteSuccessMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse select-none max-w-4xl mx-auto">
          <Check className="size-4 text-emerald-600" />
          {inviteSuccessMsg}
        </div>
      )}

      <CandidateProfile candidate={candidate} onInvite={handleInvite} />
    </div>
  )
}
