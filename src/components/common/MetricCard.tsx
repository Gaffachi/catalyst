"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  changeText: string
  changeType: "increase" | "decrease" | "neutral"
  metricLabel: string
  progressValue?: number
  footerText?: string
}

export function MetricCard({
  title,
  value,
  changeText,
  changeType,
  metricLabel,
  progressValue,
  footerText,
}: MetricCardProps) {
  const Icon = changeType === "increase" ? TrendingUp : changeType === "decrease" ? TrendingDown : Minus
  const colorClass =
    changeType === "increase"
      ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/40"
      : changeType === "decrease"
      ? "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800/40"
      : "text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/40"

  const targetWidth = progressValue !== undefined ? `${progressValue}%` : "100%"

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full"
    >
      <div className="group px-6 py-6 rounded-2xl border border-border/70 bg-card/90 dark:bg-slate-900/90 text-card-foreground shadow-sm hover:shadow-xl hover:shadow-accent/5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col h-[300px] w-full shrink-0 relative overflow-hidden backdrop-blur-xs">
        
        {/* Subtle hover accent highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* 1. Title */}
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest line-clamp-1 select-none">
          {title}
        </span>

        {/* 2. Value and Badge Row */}
        <div className="flex items-center justify-between mt-3 select-none">
          <h4 className="text-3xl font-black tracking-tight text-foreground font-heading group-hover:text-accent transition-colors duration-200">
            {value}
          </h4>
          <div className={`flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full border shadow-xs shrink-0 ${colorClass}`}>
            <Icon className="size-3.5 group-hover:scale-110 transition-transform duration-200" />
            <span>{changeText}</span>
          </div>
        </div>

        {/* 3. Metric Description / Label */}
        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-2 h-8">
          {metricLabel}
        </p>

        {/* 4. Spacer */}
        <div className="flex-1" />

        {/* 5. Standardized Progress Section with Framer Motion Fill */}
        <div className="space-y-2 mt-4 select-none">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
            <span>{progressValue !== undefined ? "Progress Gate" : "Tracking Status"}</span>
            <span className="text-accent">{progressValue !== undefined ? `${progressValue}%` : "100%"}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: targetWidth }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className={`h-full rounded-full ${
                progressValue !== undefined 
                  ? "bg-gradient-to-r from-accent to-orange-500 shadow-xs" 
                  : "bg-slate-400 dark:bg-slate-600"
              }`}
            />
          </div>
        </div>

        {/* 6. Divider */}
        <hr className="border-t border-border/40 my-3.5 shrink-0" />

        {/* 7. Bottom Supporting Text */}
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-normal mt-auto h-8 line-clamp-2">
          {footerText || "System verified outcome"}
        </div>

      </div>
    </motion.div>
  )
}
