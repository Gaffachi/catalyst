import * as React from "react"
import { UserAccount, UserRole, AccountStatus } from "../types/admin.types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Search } from "lucide-react"

interface UserTableProps {
  users: UserAccount[]
  onUpdateStatus: (id: string, status: AccountStatus) => void
}

export function UserTable({ users, onUpdateStatus }: UserTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState<UserRole | "ALL">("ALL")
  const [statusFilter, setStatusFilter] = React.useState<AccountStatus | "ALL">("ALL")

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter
    const matchesStatus = statusFilter === "ALL" || u.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "Student":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-bold text-[10px]">Student</Badge>
      case "Mentor":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-bold text-[10px]">Mentor</Badge>
      case "Employer":
        return <Badge className="bg-orange-50 text-accent border-orange-200 font-bold text-[10px]">Employer</Badge>
      case "Admin":
        return <Badge className="bg-slate-900 text-white font-bold text-[10px]">Admin</Badge>
    }
  }

  const getStatusBadge = (status: AccountStatus) => {
    switch (status) {
      case "Active":
        return <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">Active</span>
      case "Suspended":
        return <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 uppercase">Suspended</span>
      case "Pending":
        return <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 uppercase">Pending</span>
    }
  }

  return (
    <div className="space-y-4 select-none">
      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 border border-border/60 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by user name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs w-full bg-background border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
          className="h-8 text-xs w-full bg-background border border-slate-200 rounded-lg px-2 focus:outline-none"
        >
          <option value="ALL">All Roles</option>
          <option value="Student">Student</option>
          <option value="Mentor">Mentor</option>
          <option value="Employer">Employer</option>
          <option value="Admin">Admin</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="h-8 text-xs w-full bg-background border border-slate-200 rounded-lg px-2 focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-border/60 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-border/40 text-[10px] uppercase font-bold text-slate-400">
              <tr>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Registered</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 font-medium">
              {filteredUsers.slice(0, 15).map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-100 block">{user.name}</span>
                      <span className="text-[10px] text-muted-foreground block">{user.email}</span>
                    </div>
                  </td>
                  <td className="p-3.5">{getRoleBadge(user.role)}</td>
                  <td className="p-3.5 text-slate-500 font-semibold text-[11px]">{user.registrationDate}</td>
                  <td className="p-3.5">{getStatusBadge(user.status)}</td>
                  <td className="p-3.5 text-right">
                    {user.status === "Active" ? (
                      <Button
                        onClick={() => onUpdateStatus(user.id, "Suspended")}
                        variant="ghost"
                        className="h-7 text-[10px] text-rose-600 hover:bg-rose-50 font-bold cursor-pointer"
                      >
                        <XCircle className="size-3 mr-1" />
                        Suspend
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onUpdateStatus(user.id, "Active")}
                        variant="ghost"
                        className="h-7 text-[10px] text-emerald-600 hover:bg-emerald-50 font-bold cursor-pointer"
                      >
                        <CheckCircle2 className="size-3 mr-1" />
                        Activate
                      </Button>
                    )}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground italic text-xs">
                    No users found matching query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
