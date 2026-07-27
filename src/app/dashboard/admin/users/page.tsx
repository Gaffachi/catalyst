"use client"

import * as React from "react"
import { UserManagementService } from "@/features/admin/services/user-management.service"
import { UserAccount, AccountStatus } from "@/features/admin/types/admin.types"
import { UserTable } from "@/features/admin/components/UserTable"
import { Loader2 } from "lucide-react"

export default function UserManagementPage() {
  const [users, setUsers] = React.useState<UserAccount[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadUsers = React.useCallback(async () => {
    try {
      const data = await UserManagementService.getUsers()
      setUsers(data)
    } catch (err) {
      console.error("Failed to load users:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleUpdateStatus = async (id: string, status: AccountStatus) => {
    const updated = await UserManagementService.updateUserStatus(id, status)
    setUsers(updated)
  }

  if (isLoading && users.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading platform user accounts...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Platform User Management
        </h1>
        <p className="text-xs text-muted-foreground">
          Governance directory of all registered Students, Mentors, Employers, and Administrators.
        </p>
      </div>

      <UserTable users={users} onUpdateStatus={handleUpdateStatus} />
    </div>
  )
}
