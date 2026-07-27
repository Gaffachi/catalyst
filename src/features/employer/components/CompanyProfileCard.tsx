import * as React from "react"
import { CompanyProfile } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, ShieldCheck, MapPin, Globe, Users, Mail, Edit2 } from "lucide-react"

interface CompanyProfileCardProps {
  company: CompanyProfile
  onEdit: () => void
}

export function CompanyProfileCard({ company, onEdit }: CompanyProfileCardProps) {
  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-6 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-5">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-orange-50 dark:bg-slate-800 text-accent flex items-center justify-center font-black text-xl border border-orange-200/60 shrink-0">
            <Building2 className="size-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-xl font-extrabold text-foreground">{company.name}</h2>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase flex items-center gap-0.5">
                <ShieldCheck className="size-3" />
                {company.verificationStatus}
              </span>
            </div>
            <span className="text-xs font-semibold text-accent block">{company.industry}</span>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="bg-slate-900 hover:bg-slate-800 text-white h-9 rounded-xl font-bold text-xs cursor-pointer shrink-0 border-0"
        >
          <Edit2 className="size-3.5 mr-1.5" />
          Edit Company Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-border/40">
          <Users className="size-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Company Size</span>
            <p className="font-bold text-slate-700 dark:text-slate-200">{company.companySize}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-border/40">
          <MapPin className="size-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Headquarters</span>
            <p className="font-bold text-slate-700 dark:text-slate-200">{company.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-border/40">
          <Globe className="size-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Official Website</span>
            <a href={company.website} target="_blank" rel="noreferrer" className="font-bold text-accent hover:underline">
              {company.website}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-border/40">
          <Mail className="size-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Contact Email</span>
            <p className="font-bold text-slate-700 dark:text-slate-200">{company.contactEmail}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-border/30">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company Description</span>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {company.description}
        </p>
      </div>
    </Card>
  )
}
