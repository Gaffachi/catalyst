"use client"

import * as React from "react"
import { HeroSection } from "@/components/common/HeroSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Container } from "@/components/common/Container"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, UserCheck, MessageSquare, Award, Sparkles } from "lucide-react"

export default function MentorshipPage() {
  const steps = [
    {
      title: "1. Mentor Discovery",
      description: "Students filter industry professionals and academic mentors by technology stack, company, and background.",
      icon: UserCheck
    },
    {
      title: "2. Schedule Consultations",
      description: "Reserve meeting times directly using the mentor's integrated calendar interface, avoiding back-and-forth emails.",
      icon: Calendar
    },
    {
      title: "3. Project Evaluation",
      description: "Share project portfolios and code links directly within the consultation panel to get technical audits.",
      icon: MessageSquare
    },
    {
      title: "4. Receive Feedbacks & Badges",
      description: "Mentors log post-session notes and approve competency skill ratings that display directly on the student profile.",
      icon: Award
    }
  ]

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        title="Structured Academic & Professional"
        highlightedWord="Mentorship Hub"
        subtitle="Bridging the gap between theory and industry experience by pairing ICT students with seasoned engineering professionals."
        badge="Mentorship Network"
        ctaText="Find a Mentor"
        ctaHref="/register?role=student"
      />

      {/* Mentorship Photo Showcase Banner Section */}
      <section className="w-full py-12 border-b border-border/40 bg-slate-900 text-white overflow-hidden">
        <Container>
          <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src="/images/mentor_guidance.jpg" 
              alt="Mentorship session in action" 
              loading="lazy"
              decoding="async"
              className="w-full h-[360px] md:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent p-8 md:p-12 flex flex-col justify-end">
              <div className="max-w-xl space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-slate-950/80 px-3.5 py-1 text-xs font-semibold text-accent backdrop-blur-md">
                  <Sparkles className="size-3.5 text-accent animate-pulse" />
                  <span>Verified Professional Coaching</span>
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Personalized Engineering Portfolio Guidance
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Connect 1-on-1 with senior developers and tech leaders to refine your code, review architecture, and receive verified competency badges.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking Steps Section */}
      <section className="w-full py-16 md:py-24 border-b border-border/40 flex justify-center items-center">
        <Container>
          <div className="space-y-12 max-w-5xl mx-auto">
            <SectionHeading 
              title="How Mentorship Booking Works" 
              subtitle="A step-by-step digital process from discovering mentors to logging assessment details."
              badge="User Workflow"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <Card key={step.title} className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="p-0 space-y-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent shadow-sm">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="text-base font-bold">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-3 flex-1">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
