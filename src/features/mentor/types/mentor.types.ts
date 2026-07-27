export interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  programme: string
  readinessScore: number
  employmentGoal: string
  portfolioStatus: "Pending" | "Verified" | "Needs Adjustment" | "Unsubmitted"
  currentApplications: number
  mentorshipStatus: "Active" | "Inactive" | "Completed"
}

export interface PortfolioReview {
  id: string
  studentId: string
  studentName: string
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  submissionDate: string
  status: "Pending" | "Verified" | "Needs Adjustment" | "Rejected"
  comments?: string
  ratings?: {
    technicalSkills: number // 1-10
    architecture: number // 1-10
    documentation: number // 1-10
    problemSolving: number // 1-10
    innovation: number // 1-10
  }
  overallScore?: number // percentage
}

export interface CareerAssessment {
  id: string
  studentId: string
  studentName: string
  date: string
  ratings: {
    technicalSkills: number // percentage
    communication: number
    problemSolving: number
    professionalism: number
    teamwork: number
    leadership: number
    timeManagement: number
    portfolioQuality: number
  }
  overallReadiness: number // calculated average
  notes?: string
}

export interface MentorshipSession {
  id: string
  studentId: string
  studentName: string
  date: string
  time: string
  topic: string
  duration: string // e.g. "45 Mins"
  status: "Upcoming" | "Completed" | "Cancelled"
  notes?: string
}

export interface MentorAvailability {
  availableDays: string[] // e.g. ["Monday", "Wednesday"]
  workingHours: { start: string; end: string }
  breaks: { start: string; end: string }[]
  unavailableDates: string[]
  timezone: string
}

export interface MentorProfile {
  name: string
  bio: string
  industry: string
  specialization: string
  experienceYears: number
  company: string
  skills: string[]
  linkedinUrl?: string
  githubUrl?: string
  expertiseAreas: string[]
  avatarUrl?: string
}

export interface MentorSettings {
  notifications: {
    email: boolean
    browser: boolean
    sessions: boolean
  }
  profileVisibility: "public" | "internal" | "private"
  availabilityPreferences: {
    minNoticeHours: number
    maxSessionsPerDay: number
  }
  theme: "light" | "dark" | "system"
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  recipientId: string
  content: string
  timestamp: string
  isUnread: boolean
  attachmentUrl?: string
}
