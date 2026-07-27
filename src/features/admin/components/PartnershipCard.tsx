import * as React from "react"
import { Partnership } from "../types/admin.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, GraduationCap, Award, Shield, User, Mail, Calendar } from "lucide-react"

interface PartnershipCardProps {
  partnership: Partnership
  onToggleStatus: (id: string, status: Partnership["status"]) => void
}

export function PartnershipCard({ partnership, onToggleStatus }: PartnershipCardProps) {
  const getTypeBadge = (type: Partnership["partnerType"]) => {
    switch (type) {
      case "University":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 font-bold text-[10px]"><GraduationCap className="size-3 mr-1" /> University</Badge>
      case "Company":
        return <Badge className="bg-orange-50 text-accent border-orange-200 hover:bg-orange-50 font-bold text-[10px]"><Building2 className="size-3 mr-1" /> Corporate Partner</Badge>
      case "Training Partner":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50 font-bold text-[10px]"><Award className="size-3 mr-1" /> Training Academy</Badge>
      case "Sponsor":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-bold text-[10px]"><Shield className="size-3 mr-1" /> Sponsor</Badge>
    }
  }

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-4 select-none">
      <div className="flex justify-between items-start border-b border-border/30 pb-3 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getTypeBadge(partnership.partnerType)}
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
              partnership.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
            }`}>
              {partnership.status}
            </span>
          </div>
          <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100">
            {partnership.partnerName}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50/50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <User className="size-3" />
            Contact Person
          </span>
          <p className="font-bold text-slate-700 dark:text-slate-200">{partnership.contactPerson}</p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <Mail className="size-3" />
            Contact Email
          </span>
          <p className="font-bold text-slate-700 dark:text-slate-200 truncate">{partnership.contactEmail}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1 border-t border-border/20">
        <span className="flex items-center gap-1">
          <Calendar className="size-3" />
          Partner Since: {partnership.joinedDate}
        </span>

        {partnership.status === "Active" ? (
          <Button
            onClick={() => onToggleStatus(partnership.id, "Inactive")}
            variant="outline"
            className="h-7 text-[10px] font-bold text-rose-600 border-rose-200 bg-rose-50/40 hover:bg-rose-50 cursor-pointer"
          >
            Deactivate Partner
          </Button>
        ) : (
          <Button
            onClick={() => onToggleStatus(partnership.id, "Active")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 font-bold text-[10px] cursor-pointer border-0"
          >
            Activate Partner
          </Button>
        )}
      </div>
    </Card>
  )
}
