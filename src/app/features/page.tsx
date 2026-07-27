"use client"

import * as React from "react"
import { HeroSection } from "@/components/common/HeroSection"
import { FeatureCard } from "@/components/common/FeatureCard"
import { Container } from "@/components/common/Container"
import { Compass, Briefcase, GraduationCap, FolderGit, Network, BarChart3 } from "lucide-react"

export default function FeaturesPage() {
  const list = [
    {
      title: "Career Guidance",
      description: "Maps student coursework directly against real-world technical roles. Identifies critical skill gaps and outlines courses needed to achieve professional qualifications.",
      icon: Compass,
      color: "from-blue-500 to-indigo-600",
      bullets: ["Curriculum mapping grids", "Technical job pathways", "Skills recommendations"]
    },
    {
      title: "Mentorship Network",
      description: "Creates structured, verified channels of feedback connecting students with academic and industry professionals. Allows portfolio evaluations and schedule checks.",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      bullets: ["Appointment calendars scheduler", "Feedback evaluation notes", "Direct messaging logs"]
    },
    {
      title: "Internship Management",
      description: "Saves departments time by coordinating student placements. Employers post validated roles, students submit profile resumes, and coordinators audit status lists.",
      icon: Briefcase,
      color: "from-orange-500 to-red-600",
      bullets: ["Coordinated application tracking", "Departmental moderation panels", "Verification checklists"]
    },
    {
      title: "Professional Portfolio",
      description: "Enables students to present verified academic project submissions, credentials, and experience profiles. Supports direct link integration and skill badges.",
      icon: FolderGit,
      color: "from-purple-500 to-pink-600",
      bullets: ["Verified project showcase cards", "Skills validation badges", "GitHub API integrations"]
    },
    {
      title: "Industry Connection",
      description: "Fosters corporate partnerships. Allows vetted employers to run searches across cohorts, filter candidates by specific project stacks, and offer interviews.",
      icon: Network,
      color: "from-amber-500 to-orange-600",
      bullets: ["Recruiter talent filters", "Corporate profile builders", "Direct interview setups"]
    },
    {
      title: "Career Analytics",
      description: "Provides departments and institutions with real-time insight into placement stats, average assess competence, and graduate tracking outcomes.",
      icon: BarChart3,
      color: "from-teal-500 to-emerald-600",
      bullets: ["Cohort readiness analytics reports", "Placement progression indicators", "Employability outcomes datasets"]
    }
  ]

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        title="Catalyst Core Features"
        highlightedWord="Module Directory"
        subtitle="A digital system grouping five core ICT career development features into a single, intuitive institution dashboard interface."
        badge="System Modules"
      />

      <section className="w-full py-16 md:py-24 flex justify-center items-center">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {list.map((feat) => (
              <FeatureCard 
                key={feat.title}
                title={feat.title}
                description={feat.description}
                icon={feat.icon}
                color={feat.color}
                bulletPoints={feat.bullets}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
