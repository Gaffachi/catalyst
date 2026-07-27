import * as React from "react"
import { Opportunity } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, DollarSign, Lock } from "lucide-react"

interface OpportunityCardProps {
  opportunity: Opportunity
  onCloseOpportunity?: (id: string) => void
}

export function OpportunityCard({ opportunity, onCloseOpportunity }: OpportunityCardProps) {
  const getTypeBadge = (type: Opportunity["type"]) => {
    switch (type) {
      case "INTERNSHIP":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50 font-bold text-[10px]">INTERNSHIP</Badge>
      case "GRADUATE_PROGRAM":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-bold text-[10px]">GRADUATE PROGRAM</Badge>
      case "FULL_TIME":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 font-bold text-[10px]">FULL TIME</Badge>
      case "CONTRACT":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 font-bold text-[10px]">CONTRACT</Badge>
    }
  }

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-4 select-none">
      <div className="flex justify-between items-start border-b border-border/30 pb-3 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            {getTypeBadge(opportunity.type)}
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
              opportunity.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
            }`}>
              {opportunity.status}
            </span>
          </div>
          <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100">
            {opportunity.title}
          </h3>
        </div>

        {opportunity.status === "Active" && onCloseOpportunity && (
          <Button
            onClick={() => onCloseOpportunity(opportunity.id)}
            variant="ghost"
            className="h-7 text-[10px] text-slate-400 hover:text-destructive hover:bg-rose-50 cursor-pointer shrink-0"
          >
            <Lock className="size-3 mr-1" />
            Close Listing
          </Button>
        )}
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
        {opportunity.description}
      </p>

      {/* Skills Tags */}
      <div className="flex flex-wrap gap-1.5">
        {opportunity.requiredSkills.map((skill) => (
          <span key={skill} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-md">
            {skill}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-border/20 text-[10px] text-slate-500 font-semibold">
        <span className="flex items-center gap-1">
          <MapPin className="size-3 text-slate-400" />
          {opportunity.location} ({opportunity.workMode})
        </span>

        <span className="flex items-center gap-1">
          <DollarSign className="size-3 text-slate-400" />
          {opportunity.salaryRange}
        </span>

        <span className="flex items-center gap-1 justify-end col-span-2 sm:col-span-1">
          <Users className="size-3 text-slate-400" />
          {opportunity.applicantCount} Applicants
        </span>
      </div>
    </Card>
  )
}
