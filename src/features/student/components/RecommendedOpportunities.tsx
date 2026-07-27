import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Opportunity } from "../types/student.types"
import { Star, Building2, Check, Send, Sparkles, Clock, Cpu, CalendarCheck, Award, XCircle } from "lucide-react"

interface RecommendedOpportunitiesProps {
  recommendations: Opportunity[]
  onApply: (id: string) => void
}

export function RecommendedOpportunities({
  recommendations,
  onApply,
}: RecommendedOpportunitiesProps) {
  
  const getTypeBadge = (type: Opportunity["type"]) => {
    switch (type) {
      case "INTERNSHIP":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-[9px] uppercase font-semibold px-2 py-0.5 rounded">Internship</Badge>
      case "GRADUATE_PROGRAM":
        return <Badge className="bg-sky-50 text-sky-700 border-sky-200 text-[9px] uppercase font-semibold px-2 py-0.5 rounded">Graduate Program</Badge>
      case "FULL_TIME":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-250 text-[9px] uppercase font-semibold px-2 py-0.5 rounded">Full-Time</Badge>
      case "CONTRACT":
        return <Badge className="bg-amber-50 text-accent border-orange-200 text-[9px] uppercase font-semibold px-2 py-0.5 rounded">Contract</Badge>
    }
  }

  const renderActionButton = (opp: Opportunity) => {
    const status = opp.applicationStatus
    
    switch (status) {
      case "Apply Now":
        return (
          <Button 
            onClick={() => onApply(opp.id)}
            className="w-full bg-slate-900 text-white hover:bg-slate-800 border-0 h-9 rounded-xl font-bold text-xs cursor-pointer"
          >
            <Send className="size-3.5 mr-1.5" />
            Apply Now
          </Button>
        )
      case "Applied":
        return (
          <Button 
            disabled 
            className="w-full bg-blue-50 text-blue-700 border border-blue-150 h-9 rounded-xl font-bold text-xs"
          >
            <Check className="size-4 mr-1.5" />
            Applied
          </Button>
        )
      case "Under Review":
        return (
          <Button 
            disabled 
            className="w-full bg-sky-50 text-sky-700 border border-sky-150 h-9 rounded-xl font-bold text-xs"
          >
            <Clock className="size-3.5 mr-1.5" />
            In Review
          </Button>
        )
      case "Assessment":
        return (
          <Button 
            disabled 
            className="w-full bg-purple-50 text-purple-700 border border-purple-150 h-9 rounded-xl font-bold text-xs"
          >
            <Cpu className="size-3.5 mr-1.5" />
            Assessment Task
          </Button>
        )
      case "Interview":
        return (
          <Button 
            disabled 
            className="w-full bg-orange-50 text-accent border border-orange-150 h-9 rounded-xl font-bold text-xs animate-pulse"
          >
            <CalendarCheck className="size-3.5 mr-1.5" />
            Interview Scheduled
          </Button>
        )
      case "Offer":
        return (
          <Button 
            disabled 
            className="w-full bg-emerald-50 text-emerald-700 border border-emerald-150 h-9 rounded-xl font-bold text-xs"
          >
            <Award className="size-4 mr-1.5" />
            Offer Received!
          </Button>
        )
      case "Accepted":
        return (
          <Button 
            disabled 
            className="w-full bg-teal-50 text-teal-700 border border-teal-150 h-9 rounded-xl font-bold text-xs"
          >
            <Check className="size-4 mr-1.5" />
            Offer Accepted
          </Button>
        )
      case "Rejected":
        return (
          <Button 
            disabled 
            className="w-full bg-rose-50 text-rose-600 border border-rose-150 h-9 rounded-xl font-bold text-xs"
          >
            <XCircle className="size-3.5 mr-1.5" />
            Role Closed
          </Button>
        )
    }
  }

  return (
    <div className="space-y-4 select-none animate-in fade-in duration-200">
      <div className="flex items-center gap-2 border-b border-border/40 pb-2">
        <Sparkles className="size-4.5 text-accent animate-pulse" />
        <h3 className="font-heading text-sm font-bold text-foreground">
          Recommended For You
        </h3>
        <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ml-auto">
          Match Accuracy High
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.slice(0, 3).map((opp) => {
          // Compile matching checklist reasons
          const skillsMatch = opp.requiredSkills.slice(0, 2).map((s) => `✓ ${s} skill`)
          const reasonsList = [...skillsMatch, "✓ Portfolio verified"]

          return (
            <Card key={opp.id} className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow flex flex-col justify-between h-[230px]">
              <div className="space-y-2.5">
                {/* Header info */}
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                      {opp.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold line-clamp-1 flex items-center gap-1">
                      <Building2 className="size-3 text-slate-400" />
                      {opp.company}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 select-none shrink-0 border border-emerald-100">
                    <Star className="size-3 fill-emerald-600" />
                    {opp.matchScore}%
                  </span>
                </div>

                {/* Badges details */}
                <div className="flex gap-2">
                  {getTypeBadge(opp.type)}
                </div>

                {/* Match checklist why summary */}
                <div className="space-y-1 pt-1 border-t border-border/25">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Why Recommended:</span>
                  <div className="flex flex-col gap-0.5 text-[10px] text-slate-500 font-semibold">
                    {reasonsList.map((r, i) => (
                      <span key={i}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-border/30 w-full shrink-0">
                {renderActionButton(opp)}
              </div>
            </Card>
          )
        })}

        {recommendations.length === 0 && (
          <div className="col-span-full p-8 text-center border border-dashed border-border rounded-2xl bg-slate-50/20 text-muted-foreground text-xs italic">
            No specific recommendations matched to your skills yet. Add more verified tags in your profile page.
          </div>
        )}
      </div>
    </div>
  )
}
