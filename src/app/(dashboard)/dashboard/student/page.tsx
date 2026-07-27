"use client"

import * as React from "react"
import { useStudentProfile } from "@/features/student/hooks/useStudentProfile"
import { DashboardHeader } from "@/features/student/components/DashboardHeader"
import { CareerScoreCard } from "@/features/student/components/CareerScoreCard"
import { ProfileCompletionCard } from "@/features/student/components/ProfileCompletionCard"
import { SkillProgressCard } from "@/features/student/components/SkillProgressCard"
import { PortfolioCard } from "@/features/student/components/PortfolioCard"
import { MentorCard } from "@/features/student/components/MentorCard"
import { ApplicationTracker } from "@/features/student/components/ApplicationTracker"
import { CareerRecommendationCard } from "@/features/student/components/CareerRecommendationCard"
import { Loader2 } from "lucide-react"

export default function StudentDashboardPage() {
  const { profile, isLoading, addProject, bookSession } = useStudentProfile()

  if (isLoading || !profile) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading student career workspace...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* 1. Welcome Banner Header */}
      <DashboardHeader 
        name={profile.name}
        programme={profile.programme}
        email={profile.email}
        bio={profile.bio}
      />

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-full">
          <CareerScoreCard score={profile.readinessScore} />
        </div>
        <div className="h-full">
          <ProfileCompletionCard completion={profile.profileCompletion} />
        </div>
        <div className="h-full">
          <SkillProgressCard skills={profile.skills.map(s => s.name)} />
        </div>
      </div>

      {/* 4. Core Workspace Elements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Codebase Portfolios */}
        <div className="lg:col-span-7 space-y-6">
          <PortfolioCard 
            portfolio={profile.portfolio}
            onAddProject={(p) => addProject({ ...p, status: "Completed" })}
          />
        </div>

        {/* Right: Advisor Consultations Scheduler */}
        <div className="lg:col-span-5 space-y-6">
          <MentorCard 
            sessions={profile.mentorSessions}
            onBookSession={bookSession}
          />
        </div>
      </div>

      {/* 5. Recommended Career Opportunities */}
      <div className="w-full">
        <CareerRecommendationCard />
      </div>

      {/* 6. Placement Application tracker board */}
      <div className="w-full">
        <ApplicationTracker applications={profile.applications} />
      </div>

    </div>
  )
}
