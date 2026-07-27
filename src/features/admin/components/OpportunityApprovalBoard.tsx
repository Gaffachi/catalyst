import * as React from "react"
import { OpportunityApproval } from "../types/admin.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Archive, Building2, MapPin, Users } from "lucide-react"

interface OpportunityApprovalBoardProps {
  approvals: OpportunityApproval[]
  onUpdateStatus: (id: string, status: OpportunityApproval["status"]) => void
}

export function OpportunityApprovalBoard({ approvals, onUpdateStatus }: OpportunityApprovalBoardProps) {
  const getTypeBadge = (type: OpportunityApproval["type"]) => {
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

  const getStatusBadge = (status: OpportunityApproval["status"]) => {
    switch (status) {
      case "Approved":
        return <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">Approved</span>
      case "Pending":
        return <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 uppercase">Pending Approval</span>
      case "Rejected":
        return <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 uppercase">Rejected</span>
      case "Archived":
        return <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 uppercase">Archived</span>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
      {approvals.map((item) => (
        <Card key={item.id} className="p-5 border border-border/60 bg-card shadow-sm hover:shadow transition-shadow space-y-4">
          <div className="flex justify-between items-start border-b border-border/30 pb-3 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {getTypeBadge(item.type)}
                {getStatusBadge(item.status)}
              </div>
              <h3 className="font-heading text-base font-extrabold text-slate-850 dark:text-slate-100">
                {item.title}
              </h3>
              <span className="text-xs text-accent font-bold flex items-center gap-1">
                <Building2 className="size-3.5 text-slate-400" />
                {item.companyName}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-semibold bg-slate-50/50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <MapPin className="size-3 text-slate-400" />
              {item.location}
            </span>
            <span className="flex items-center gap-1 justify-end">
              <Users className="size-3 text-slate-400" />
              {item.applicantCount} Applicants
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-border/20">
            {item.status !== "Approved" && (
              <Button
                onClick={() => onUpdateStatus(item.id, "Approved")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 px-3 rounded-lg font-bold text-[10px] cursor-pointer border-0"
              >
                <CheckCircle2 className="size-3 mr-1" />
                Approve Listing
              </Button>
            )}

            {item.status !== "Rejected" && (
              <Button
                onClick={() => onUpdateStatus(item.id, "Rejected")}
                variant="ghost"
                className="h-7 px-2.5 text-[10px] text-rose-600 hover:bg-rose-50 font-bold cursor-pointer"
              >
                <XCircle className="size-3 mr-1" />
                Reject
              </Button>
            )}

            {item.status !== "Archived" && (
              <Button
                onClick={() => onUpdateStatus(item.id, "Archived")}
                variant="outline"
                className="h-7 px-2.5 rounded-lg font-bold text-[10px] text-slate-600 border-slate-200 cursor-pointer"
              >
                <Archive className="size-3 mr-1" />
                Archive
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
