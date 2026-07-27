export type OpportunityType = "INTERNSHIP" | "GRADUATE_PROGRAM" | "FULL_TIME" | "CONTRACT"

export type WorkMode = "On-site" | "Hybrid" | "Remote"

export type ApplicationStage = 
  | "Applied"
  | "Reviewing"
  | "Shortlisted"
  | "Assessment"
  | "Interview"
  | "Offer"
  | "Hired"
  | "Rejected"

export interface CompanyProfile {
  id: string
  name: string
  logo?: string
  industry: string
  companySize: string
  location: string
  website: string
  description: string
  verificationStatus: "Verified" | "Pending" | "Unverified"
  contactEmail: string
  contactPhone: string
}

export interface Opportunity {
  id: string
  companyId: string
  companyName: string
  title: string
  type: OpportunityType
  description: string
  requiredSkills: string[]
  experienceLevel: "Entry Level" | "Junior" | "Mid Level" | "Internship"
  location: string
  workMode: WorkMode
  deadline: string
  salaryRange: string
  applicationRequirements: string[]
  status: "Active" | "Closed" | "Draft"
  postedDate: string
  applicantCount: number
}

export interface CandidateProfile {
  id: string
  name: string
  email: string
  phone?: string
  programme: string
  university: string
  readinessScore: number
  skills: string[]
  portfolioStatus: "Verified" | "Pending" | "Needs Adjustment" | "Unsubmitted"
  projectCount: number
  mentorVerified: boolean
  location: string
  employmentGoal: string
  bio: string
  approvedMentorNotes?: string
}

export interface EmployerApplication {
  id: string
  candidateId: string
  candidateName: string
  candidateEmail: string
  opportunityId: string
  opportunityTitle: string
  opportunityType: OpportunityType
  appliedDate: string
  stage: ApplicationStage
  readinessScore: number
  resumeUrl?: string
}

export interface Interview {
  id: string
  candidateId: string
  candidateName: string
  opportunityId: string
  position: string
  date: string
  time: string
  interviewType: "Technical Screen" | "System Design" | "Behavioral / Cultural" | "Final HR"
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled"
  notes?: string
  locationOrLink: string
}

export interface RecruitmentAnalytics {
  activeOpportunities: number
  totalApplicants: number
  shortlistedCandidates: number
  scheduledInterviews: number
  offersSent: number
  successfulPlacements: number
  averageCandidateReadiness: number
  hiringConversionRate: number
  topRequestedSkills: { skill: string; count: number }[]
}

export interface EmployerSettings {
  emailNotifications: boolean
  interviewReminders: boolean
  applicantAlerts: boolean
  profileVisibility: "Public" | "Verified Employers Only" | "Private"
  companyDirectoryListed: boolean
}
