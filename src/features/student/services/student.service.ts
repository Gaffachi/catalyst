import { CombinedStudentProfile, PortfolioProject, MentorshipSession } from "../types/student.types"
import { mockStudentProfile, mockProjects, mockApplications, mockMentorSessions } from "./mockData"

// Client services queries API simulator for student dashboard overview panel
export class StudentService {
  static async getProfile(): Promise<CombinedStudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      ...mockStudentProfile,
      portfolio: [...mockProjects],
      applications: [...mockApplications],
      mentorSessions: [...mockMentorSessions],
    }
  }

  static async addProject(project: Omit<PortfolioProject, "id" | "mentorReviewStatus">): Promise<CombinedStudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newProj: PortfolioProject = {
      id: `proj-${Math.random().toString(36).substr(2, 9)}`,
      mentorReviewStatus: "Pending",
      ...project,
    }
    mockProjects.push(newProj)
    return this.getProfile()
  }

  static async bookSession(session: Omit<MentorshipSession, "id" | "status">): Promise<CombinedStudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newSession: MentorshipSession = {
      id: `sess-${Math.random().toString(36).substr(2, 9)}`,
      status: "Scheduled",
      ...session,
    }
    mockMentorSessions.push(newSession)
    return this.getProfile()
  }
}
