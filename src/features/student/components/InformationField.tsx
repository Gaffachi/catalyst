import * as React from "react"

interface InformationFieldProps {
  label: string
  value: string | React.ReactNode
}

export function InformationField({ label, value }: InformationFieldProps) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        {label}
      </span>
      {typeof value === "string" ? (
        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 block">
          {value}
        </span>
      ) : (
        <div className="block">{value}</div>
      )}
    </div>
  )
}
