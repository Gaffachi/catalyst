"use client"

import * as React from "react"
import { HeroSection } from "@/components/common/HeroSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Container } from "@/components/common/Container"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Target, AlertTriangle, Users, BarChart3, School, Sparkles } from "lucide-react"

export default function AboutPage() {
  const objectives = [
    {
      title: "Catalyst Vision",
      description: "To build a robust digital career ecosystem that aligns academic studies with modern industry requirements, ensuring every ICT student is equipped for professional success.",
      icon: Target,
      color: "border-blue-200 dark:border-blue-900 bg-blue-50/20"
    },
    {
      title: "The Problem Solved",
      description: "Traditional career guidance is often fragmented, with manual tracking of student portfolios, informal mentor outreach, and manual paperwork for student internships.",
      icon: AlertTriangle,
      color: "border-amber-200 dark:border-amber-900 bg-amber-50/20"
    }
  ]

  const users = [
    {
      role: "Students",
      description: "Build project-verified resumes, track skill competency matrices, and apply directly to coordinated industry internships."
    },
    {
      role: "Mentors",
      description: "Conduct schedule consultations, review project portfolio artifacts, and provide feedback on technical competencies."
    },
    {
      role: "Employers",
      description: "Post internship positions, review project portfolios, and search students filtered by target technical stacks."
    },
    {
      role: "Academic Departments",
      description: "Monitor student placement statuses, audit partner company records, and gather graduate employability reports."
    }
  ]

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        title="About Catalyst"
        highlightedWord="Career Development Platform"
        subtitle="Empowering academic institutions to monitor student employability indicators while bridging the gap between classroom and industry partnerships."
        badge="Vision & Mission"
      />

      {/* Innovation Lab Photo Banner Section */}
      <section className="w-full py-12 border-b border-border/40 bg-slate-900 text-white overflow-hidden">
        <Container>
          <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src="/images/about_vision_lab.jpg" 
              alt="University Tech Innovation Lab" 
              loading="lazy"
              decoding="async"
              className="w-full h-[360px] md:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent p-8 md:p-12 flex flex-col justify-end">
              <div className="max-w-xl space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-slate-950/80 px-3.5 py-1 text-xs font-semibold text-accent backdrop-blur-md">
                  <Sparkles className="size-3.5 text-accent animate-pulse" />
                  <span>Next-Gen Academic Technology Hub</span>
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  State-of-the-Art Student Growth Environments
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Connecting computer science and IT faculties with real-world software project methodologies and corporate mentorship networks.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Objectives Section */}
      <section className="w-full py-16 md:py-24 border-b border-border/40 flex justify-center items-center">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {objectives.map((obj) => {
              const Icon = obj.icon
              return (
                <div key={obj.title} className={`p-8 rounded-2xl border ${obj.color} flex gap-5 items-start`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-border/40 shrink-0">
                    <Icon className="size-5 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {obj.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {obj.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Target Audience User Matrix */}
      <section className="w-full py-16 md:py-24 border-b border-border/40 bg-muted/5 flex justify-center items-center">
        <Container>
          <div className="space-y-12 max-w-5xl mx-auto">
            <SectionHeading 
              title="Our Target Ecosystem Roles" 
              subtitle="Catalyst synchronizes four key stakeholders to build a comprehensive career ready loop."
              badge="Platform Matrix"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {users.map((user) => (
                <Card key={user.role} className="p-6">
                  <CardHeader className="p-0 mb-3 flex flex-row items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <CardTitle className="text-base font-bold">{user.role}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {user.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Expected Impact Section */}
      <section className="w-full py-16 md:py-24 flex justify-center items-center">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12 text-center flex flex-col items-center">
            <SectionHeading 
              title="Expected Outcomes & Impact" 
              subtitle="Developing digital pipelines to support student employability and align coursework with industry needs."
              badge="Project Metrics"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full pt-4">
              <div className="space-y-2 p-6 border border-border/40 rounded-xl bg-card">
                <School className="size-8 mx-auto text-accent mb-2" />
                <h4 className="font-heading font-black text-2xl text-foreground">100%</h4>
                <p className="text-xs text-muted-foreground">Placement Coordination Audit</p>
              </div>
              <div className="space-y-2 p-6 border border-border/40 rounded-xl bg-card">
                <Users className="size-8 mx-auto text-accent mb-2" />
                <h4 className="font-heading font-black text-2xl text-foreground">3x</h4>
                <p className="text-xs text-muted-foreground">Increase in Mentorship Bookings</p>
              </div>
              <div className="space-y-2 p-6 border border-border/40 rounded-xl bg-card">
                <BarChart3 className="size-8 mx-auto text-accent mb-2" />
                <h4 className="font-heading font-black text-2xl text-foreground">Realtime</h4>
                <p className="text-xs text-muted-foreground">Skill Gap assessment logs</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
