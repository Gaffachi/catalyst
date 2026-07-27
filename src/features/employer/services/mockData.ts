import { 
  CompanyProfile, 
  Opportunity, 
  CandidateProfile, 
  EmployerApplication, 
  Interview,
  EmployerSettings
} from "../types/employer.types"

export const mockCompany: CompanyProfile = {
  id: "comp-hubtel",
  name: "Hubtel Ghana",
  industry: "FinTech & Digital Payments",
  companySize: "250-500 Employees",
  location: "Accra, Ghana",
  website: "https://hubtel.com",
  description: "Hubtel is Ghana's leading fintech platform processing digital payments, retail commerce, and customer messaging services for businesses across Africa.",
  verificationStatus: "Verified",
  contactEmail: "careers@hubtel.com",
  contactPhone: "+233 30 221 8900",
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    companyId: "comp-hubtel",
    companyName: "Hubtel Ghana",
    title: "Junior Backend Engineer",
    type: "FULL_TIME",
    description: "Build robust REST APIs, microservices, and high-throughput payment transaction processors.",
    requiredSkills: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    experienceLevel: "Junior",
    location: "Accra, Ghana",
    workMode: "Hybrid",
    deadline: "2026-08-15",
    salaryRange: "GHS 8,000 - GHS 12,000 / month",
    applicationRequirements: ["Resume / CV", "GitHub Portfolio", "Transcript"],
    status: "Active",
    postedDate: "2026-07-10",
    applicantCount: 14,
  },
  {
    id: "opp-2",
    companyId: "comp-hubtel",
    companyName: "Hubtel Ghana",
    title: "Cloud Infrastructure & DevOps Intern",
    type: "INTERNSHIP",
    description: "Assist DevOps team with AWS infrastructure automation, CI/CD pipelines, and Kubernetes deployments.",
    requiredSkills: ["Linux", "AWS", "Docker", "Git", "Python"],
    experienceLevel: "Internship",
    location: "Accra, Ghana",
    workMode: "On-site",
    deadline: "2026-08-30",
    salaryRange: "GHS 3,500 / month stipend",
    applicationRequirements: ["Resume", "Transcript", "Mentor Verification Letter"],
    status: "Active",
    postedDate: "2026-07-01",
    applicantCount: 22,
  },
  {
    id: "opp-3",
    companyId: "comp-hubtel",
    companyName: "Hubtel Ghana",
    title: "Software Engineering Graduate Trainee (2026 Cohort)",
    type: "GRADUATE_PROGRAM",
    description: "12-month rotational software engineering program across Frontend, Backend, Data Engineering, and Security teams.",
    requiredSkills: ["JavaScript", "Python", "Data Structures", "SQL", "Git"],
    experienceLevel: "Entry Level",
    location: "Accra / Kumasi, Ghana",
    workMode: "Hybrid",
    deadline: "2026-09-15",
    salaryRange: "GHS 6,000 / month",
    applicationRequirements: ["Resume", "Degree Transcript", "GitHub"],
    status: "Active",
    postedDate: "2026-06-20",
    applicantCount: 38,
  },
  {
    id: "opp-4",
    companyId: "comp-hubtel",
    companyName: "Hubtel Ghana",
    title: "Frontend UI Developer (React/Next.js)",
    type: "FULL_TIME",
    description: "Craft modern, responsive web application interfaces using React, Next.js, and Tailwind CSS.",
    requiredSkills: ["React", "Next.js", "TypeScript", "TailwindCSS", "State Management"],
    experienceLevel: "Junior",
    location: "Accra, Ghana",
    workMode: "Hybrid",
    deadline: "2026-08-20",
    salaryRange: "GHS 7,500 - GHS 10,000 / month",
    applicationRequirements: ["Live Portfolio Link", "GitHub", "Resume"],
    status: "Active",
    postedDate: "2026-07-05",
    applicantCount: 18,
  },
  {
    id: "opp-5",
    companyId: "comp-hubtel",
    companyName: "Hubtel Ghana",
    title: "Data Analyst & Business Intelligence Intern",
    type: "INTERNSHIP",
    description: "Transform transaction data into actionable business intelligence dashboards using SQL, Python, and PowerBI.",
    requiredSkills: ["SQL", "Python", "Data Analysis", "PowerBI", "Excel"],
    experienceLevel: "Internship",
    location: "Remote (Ghana)",
    workMode: "Remote",
    deadline: "2026-08-10",
    salaryRange: "GHS 3,000 / month",
    applicationRequirements: ["Resume", "Data Portfolio"],
    status: "Active",
    postedDate: "2026-07-12",
    applicantCount: 11,
  },
  {
    id: "opp-6",
    companyId: "comp-hubtel",
    companyName: "Hubtel Ghana",
    title: "Cybersecurity Analyst",
    type: "FULL_TIME",
    description: "Perform threat vulnerability audits, penetration testing, and compliance monitoring across fintech services.",
    requiredSkills: ["Network Security", "Penetration Testing", "Linux", "SIEM", "Python"],
    experienceLevel: "Mid Level",
    location: "Accra, Ghana",
    workMode: "On-site",
    deadline: "2026-08-25",
    salaryRange: "GHS 10,000 - GHS 14,000 / month",
    applicationRequirements: ["Resume", "Certifications"],
    status: "Active",
    postedDate: "2026-06-28",
    applicantCount: 7,
  },
  {
    id: "opp-7",
    companyId: "comp-hubtel",
    companyName: "Hubtel Ghana",
    title: "Mobile App Engineer (Flutter / React Native)",
    type: "CONTRACT",
    description: "6-month contract building merchant payment POS integrations for iOS and Android.",
    requiredSkills: ["Flutter", "Dart", "REST API", "Mobile UX"],
    experienceLevel: "Junior",
    location: "Accra, Ghana",
    workMode: "Hybrid",
    deadline: "2026-08-05",
    salaryRange: "GHS 8,500 / month",
    applicationRequirements: ["App Store Links / APK", "GitHub"],
    status: "Active",
    postedDate: "2026-07-08",
    applicantCount: 9,
  },
]

// Generate 20 opportunities total with fallback templates
for (let i = 8; i <= 20; i++) {
  const types: Opportunity["type"][] = ["INTERNSHIP", "GRADUATE_PROGRAM", "FULL_TIME", "CONTRACT"]
  const titles = [
    "QA & Automated Testing Engineer",
    "Product Management Associate",
    "Systems Security Intern",
    "Database Administrator Trainee",
    "Full-Stack JavaScript Developer",
    "DevOps Automation Specialist",
    "UI/UX Product Design Intern",
    "API Integrations Specialist",
    "Technical Support Engineer",
    "Cloud Solutions Architecture Trainee",
    "Machine Learning Engineer Intern",
    "Payment Gateway Developer",
    "IT Operations Analyst"
  ]
  const type = types[i % types.length]
  const title = titles[i % titles.length]

  mockOpportunities.push({
    id: `opp-${i}`,
    companyId: "comp-hubtel",
    companyName: "Hubtel Ghana",
    title: `${title} #${i}`,
    type,
    description: `Targeted recruitment role focused on ${title.toLowerCase()} execution within Hubtel tech teams.`,
    requiredSkills: ["JavaScript", "Python", "SQL", "Git", "Problem Solving"],
    experienceLevel: type === "INTERNSHIP" ? "Internship" : type === "GRADUATE_PROGRAM" ? "Entry Level" : "Junior",
    location: i % 2 === 0 ? "Accra, Ghana" : "Kumasi, Ghana",
    workMode: i % 3 === 0 ? "Remote" : i % 2 === 0 ? "Hybrid" : "On-site",
    deadline: `2026-09-${(i % 28) + 1}`,
    salaryRange: type === "INTERNSHIP" ? "GHS 3,200 / month" : "GHS 7,000 - GHS 10,000 / month",
    applicationRequirements: ["Resume", "GitHub", "Transcript"],
    status: i > 17 ? "Closed" : "Active",
    postedDate: `2026-06-${(i % 25) + 1}`,
    applicantCount: Math.floor(Math.random() * 25) + 5,
  })
}

// Generate 30 candidate profiles mirroring Student model
export const mockCandidates: CandidateProfile[] = [
  {
    id: "cand-alex-mensah",
    name: "Alex Mensah",
    email: "alex.mensah@ug.edu.gh",
    phone: "+233 24 123 4567",
    programme: "MSc Information Technology",
    university: "University of Ghana",
    readinessScore: 84,
    skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Git"],
    portfolioStatus: "Verified",
    projectCount: 4,
    mentorVerified: true,
    location: "Accra, Ghana",
    employmentGoal: "Full-Stack Software Engineer",
    bio: "Passionate software engineering graduate with hands-on experience building full-stack web applications and microservices.",
    approvedMentorNotes: "Strong code structure, excellent understanding of asynchronous patterns and REST standards. Recommended for junior backend/full-stack positions.",
  },
  {
    id: "cand-abena-owusu",
    name: "Abena Owusu",
    email: "abena.owusu@knust.edu.gh",
    phone: "+233 20 987 6543",
    programme: "BSc Computer Science",
    university: "KNUST",
    readinessScore: 91,
    skills: ["Python", "Django", "AWS", "Docker", "PostgreSQL", "Redis"],
    portfolioStatus: "Verified",
    projectCount: 5,
    mentorVerified: true,
    location: "Kumasi, Ghana",
    employmentGoal: "DevOps & Cloud Engineer",
    bio: "Final-year computer science student specializing in cloud infrastructure automation and container orchestration.",
    approvedMentorNotes: "Outstanding performance in systems architecture. Built robust CI/CD pipelines verified during mentor audits.",
  },
  {
    id: "cand-kwame-boateng",
    name: "Kwame Boateng",
    email: "k.boateng@ashesi.edu.gh",
    phone: "+233 55 444 3322",
    programme: "BSc Computer Engineering",
    university: "Ashesi University",
    readinessScore: 78,
    skills: ["Flutter", "Dart", "Firebase", "REST API", "Git"],
    portfolioStatus: "Verified",
    projectCount: 3,
    mentorVerified: true,
    location: "Accra, Ghana",
    employmentGoal: "Mobile App Engineer",
    bio: "Mobile app developer with 2 published Flutter apps and strong focus on cross-platform UI UX performance.",
    approvedMentorNotes: "Clean mobile codebase with solid UI state management.",
  },
  {
    id: "cand-efua-appiah",
    name: "Efua Appiah",
    email: "efua.a@ucc.edu.gh",
    programme: "BSc Information Technology",
    university: "University of Cape Coast",
    readinessScore: 88,
    skills: ["React", "Next.js", "TailwindCSS", "UI/UX Design", "Figma"],
    portfolioStatus: "Verified",
    projectCount: 4,
    mentorVerified: true,
    location: "Cape Coast, Ghana",
    employmentGoal: "Frontend Developer",
    bio: "Frontend engineer with keen eye for design aesthetics, web performance, and responsive interfaces.",
    approvedMentorNotes: "Excellent visual presentation, semantic HTML structure, and clean Tailwind styling.",
  },
  {
    id: "cand-kofi-sarpong",
    name: "Kofi Sarpong",
    email: "kofi.sarpong@ug.edu.gh",
    programme: "MSc Data Science",
    university: "University of Ghana",
    readinessScore: 82,
    skills: ["Python", "SQL", "Pandas", "Scikit-Learn", "PowerBI", "Docker"],
    portfolioStatus: "Verified",
    projectCount: 3,
    mentorVerified: true,
    location: "Accra, Ghana",
    employmentGoal: "Data Analyst & Machine Learning Engineer",
    bio: "Data science post-graduate focused on predictive modeling and financial data analytics.",
    approvedMentorNotes: "Strong analytical skills and data visualization capability.",
  },
]

// Add 25 more candidates to reach 30 total
const names = [
  "Yaw Addo", "Akosua Gyasi", "Kojo Asante", "Ama Serwaa", "Kwaku Baah",
  "Yaa Darko", "Kwabena Osei", "Adwoa Mensah", "Fiifi Quansah", "Esi Tetteh",
  "Kobby Forson", "Araba Blankson", "Nii Laryea", "Naa Koshie", "Paa Kwesi",
  "Sena Lawson", "Mawuli Gbeku", "Dzidzor Kpodo", "Kekeli Amamu", "Kofi Badu",
  "Grace Kufuor", "Daniel Poku", "Samuel Kyeremeh", "Ebenezer Quaye", "Rita Frimpong"
]

const programmes = [
  "BSc Computer Science", "BSc Information Technology", "MSc Information Technology", 
  "BSc Computer Engineering", "MSc Data Science", "BSc Software Engineering"
]

names.forEach((name, idx) => {
  const id = `cand-${idx + 6}`
  const readiness = 70 + (idx % 25)
  mockCandidates.push({
    id,
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@university.edu.gh`,
    programme: programmes[idx % programmes.length],
    university: idx % 2 === 0 ? "University of Ghana" : "KNUST",
    readinessScore: readiness,
    skills: ["JavaScript", "Python", "SQL", "Git", "React", "Node.js"].slice(0, 3 + (idx % 3)),
    portfolioStatus: idx % 4 === 0 ? "Pending" : "Verified",
    projectCount: 2 + (idx % 4),
    mentorVerified: idx % 4 !== 0,
    location: idx % 3 === 0 ? "Kumasi, Ghana" : "Accra, Ghana",
    employmentGoal: "Junior Software Engineer",
    bio: `Dedicated ${programmes[idx % programmes.length]} graduate eager to contribute to innovative software development projects.`,
    approvedMentorNotes: readiness > 80 ? "Audited codebase projects demonstrate high readiness." : "Promising candidate with solid core computer science fundamentals.",
  })
})

// Generate 50 applications across 7 Kanban stages
export const mockApplications: EmployerApplication[] = []

const stages: EmployerApplication["stage"][] = [
  "Applied", "Reviewing", "Shortlisted", "Assessment", "Interview", "Offer", "Hired"
]

for (let i = 1; i <= 50; i++) {
  const candidate = mockCandidates[(i - 1) % mockCandidates.length]
  const opportunity = mockOpportunities[(i - 1) % mockOpportunities.length]
  const stage = stages[i % stages.length]

  mockApplications.push({
    id: `app-${i}`,
    candidateId: candidate.id,
    candidateName: candidate.name,
    candidateEmail: candidate.email,
    opportunityId: opportunity.id,
    opportunityTitle: opportunity.title,
    opportunityType: opportunity.type,
    appliedDate: `2026-07-${(i % 20) + 1}`,
    stage,
    readinessScore: candidate.readinessScore,
    resumeUrl: `https://catalyst.edu.gh/resumes/${candidate.id}.pdf`,
  })
}

// Generate 15 Interviews
export const mockInterviews: Interview[] = [
  {
    id: "int-1",
    candidateId: "cand-alex-mensah",
    candidateName: "Alex Mensah",
    opportunityId: "opp-1",
    position: "Junior Backend Engineer",
    date: "2026-07-28",
    time: "10:00 AM GMT",
    interviewType: "Technical Screen",
    status: "Scheduled",
    notes: "Review Node.js REST API design and PostgreSQL indexing questions.",
    locationOrLink: "https://meet.google.com/hubtel-tech-screen",
  },
  {
    id: "int-2",
    candidateId: "cand-abena-owusu",
    candidateName: "Abena Owusu",
    opportunityId: "opp-2",
    position: "Cloud Infrastructure & DevOps Intern",
    date: "2026-07-29",
    time: "2:00 PM GMT",
    interviewType: "System Design",
    status: "Scheduled",
    notes: "Discuss AWS ECS container deployment and CI/CD pipelines.",
    locationOrLink: "https://meet.google.com/hubtel-devops-sync",
  },
  {
    id: "int-3",
    candidateId: "cand-kwame-boateng",
    candidateName: "Kwame Boateng",
    opportunityId: "opp-7",
    position: "Mobile App Engineer (Flutter)",
    date: "2026-07-26",
    time: "11:30 AM GMT",
    interviewType: "Behavioral / Cultural",
    status: "Scheduled",
    notes: "Assess team fit and cross-functional communication.",
    locationOrLink: "Hubtel HQ, Labone, Accra",
  },
  {
    id: "int-4",
    candidateId: "cand-efua-appiah",
    candidateName: "Efua Appiah",
    opportunityId: "opp-4",
    position: "Frontend UI Developer",
    date: "2026-07-22",
    time: "3:00 PM GMT",
    interviewType: "Technical Screen",
    status: "Completed",
    notes: "Passed live coding test with top marks. Proceed to final HR round.",
    locationOrLink: "https://meet.google.com/hubtel-fe-audit",
  },
  {
    id: "int-5",
    candidateId: "cand-kofi-sarpong",
    candidateName: "Kofi Sarpong",
    opportunityId: "opp-5",
    position: "Data Analyst Intern",
    date: "2026-07-21",
    time: "1:00 PM GMT",
    interviewType: "Final HR",
    status: "Completed",
    notes: "Recommended for immediate placement offer.",
    locationOrLink: "https://meet.google.com/hubtel-hr-final",
  },
]

// Add 10 more interviews to reach 15 total
for (let i = 6; i <= 15; i++) {
  const candidate = mockCandidates[(i + 4) % mockCandidates.length]
  const opportunity = mockOpportunities[i % mockOpportunities.length]
  const types: Interview["interviewType"][] = [
    "Technical Screen", "System Design", "Behavioral / Cultural", "Final HR"
  ]
  const statuses: Interview["status"][] = ["Scheduled", "Completed", "Rescheduled", "Cancelled"]

  mockInterviews.push({
    id: `int-${i}`,
    candidateId: candidate.id,
    candidateName: candidate.name,
    opportunityId: opportunity.id,
    position: opportunity.title,
    date: `2026-07-${(i % 10) + 20}`,
    time: `${(i % 5) + 1}:00 PM GMT`,
    interviewType: types[i % types.length],
    status: statuses[i % statuses.length],
    notes: `Interview sync regarding ${opportunity.title} evaluation.`,
    locationOrLink: "https://meet.google.com/hubtel-recruitment-sync",
  })
}

export const mockEmployerSettings: EmployerSettings = {
  emailNotifications: true,
  interviewReminders: true,
  applicantAlerts: true,
  profileVisibility: "Public",
  companyDirectoryListed: true,
}
