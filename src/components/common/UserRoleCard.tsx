"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { LucideIcon, Check, ArrowRight } from "lucide-react"

interface UserRoleCardProps {
  title: string
  subtitle: string
  items: string[]
  icon: LucideIcon
  ctaText?: string
  ctaHref?: string
}

export function UserRoleCard({
  title,
  subtitle,
  items,
  icon: Icon,
  ctaText = "Register Path",
  ctaHref = "/register",
}: UserRoleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <div className="group flex flex-col justify-between p-6 rounded-2xl border border-border/70 bg-card/90 dark:bg-slate-900/90 text-card-foreground shadow-sm hover:shadow-xl hover:shadow-accent/5 hover:border-accent/40 transition-all duration-300 h-full relative overflow-hidden backdrop-blur-xs">
        
        {/* Subtle top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="space-y-5">
          {/* Card Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-accent shadow-md shadow-slate-900/10 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
              <Icon className="size-5 transition-transform duration-300 group-hover:rotate-3" />
            </div>
            <h3 className="font-heading text-lg font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
              {title}
            </h3>
          </div>

          {/* Subtitle */}
          <p className="text-xs leading-relaxed text-muted-foreground font-normal">
            {subtitle}
          </p>

          {/* Action checklist */}
          <ul className="space-y-2.5 pt-3 text-xs border-t border-border/40">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5 group/item">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5 group-hover/item:bg-accent group-hover/item:text-white transition-colors duration-200">
                  <Check className="size-2.5" />
                </span>
                <span className="text-slate-700 dark:text-slate-300 leading-normal font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button CTA Link */}
        {ctaText && (
          <div className="pt-6 mt-auto">
            <Link href={ctaHref} className="block">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent group-hover:text-accent/90 transition-all cursor-pointer">
                <span>{ctaText}</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}
