/**
 * Core Reference Data Constants
 * All controlled-value lists used across the Catalyst platform.
 * These are static seeds — replaced by API responses when backend is live.
 */
import {
  CareerGoal, Industry, Institution, Programme, AcademicLevel,
  Country, Region, City, CompanySize, OpportunityType,
  ExperienceLevel, WorkMode, MentorshipGoal, AvailabilityDay,
  Timezone, ProjectCategory, ApplicationRequirement, AnnouncementType,
} from "../types/reference.types"

// ── Career Goals ────────────────────────────────────────────────────────
export const CAREER_GOALS_DATA: CareerGoal[] = [
  { id: 1,  name: "Software Engineer",              category: "Software Engineering",     isActive: true, displayOrder: 1,  description: "Build software applications and systems",     createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2,  name: "Backend Developer",              category: "Software Engineering",     isActive: true, displayOrder: 2,  description: "Server-side application development",           createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3,  name: "Frontend Developer",             category: "Software Engineering",     isActive: true, displayOrder: 3,  description: "Client-side UI development",                  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4,  name: "Full-Stack Developer",           category: "Software Engineering",     isActive: true, displayOrder: 4,  description: "End-to-end web application development",       createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5,  name: "Mobile App Engineer",            category: "Mobile Development",       isActive: true, displayOrder: 5,  description: "iOS and Android mobile development",          createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6,  name: "DevOps Engineer",                category: "Cloud & Infrastructure",   isActive: true, displayOrder: 6,  description: "CI/CD, infrastructure automation",           createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7,  name: "Cloud Solutions Architect",      category: "Cloud & Infrastructure",   isActive: true, displayOrder: 7,  description: "Design cloud-based system architectures",    createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 8,  name: "Data Analyst",                   category: "Data & Analytics",         isActive: true, displayOrder: 8,  description: "Analyse data for business insights",         createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 9,  name: "Data Scientist",                 category: "Data & Analytics",         isActive: true, displayOrder: 9,  description: "Build predictive models from data",          createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 10, name: "Machine Learning Engineer",      category: "Data & Analytics",         isActive: true, displayOrder: 10, description: "Train and deploy AI/ML models",             createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 11, name: "Cybersecurity Analyst",          category: "Security",                 isActive: true, displayOrder: 11, description: "Threat analysis and system protection",      createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 12, name: "Network Engineer",               category: "Security",                 isActive: true, displayOrder: 12, description: "Design and maintain network infrastructure",  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 13, name: "Database Administrator",         category: "Data & Analytics",         isActive: true, displayOrder: 13, description: "Manage and optimise database systems",       createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 14, name: "Product Manager",                category: "Management & Leadership",  isActive: true, displayOrder: 14, description: "Guide product vision and roadmap",           createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 15, name: "UI/UX Designer",                 category: "Design & Product",         isActive: true, displayOrder: 15, description: "User interface and experience design",        createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 16, name: "QA / Test Engineer",             category: "Software Engineering",     isActive: true, displayOrder: 16, description: "Software testing and quality assurance",     createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 17, name: "Systems Analyst",                category: "Software Engineering",     isActive: true, displayOrder: 17, description: "Analyse and design information systems",     createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 18, name: "IT Support Specialist",          category: "Other",                    isActive: true, displayOrder: 18, description: "Technical support and helpdesk",             createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 19, name: "Business Analyst",               category: "Management & Leadership",  isActive: true, displayOrder: 19, description: "Bridge between business and technology",     createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Industries ───────────────────────────────────────────────────────────
export const INDUSTRIES_DATA: Industry[] = [
  { id: 1,  name: "Financial Technology (FinTech)",   sector: "Finance & Technology",   isActive: true, displayOrder: 1,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2,  name: "Telecommunications",               sector: "Technology",             isActive: true, displayOrder: 2,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3,  name: "Software & SaaS",                 sector: "Technology",             isActive: true, displayOrder: 3,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4,  name: "E-Commerce & Retail",              sector: "Commerce",               isActive: true, displayOrder: 4,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5,  name: "Cloud Computing & Infrastructure", sector: "Technology",             isActive: true, displayOrder: 5,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6,  name: "Cybersecurity",                    sector: "Technology",             isActive: true, displayOrder: 6,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7,  name: "Health Technology (HealthTech)",   sector: "Healthcare",             isActive: true, displayOrder: 7,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 8,  name: "Education Technology (EdTech)",    sector: "Education",              isActive: true, displayOrder: 8,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 9,  name: "Media & Entertainment",            sector: "Media",                  isActive: true, displayOrder: 9,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 10, name: "Logistics & Supply Chain",         sector: "Operations",             isActive: true, displayOrder: 10, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 11, name: "Agriculture Technology (AgriTech)", sector: "Agriculture",           isActive: true, displayOrder: 11, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 12, name: "Banking & Finance",                sector: "Finance & Technology",   isActive: true, displayOrder: 12, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 13, name: "Government & Public Sector",       sector: "Government",             isActive: true, displayOrder: 13, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 14, name: "NGO & Non-Profit",                 sector: "Social",                 isActive: true, displayOrder: 14, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 15, name: "Consulting & Professional Services", sector: "Services",            isActive: true, displayOrder: 15, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Institutions ────────────────────────────────────────────────────────
export const INSTITUTIONS_DATA: Institution[] = [
  { id: 1, name: "University of Ghana",                                    shortName: "UG",      type: "University",       location: "Accra, Ghana",   website: "https://ug.edu.gh",     isActive: true, displayOrder: 1,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Kwame Nkrumah University of Science and Technology",     shortName: "KNUST",   type: "University",       location: "Kumasi, Ghana",  website: "https://knust.edu.gh",  isActive: true, displayOrder: 2,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "University of Cape Coast",                               shortName: "UCC",     type: "University",       location: "Cape Coast, Ghana", website: "https://ucc.edu.gh", isActive: true, displayOrder: 3,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Ashesi University",                                      shortName: "Ashesi",  type: "University",       location: "Berekuso, Ghana", website: "https://ashesi.edu.gh", isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "Ghana Institute of Management and Public Administration", shortName: "GIMPA",   type: "University",       location: "Accra, Ghana",   website: "https://gimpa.edu.gh",  isActive: true, displayOrder: 5,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6, name: "University of Professional Studies Accra",               shortName: "UPSA",    type: "University",       location: "Accra, Ghana",   website: "https://upsa.edu.gh",   isActive: true, displayOrder: 6,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7, name: "Academic City College",                                  shortName: "ACity",   type: "College",          location: "Accra, Ghana",   website: "https://acity.edu.gh",  isActive: true, displayOrder: 7,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 8, name: "Accra Technical University",                             shortName: "ATU",     type: "Polytechnic",      location: "Accra, Ghana",   isActive: true, displayOrder: 8,  createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 9, name: "Koforidua Technical University",                         shortName: "KTU",     type: "Polytechnic",      location: "Koforidua, Ghana", isActive: true, displayOrder: 9, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 10, name: "Amalitech Training Academy",                            shortName: "Amalitech", type: "Training Academy", location: "Accra / Takoradi, Ghana", website: "https://amalitech.org", isActive: true, displayOrder: 10, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Academic Levels ──────────────────────────────────────────────────────
export const ACADEMIC_LEVELS_DATA: AcademicLevel[] = [
  { id: 1, name: "Level 100",          isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Level 200",          isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "Level 300",          isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Level 400",          isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "Postgraduate Year 1", isActive: true, displayOrder: 5, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6, name: "Postgraduate Year 2", isActive: true, displayOrder: 6, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7, name: "Alumni / Graduate",  isActive: true, displayOrder: 7, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Company Sizes ────────────────────────────────────────────────────────
export const COMPANY_SIZES_DATA: CompanySize[] = [
  { id: 1, name: "Startup",    label: "1–10 Employees (Startup)",       minEmployees: 1,   maxEmployees: 10,   isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Small",      label: "11–50 Employees (Small)",        minEmployees: 11,  maxEmployees: 50,   isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "Medium",     label: "51–200 Employees (Medium)",      minEmployees: 51,  maxEmployees: 200,  isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Large",      label: "201–500 Employees (Large)",     minEmployees: 201, maxEmployees: 500,  isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "Enterprise", label: "500+ Employees (Enterprise)",   minEmployees: 501, maxEmployees: null, isActive: true, displayOrder: 5, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Opportunity Types ────────────────────────────────────────────────────
export const OPPORTUNITY_TYPES_DATA: OpportunityType[] = [
  { id: 1, name: "Internship",       code: "INTERNSHIP",       isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Graduate Program", code: "GRADUATE_PROGRAM", isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "Full-Time",        code: "FULL_TIME",        isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Contract",         code: "CONTRACT",         isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Experience Levels ─────────────────────────────────────────────────────
export const EXPERIENCE_LEVELS_DATA: ExperienceLevel[] = [
  { id: 1, name: "Internship",  minYears: 0, maxYears: 0,    isActive: true, displayOrder: 1, description: "Student or fresh graduate, no experience required", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Entry Level", minYears: 0, maxYears: 1,    isActive: true, displayOrder: 2, description: "0–1 years professional experience",                   createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "Junior",      minYears: 1, maxYears: 3,    isActive: true, displayOrder: 3, description: "1–3 years professional experience",                   createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Mid Level",   minYears: 3, maxYears: 5,    isActive: true, displayOrder: 4, description: "3–5 years professional experience",                   createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "Senior",      minYears: 5, maxYears: null, isActive: true, displayOrder: 5, description: "5+ years professional experience",                    createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Work Modes ───────────────────────────────────────────────────────────
export const WORK_MODES_DATA: WorkMode[] = [
  { id: 1, name: "Remote",  isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Hybrid",  isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "On-site", isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Mentorship Goals ──────────────────────────────────────────────────────
export const MENTORSHIP_GOALS_DATA: MentorshipGoal[] = [
  { id: 1, name: "Portfolio Review",       isActive: true, displayOrder: 1, description: "Review and improve portfolio projects", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Career Guidance",        isActive: true, displayOrder: 2, description: "Advice on career path and opportunities", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "Technical Coaching",     isActive: true, displayOrder: 3, description: "Hands-on technical skill development", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Interview Preparation",  isActive: true, displayOrder: 4, description: "Practice technical and behavioural interviews", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "Code Review",            isActive: true, displayOrder: 5, description: "Structured review of code quality and architecture", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6, name: "Project Collaboration",  isActive: true, displayOrder: 6, description: "Work on a real project with mentor guidance", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7, name: "Industry Networking",    isActive: true, displayOrder: 7, description: "Connect with industry professionals", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Availability Days ────────────────────────────────────────────────────
export const AVAILABILITY_DAYS_DATA: AvailabilityDay[] = [
  { id: 1, name: "Monday",    dayIndex: 0, isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Tuesday",   dayIndex: 1, isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "Wednesday", dayIndex: 2, isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Thursday",  dayIndex: 3, isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "Friday",    dayIndex: 4, isActive: true, displayOrder: 5, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6, name: "Saturday",  dayIndex: 5, isActive: true, displayOrder: 6, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7, name: "Sunday",    dayIndex: 6, isActive: true, displayOrder: 7, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Timezones ───────────────────────────────────────────────────────────────
export const TIMEZONES_DATA: Timezone[] = [
  { id: 1, name: "GMT",  offset: "+00:00", utcLabel: "UTC+0 (GMT / Ghana Mean Time)",  isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "WAT",  offset: "+01:00", utcLabel: "UTC+1 (West Africa Time)",       isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "EAT",  offset: "+03:00", utcLabel: "UTC+3 (East Africa Time)",       isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "CET",  offset: "+01:00", utcLabel: "UTC+1 (Central European Time)", isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "BST",  offset: "+01:00", utcLabel: "UTC+1 (British Summer Time)",   isActive: true, displayOrder: 5, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6, name: "EST",  offset: "-05:00", utcLabel: "UTC-5 (US Eastern Time)",       isActive: true, displayOrder: 6, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Locations ───────────────────────────────────────────────────────────────
export const COUNTRIES_DATA: Country[] = [
  { id: 1, name: "Ghana",         code: "GH", isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Nigeria",       code: "NG", isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "Kenya",         code: "KE", isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Remote / Global", code: "XX", isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

export const CITIES_DATA: City[] = [
  { id: 1,  name: "Accra",      regionId: 1, countryId: 1, displayLabel: "Accra, Ghana",       isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2,  name: "Kumasi",     regionId: 2, countryId: 1, displayLabel: "Kumasi, Ghana",      isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3,  name: "Cape Coast", regionId: 3, countryId: 1, displayLabel: "Cape Coast, Ghana",  isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4,  name: "Takoradi",   regionId: 4, countryId: 1, displayLabel: "Takoradi, Ghana",    isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5,  name: "Koforidua",  regionId: 5, countryId: 1, displayLabel: "Koforidua, Ghana",   isActive: true, displayOrder: 5, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6,  name: "Remote",     regionId: 0, countryId: 4, displayLabel: "Remote (Ghana)",     isActive: true, displayOrder: 6, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7,  name: "International", regionId: 0, countryId: 4, displayLabel: "International / Remote", isActive: true, displayOrder: 7, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Project Categories ─────────────────────────────────────────────────────
export const PROJECT_CATEGORIES_DATA: ProjectCategory[] = [
  { id: 1, name: "Web Application",         isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Mobile Application",      isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "API / Backend Service",   isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Data Science / ML Model", isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "DevOps / Infrastructure", isActive: true, displayOrder: 5, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6, name: "Desktop Application",     isActive: true, displayOrder: 6, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7, name: "IoT / Embedded System",   isActive: true, displayOrder: 7, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 8, name: "Open Source Contribution", isActive: true, displayOrder: 8, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 9, name: "UI/UX Design",            isActive: true, displayOrder: 9, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 10, name: "Research / Paper",       isActive: true, displayOrder: 10, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Application Requirements ───────────────────────────────────────────────
export const APPLICATION_REQUIREMENTS_DATA: ApplicationRequirement[] = [
  { id: 1, name: "Resume / CV",                 isRequired: true,  isActive: true, displayOrder: 1, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Cover Letter",                isRequired: false, isActive: true, displayOrder: 2, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "GitHub Portfolio Link",       isRequired: false, isActive: true, displayOrder: 3, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Live Demo / Portfolio URL",   isRequired: false, isActive: true, displayOrder: 4, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5, name: "Academic Transcript",         isRequired: false, isActive: true, displayOrder: 5, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6, name: "Degree Certificate",          isRequired: false, isActive: true, displayOrder: 6, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7, name: "Mentor Verification Letter",  isRequired: false, isActive: true, displayOrder: 7, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 8, name: "Professional Reference",      isRequired: false, isActive: true, displayOrder: 8, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 9, name: "Certifications",              isRequired: false, isActive: true, displayOrder: 9, createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Announcement Types ──────────────────────────────────────────────────────
export const ANNOUNCEMENT_TYPES_DATA: AnnouncementType[] = [
  { id: 1, name: "Career Event",        isActive: true, displayOrder: 1, description: "Career fairs, networking, industry events", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2, name: "Platform Update",     isActive: true, displayOrder: 2, description: "New features, policy changes", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3, name: "Training Opportunity", isActive: true, displayOrder: 3, description: "Sponsored courses, certifications", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4, name: "Maintenance Notice",  isActive: true, displayOrder: 4, description: "Scheduled downtime and maintenance", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

// ── Graduation Years ───────────────────────────────────────────────────────
export const GRADUATION_YEARS_DATA: string[] = [
  "2024", "2025", "2026", "2027", "2028", "2029", "2030",
]
