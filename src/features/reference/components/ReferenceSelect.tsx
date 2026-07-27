"use client"

/**
 * ReferenceSelect — Generic single-select for any reference data list.
 * ReferenceMultiSelect — Generic multi-select with tag display.
 * Used for: Industries, Institutions, Career Goals, Company Sizes, Work Modes, etc.
 */
import * as React from "react"
import { X, ChevronDown, Search, Check } from "lucide-react"
import { ReferenceItem } from "../types/reference.types"

// ── Single Select ───────────────────────────────────────────────────────────────────────
interface ReferenceSelectProps<T extends ReferenceItem> {
  label?: string
  items: T[]
  value: number | null                     // selected item id
  onChange: (id: number | null) => void
  placeholder?: string
  displayKey?: keyof T                     // field to show, defaults to "name"
  disabled?: boolean
  isLoading?: boolean
  error?: string
  searchable?: boolean
  className?: string
}

export function ReferenceSelect<T extends ReferenceItem>({
  label,
  items,
  value,
  onChange,
  placeholder = "Select an option...",
  displayKey = "name" as keyof T,
  disabled = false,
  isLoading = false,
  error,
  searchable = true,
  className = "",
}: ReferenceSelectProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

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

  const selectedItem = items.find((i) => i.id === value) ?? null
  const displayValue = selectedItem ? String(selectedItem[displayKey]) : ""

  const filteredItems = searchQuery
    ? items.filter((i) =>
        String(i[displayKey]).toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items

  return (
    <div ref={containerRef} className={`space-y-1.5 relative ${className}`}>
      {label && (
        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide">{label}</label>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled || isLoading}
        className={`flex h-9 w-full items-center justify-between rounded-lg border bg-background px-3 text-xs shadow-sm transition-colors ${
          error ? "border-rose-400" : "border-input"
        } ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-accent/50"}`}
      >
        <span className={displayValue ? "text-foreground font-medium" : "text-muted-foreground"}>
          {isLoading ? "Loading..." : displayValue || placeholder}
        </span>
        <div className="flex items-center gap-1">
          {selectedItem && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onChange(null) }}
              className="p-0.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Clear selection"
            >
              <X className="size-3" />
            </span>
          )}
          <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full bg-background border border-border rounded-xl shadow-lg overflow-hidden mt-0.5">
          {searchable && (
            <div className="p-2 border-b border-border/50">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="h-7 w-full rounded-md border border-input bg-background pl-7 pr-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring/40"
                />
              </div>
            </div>
          )}
          <div className="max-h-48 overflow-y-auto p-1">
            {filteredItems.length === 0 ? (
              <p className="text-[10px] text-center py-4 text-muted-foreground italic">No results found</p>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { onChange(item.id); setIsOpen(false); setSearchQuery("") }}
                  className="w-full text-left flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg hover:bg-accent/40 transition-colors cursor-pointer text-xs"
                >
                  <span className={item.id === value ? "font-bold text-foreground" : "text-foreground"}>
                    {String(item[displayKey])}
                  </span>
                  {item.id === value && <Check className="size-3 text-accent shrink-0" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="text-[10px] text-rose-600 font-semibold">{error}</p>}
    </div>
  )
}

// ── Multi Select ───────────────────────────────────────────────────────────────────────
interface ReferenceMultiSelectProps<T extends ReferenceItem> {
  label?: string
  items: T[]
  value: number[]                          // array of selected IDs
  onChange: (ids: number[]) => void
  placeholder?: string
  displayKey?: keyof T
  maxItems?: number
  disabled?: boolean
  isLoading?: boolean
  error?: string
  tagColor?: string
  className?: string
}

export function ReferenceMultiSelect<T extends ReferenceItem>({
  label,
  items,
  value,
  onChange,
  placeholder = "Select options...",
  displayKey = "name" as keyof T,
  maxItems,
  disabled = false,
  isLoading = false,
  error,
  tagColor = "bg-slate-100 text-slate-700 border-slate-200",
  className = "",
}: ReferenceMultiSelectProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

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

  const selectedItems = items.filter((i) => value.includes(i.id))
  const availableItems = items.filter(
    (i) => !value.includes(i.id) &&
      (searchQuery ? i.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  )
  const reachedMax = !!maxItems && value.length >= maxItems

  const handleSelect = (item: T) => {
    if (reachedMax) return
    onChange([...value, item.id])
  }

  const handleRemove = (id: number) => onChange(value.filter((v) => v !== id))

  return (
    <div ref={containerRef} className={`space-y-1.5 relative ${className}`}>
      {label && (
        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide">
          {label}
          {maxItems && (
            <span className="ml-1 font-normal text-muted-foreground">({value.length}/{maxItems})</span>
          )}
        </label>
      )}

      {/* Tags row */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedItems.map((item) => (
            <span key={item.id} className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColor}`}>
              {String(item[displayKey])}
              {!disabled && (
                <button type="button" onClick={() => handleRemove(item.id)} className="hover:opacity-60 cursor-pointer">
                  <X className="size-2.5" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && !reachedMax && setIsOpen(!isOpen)}
        disabled={disabled || isLoading || reachedMax}
        className={`flex h-9 w-full items-center justify-between rounded-lg border bg-background px-3 text-xs shadow-sm transition-colors ${
          error ? "border-rose-400" : "border-input"
        } ${disabled || reachedMax ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-accent/50"}`}
      >
        <span className="text-muted-foreground">
          {isLoading ? "Loading..." : reachedMax ? `Max ${maxItems} selected` : placeholder}
        </span>
        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full bg-background border border-border rounded-xl shadow-lg overflow-hidden mt-0.5">
          <div className="p-2 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="h-7 w-full rounded-md border border-input bg-background pl-7 pr-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring/40"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto p-1">
            {availableItems.length === 0 ? (
              <p className="text-[10px] text-center py-4 text-muted-foreground italic">No more options</p>
            ) : (
              availableItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { handleSelect(item); setSearchQuery("") }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-accent/40 transition-colors cursor-pointer text-xs text-foreground"
                >
                  {String(item[displayKey])}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="text-[10px] text-rose-600 font-semibold">{error}</p>}
    </div>
  )
}
