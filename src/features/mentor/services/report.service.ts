import { mockStudents, mockPortfolioReviews, mockMentorshipSessions } from "./mockData"

export interface MentorReportMetrics {
  totalStudents: number
  activeStudents: number
  completedStudents: number
  
  totalReviews: number
  approvedReviews: number
  approvalRate: number // percentage
  
  totalSessions: number
  completedSessions: number
  cancelledSessions: number
  
  averageReadiness: number
  averageFeedbackRating: number // mock 1-5 scale rating
}

export class ReportService {
  static async getReportMetrics(): Promise<MentorReportMetrics> {
    await new Promise((resolve) => setTimeout(resolve, 250))

    const totalStudents = mockStudents.length
    const activeStudents = mockStudents.filter((s) => s.mentorshipStatus === "Active").length
    const completedStudents = mockStudents.filter((s) => s.mentorshipStatus === "Completed").length

    const totalReviews = mockPortfolioReviews.length
    const approvedReviews = mockPortfolioReviews.filter((r) => r.status === "Verified").length
    const approvalRate = totalReviews > 0 ? Math.round((approvedReviews / totalReviews) * 100) : 0

    const totalSessions = mockMentorshipSessions.length
    const completedSessions = mockMentorshipSessions.filter((s) => s.status === "Completed").length
    const cancelledSessions = mockMentorshipSessions.filter((s) => s.status === "Cancelled").length

    const totalReadiness = mockStudents.reduce((sum, s) => sum + s.readinessScore, 0)
    const averageReadiness = totalStudents > 0 ? Math.round(totalReadiness / totalStudents) : 0

    return {
      totalStudents,
      activeStudents,
      completedStudents,
      totalReviews,
      approvedReviews,
      approvalRate,
      totalSessions,
      completedSessions,
      cancelledSessions,
      averageReadiness,
      averageFeedbackRating: 4.8 // Seeded consistent rating
    }
  }
}
