"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { LucideIcon, ArrowRight, Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  color?: string
  bulletPoints?: string[]
  href?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  color = "from-accent to-orange-600",
  bulletPoints,
  href,
}: FeatureCardProps) {
  const cardBody = (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group relative flex flex-col justify-between h-full border-border/70 bg-card/90 dark:bg-slate-900/90 shadow-sm hover:shadow-xl hover:shadow-accent/5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-xs">
        {/* Subtle hover gradient top border */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <CardHeader className="space-y-4 p-6">
          {/* Visual Icon Node */}
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-md shadow-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            <Icon className="size-6" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-lg font-bold group-hover:text-accent transition-colors duration-200">
              {title}
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between">
          {/* Bullet checklist points */}
          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="space-y-2.5 pt-3 text-xs border-t border-border/40">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 group/item">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5 group-hover/item:bg-accent group-hover/item:text-white transition-colors duration-200">
                    <Check className="size-2.5" />
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 leading-normal font-medium">{point}</span>
                </li>
              ))}
            </ul>
          )}
          
          {/* Learn More link */}
          {href && (
            <div className="pt-4 flex items-center justify-end text-xs text-accent font-bold tracking-wide mt-auto">
              <span className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                Learn More <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardBody}
      </Link>
    )
  }

  return <div className="h-full">{cardBody}</div>
}
