import { Student, PortfolioReview, CareerAssessment, MentorshipSession, MentorAvailability, MentorProfile, MentorSettings, Message } from "../types/mentor.types"

// Arrays for generating realistic Ghanaian/African and international names
const STUDENT_NAMES = [
  "Alex Mensah", "Grace Hanson", "Kofi Boateng", "Ama Osei", "Kwame Asare",
  "Abena Bonsu", "Yaw Frimpong", "Ekow Taylor", "Araba Baiden", "Jojo Acquah",
  "Esme Addo", "Kelvin Geller", "Derrick Opoku", "Sandra Appiah", "Michael Ofori",
  "Eunice Antwi", "Prince Agyeman", "Naa Lomotey", "David Quartey", "Cynthia Koomson",
  "Emmanuel Owusu", "Mercy Gyamfi", "Josephine Mensah", "Selorm Adzo", "Bright Kodzo"
]

const PROGRAMMES = [
  "MSc Information Technology", "BSc Computer Science", "BSc Computer Engineering",
  "MSc Software Engineering", "BSc Data Science", "MSc Database Administration"
]

const CAREER_GOALS = [
  "Software Engineer", "Database Administrator", "System Analyst", "DevOps Engineer",
  "Frontend Developer", "Backend Developer", "Cloud Architect"
]

const TECH_STACKS = [
  ["React", "Node.js", "SQL"],
  ["Python", "Algorithms", "Go"],
  ["React", "TypeScript", "SQL"],
  ["Linux", "AWS", "Python"],
  ["Docker", "Kubernetes", "AWS"],
  ["Next.js", "PostgreSQL", "Node.js"]
]

// 1. Generate Mentor Profile
export const mockMentorProfile: MentorProfile = {
  name: "Sarah Johnson",
  bio: "Senior Software Engineer at Google Ghana. Passionate about system scalability, database structures optimization, and mentoring next-gen developers.",
  industry: "Software Engineering & Cloud Infrastructure",
  specialization: "Distributed Systems & Scalability",
  experienceYears: 8,
  company: "Google Ghana",
  skills: ["Distributed Systems", "Go", "Python", "Kubernetes", "PostgreSQL", "Cloud Architecture"],
  linkedinUrl: "https://linkedin.com/in/sarah-johnson-google",
  githubUrl: "https://github.com/sarah-johnson",
  expertiseAreas: ["Backend Development", "System Design", "Cloud Infrastructure", "Career Coaching"],
  avatarUrl: undefined // Defaults to avatar initials
}

// 2. Generate Default Availability
export const mockMentorAvailability: MentorAvailability = {
  availableDays: ["Monday", "Wednesday", "Friday"],
  workingHours: { start: "09:00", end: "17:00" },
  breaks: [
    { start: "12:00", end: "13:00" }
  ],
  unavailableDates: ["2026-08-10", "2026-09-01"],
  timezone: "GMT (Accra)"
}

// 3. Generate Default Settings
export const mockMentorSettings: MentorSettings = {
  notifications: {
    email: true,
    browser: true,
    sessions: true
  },
  profileVisibility: "internal",
  availabilityPreferences: {
    minNoticeHours: 24,
    maxSessionsPerDay: 4
  },
  theme: "system"
}

// 4. Generate 25 assigned students
export const mockStudents: Student[] = STUDENT_NAMES.map((name, index) => {
  const readinessBase = 60 + (index * 7) % 36 // Random score between 60 and 95
  const statuses: Student["portfolioStatus"][] = ["Verified", "Pending", "Needs Adjustment", "Unsubmitted"]
  const mentorshipStatuses: Student["mentorshipStatus"][] = ["Active", "Inactive", "Completed"]
  
  return {
    id: `student-${index + 1}`,
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@catalyst.edu`,
    programme: PROGRAMMES[index % PROGRAMMES.length],
    readinessScore: readinessBase,
    employmentGoal: CAREER_GOALS[index % CAREER_GOALS.length],
    portfolioStatus: index === 0 ? "Pending" : statuses[index % statuses.length],
    currentApplications: (index * 3) % 6,
    mentorshipStatus: mentorshipStatuses[index % mentorshipStatuses.length]
  }
})

// 5. Generate 50 Portfolio Reviews
export const mockPortfolioReviews: PortfolioReview[] = Array.from({ length: 50 }).map((_, index) => {
  const student = mockStudents[index % mockStudents.length]
  const title = `Project ${index + 1}: ${student.employmentGoal} Case Study`
  const statuses: PortfolioReview["status"][] = ["Verified", "Pending", "Needs Adjustment", "Rejected"]
  const reviewStatus = index === 0 ? "Pending" : statuses[index % statuses.length]
  
  const tech = TECH_STACKS[index % TECH_STACKS.length]
  
  let ratings = undefined
  let overallScore = undefined
  let comments = undefined
  
  if (reviewStatus !== "Pending") {
    const techRating = 6 + (index % 5)
    const archRating = 5 + (index % 6)
    const docRating = 6 + (index % 4)
    const probRating = 7 + (index % 3)
    const innovRating = 5 + (index % 5)
    
    ratings = {
      technicalSkills: techRating,
      architecture: archRating,
      documentation: docRating,
      problemSolving: probRating,
      innovation: innovRating
    }
    
    overallScore = Math.round(((techRating + archRating + docRating + probRating + innovRating) / 50) * 100)
    comments = `Good demonstration of ${tech[0]}. Follow up on DB indexing configurations and refactor routing modules.`
  }

  return {
    id: `review-${index + 1}`,
    studentId: student.id,
    studentName: student.name,
    title,
    description: `A responsive web backend or system API solving localized department placement tracking. Built using ${tech.join(", ")}.`,
    techStack: tech,
    githubUrl: `https://github.com/student-${index + 1}/project-${index + 1}`,
    liveUrl: index % 2 === 0 ? `https://demo-project-${index + 1}.vercel.app` : undefined,
    submissionDate: new Date(2026, 6, 20 - (index % 15)).toISOString().split("T")[0],
    status: reviewStatus,
    comments,
    ratings,
    overallScore
  }
})

// 6. Generate 40 Mentorship Sessions
export const mockMentorshipSessions: MentorshipSession[] = Array.from({ length: 40 }).map((_, index) => {
  const student = mockStudents[index % mockStudents.length]
  const topics = [
    "Portfolio Repository Auditing", "Database Schema Tuning Questions", 
    "Mock System Design Interview", "Career Readiness Score Evaluation",
    "CV Review & Marketplace Prep", "Docker Orchestration Basics"
  ]
  const statuses: MentorshipSession["status"][] = ["Upcoming", "Completed", "Cancelled"]
  const sessionStatus = statuses[index % statuses.length]
  
  // Date scheduling spread
  const dateOffset = (index - 20) * 2 // spread dates in the past & future
  const sessDate = new Date()
  sessDate.setDate(sessDate.getDate() + dateOffset)
  
  const timeSlots = ["10:00 AM GMT", "11:30 AM GMT", "2:00 PM GMT", "3:30 PM GMT"]

  return {
    id: `session-${index + 1}`,
    studentId: student.id,
    studentName: student.name,
    date: sessDate.toISOString().split("T")[0],
    time: timeSlots[index % timeSlots.length],
    topic: topics[index % topics.length],
    duration: index % 3 === 0 ? "60 Mins" : "45 Mins",
    status: sessionStatus,
    notes: sessionStatus === "Completed" ? "Alex completed his portfolio updates. Advised him to prepare for mock REST API questions." : undefined
  }
})

// 7. Generate 30 Career Assessments
export const mockCareerAssessments: CareerAssessment[] = Array.from({ length: 30 }).map((_, index) => {
  const student = mockStudents[index % mockStudents.length]
  
  const tech = 70 + (index * 3) % 26
  const comm = 72 + (index * 5) % 24
  const prob = 75 + (index * 2) % 21
  const prof = 80 + (index * 4) % 19
  const team = 78 + (index * 6) % 18
  const lead = 65 + (index * 7) % 28
  const timeM = 70 + (index * 9) % 25
  const port = 60 + (index * 8) % 31
  
  const overall = Math.round((tech + comm + prob + prof + team + lead + timeM + port) / 8)

  return {
    id: `assessment-${index + 1}`,
    studentId: student.id,
    studentName: student.name,
    date: new Date(2026, 6, 22 - (index % 12)).toISOString().split("T")[0],
    ratings: {
      technicalSkills: tech,
      communication: comm,
      problemSolving: prob,
      professionalism: prof,
      teamwork: team,
      leadership: lead,
      timeManagement: timeM,
      portfolioQuality: port
    },
    overallReadiness: overall,
    notes: `Student demonstrates solid foundation. Focus on expanding ${student.employmentGoal} coding tasks.`
  }
})

// 8. Messages Seed
export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "student-1",
    senderName: "Alex Mensah",
    recipientId: "mentor-sarah",
    content: "Hi Sarah, I updated the PostgreSQL schema for the campus placement system as you advised. Can you take a look?",
    timestamp: "2026-07-23T14:30:00Z",
    isUnread: true
  },
  {
    id: "msg-2",
    senderId: "mentor-sarah",
    senderName: "Sarah Johnson",
    recipientId: "student-1",
    content: "Excellent job Alex. Let's schedule a 15-minute sync this Wednesday to verify your indexing queries.",
    timestamp: "2026-07-23T14:45:00Z",
    isUnread: false
  },
  {
    id: "msg-3",
    senderId: "student-2",
    senderName: "Grace Hanson",
    recipientId: "mentor-sarah",
    content: "Hello Sarah, I got an email about the Google EMEA graduate path. Thanks for reviewing my profile!",
    timestamp: "2026-07-22T09:15:00Z",
    isUnread: false
  }
]
