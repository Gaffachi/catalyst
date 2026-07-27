"use client"

import * as React from "react"
import { HeroSection } from "@/components/common/HeroSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Container } from "@/components/common/Container"
import { Search, Send, BarChart2, Sparkles } from "lucide-react"

export default function InternshipsPage() {
  const columns = [
    {
      title: "Opportunity Discovery",
      description: "Search corporate internship openings approved by the academic department. Filter by position, location, type, and target skill tags.",
      icon: Search
    },
    {
      title: "One-Click Applications",
      description: "Submit your verified project portfolio profile directly. Recruiters view projects, skill ratings, and mentor validation notes immediately.",
      icon: Send
    },
    {
      title: "Placement Tracking",
      description: "Monitor application stages (Applied, Under Review, Interviewing, Offered) via a visual Kanban progress board on your dashboard.",
      icon: BarChart2
    }
  ]

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        title="Department-Coordinated"
        highlightedWord="Internship Portal"
        subtitle="Bridging academic study terms and career starts by connecting ICT cohorts with vetted internship roles."
        badge="Internship Hub"
        ctaText="Browse Positions"
        ctaHref="/register?role=student"
      />

      {/* Internship Photo Showcase Banner Section */}
      <section className="w-full py-12 border-b border-border/40 bg-slate-900 text-white overflow-hidden">
        <Container>
          <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src="/images/internship_workspace.jpg" 
              alt="Intern software developers in workplace" 
              loading="lazy"
              decoding="async"
              className="w-full h-[360px] md:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent p-8 md:p-12 flex flex-col justify-end">
              <div className="max-w-xl space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-slate-950/80 px-3.5 py-1 text-xs font-semibold text-accent backdrop-blur-md">
                  <Sparkles className="size-3.5 text-accent animate-pulse" />
                  <span>Real-World Internship Experience</span>
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Accelerate Your Tech Career in Modern Workspaces
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Apply directly to vetted company placement positions, collaborate on live production stacks, and receive institutional credit toward your degree.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pillars Section */}
      <section className="w-full py-16 md:py-24 border-b border-border/40 flex justify-center items-center">
        <Container>
          <div className="space-y-12 max-w-5xl mx-auto">
            <SectionHeading 
              title="How Placements are Managed" 
              subtitle="From discovering openings to signing offers, the platform automates manual coordination steps."
              badge="Internship Workflow"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {columns.map((col) => {
                const Icon = col.icon
                return (
                  <div key={col.title} className="space-y-4 p-6 rounded-xl border border-border/40 bg-card hover:shadow-md transition-shadow duration-200">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent shadow-sm">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {col.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
