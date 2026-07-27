import { mockOpportunities, mockApplications, mockInterviews, mockCandidates } from "./mockData"
import { RecruitmentAnalytics } from "../types/employer.types"

export class AnalyticsService {
  static async getAnalytics(): Promise<RecruitmentAnalytics> {
    return new Promise((resolve) => {
      const activeOpps = mockOpportunities.filter((o) => o.status === "Active").length
      const totalApplicants = mockApplications.length
      const shortlisted = mockApplications.filter((a) => a.stage === "Shortlisted" || a.stage === "Interview" || a.stage === "Offer" || a.stage === "Hired").length
      const interviews = mockInterviews.filter((i) => i.status === "Scheduled" || i.status === "Completed").length
      const offers = mockApplications.filter((a) => a.stage === "Offer").length
      const placements = mockApplications.filter((a) => a.stage === "Hired").length

      const totalReadiness = mockCandidates.reduce((acc, curr) => acc + curr.readinessScore, 0)
      const avgReadiness = Math.round(totalReadiness / (mockCandidates.length || 1))

      const analytics: RecruitmentAnalytics = {
        activeOpportunities: activeOpps,
        totalApplicants,
        shortlistedCandidates: shortlisted,
        scheduledInterviews: interviews,
        offersSent: offers,
        successfulPlacements: placements,
        averageCandidateReadiness: avgReadiness,
        hiringConversionRate: Math.round((placements / (totalApplicants || 1)) * 100),
        topRequestedSkills: [
          { skill: "React", count: 18 },
          { skill: "TypeScript", count: 15 },
          { skill: "Python", count: 14 },
          { skill: "Node.js", count: 12 },
          { skill: "PostgreSQL", count: 10 },
          { skill: "Docker", count: 8 },
        ],
      }
      setTimeout(() => resolve(analytics), 150)
    })
  }
}
