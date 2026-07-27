export type UserRole = "student" | "mentor" | "employer" | "admin"

export type OpportunityType = "INTERNSHIP" | "GRADUATE_PROGRAM" | "FULL_TIME" | "CONTRACT"

export type CareerStatus = 
  | "Exploring career opportunities"
  | "Seeking internship"
  | "Seeking graduate employment"
  | "Open to full-time roles"
  | "Currently employed"

export interface Skill {
  name: string
  level: number // percentage e.g. 85
  category: "Frontend" | "Backend" | "Database" | "Cloud" | "Networking"
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  status: "In Progress" | "Completed"
  mentorReviewStatus: "Pending" | "Verified" | "Needs Adjustment"
}

export interface Opportunity {
  id: string
  company: string
  companyName?: string // for compatibility
  title: string
  role?: string // for compatibility
  type: OpportunityType
  location: string
  workMode: "Remote" | "Hybrid" | "On-site"
  requiredSkills: string[]
  description: string
  deadline: string
  experienceLevel: string
  matchScore: number
  applicationStatus: "Apply Now" | "Applied" | "Under Review" | "Assessment" | "Interview" | "Offer" | "Accepted" | "Rejected"
  applied: boolean
}

// Keep Internship mapping for backward compatibility
export type Internship = Opportunity

export interface Application {
  id: string
  companyName: string
  role: string
  appliedDate: string
  status: "Applied" | "Under Review" | "Assessment" | "Interview" | "Offer" | "Accepted" | "Rejected"
  opportunityType: OpportunityType
}

export interface MentorshipSession {
  id: string
  mentorName: string
  expertise: string
  company: string
  date: string
  time: string
  status: "Scheduled" | "Completed" | "Cancelled"
  feedbackNotes?: string
}

export interface StudentProfile {
  id: string
  name: string
  email: string
  phone: string
  location: string
  programme: string
  institution: string
  level: string
  graduationYear: string
  bio: string
  skills: Skill[]
  careerGoals: string[]
  preferredIndustries: string[]
  certifications: string[]
  achievements: string[]
  resumeUrl?: string
  readinessScore: number
  profileCompletion: number
  
  // Employment Enhancements
  careerStatus: CareerStatus
  preferredJobTypes: string[]
  preferredWorkModes: string[]
  preferredLocations: string[]
  availabilityDate: string
  allowEmployerDiscovery: boolean
}

export interface CombinedStudentProfile extends StudentProfile {
  portfolio: PortfolioProject[]
  applications: Application[]
  mentorSessions: MentorshipSession[]
}
