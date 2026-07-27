export type UserRole = "Student" | "Mentor" | "Employer" | "Admin"

export type AccountStatus = "Active" | "Suspended" | "Pending"

export interface UserAccount {
  id: string
  name: string
  email: string
  role: UserRole
  registrationDate: string
  status: AccountStatus
  avatar?: string
  organizationOrProgramme?: string
}

export interface MentorVerification {
  id: string
  mentorId: string
  mentorName: string
  email: string
  company: string
  experienceYears: number
  expertise: string[]
  status: "Pending Review" | "Approved" | "Rejected" | "Needs Information"
  submittedDate: string
  credentialsUrl?: string
}

export interface EmployerVerification {
  id: string
  employerId: string
  companyName: string
  industry: string
  companySize: string
  location: string
  status: "Pending" | "Review" | "Verified" | "Rejected"
  submittedDate: string
  documentsUrl?: string
}

export interface OpportunityApproval {
  id: string
  companyName: string
  title: string
  type: "INTERNSHIP" | "GRADUATE_PROGRAM" | "FULL_TIME" | "CONTRACT"
  status: "Pending" | "Approved" | "Rejected" | "Archived"
  submittedDate: string
  applicantCount: number
  location: string
}

export interface Partnership {
  id: string
  partnerName: string
  partnerType: "University" | "Company" | "Training Partner" | "Sponsor"
  status: "Active" | "Inactive" | "Pending"
  contactPerson: string
  contactEmail: string
  joinedDate: string
}

export interface PlatformAnalytics {
  totalStudents: number
  activeMentors: number
  verifiedEmployers: number
  activeOpportunities: number
  successfulPlacements: number
  pendingReviews: number
  averageStudentReadiness: number
  employmentRate: number
  sessionsCompleted: number
  topDemandedSkills: { skill: string; count: number }[]
}

export interface AdminReport {
  id: string
  title: string
  type: "Student Progress" | "Employment Outcome" | "Mentorship Activity" | "Employer Engagement"
  generatedDate: string
  status: "Ready" | "Generating"
  summary: string
  recordCount: number
}

export interface PlatformAnnouncement {
  id: string
  title: string
  message: string
  audience: "All Users" | "Students" | "Mentors" | "Employers"
  date: string
  type: "Platform Update" | "Career Event" | "Training Opportunity" | "Maintenance Notice"
  author: string
}

export interface AdminSettings {
  emailAlerts: boolean
  autoApprovalThreshold: number
  platformMaintenanceMode: boolean
  securityAuditLogging: boolean
  requireMentorCredentialUpload: boolean
  requireEmployerDocUpload: boolean
}
