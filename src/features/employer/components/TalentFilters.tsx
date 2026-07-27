import * as React from "react"
import { Search, Filter, RefreshCw } from "lucide-react"

interface TalentFiltersProps {
  searchQuery: string
  setSearchQuery: (q: string) => void
  minScore: number
  setMinScore: (s: number) => void
  verifiedOnly: boolean
  setVerifiedOnly: (v: boolean) => void
  onReset: () => void
}

export function TalentFilters({
  searchQuery,
  setSearchQuery,
  minScore,
  setMinScore,
  verifiedOnly,
  setVerifiedOnly,
  onReset,
}: TalentFiltersProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 border border-border/60 rounded-2xl shadow-sm space-y-4 select-none">
      <div className="flex justify-between items-center border-b border-border/30 pb-2">
        <h3 className="font-heading text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Filter className="size-3.5 text-accent" />
          Filter Candidate Pool
        </h3>
        <button
          onClick={onReset}
          className="text-[10px] text-slate-400 hover:text-accent font-bold flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="size-3" />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, skill, programme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs w-full bg-background border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Readiness Score Threshold */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 shrink-0">Min Readiness:</span>
          <select
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="h-8 text-xs w-full bg-background border border-slate-200 rounded-lg px-2 focus:outline-none"
          >
            <option value={0}>All Readiness Scores</option>
            <option value={75}>75%+ (Highly Ready)</option>
            <option value={80}>80%+ (Top Competency)</option>
            <option value={85}>85%+ (Elite Graduates)</option>
          </select>
        </div>

        {/* Mentor Verification Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="verifiedOnly"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
          />
          <label htmlFor="verifiedOnly" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
            Mentor Verified Portfolios Only
          </label>
        </div>
      </div>
    </div>
  )
}
