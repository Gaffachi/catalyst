"use client"

import { CombinedStudentProfile } from "../types/student.types"

export function useCareerProgress(profile: CombinedStudentProfile | null) {
  if (!profile) {
    return {
      appliedCount: 0,
      interviewCount: 0,
      acceptedCount: 0,
      skillsCount: 0,
      projectsCount: 0,
      nextSession: null,
    }
  }

  const appliedCount = profile.applications.filter((a) => a.status === "Applied" || a.status === "Under Review").length
  const interviewCount = profile.applications.filter((a) => a.status === "Interview").length
  const acceptedCount = profile.applications.filter((a) => a.status === "Offer").length
  const skillsCount = profile.skills.length
  const projectsCount = profile.portfolio.length

  const nextSession = profile.mentorSessions.find((s) => s.status === "Scheduled") || null

  return {
    appliedCount,
    interviewCount,
    acceptedCount,
    skillsCount,
    projectsCount,
    nextSession,
  }
}
