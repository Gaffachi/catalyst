import * as React from "react"
import { CandidateProfile as CandidateProfileType } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, GraduationCap, MapPin, Mail, ShieldCheck, Briefcase, CheckCircle2, ArrowLeft, Send } from "lucide-react"

interface CandidateProfileProps {
  candidate: CandidateProfileType
  onInvite?: () => void
}

export function CandidateProfile({ candidate, onInvite }: CandidateProfileProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="space-y-6 max-w-4xl mx-auto select-none">
      {/* Back button */}
      <Link href="/dashboard/employer/talent">
        <Button variant="ghost" className="h-8 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer p-0">
          <ArrowLeft className="size-4 mr-1.5" />
          Back to Talent Discovery
        </Button>
      </Link>

      {/* Main Candidate Header Card */}
      <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-orange-50 dark:bg-slate-800 text-accent flex items-center justify-center font-black text-xl border border-orange-200/60 shrink-0">
              {initials}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl font-extrabold text-slate-850 dark:text-slate-100">{candidate.name}</h1>
                {candidate.mentorVerified && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase flex items-center gap-0.5">
                    <ShieldCheck className="size-3" />
                    Mentor Verified
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground block font-semibold flex items-center gap-1">
                <GraduationCap className="size-3.5 text-slate-400" />
                {candidate.programme} — {candidate.university}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Career Readiness Score</span>
              <span className="text-2xl font-black text-emerald-600 flex items-center gap-1 justify-end">
                <Star className="size-5 fill-emerald-600" />
                {candidate.readinessScore}%
              </span>
            </div>
            <Button
              onClick={onInvite}
              className="bg-slate-900 hover:bg-slate-800 text-white h-10 rounded-xl font-bold text-xs cursor-pointer border-0"
            >
              <Send className="size-3.5 mr-1.5" />
              Invite to Apply
            </Button>
          </div>
        </div>

        {/* Academic & Target Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-border/40 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Briefcase className="size-3 text-slate-400" />
              Employment Target
            </span>
            <p className="font-bold text-slate-700 dark:text-slate-200">{candidate.employmentGoal}</p>
          </div>

          <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-border/40 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <MapPin className="size-3 text-slate-400" />
              Preferred Location
            </span>
            <p className="font-bold text-slate-700 dark:text-slate-200">{candidate.location}</p>
          </div>

          <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-border/40 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Mail className="size-3 text-slate-400" />
              Contact Email
            </span>
            <p className="font-bold text-slate-700 dark:text-slate-200">{candidate.email}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Candidate Summary</span>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{candidate.bio}</p>
        </div>

        {/* Verified Competency Skills */}
        <div className="space-y-2 pt-2 border-t border-border/30">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical & Domain Skills</span>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="px-3 py-1 font-bold text-xs bg-slate-50 dark:bg-slate-800 border-slate-200">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Approved Mentor Verification Evaluation Note */}
        {candidate.approvedMentorNotes && (
          <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-2xl space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block flex items-center gap-1">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Approved Mentor Audit Evaluation:
            </span>
            <p className="text-xs text-emerald-950 italic font-medium leading-relaxed">
              &quot;{candidate.approvedMentorNotes}&quot;
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
