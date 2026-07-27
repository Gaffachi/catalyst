import {
  UserAccount,
  MentorVerification,
  EmployerVerification,
  OpportunityApproval,
  Partnership,
  PlatformAnalytics,
  AdminReport,
  PlatformAnnouncement,
  AdminSettings,
} from "../types/admin.types"

export const mockUsers: UserAccount[] = [
  {
    id: "usr-admin-1",
    name: "Dr. Kwesi Appiah",
    email: "k.appiah@catalyst.edu.gh",
    role: "Admin",
    registrationDate: "2026-01-15",
    status: "Active",
    organizationOrProgramme: "Department of IT Management",
  },
  {
    id: "usr-student-alex",
    name: "Alex Mensah",
    email: "alex.mensah@ug.edu.gh",
    role: "Student",
    registrationDate: "2026-03-10",
    status: "Active",
    organizationOrProgramme: "MSc Information Technology",
  },
  {
    id: "usr-mentor-sarah",
    name: "Sarah Johnson",
    email: "sarah.j@google.com",
    role: "Mentor",
    registrationDate: "2026-02-01",
    status: "Active",
    organizationOrProgramme: "Google Ghana",
  },
  {
    id: "usr-employer-hubtel",
    name: "Hubtel Ghana Recruitment",
    email: "careers@hubtel.com",
    role: "Employer",
    registrationDate: "2026-02-20",
    status: "Active",
    organizationOrProgramme: "Hubtel Ghana",
  },
]

// Generate 96 more realistic user accounts to total 100
const namesList = [
  "Abena Owusu", "Kwame Boateng", "Efua Appiah", "Kofi Sarpong", "Yaw Addo",
  "Akosua Gyasi", "Kojo Asante", "Ama Serwaa", "Kwaku Baah", "Yaa Darko",
  "Kwabena Osei", "Adwoa Mensah", "Fiifi Quansah", "Esi Tetteh", "Kobby Forson",
  "Araba Blankson", "Nii Laryea", "Naa Koshie", "Paa Kwesi", "Sena Lawson",
  "Mawuli Gbeku", "Dzidzor Kpodo", "Kekeli Amamu", "Kofi Badu", "Grace Kufuor"
]

const rolesList: UserAccount["role"][] = ["Student", "Mentor", "Employer", "Student"]
const statusesList: UserAccount["status"][] = ["Active", "Active", "Active", "Pending", "Suspended"]

for (let i = 5; i <= 100; i++) {
  const name = `${namesList[i % namesList.length]} #${i}`
  const role = rolesList[i % rolesList.length]
  const status = statusesList[i % statusesList.length]

  mockUsers.push({
    id: `usr-${i}`,
    name,
    email: `${name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@catalyst.edu.gh`,
    role,
    registrationDate: `2026-0${(i % 5) + 1}-${(i % 25) + 1}`,
    status,
    organizationOrProgramme: role === "Student" ? "BSc Computer Science" : role === "Mentor" ? "Tech Industry" : "Corporate Partner",
  })
}

export const mockMentorVerifications: MentorVerification[] = [
  {
    id: "mv-1",
    mentorId: "usr-mentor-sarah",
    mentorName: "Sarah Johnson",
    email: "sarah.j@google.com",
    company: "Google Ghana",
    experienceYears: 8,
    expertise: ["Cloud Architecture", "Backend Engineering", "System Design"],
    status: "Approved",
    submittedDate: "2026-07-01",
    credentialsUrl: "https://catalyst.edu.gh/docs/credentials-sj.pdf",
  },
  {
    id: "mv-2",
    mentorId: "usr-mentor-david",
    mentorName: "David Mentor",
    email: "david.devops@hubtel.com",
    company: "Hubtel Ghana",
    experienceYears: 6,
    expertise: ["DevOps", "Linux", "Kubernetes", "CI/CD"],
    status: "Approved",
    submittedDate: "2026-07-05",
    credentialsUrl: "https://catalyst.edu.gh/docs/credentials-dm.pdf",
  },
  {
    id: "mv-3",
    mentorId: "usr-mentor-kofi",
    mentorName: "Kofi Advisor",
    email: "k.advisor@ug.edu.gh",
    company: "University ICT Dept",
    experienceYears: 10,
    expertise: ["Academic Coordination", "Software Engineering", "Research"],
    status: "Approved",
    submittedDate: "2026-07-08",
  },
  {
    id: "mv-4",
    mentorId: "usr-mentor-patricia",
    mentorName: "Patricia Mensah",
    email: "p.mensah@paystack.com",
    company: "Paystack Africa",
    experienceYears: 5,
    expertise: ["Frontend Architecture", "React", "UX Engineering"],
    status: "Pending Review",
    submittedDate: "2026-07-20",
    credentialsUrl: "https://catalyst.edu.gh/docs/credentials-pm.pdf",
  },
  {
    id: "mv-5",
    mentorId: "usr-mentor-emmanuel",
    mentorName: "Emmanuel Quaye",
    email: "e.quaye@mtn.com.gh",
    company: "MTN Ghana",
    experienceYears: 7,
    expertise: ["Cybersecurity", "Network Security", "Compliance"],
    status: "Needs Information",
    submittedDate: "2026-07-18",
  },
]

// Seed 20 more mentor verification records to reach 25
for (let i = 6; i <= 25; i++) {
  const name = namesList[i % namesList.length]
  const statuses: MentorVerification["status"][] = ["Pending Review", "Approved", "Needs Information", "Approved"]
  mockMentorVerifications.push({
    id: `mv-${i}`,
    mentorId: `usr-mentor-${i}`,
    mentorName: `${name} (Advisor)`,
    email: `${name.toLowerCase().replace(" ", ".")}@techfirm.com`,
    company: i % 2 === 0 ? "Hubtel Ghana" : "MNT Telecommunications",
    experienceYears: (i % 8) + 3,
    expertise: ["Software Development", "Data Engineering", "Agile Management"],
    status: statuses[i % statuses.length],
    submittedDate: `2026-07-${(i % 20) + 1}`,
  })
}

export const mockEmployerVerifications: EmployerVerification[] = [
  {
    id: "ev-1",
    employerId: "usr-employer-hubtel",
    companyName: "Hubtel Ghana",
    industry: "FinTech & Digital Payments",
    companySize: "250-500 Employees",
    location: "Accra, Ghana",
    status: "Verified",
    submittedDate: "2026-06-15",
    documentsUrl: "https://catalyst.edu.gh/docs/hubtel-registration.pdf",
  },
  {
    id: "ev-2",
    employerId: "usr-employer-express",
    companyName: "ExpressPay Ghana",
    industry: "Financial Services",
    companySize: "100-250 Employees",
    location: "Accra, Ghana",
    status: "Verified",
    submittedDate: "2026-06-20",
    documentsUrl: "https://catalyst.edu.gh/docs/expresspay-docs.pdf",
  },
  {
    id: "ev-3",
    employerId: "usr-employer-mnotify",
    companyName: "mNotify Communications",
    industry: "Cloud Messaging & SaaS",
    companySize: "50-100 Employees",
    location: "Kumasi, Ghana",
    status: "Review",
    submittedDate: "2026-07-15",
    documentsUrl: "https://catalyst.edu.gh/docs/mnotify-docs.pdf",
  },
  {
    id: "ev-4",
    employerId: "usr-employer-zeepay",
    companyName: "Zeepay Financial Services",
    industry: "Cross-Border Remittance",
    companySize: "100-250 Employees",
    location: "Accra, Ghana",
    status: "Pending",
    submittedDate: "2026-07-22",
  },
]

// Add 11 more employers to total 15
for (let i = 5; i <= 15; i++) {
  const names = ["Farmerline", "Swoove", "KudiGo", "SawaPay", "Codetrain", "Amalitech", "Turntabl", "Jumia Ghana", "Nestateech", "Jetstream", "Float"]
  const statuses: EmployerVerification["status"][] = ["Verified", "Pending", "Review", "Verified"]
  mockEmployerVerifications.push({
    id: `ev-${i}`,
    employerId: `usr-employer-${i}`,
    companyName: names[i - 5] || `Tech Enterprise #${i}`,
    industry: "Technology & Software Solutions",
    companySize: "50-200 Employees",
    location: "Accra / Kumasi, Ghana",
    status: statuses[i % statuses.length],
    submittedDate: `2026-07-${(i % 15) + 1}`,
  })
}

export const mockOpportunityApprovals: OpportunityApproval[] = [
  {
    id: "opp-app-1",
    companyName: "Hubtel Ghana",
    title: "Junior Backend Engineer",
    type: "FULL_TIME",
    status: "Approved",
    submittedDate: "2026-07-10",
    applicantCount: 14,
    location: "Accra, Ghana",
  },
  {
    id: "opp-app-2",
    companyName: "Hubtel Ghana",
    title: "Cloud Infrastructure & DevOps Intern",
    type: "INTERNSHIP",
    status: "Approved",
    submittedDate: "2026-07-01",
    applicantCount: 22,
    location: "Accra, Ghana",
  },
  {
    id: "opp-app-3",
    companyName: "Amalitech Ghana",
    title: "Full-Stack Trainee Engineer",
    type: "GRADUATE_PROGRAM",
    status: "Pending",
    submittedDate: "2026-07-21",
    applicantCount: 0,
    location: "Takoradi, Ghana",
  },
  {
    id: "opp-app-4",
    companyName: "Zeepay Financial",
    title: "Payment Systems Auditor",
    type: "CONTRACT",
    status: "Pending",
    submittedDate: "2026-07-23",
    applicantCount: 0,
    location: "Accra, Ghana",
  },
]

// Add 46 more opportunity approvals to total 50
for (let i = 5; i <= 50; i++) {
  const types: OpportunityApproval["type"][] = ["INTERNSHIP", "GRADUATE_PROGRAM", "FULL_TIME", "CONTRACT"]
  const statuses: OpportunityApproval["status"][] = ["Approved", "Pending", "Approved", "Rejected"]
  mockOpportunityApprovals.push({
    id: `opp-app-${i}`,
    companyName: i % 2 === 0 ? "Hubtel Ghana" : "Turntabl Ghana",
    title: `Software Specialist Role #${i}`,
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    submittedDate: `2026-07-${(i % 20) + 1}`,
    applicantCount: (i % 15) + 2,
    location: "Accra, Ghana",
  })
}

export const mockPartnerships: Partnership[] = [
  {
    id: "part-1",
    partnerName: "University of Ghana — Department of Computer Science",
    partnerType: "University",
    status: "Active",
    contactPerson: "Prof. F.A. Sowah",
    contactEmail: "cs@ug.edu.gh",
    joinedDate: "2026-01-10",
  },
  {
    id: "part-2",
    partnerName: "KNUST — Faculty of Electrical & Computer Engineering",
    partnerType: "University",
    status: "Active",
    contactPerson: "Dr. Emmanuel Frimpong",
    contactEmail: "ece@knust.edu.gh",
    joinedDate: "2026-01-15",
  },
  {
    id: "part-3",
    partnerName: "Hubtel Ghana Ltd",
    partnerType: "Company",
    status: "Active",
    contactPerson: "Francis Gbenyo",
    contactEmail: "careers@hubtel.com",
    joinedDate: "2026-02-01",
  },
  {
    id: "part-4",
    partnerName: "Google EMEA / Africa Developer Relations",
    partnerType: "Sponsor",
    status: "Active",
    contactPerson: "Sarah Johnson",
    contactEmail: "devrel-africa@google.com",
    joinedDate: "2026-02-10",
  },
  {
    id: "part-5",
    partnerName: "Amalitech Training Academy",
    partnerType: "Training Partner",
    status: "Active",
    contactPerson: "Karin Hess",
    contactEmail: "info@amalitech.org",
    joinedDate: "2026-03-01",
  },
  {
    id: "part-6",
    partnerName: "Ashesi University",
    partnerType: "University",
    status: "Active",
    contactPerson: "Dr. Ayorkor Korsah",
    contactEmail: "cs@ashesi.edu.gh",
    joinedDate: "2026-03-15",
  },
  {
    id: "part-7",
    partnerName: "Paystack Africa",
    partnerType: "Company",
    status: "Active",
    contactPerson: "Kofi Dadzie",
    contactEmail: "partnerships@paystack.com",
    joinedDate: "2026-04-01",
  },
  {
    id: "part-8",
    partnerName: "Turntabl Ghana Ltd",
    partnerType: "Company",
    status: "Active",
    contactPerson: "Sam Moorhouse",
    contactEmail: "contact@turntabl.io",
    joinedDate: "2026-04-10",
  },
  {
    id: "part-9",
    partnerName: "Ghana Chamber of Telecommunications",
    partnerType: "Sponsor",
    status: "Pending",
    contactPerson: "Kenneth Ashigbey",
    contactEmail: "info@telecomschamber.org",
    joinedDate: "2026-07-01",
  },
  {
    id: "part-10",
    partnerName: "Codetrain Africa Hub",
    partnerType: "Training Partner",
    status: "Active",
    contactPerson: "Richard Brandt",
    contactEmail: "admissions@codetrain.org",
    joinedDate: "2026-05-15",
  },
]

export const mockPlatformAnalytics: PlatformAnalytics = {
  totalStudents: 2450,
  activeMentors: 180,
  verifiedEmployers: 75,
  activeOpportunities: 320,
  successfulPlacements: 145,
  pendingReviews: 24,
  averageStudentReadiness: 82,
  employmentRate: 74,
  sessionsCompleted: 480,
  topDemandedSkills: [
    { skill: "React / Next.js", count: 145 },
    { skill: "Python / Data Science", count: 120 },
    { skill: "Node.js Backend", count: 110 },
    { skill: "SQL & PostgreSQL", count: 95 },
    { skill: "AWS & Cloud DevOps", count: 70 },
  ],
}

export const mockAdminReports: AdminReport[] = [
  {
    id: "rep-1",
    title: "Q2 Student Employability & Readiness Benchmark",
    type: "Student Progress",
    generatedDate: "2026-07-01",
    status: "Ready",
    summary: "Comprehensive analysis of readiness scores across 2,450 enrolled students across 6 universities.",
    recordCount: 2450,
  },
  {
    id: "rep-2",
    title: "2026 Graduate Employment & Placement Audit",
    type: "Employment Outcome",
    generatedDate: "2026-07-15",
    status: "Ready",
    summary: "Summary of 145 successful student placements across partner fintech and enterprise software companies.",
    recordCount: 145,
  },
  {
    id: "rep-3",
    title: "Mentorship Session Activity & Evaluation Quality Report",
    type: "Mentorship Activity",
    generatedDate: "2026-07-20",
    status: "Ready",
    summary: "Audit log of 480 completed 1-on-1 advisor sessions and code verification reviews.",
    recordCount: 480,
  },
  {
    id: "rep-4",
    title: "Employer Engagement & Opportunity Posting Frequency",
    type: "Employer Engagement",
    generatedDate: "2026-07-22",
    status: "Ready",
    summary: "Metrics covering 75 verified corporate partners, application volumes, and hiring conversion rates.",
    recordCount: 75,
  },
]

export const mockAnnouncements: PlatformAnnouncement[] = [
  {
    id: "ann-1",
    title: "2026 Catalyst Graduate Tech Career Fair Scheduled",
    message: "Join us on August 15th for the annual Catalyst Virtual Career Fair with over 30 verified fintech and enterprise employers.",
    audience: "All Users",
    date: "2026-07-20",
    type: "Career Event",
    author: "Dr. Kwesi Appiah (Admin)",
  },
  {
    id: "ann-2",
    title: "New Mentor Verification Standard Guidelines Released",
    message: "All industry mentors are required to verify their professional credentials to maintain active coaching status.",
    audience: "Mentors",
    date: "2026-07-18",
    type: "Platform Update",
    author: "Admin Governance Team",
  },
  {
    id: "ann-3",
    title: "AWS Cloud Certification Sponsorship for Top Ready Students",
    message: "Students with a Career Readiness Index above 85% qualify for fully sponsored AWS Cloud Practitioner vouchers.",
    audience: "Students",
    date: "2026-07-15",
    type: "Training Opportunity",
    author: "Department Coordinator",
  },
  {
    id: "ann-4",
    title: "Scheduled System Maintenance Window: July 30th",
    message: "Catalyst platform will undergo scheduled database optimizations on Sunday, July 30th from 02:00 to 04:00 AM GMT.",
    audience: "All Users",
    date: "2026-07-12",
    type: "Maintenance Notice",
    author: "System Operations",
  },
]

export const mockAdminSettings: AdminSettings = {
  emailAlerts: true,
  autoApprovalThreshold: 85,
  platformMaintenanceMode: false,
  securityAuditLogging: true,
  requireMentorCredentialUpload: true,
  requireEmployerDocUpload: true,
}
