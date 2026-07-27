export interface MentorAnalytics {
  totalStudents: number
  activeSessions: number
  completedSessions: number
  portfoliosReviewed: number
  assessmentsGiven: number
  avgStudentReadinessImprovement: number
  topSkillsCoached: { skill: string; count: number }[]
  sessionsByMonth: { month: string; count: number }[]
}
