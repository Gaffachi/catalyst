"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building2, MapPin, Users, Briefcase, ShieldCheck, ArrowRight } from "lucide-react"

interface EmployerDirectoryCardProps {
  employer: {
    id: string
    companyName: string
    industry: string
    companySize: string
    location: string
    openPositions: number
    description: string
  }
}

export function EmployerDirectoryCard({ employer }: EmployerDirectoryCardProps) {
  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-3 select-none flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex justify-between items-start border-b border-border/30 pb-3 gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px]">
                <ShieldCheck className="size-3 mr-1" /> Partner Employer
              </Badge>
              <Badge variant="outline" className="text-[10px] font-extrabold text-accent bg-orange-50/60">
                {employer.openPositions} Active Postings
              </Badge>
            </div>
            <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
              <Building2 className="size-4 text-accent" />
              {employer.companyName}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {employer.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-500 bg-slate-50/50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1">
            <MapPin className="size-3 text-slate-400" />
            {employer.location}
          </span>
          <span className="flex items-center gap-1 justify-end">
            <Users className="size-3 text-slate-400" />
            {employer.companySize}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-border/20 flex justify-end">
        <Link href="/dashboard/student/marketplace">
          <Button variant="ghost" className="h-7 text-[10px] font-bold text-accent hover:bg-orange-50 p-0">
            <Briefcase className="size-3 mr-1" />
            View Open Market Listings
            <ArrowRight className="size-3 ml-1" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
