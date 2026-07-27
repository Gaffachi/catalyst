"use client"

/**
 * SkillTagInput
 * Reusable searchable multi-select component for skills.
 * Used across Student onboarding, Mentor specialty, Employer opportunity form, and Project portfolio.
 * Reads from ReferenceDataService — swap to API call in Phase 7 with zero UI change.
 */
import * as React from "react"
import { X, Search, ChevronDown } from "lucide-react"
import { Skill, SkillCategory } from "../types/reference.types"
import { ReferenceDataService } from "../services/reference.service"
import { SKILL_CATEGORIES } from "../constants/skills.data"

interface SkillTagInputProps {
  label?: string
  value: number[]                          // array of selected skill IDs
  onChange: (ids: number[]) => void
  placeholder?: string
  maxItems?: number                        // limit number of tags
  filterCategory?: SkillCategory          // restrict to one category
  disabled?: boolean
  error?: string
  className?: string
}

export function SkillTagInput({
  label = "Skills",
  value,
  onChange,
  placeholder = "Search and add skills...",
  maxItems,
  filterCategory,
  disabled = false,
  error,
  className = "",
}: SkillTagInputProps) {
  const [allSkills, setAllSkills] = React.useState<Skill[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeCategory, setActiveCategory] = React.useState<SkillCategory | "All">("All")
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Load skills on mount
  React.useEffect(() => {
    ReferenceDataService.getSkills(filterCategory).then((skills) => {
      setAllSkills(skills)
      setIsLoading(false)
    })
  }, [filterCategory])

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const selectedSkills = allSkills.filter((s) => value.includes(s.id))

  const filteredSkills = allSkills.filter((s) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(q) ||
      s.aliases?.some((a) => a.toLowerCase().includes(q))
    const matchesCategory = activeCategory === "All" || s.category === activeCategory
    const notSelected = !value.includes(s.id)
    return matchesSearch && matchesCategory && notSelected
  })

  const handleSelect = (skill: Skill) => {
    if (maxItems && value.length >= maxItems) return
    onChange([...value, skill.id])
    setSearchQuery("")
  }

  const handleRemove = (skillId: number) => {
    onChange(value.filter((id) => id !== skillId))
  }

  const categoryColors: Record<SkillCategory, string> = {
    "Frontend":      "bg-blue-50 text-blue-700 border-blue-200",
    "Backend":       "bg-green-50 text-green-700 border-green-200",
    "Database":      "bg-purple-50 text-purple-700 border-purple-200",
    "Cloud & DevOps": "bg-orange-50 text-orange-700 border-orange-200",
    "Mobile":        "bg-pink-50 text-pink-700 border-pink-200",
    "Data & AI":     "bg-indigo-50 text-indigo-700 border-indigo-200",
    "Security":      "bg-red-50 text-red-700 border-red-200",
    "Design":        "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Other":         "bg-slate-50 text-slate-700 border-slate-200",
  }

  return (
    <div ref={containerRef} className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide">
          {label}
          {maxItems && <span className="ml-1 font-normal text-muted-foreground">({value.length}/{maxItems})</span>}
        </label>
      )}

      {/* Selected Tags */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50/60 rounded-lg border border-border/50 min-h-[36px]">
          {selectedSkills.map((skill) => (
            <span
              key={skill.id}
              className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColors[skill.category]}`}
            >
              {skill.name}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemove(skill.id)}
                  className="hover:opacity-60 transition-opacity cursor-pointer"
                  aria-label={`Remove ${skill.name}`}
                >
                  <X className="size-2.5" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Search className="size-3.5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          placeholder={disabled ? "Disabled" : maxItems && value.length >= maxItems ? `Max ${maxItems} skills selected` : placeholder}
          disabled={disabled || (!!maxItems && value.length >= maxItems)}
          className="flex h-9 w-full rounded-lg border border-input bg-background pl-8 pr-3 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <ChevronDown className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full max-w-md bg-background border border-border rounded-xl shadow-lg overflow-hidden mt-0.5">
          {/* Category Filter Tabs */}
          {!filterCategory && (
            <div className="flex gap-1 p-2 border-b border-border/50 overflow-x-auto">
              {(["All", ...SKILL_CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          <div className="max-h-48 overflow-y-auto p-1.5">
            {isLoading ? (
              <p className="text-[10px] text-center py-4 text-muted-foreground">Loading skills...</p>
            ) : filteredSkills.length === 0 ? (
              <p className="text-[10px] text-center py-4 text-muted-foreground italic">
                {searchQuery ? `No skills matching "${searchQuery}"` : "No more skills available"}
              </p>
            ) : (
              filteredSkills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleSelect(skill)}
                  className="w-full text-left flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg hover:bg-accent/40 transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-medium text-foreground">{skill.name}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${categoryColors[skill.category]}`}>
                    {skill.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Validation error */}
      {error && <p className="text-[10px] text-rose-600 font-semibold">{error}</p>}
    </div>
  )
}
