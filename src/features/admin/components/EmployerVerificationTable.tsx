import * as React from "react"
import { EmployerVerification } from "../types/admin.types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, FileText } from "lucide-react"

interface EmployerVerificationTableProps {
  verifications: EmployerVerification[]
  onUpdateStatus: (id: string, status: EmployerVerification["status"]) => void
}

export function EmployerVerificationTable({ verifications, onUpdateStatus }: EmployerVerificationTableProps) {
  const getStatusBadge = (status: EmployerVerification["status"]) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-bold text-[10px]">Verified Employer</Badge>
      case "Review":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 font-bold text-[10px]">Under Review</Badge>
      case "Pending":
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100 font-bold text-[10px]">Pending Docs</Badge>
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
              <th className="p-3.5">Company Enterprise</th>
              <th className="p-3.5">Industry & Scale</th>
              <th className="p-3.5">Corporate Documents</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20 font-medium">
            {verifications.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3.5">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">{item.companyName}</span>
                    <span className="text-[10px] text-muted-foreground block">{item.location}</span>
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="font-bold text-slate-700 dark:text-slate-200 block">{item.industry}</span>
                  <span className="text-[10px] text-slate-400 block">{item.companySize}</span>
                </td>
                <td className="p-3.5">
                  {item.documentsUrl ? (
                    <a href={item.documentsUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline font-bold text-[10px] flex items-center gap-1">
                      <FileText className="size-3" />
                      View Registration Docs
                    </a>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">No docs uploaded</span>
                  )}
                </td>
                <td className="p-3.5">{getStatusBadge(item.status)}</td>
                <td className="p-3.5 text-right space-x-1">
                  {item.status !== "Verified" && (
                    <Button
                      onClick={() => onUpdateStatus(item.id, "Verified")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 px-2.5 rounded-lg font-bold text-[10px] cursor-pointer border-0"
                    >
                      <CheckCircle2 className="size-3 mr-1" />
                      Verify Employer
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
