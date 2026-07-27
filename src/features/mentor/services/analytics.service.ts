import { MentorAnalytics } from "../types/analytics.types"

const mockMentorAnalytics: MentorAnalytics = {
  totalStudents: 14,
  activeSessions: 6,
  completedSessions: 38,
  portfoliosReviewed: 19,
  assessmentsGiven: 24,
  avgStudentReadinessImprovement: 28, // +28% readiness gain
  topSkillsCoached: [
    { skill: "React & Next.js Architecture", count: 18 },
    { skill: "System Design & APIs", count: 14 },
    { skill: "TypeScript & State Management", count: 12 },
    { skill: "Technical Behavioral Interviews", count: 10 },
  ],
  sessionsByMonth: [
    { month: "Apr", count: 6 },
    { month: "May", count: 9 },
    { month: "Jun", count: 11 },
    { month: "Jul", count: 12 },
  ],
}

export class MentorAnalyticsService {
  static async getAnalytics(): Promise<MentorAnalytics> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...mockMentorAnalytics }), 150)
    })
  }
}
