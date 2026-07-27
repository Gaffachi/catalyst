"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react"

interface OpportunityFilterProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  typeFilter: string
  setTypeFilter: (val: string) => void
  workModeFilter: string
  setWorkModeFilter: (val: string) => void
  experienceFilter: string
  setExperienceFilter: (val: string) => void
  locationFilter: string
  setLocationFilter: (val: string) => void
  skillsFilter: string
  setSkillsFilter: (val: string) => void
}

export function OpportunityFilter({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  workModeFilter,
  setWorkModeFilter,
  experienceFilter,
  setExperienceFilter,
  locationFilter,
  setLocationFilter,
  skillsFilter,
  setSkillsFilter,
}: OpportunityFilterProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  return (
    <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border/60 shadow-sm w-full select-none">
      {/* Primary search row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input 
            type="text" 
            placeholder="Search by role title, company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-xs w-full bg-background border-slate-200"
          />
        </div>

        {/* Opportunity Type Select */}
        <div className="w-full sm:w-48 shrink-0">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="flex h-10 w-full rounded-lg border border-slate-200 bg-background px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="All">All Categories</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="GRADUATE_PROGRAM">Graduate Program</option>
            <option value="FULL_TIME">Full-Time</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </div>

        {/* Toggle Advanced Filters */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-center gap-1.5 h-10 px-3.5 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold shrink-0 w-full sm:w-auto cursor-pointer"
        >
          <SlidersHorizontal className="size-3.5" />
          <span>Advanced Filters</span>
          {showAdvanced ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </button>
      </div>

      {/* Advanced filters collapsible box drawer panels */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-border/40 animate-in slide-in-from-top-2 duration-200">
          {/* Work Mode */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Work Mode</label>
            <select
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-slate-200 bg-background px-2.5 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="All">All Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Experience Level</label>
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-slate-200 bg-background px-2.5 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="All">All Levels</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Graduate Level">Graduate Level</option>
              <option value="Junior Level">Junior Level</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Location</label>
            <Input 
              type="text" 
              placeholder="E.g. Accra, Remote" 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="h-9 text-xs bg-background border-slate-200"
            />
          </div>

          {/* Skills */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Skills Required</label>
            <Input 
              type="text" 
              placeholder="E.g. React, SQL" 
              value={skillsFilter}
              onChange={(e) => setSkillsFilter(e.target.value)}
              className="h-9 text-xs bg-background border-slate-200"
            />
          </div>
        </div>
      )}
    </div>
  )
}
