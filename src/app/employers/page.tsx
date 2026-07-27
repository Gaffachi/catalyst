"use client"

import * as React from "react"
import { HeroSection } from "@/components/common/HeroSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Container } from "@/components/common/Container"
import { Search, PlusCircle, Handshake, Sparkles } from "lucide-react"

export default function EmployersPage() {
  const corporatePillars = [
    {
      title: "Talent Discovery",
      description: "Search and filter student profiles based on project-validated technical stacks, course completions, and mentor evaluations.",
      icon: Search
    },
    {
      title: "Streamlined Job Posting",
      description: "Post internship opportunities, filter incoming profiles, schedule interview loops, and update hiring statuses in one interface.",
      icon: PlusCircle
    },
    {
      title: "Institutional Partnerships",
      description: "Collaborate directly with department heads to structure coursework, sponsor capstone projects, and evaluate student readiness.",
      icon: Handshake
    }
  ]

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        title="Source and Vet ICT Talents"
        highlightedWord="Directly from the Source"
        subtitle="Connect with academic cohorts, manage internship pipelines, and hire student resources with verified portfolios."
        badge="For Employers"
        ctaText="Register as Employer"
        ctaHref="/register?role=employer"
      />

      {/* Employer Photo Showcase Banner Section */}
      <section className="w-full py-12 border-b border-border/40 bg-slate-900 text-white overflow-hidden">
        <Container>
          <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src="/images/employer_hiring.jpg" 
              alt="Employers reviewing candidate tech portfolios" 
              loading="lazy"
              decoding="async"
              className="w-full h-[360px] md:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent p-8 md:p-12 flex flex-col justify-end">
              <div className="max-w-xl space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-slate-950/80 px-3.5 py-1 text-xs font-semibold text-accent backdrop-blur-md">
                  <Sparkles className="size-3.5 text-accent animate-pulse" />
                  <span>Verified Corporate Recruiting</span>
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Source Vetted Student Engineering Talent
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Access student portfolios backed by real code repositories, academic verification, and mentor evaluations to build your corporate talent pipeline.
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
              title="How Catalyst Drives Recruitment" 
              subtitle="Skip manual CV parsing. Access candidate records backed by code submissions and mentor reviews."
              badge="Recruiting Solutions"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {corporatePillars.map((col) => {
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
