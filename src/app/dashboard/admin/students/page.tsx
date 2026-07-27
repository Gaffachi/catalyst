"use client"

import * as React from "react"
import { StudentOverviewCard } from "@/features/admin/components/StudentOverviewCard"
import { Loader2 } from "lucide-react"

interface StudentMonitoringItem {
  name: string
  programme: string
  readinessScore: number
  profileCompletion: number
  applicationsCount: number
  employmentStatus: string
}

export default function StudentManagementPage() {
  const [students, setStudents] = React.useState<StudentMonitoringItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Seed student monitoring data
    const mockStudentList = [
      {
        name: "Alex Mensah",
        programme: "MSc Information Technology",
        readinessScore: 84,
        profileCompletion: 95,
        applicationsCount: 6,
        employmentStatus: "Under Interview Review",
      },
      {
        name: "Abena Owusu",
        programme: "BSc Computer Science",
        readinessScore: 91,
        profileCompletion: 100,
        applicationsCount: 8,
        employmentStatus: "Placed / Hired",
      },
      {
        name: "Kwame Boateng",
        programme: "BSc Computer Engineering",
        readinessScore: 78,
        profileCompletion: 85,
        applicationsCount: 4,
        employmentStatus: "Seeking Employment",
      },
      {
        name: "Efua Appiah",
        programme: "BSc Information Technology",
        readinessScore: 88,
        profileCompletion: 90,
        applicationsCount: 5,
        employmentStatus: "Shortlisted",
      },
      {
        name: "Kofi Sarpong",
        programme: "MSc Data Science",
        readinessScore: 82,
        profileCompletion: 88,
        applicationsCount: 3,
        employmentStatus: "Seeking Employment",
      },
    ]

    setStudents(mockStudentList)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading student cohort progress...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Student Cohort Outcomes & Governance
        </h1>
        <p className="text-xs text-muted-foreground">
          Monitor student career readiness indices, profile completion benchmarks, application volumes, and final employment placement status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((st) => (
          <StudentOverviewCard
            key={st.name}
            name={st.name}
            programme={st.programme}
            readinessScore={st.readinessScore}
            profileCompletion={st.profileCompletion}
            applicationsCount={st.applicationsCount}
            employmentStatus={st.employmentStatus}
          />
        ))}
      </div>
    </div>
  )
}
