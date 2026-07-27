"use client"

import * as React from "react"
import { CandidateService } from "@/features/employer/services/candidate.service"
import { CandidateProfile } from "@/features/employer/types/employer.types"
import { CandidateCard } from "@/features/employer/components/CandidateCard"
import { TalentFilters } from "@/features/employer/components/TalentFilters"
import { Loader2, Users, Check } from "lucide-react"

export default function TalentDiscoveryPage() {
  const [candidates, setCandidates] = React.useState<CandidateProfile[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [minScore, setMinScore] = React.useState(0)
  const [verifiedOnly, setVerifiedOnly] = React.useState(false)
  const [inviteSuccessMsg, setInviteSuccessMsg] = React.useState<string | null>(null)

  const loadCandidates = React.useCallback(async () => {
    try {
      const data = await CandidateService.getCandidates()
      setCandidates(data)
    } catch (err) {
      console.error("Failed to load candidates:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadCandidates()
  }, [loadCandidates])

  const handleResetFilters = () => {
    setSearchQuery("")
    setMinScore(0)
    setVerifiedOnly(false)
  }

  const handleInviteCandidate = (id: string, name: string) => {
    setInviteSuccessMsg(`Application invitation sent to ${name}!`)
    setTimeout(() => setInviteSuccessMsg(null), 3000)
  }

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.programme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesScore = c.readinessScore >= minScore
    const matchesVerified = verifiedOnly ? c.mentorVerified : true

    return matchesSearch && matchesScore && matchesVerified
  })

  if (isLoading && candidates.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Querying verified student talent database...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Talent Discovery
        </h1>
        <p className="text-xs text-muted-foreground">
          Search verified Catalyst student candidates by readiness score, tech skills, mentor audit status, and degree programme.
        </p>
      </div>

      {/* Invite Success Alert */}
      {inviteSuccessMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse select-none">
          <Check className="size-4 text-emerald-600" />
          {inviteSuccessMsg}
        </div>
      )}

      {/* Filters Bar */}
      <TalentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        minScore={minScore}
        setMinScore={setMinScore}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        onReset={handleResetFilters}
      />

      {/* Results Header Counter */}
      <div className="flex justify-between items-center text-xs font-bold text-slate-500 select-none">
        <span>Showing {filteredCandidates.length} candidate(s)</span>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onInvite={handleInviteCandidate}
          />
        ))}

        {filteredCandidates.length === 0 && (
          <div className="col-span-full p-12 text-center border border-dashed border-border rounded-2xl bg-slate-50/10 text-muted-foreground select-none">
            <Users className="size-8 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-bold">No candidates found matching your filter criteria.</p>
            <p className="text-[10px] text-slate-400">Try loosening your search terms or lowering the minimum readiness threshold.</p>
          </div>
        )}
      </div>
    </div>
  )
}
