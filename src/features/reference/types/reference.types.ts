/**
 * Reference Data Types
 * Single source of truth for all controlled/predefined data across the Catalyst platform.
 * Every form selector, filter, and matching engine references these types.
 */

// ─── Base Reference Entity ───────────────────────────────────────────────────
export interface ReferenceItem {
  id: number
  name: string
  description?: string
  isActive: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Skills ──────────────────────────────────────────────────────────────────
export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Cloud & DevOps"
  | "Mobile"
  | "Data & AI"
  | "Security"
  | "Design"
  | "Other"

export interface Skill extends ReferenceItem {
  category: SkillCategory
  aliases?: string[] // e.g. ["React.js", "ReactJS"] for "React"
}

// ─── Career Goals ────────────────────────────────────────────────────────────
export type CareerCategory =
  | "Software Engineering"
  | "Data & Analytics"
  | "Cloud & Infrastructure"
  | "Security"
  | "Design & Product"
  | "Mobile Development"
  | "Management & Leadership"
  | "Other"

export interface CareerGoal extends ReferenceItem {
  category: CareerCategory
}

// ─── Industries ──────────────────────────────────────────────────────────────
export interface Industry extends ReferenceItem {
  sector?: string // e.g. "Technology" as the broad sector
}

// ─── Academic: Institutions ──────────────────────────────────────────────────
export type InstitutionType = "University" | "Polytechnic" | "College" | "Training Academy" | "Other"

export interface Institution extends ReferenceItem {
  shortName: string    // e.g. "UG", "KNUST"
  type: InstitutionType
  location: string     // e.g. "Accra, Ghana"
  website?: string
}

// ─── Academic: Programmes ────────────────────────────────────────────────────
export type ProgrammeLevel = "HND" | "BSc" | "BEng" | "BA" | "MSc" | "MEng" | "MBA" | "PhD" | "Certificate"

export interface Programme extends ReferenceItem {
  institutionId: number   // FK → Institution.id
  level: ProgrammeLevel
  department?: string
}

// ─── Academic: Levels ────────────────────────────────────────────────────────
export type AcademicLevel = ReferenceItem

// ─── Locations ───────────────────────────────────────────────────────────────
export interface Country extends ReferenceItem {
  code: string  // ISO 3166-1 alpha-2, e.g. "GH"
}

export interface Region extends ReferenceItem {
  countryId: number  // FK → Country.id
}

export interface City extends ReferenceItem {
  regionId: number    // FK → Region.id
  countryId: number   // FK → Country.id (denormalized for convenience)
  displayLabel: string // e.g. "Accra, Ghana"
}

// ─── Company Sizes ───────────────────────────────────────────────────────────
export interface CompanySize extends ReferenceItem {
  minEmployees: number
  maxEmployees: number | null  // null = "unlimited" for 500+
  label: string // e.g. "51–200 Employees (Medium)"
}

// ─── Opportunity / Employment Types ──────────────────────────────────────────
export interface OpportunityType extends ReferenceItem {
  // name examples: "Internship", "Graduate Program", "Full-Time", "Contract"
  code: "INTERNSHIP" | "GRADUATE_PROGRAM" | "FULL_TIME" | "CONTRACT"
}

export interface ExperienceLevel extends ReferenceItem {
  // name examples: "Internship", "Entry Level", "Junior", "Mid Level", "Senior"
  minYears: number
  maxYears: number | null
}

export type WorkMode = ReferenceItem

// ─── Mentorship ───────────────────────────────────────────────────────────────
export type MentorshipGoal = ReferenceItem

export interface AvailabilityDay extends ReferenceItem {
  // name: "Monday", "Tuesday", ..., "Sunday"
  dayIndex: number // 0=Monday, 6=Sunday
}

export interface Timezone extends ReferenceItem {
  offset: string  // e.g. "+00:00"
  utcLabel: string // e.g. "UTC+0 (GMT)"
}

// ─── Portfolio / Project ─────────────────────────────────────────────────────
export type ProjectCategory = ReferenceItem

// ─── Application Requirements ────────────────────────────────────────────────
export interface ApplicationRequirement extends ReferenceItem {
  // e.g. "Resume / CV", "Cover Letter", "GitHub Portfolio Link"
  isRequired: boolean // default requirement vs optional
}

// ─── Announcement Types ───────────────────────────────────────────────────────
export type AnnouncementType = ReferenceItem

// ─── Aggregated Reference Data Store ────────────────────────────────────────
// Used by the ReferenceDataService to cache all reference lists
export interface ReferenceDataStore {
  skills: Skill[]
  careerGoals: CareerGoal[]
  industries: Industry[]
  institutions: Institution[]
  programmes: Programme[]
  academicLevels: AcademicLevel[]
  countries: Country[]
  regions: Region[]
  cities: City[]
  companySizes: CompanySize[]
  opportunityTypes: OpportunityType[]
  experienceLevels: ExperienceLevel[]
  workModes: WorkMode[]
  mentorshipGoals: MentorshipGoal[]
  availabilityDays: AvailabilityDay[]
  timezones: Timezone[]
  projectCategories: ProjectCategory[]
  applicationRequirements: ApplicationRequirement[]
  announcementTypes: AnnouncementType[]
}
