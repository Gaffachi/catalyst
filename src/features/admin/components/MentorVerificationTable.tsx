import * as React from "react"
import { MentorVerification } from "../types/admin.types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react"

interface MentorVerificationTableProps {
  verifications: MentorVerification[]
  onUpdateStatus: (id: string, status: MentorVerification["status"]) => void
}

export function MentorVerificationTable({ verifications, onUpdateStatus }: MentorVerificationTableProps) {
  const getStatusBadge = (status: MentorVerification["status"]) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-bold text-[10px]">Approved</Badge>
      case "Pending Review":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 font-bold text-[10px]">Pending Review</Badge>
      case "Needs Information":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50 font-bold text-[10px]">Needs Info</Badge>
      case "Rejected":
        return <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50 font-bold text-[10px]">Rejected</Badge>
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-border/60 rounded-2xl shadow-sm overflow-hidden select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-border/40 text-[10px] uppercase font-bold text-slate-400">
            <tr>
              <th className="p-3.5">Mentor Candidate</th>
              <th className="p-3.5">Company & Experience</th>
              <th className="p-3.5">Expertise Domains</th>
              <th className="p-3.5">Verification Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20 font-medium">
            {verifications.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3.5">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">{item.mentorName}</span>
                    <span className="text-[10px] text-muted-foreground block">{item.email}</span>
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="font-bold text-slate-700 dark:text-slate-200 block">{item.company}</span>
                  <span className="text-[10px] text-slate-400 block">{item.experienceYears} Years Exp</span>
                </td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {item.expertise.map((ex) => (
                      <span key={ex} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-[9px] font-bold rounded">
                        {ex}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3.5">{getStatusBadge(item.status)}</td>
                <td className="p-3.5 text-right space-x-1">
                  {item.status !== "Approved" && (
                    <Button
                      onClick={() => onUpdateStatus(item.id, "Approved")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 px-2.5 rounded-lg font-bold text-[10px] cursor-pointer border-0"
                    >
                      <CheckCircle2 className="size-3 mr-1" />
                      Approve
                    </Button>
                  )}
                  {item.status !== "Needs Information" && (
                    <Button
                      onClick={() => onUpdateStatus(item.id, "Needs Information")}
                      variant="outline"
                      className="h-7 px-2.5 rounded-lg font-bold text-[10px] text-purple-700 border-purple-200 bg-purple-50/40 cursor-pointer"
                    >
                      <HelpCircle className="size-3 mr-1" />
                      Request Info
                    </Button>
                  )}
                  {item.status !== "Rejected" && (
                    <Button
                      onClick={() => onUpdateStatus(item.id, "Rejected")}
                      variant="ghost"
                      className="h-7 px-2 text-[10px] text-rose-600 hover:bg-rose-50 font-bold cursor-pointer"
                    >
                      <XCircle className="size-3 mr-1" />
                      Reject
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
