"use client"

/**
 * Domain-Specific Reference Selectors
 * Pre-configured wrappers over ReferenceSelect and ReferenceMultiSelect.
 * Every domain identified in the Controlled Data Audit has a dedicated reusable selector.
 * Ready to drop into forms with zero boilerplate.
 */
import * as React from "react"
import { ReferenceSelect, ReferenceMultiSelect } from "./ReferenceSelect"
import { SkillTagInput } from "./SkillTagInput"
import { ReferenceDataService } from "../services/reference.service"
import type {
  CareerGoal, Industry, Institution, City, CompanySize, OpportunityType,
  ExperienceLevel, MentorshipGoal, ProjectCategory, AcademicLevel, WorkMode
} from "../types/reference.types"

// ── 1. Skill Selector (Wrapper around SkillTagInput) ──────────────────────────
export const SkillSelector = SkillTagInput

// ── 2. Career Goal Selector ───────────────────────────────────────────────────
interface CareerGoalSelectorProps {
  label?: string
  value: number | null
  onChange: (id: number | null) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function CareerGoalSelector({
  label = "Career Goal",
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}: CareerGoalSelectorProps) {
  const [items, setItems] = React.useState<CareerGoal[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getCareerGoals().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select target career goal..."
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      className={className}
    />
  )
}

// ── 3. Industry Selector ──────────────────────────────────────────────────────
interface IndustrySelectorProps {
  label?: string
  value: number | null
  onChange: (id: number | null) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function IndustrySelector({
  label = "Industry Sector",
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}: IndustrySelectorProps) {
  const [items, setItems] = React.useState<Industry[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getIndustries().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select industry sector..."
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      className={className}
    />
  )
}

// ── 4. Institution Selector ───────────────────────────────────────────────────
interface InstitutionSelectorProps {
  label?: string
  value: number | null
  onChange: (id: number | null) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function InstitutionSelector({
  label = "Institution / University",
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}: InstitutionSelectorProps) {
  const [items, setItems] = React.useState<Institution[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getInstitutions().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select academic institution..."
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      className={className}
    />
  )
}

// ── 5. Location (City) Selector ───────────────────────────────────────────────
interface LocationSelectorProps {
  label?: string
  value: number | null
  onChange: (id: number | null) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function LocationSelector({
  label = "Location",
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}: LocationSelectorProps) {
  const [items, setItems] = React.useState<City[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getCities().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select city / region..."
      displayKey="displayLabel"
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      className={className}
    />
  )
}

// ── 6. Experience Level Selector ─────────────────────────────────────────────
interface ExperienceLevelSelectorProps {
  label?: string
  value: number | null
  onChange: (id: number | null) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function ExperienceLevelSelector({
  label = "Experience Level",
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}: ExperienceLevelSelectorProps) {
  const [items, setItems] = React.useState<ExperienceLevel[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getExperienceLevels().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select experience level..."
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      className={className}
    />
  )
}

// ── 7. Company Size Selector ──────────────────────────────────────────────────
interface CompanySizeSelectorProps {
  label?: string
  value: number | null
  onChange: (id: number | null) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function CompanySizeSelector({
  label = "Company Size",
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}: CompanySizeSelectorProps) {
  const [items, setItems] = React.useState<CompanySize[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getCompanySizes().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select company size..."
      displayKey="label"
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      className={className}
    />
  )
}

// ── 8. Mentorship Goal Selector ──────────────────────────────────────────────
interface MentorshipGoalSelectorProps {
  label?: string
  value: number[]
  onChange: (ids: number[]) => void
  disabled?: boolean
  error?: string
  maxItems?: number
  className?: string
}

export function MentorshipGoalSelector({
  label = "Mentorship Goals",
  value,
  onChange,
  disabled = false,
  error,
  maxItems = 3,
  className = "",
}: MentorshipGoalSelectorProps) {
  const [items, setItems] = React.useState<MentorshipGoal[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getMentorshipGoals().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceMultiSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select mentorship focus goals..."
      maxItems={maxItems}
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      tagColor="bg-purple-50 text-purple-700 border-purple-200"
      className={className}
    />
  )
}

// ── 9. Opportunity Type Selector ──────────────────────────────────────────────
interface OpportunityTypeSelectorProps {
  label?: string
  value: number | null
  onChange: (id: number | null) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function OpportunityTypeSelector({
  label = "Opportunity Type",
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}: OpportunityTypeSelectorProps) {
  const [items, setItems] = React.useState<OpportunityType[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getOpportunityTypes().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select opportunity type..."
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      className={className}
    />
  )
}

// ── 10. Portfolio Category Selector ───────────────────────────────────────────
interface PortfolioCategorySelectorProps {
  label?: string
  value: number | null
  onChange: (id: number | null) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function PortfolioCategorySelector({
  label = "Project Category",
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}: PortfolioCategorySelectorProps) {
  const [items, setItems] = React.useState<ProjectCategory[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ReferenceDataService.getProjectCategories().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ReferenceSelect
      label={label}
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Select project category..."
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      className={className}
    />
  )
}
