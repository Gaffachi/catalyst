"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCheck, Building2, Clock, Calendar } from "lucide-react"

interface Mentor {
  name: string
  expertise: string
  company: string
  availability: string
}

interface MentorProfileCardProps {
  mentor: Mentor
  onBook: () => void
}

export function MentorProfileCard({ mentor, onBook }: MentorProfileCardProps) {
  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-[210px] select-none">
      <div className="space-y-3">
        {/* Mentor Title & Info */}
        <div className="flex gap-3 items-start">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 shrink-0">
            <UserCheck className="size-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-heading text-xs sm:text-sm font-bold text-foreground">
              {mentor.name}
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Building2 className="size-3" />
              <span>{mentor.expertise} at {mentor.company}</span>
            </div>
          </div>
        </div>

        {/* Availability details */}
        <div className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-border/30">
          <Clock className="size-3.5 text-accent shrink-0" />
          <span className="font-medium line-clamp-1">{mentor.availability}</span>
        </div>
      </div>

      {/* Action Booking */}
      <div className="pt-3 border-t border-border/40 flex justify-end">
        <Button 
          size="sm"
          onClick={onBook}
          className="w-full bg-slate-900 text-white hover:bg-slate-800 border-0 h-8 rounded-lg font-bold text-xs cursor-pointer"
        >
          <Calendar className="size-3.5 mr-1.5" />
          Request Booking
        </Button>
      </div>
    </Card>
  )
}
