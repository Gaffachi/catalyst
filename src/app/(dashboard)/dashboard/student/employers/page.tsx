"use client"

import * as React from "react"
import { StudentEmployerDirectoryService } from "@/features/student/services/employer-directory.service"
import { EmployerDirectoryCard } from "@/features/student/components/EmployerDirectoryCard"
import { Loader2 } from "lucide-react"

interface DirectoryEmployerItem {
  id: string
  employerId: string
  companyName: string
  industry: string
  companySize: string
  location: string
  status: "Pending" | "Review" | "Verified" | "Rejected"
  submittedDate: string
  openPositions: number
  description: string
}

export default function StudentEmployerDirectoryPage() {
  const [employers, setEmployers] = React.useState<DirectoryEmployerItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadEmployers = React.useCallback(async () => {
    try {
      const data = await StudentEmployerDirectoryService.getEmployers()
      setEmployers(data)
    } catch (err) {
      console.error("Failed to load partner employer directory:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadEmployers()
  }, [loadEmployers])

  if (isLoading && employers.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading verified employer corporate directory...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Partner Employers & Corporate Directory
        </h1>
        <p className="text-xs text-muted-foreground">
          Discover verified tech enterprises, multinational AI labs, and fintech companies recruiting Catalyst graduates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {employers.map((emp) => (
          <EmployerDirectoryCard key={emp.id} employer={emp} />
        ))}
      </div>
    </div>
  )
}
