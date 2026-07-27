import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Opportunity } from "../types/student.types"
import { MapPin, Building2, Send, Check, Calendar, Star, Clock, Cpu, CalendarCheck, Award, XCircle } from "lucide-react"

interface OpportunityCardProps {
  opportunity: Opportunity
  onApply: (id: string) => void
}

export function OpportunityCard({
  opportunity,
  onApply,
}: OpportunityCardProps) {
  
  // Custom styled badges based on opportunity types
  const getTypeBadge = (type: Opportunity["type"]) => {
    switch (type) {
      case "INTERNSHIP":
        return (
          <Badge className="bg-purple-50 hover:bg-purple-50 text-purple-700 border-purple-200 text-[10px] shrink-0 font-semibold px-2.5 py-0.5 rounded-full uppercase border">
            Internship
          </Badge>
        )
      case "GRADUATE_PROGRAM":
        return (
          <Badge className="bg-sky-50 hover:bg-sky-50 text-sky-700 border-sky-200 text-[10px] shrink-0 font-semibold px-2.5 py-0.5 rounded-full uppercase border">
            Graduate Program
          </Badge>
        )
      case "FULL_TIME":
        return (
          <Badge className="bg-emerald-50 hover:bg-emerald-50 text-emerald-700 border-emerald-250 text-[10px] shrink-0 font-semibold px-2.5 py-0.5 rounded-full uppercase border">
            Full-Time
          </Badge>
        )
      case "CONTRACT":
        return (
          <Badge className="bg-amber-50 hover:bg-amber-50 text-accent border-orange-200 text-[10px] shrink-0 font-semibold px-2.5 py-0.5 rounded-full uppercase border">
            Contract
          </Badge>
        )
    }
  }

  // Custom button styling based on application stage status
  const renderActionButton = () => {
    const status = opportunity.applicationStatus
    
    switch (status) {
      case "Apply Now":
        return (
          <Button 
            onClick={() => onApply(opportunity.id)}
            className="w-full bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-bold text-xs cursor-pointer"
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
    <Card className="p-6 border border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-[270px] select-none animate-in fade-in duration-150">
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        
        {/* Title, Company & Type */}
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 h-10 leading-tight">
              {opportunity.title}
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0 border border-emerald-100">
              <Star className="size-3 fill-emerald-600" />
              {opportunity.matchScore}%
            </span>
          </div>
          
          <div className="flex items-center justify-between gap-1.5 pt-0.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Building2 className="size-3.5" />
              <span className="line-clamp-1">{opportunity.company}</span>
            </div>
            {getTypeBadge(opportunity.type)}
          </div>
        </div>

        {/* Location & Details */}
        <div className="space-y-1.5 text-[11px] text-slate-500 pt-1 border-t border-border/25">
          <div className="flex items-center gap-1">
            <MapPin className="size-3 shrink-0" />
            <span className="line-clamp-1">{opportunity.location} ({opportunity.workMode})</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="size-3 shrink-0" />
            <span>Deadline: {opportunity.deadline}</span>
          </div>
        </div>

        {/* Required Skills tags */}
        <div className="flex flex-wrap gap-1 pt-1 h-6 overflow-hidden">
          {opportunity.requiredSkills.slice(0, 3).map((skill) => (
            <Badge 
              key={skill} 
              variant="outline" 
              className="text-[9px] px-1.5 py-0 border-slate-200 bg-slate-50/20"
            >
              {skill}
            </Badge>
          ))}
          {opportunity.requiredSkills.length > 3 && (
            <span className="text-[8px] font-bold text-slate-400 pl-0.5 pt-0.5">
              +{opportunity.requiredSkills.length - 3}
            </span>
          )}
        </div>

      </div>

      {/* Action Button Footer */}
      <div className="pt-4 border-t border-border/40 shrink-0">
        {renderActionButton()}
      </div>
    </Card>
  )
}
