/**
 * Reference Data Service
 * Single source of truth for all controlled data on the Catalyst platform.
 * Currently returns static data — will be replaced by API calls in Phase 7 (Backend).
 * All consumer code should call this service, NEVER import constants directly.
 */
import type {
  Skill, SkillCategory, CareerGoal, Industry, Institution, Programme,
  AcademicLevel, City, CompanySize, OpportunityType, ExperienceLevel,
  WorkMode, MentorshipGoal, AvailabilityDay, Timezone, ProjectCategory,
  ApplicationRequirement, AnnouncementType, Country, ReferenceDataStore,
} from "../types/reference.types"

import { SKILLS_DATA } from "../constants/skills.data"
import {
  CAREER_GOALS_DATA, INDUSTRIES_DATA, INSTITUTIONS_DATA, ACADEMIC_LEVELS_DATA,
  COMPANY_SIZES_DATA, OPPORTUNITY_TYPES_DATA, EXPERIENCE_LEVELS_DATA,
  WORK_MODES_DATA, MENTORSHIP_GOALS_DATA, AVAILABILITY_DAYS_DATA, TIMEZONES_DATA,
  CITIES_DATA, COUNTRIES_DATA, PROJECT_CATEGORIES_DATA,
  APPLICATION_REQUIREMENTS_DATA, ANNOUNCEMENT_TYPES_DATA, GRADUATION_YEARS_DATA,
} from "../constants/reference.data"

// ── Simulated API delay ───────────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export class ReferenceDataService {
  // ── Skills ───────────────────────────────────────────────────────────────────
  static async getSkills(category?: SkillCategory): Promise<Skill[]> {
    await delay(80)
    const active = SKILLS_DATA.filter((s) => s.isActive)
    return category ? active.filter((s) => s.category === category) : active
  }

  static async searchSkills(query: string): Promise<Skill[]> {
    await delay(60)
    const q = query.toLowerCase()
    return SKILLS_DATA.filter(
      (s) =>
        s.isActive &&
        (s.name.toLowerCase().includes(q) ||
          s.aliases?.some((a) => a.toLowerCase().includes(q)))
    )
  }

  static async getSkillById(id: number): Promise<Skill | null> {
    await delay(40)
    return SKILLS_DATA.find((s) => s.id === id) ?? null
  }

  static async getSkillsByIds(ids: number[]): Promise<Skill[]> {
    await delay(60)
    return SKILLS_DATA.filter((s) => ids.includes(s.id))
  }

  // ── Career Goals ────────────────────────────────────────────────────────────
  static async getCareerGoals(): Promise<CareerGoal[]> {
    await delay(80)
    return CAREER_GOALS_DATA.filter((g) => g.isActive)
  }

  static async searchCareerGoals(query: string): Promise<CareerGoal[]> {
    await delay(60)
    const q = query.toLowerCase()
    return CAREER_GOALS_DATA.filter(
      (g) => g.isActive && g.name.toLowerCase().includes(q)
    )
  }

  // ── Industries ─────────────────────────────────────────────────────────────
  static async getIndustries(): Promise<Industry[]> {
    await delay(80)
    return INDUSTRIES_DATA.filter((i) => i.isActive)
  }

  // ── Institutions ────────────────────────────────────────────────────────────
  static async getInstitutions(): Promise<Institution[]> {
    await delay(80)
    return INSTITUTIONS_DATA.filter((i) => i.isActive)
  }

  // ── Programmes ─────────────────────────────────────────────────────────────
  static async getProgrammes(institutionId?: number): Promise<Programme[]> {
    await delay(80)
    // Programmes seeded via backend; return empty array until then
    return []
  }

  // ── Academic Levels ─────────────────────────────────────────────────────────
  static async getAcademicLevels(): Promise<AcademicLevel[]> {
    await delay(60)
    return ACADEMIC_LEVELS_DATA.filter((l) => l.isActive)
  }

  // ── Locations ─────────────────────────────────────────────────────────────
  static async getCities(countryId?: number): Promise<City[]> {
    await delay(80)
    const active = CITIES_DATA.filter((c) => c.isActive)
    return countryId ? active.filter((c) => c.countryId === countryId) : active
  }

  static async getCountries(): Promise<Country[]> {
    await delay(60)
    return COUNTRIES_DATA.filter((c) => c.isActive)
  }

  // ── Company Sizes ──────────────────────────────────────────────────────────
  static async getCompanySizes(): Promise<CompanySize[]> {
    await delay(60)
    return COMPANY_SIZES_DATA.filter((s) => s.isActive)
  }

  // ── Opportunity Types ──────────────────────────────────────────────────────
  static async getOpportunityTypes(): Promise<OpportunityType[]> {
    await delay(60)
    return OPPORTUNITY_TYPES_DATA.filter((t) => t.isActive)
  }

  // ── Experience Levels ──────────────────────────────────────────────────────
  static async getExperienceLevels(): Promise<ExperienceLevel[]> {
    await delay(60)
    return EXPERIENCE_LEVELS_DATA.filter((e) => e.isActive)
  }

  // ── Work Modes ───────────────────────────────────────────────────────────
  static async getWorkModes(): Promise<WorkMode[]> {
    await delay(60)
    return WORK_MODES_DATA.filter((m) => m.isActive)
  }

  // ── Mentorship Goals ──────────────────────────────────────────────────────
  static async getMentorshipGoals(): Promise<MentorshipGoal[]> {
    await delay(80)
    return MENTORSHIP_GOALS_DATA.filter((g) => g.isActive)
  }

  // ── Availability Days ─────────────────────────────────────────────────────
  static async getAvailabilityDays(): Promise<AvailabilityDay[]> {
    await delay(60)
    return AVAILABILITY_DAYS_DATA
  }

  // ── Timezones ───────────────────────────────────────────────────────────────
  static async getTimezones(): Promise<Timezone[]> {
    await delay(60)
    return TIMEZONES_DATA.filter((t) => t.isActive)
  }

  // ── Project Categories ─────────────────────────────────────────────────────
  static async getProjectCategories(): Promise<ProjectCategory[]> {
    await delay(60)
    return PROJECT_CATEGORIES_DATA.filter((p) => p.isActive)
  }

  // ── Application Requirements ────────────────────────────────────────────────
  static async getApplicationRequirements(): Promise<ApplicationRequirement[]> {
    await delay(60)
    return APPLICATION_REQUIREMENTS_DATA.filter((r) => r.isActive)
  }

  // ── Announcement Types ─────────────────────────────────────────────────────
  static async getAnnouncementTypes(): Promise<AnnouncementType[]> {
    await delay(60)
    return ANNOUNCEMENT_TYPES_DATA.filter((t) => t.isActive)
  }

  // ── Graduation Years ────────────────────────────────────────────────────────
  static async getGraduationYears(): Promise<string[]> {
    await delay(40)
    return GRADUATION_YEARS_DATA
  }

  // ── Bulk loader (preload all reference data at app boot) ──────────────────────
  static async loadAll(): Promise<ReferenceDataStore> {
    const [skills, careerGoals, industries, institutions, academicLevels,
      cities, countries, companySizes, opportunityTypes, experienceLevels,
      workModes, mentorshipGoals, availabilityDays, timezones,
      projectCategories, applicationRequirements, announcementTypes] = await Promise.all([
      this.getSkills(),
      this.getCareerGoals(),
      this.getIndustries(),
      this.getInstitutions(),
      this.getAcademicLevels(),
      this.getCities(),
      this.getCountries(),
      this.getCompanySizes(),
      this.getOpportunityTypes(),
      this.getExperienceLevels(),
      this.getWorkModes(),
      this.getMentorshipGoals(),
      this.getAvailabilityDays(),
      this.getTimezones(),
      this.getProjectCategories(),
      this.getApplicationRequirements(),
      this.getAnnouncementTypes(),
    ])

    return {
      skills, careerGoals, industries, institutions, programmes: [],
      academicLevels, countries, regions: [], cities, companySizes,
      opportunityTypes, experienceLevels, workModes, mentorshipGoals,
      availabilityDays, timezones, projectCategories, applicationRequirements,
      announcementTypes,
    }
  }
}
