"use client"

import * as React from "react"
import { CombinedStudentProfile, PortfolioProject } from "../types/student.types"
import { StudentService } from "../services/student.service"

export function useStudentProfile() {
  const [profile, setProfile] = React.useState<CombinedStudentProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchProfile = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await StudentService.getProfile()
      setProfile(data)
    } catch (err) {
      console.error("Failed to load student profile:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const addProject = async (project: Omit<PortfolioProject, "id" | "mentorReviewStatus">) => {
    setIsLoading(true)
    try {
      const updated = await StudentService.addProject(project)
      setProfile(updated)
    } catch (err) {
      console.error("Failed to add project:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const bookSession = async (session: { mentorName: string; expertise: string; company: string; date: string; time: string; feedbackNotes: string }) => {
    setIsLoading(true)
    try {
      const updated = await StudentService.bookSession(session)
      setProfile(updated)
    } catch (err) {
      console.error("Failed to book session:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    profile,
    isLoading,
    addProject,
    bookSession,
    refreshProfile: fetchProfile,
  }
}
