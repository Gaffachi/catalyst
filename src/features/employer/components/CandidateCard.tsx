import * as React from "react"
import { CandidateProfile } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, GraduationCap, MapPin, FolderGit, ShieldCheck, Eye, Send } from "lucide-react"

interface CandidateCardProps {
  candidate: CandidateProfile
  onInvite?: (candidateId: string, candidateName: string) => void
}

export function CandidateCard({ candidate, onInvite }: CandidateCardProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-4 flex flex-col justify-between select-none">
      <div className="space-y-3">
        {/* Candidate avatar & header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-orange-50 dark:bg-slate-800 text-accent flex items-center justify-center font-black text-sm border border-orange-200/60 shrink-0">
              {initials}
            </div>
            <div className="space-y-0.5">
              <h3 className="font-heading text-sm font-extrabold text-slate-850 dark:text-slate-100">
                {candidate.name}
              </h3>
              <span className="text-[10px] text-muted-foreground font-semibold block flex items-center gap-1">
                <GraduationCap className="size-3 text-slate-400" />
                {candidate.programme}
              </span>
            </div>
          </div>

          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-bold text-[10px] shrink-0">
            <Star className="size-3 mr-1 fill-emerald-600" />
            {candidate.readinessScore}% Readiness
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-semibold bg-slate-50/50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1">
            <MapPin className="size-3 text-slate-400" />
            {candidate.location}
          </span>
          <span className="flex items-center gap-1 justify-end">
            <FolderGit className="size-3 text-slate-400" />
            {candidate.projectCount} Projects
          </span>
          <span className="col-span-2 flex items-center gap-1">
            <ShieldCheck className="size-3 text-emerald-600" />
            Mentor Verified Portfolio: <strong className="text-emerald-700">{candidate.mentorVerified ? "YES ✓" : "NO"}</strong>
          </span>
        </div>

        {/* Skills */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Top Verified Skills</span>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 5).map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[9px] font-bold rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/30">
        <Link href={`/dashboard/employer/candidates/${candidate.id}`}>
          <Button variant="outline" className="w-full h-8 rounded-lg font-bold text-[10px] cursor-pointer border-slate-200">
            <Eye className="size-3 mr-1" />
            View Profile
          </Button>
        </Link>
        <Button
          onClick={() => onInvite && onInvite(candidate.id, candidate.name)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white h-8 rounded-lg font-bold text-[10px] cursor-pointer border-0"
        >
          <Send className="size-3 mr-1" />
          Invite to Apply
        </Button>
      </div>
    </Card>
  )
}
