"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/common/HeroSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { UserRoleCard } from "@/components/common/UserRoleCard"
import { FeatureCard } from "@/components/common/FeatureCard"
import { MetricCard } from "@/components/common/MetricCard"
import { CTASection } from "@/components/common/CTASection"
import { Container } from "@/components/common/Container"
import { 
  Compass, 
  Briefcase, 
  GraduationCap, 
  FolderGit, 
  Sparkles, 
  Users, 
  Building2, 
  School, 
  Network, 
  BarChart3
} from "lucide-react"

export default function Home() {
  // Ecosystem Visual for Hero with Framer Motion interaction (Memoized to prevent re-renders)
  const visualEcosystem = React.useMemo(() => (
    <div className="relative p-8 w-full max-w-[390px] glass-card rounded-3xl border border-border/80 shadow-2xl shadow-accent/10 overflow-hidden backdrop-blur-xl transform-gpu">
      {/* Ambient background glow inside Ecosystem card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-accent/20 via-orange-400/15 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

      {/* Animated Connector lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-0.5 h-[210px] bg-gradient-to-b from-slate-300/60 via-accent/60 to-slate-300/60 dark:from-slate-700/60 dark:via-accent/60 dark:to-slate-700/60" />
        <div className="h-0.5 w-[210px] bg-gradient-to-r from-slate-300/60 via-accent/60 to-slate-300/60 dark:from-slate-700/60 dark:via-accent/60 dark:to-slate-700/60 absolute" />
      </div>

      {/* Central Catalyst Node */}
      <motion.div 
        whileHover={{ scale: 1.12, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent via-orange-500 to-amber-500 text-white shadow-xl shadow-accent/40 border border-white/40 cursor-pointer"
      >
        <Sparkles className="size-8 animate-pulse" />
      </motion.div>

      {/* Grid Layout Nodes */}
      <div className="grid grid-cols-2 gap-x-20 gap-y-24 relative z-0">
        <motion.div 
          whileHover={{ scale: 1.08, y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white border border-border/80 shadow-md group-hover:bg-accent group-hover:border-accent group-hover:text-white dark:bg-slate-800 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
            <Users className="size-5 text-accent group-hover:text-white transition-colors" />
          </div>
          <span className="mt-2.5 text-xs font-extrabold text-foreground group-hover:text-accent transition-colors">Students</span>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.08, y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white border border-border/80 shadow-md group-hover:bg-accent group-hover:border-accent group-hover:text-white dark:bg-slate-800 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
            <GraduationCap className="size-5 text-accent group-hover:text-white transition-colors" />
          </div>
          <span className="mt-2.5 text-xs font-extrabold text-foreground group-hover:text-accent transition-colors">Mentors</span>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.08, y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white border border-border/80 shadow-md group-hover:bg-accent group-hover:border-accent group-hover:text-white dark:bg-slate-800 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
            <Briefcase className="size-5 text-accent group-hover:text-white transition-colors" />
          </div>
          <span className="mt-2.5 text-xs font-extrabold text-foreground group-hover:text-accent transition-colors">Employers</span>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.08, y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white border border-border/80 shadow-md group-hover:bg-accent group-hover:border-accent group-hover:text-white dark:bg-slate-800 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
            <School className="size-5 text-accent group-hover:text-white transition-colors" />
          </div>
          <span className="mt-2.5 text-xs font-extrabold text-foreground group-hover:text-accent transition-colors">Department</span>
        </motion.div>
      </div>
    </div>
  ), [])

  // Roles details list
  const studentItems = ["Build project portfolios", "Apply to coordinated internships", "Receive mentor assessments"]
  const mentorItems = ["Verify student capabilities", "Conduct scheduling reviews", "Offer industrial feedback"]
  const employerItems = ["Source candidates via skills", "Post approved postings", "Review project portfolios"]
  const institutionItems = ["Track student career gates", "Audit placement metrics", "Approve partner corporate accounts"]

  // Features list
  const features = [
    {
      title: "Career Guidance",
      description: "Helping students understand career pathways and required skills.",
      icon: Compass,
      color: "from-blue-500 to-indigo-600",
      bullets: ["Aligns courses with industry expectations", "Dynamic skill gap profiling"]
    },
    {
      title: "Internship Management",
      description: "Connecting students with relevant industry opportunities.",
      icon: Briefcase,
      color: "from-orange-500 to-red-600",
      bullets: ["Coordinated application tracking", "Departmental placement oversight"]
    },
    {
      title: "Mentorship Network",
      description: "Creating meaningful connections between students and professionals.",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      bullets: ["Structured calendar bookings", "Direct portfolio evaluations"]
    },
    {
      title: "Professional Portfolio",
      description: "Allowing students to showcase skills, projects, and achievements.",
      icon: FolderGit,
      color: "from-purple-500 to-pink-600",
      bullets: ["Project validation badges", "GitHub/Git integration layout"]
    },
    {
      title: "Industry Connection",
      description: "Strengthening collaboration between academia and employers.",
      icon: Network,
      color: "from-amber-500 to-orange-600",
      bullets: ["Recruiter candidate searches", "Vetted student project profiles"]
    },
    {
      title: "Career Analytics",
      description: "Enabling data-driven career growth monitoring for departments.",
      icon: BarChart3,
      color: "from-teal-500 to-emerald-600",
      bullets: ["Student readiness reporting", "Graduate outcome tracking metrics"]
    }
  ]

  // Impact metrics list
  const metrics = [
    {
      title: "Career Readiness",
      value: "84.2%",
      changeText: "+4.6%",
      changeType: "increase" as const,
      metricLabel: "Competency evaluation scores",
      progressValue: 84,
      footerText: "Vetted via mentor criteria list"
    },
    {
      title: "Industry Engagement",
      value: "48",
      changeText: "+8 new",
      changeType: "increase" as const,
      metricLabel: "Active corporate partners registered",
      footerText: "Software and corporate sponsors"
    },
    {
      title: "Skill Development",
      value: "91.8%",
      changeText: "+3.1%",
      changeType: "increase" as const,
      metricLabel: "Course projects completion rates",
      progressValue: 91,
      footerText: "Tracked across cohorts"
    },
    {
      title: "Employment Opportunities",
      value: "96.4%",
      changeText: "Stable",
      changeType: "neutral" as const,
      metricLabel: "Six-month employment ratio",
      progressValue: 96,
      footerText: "Graduate tracking parameters"
    }
  ]

  // Showcase gallery items
  const showcasePhotos = [
    {
      title: "Student Talent & Portfolios",
      subtitle: "Verified Project Showcase",
      description: "Students build market-ready software portfolios backed by GitHub code and academic verification.",
      image: "/images/hero_student.jpg",
      tag: "Students",
    },
    {
      title: "Direct Industry Mentorship",
      subtitle: "Expert 1-on-1 Sessions",
      description: "Senior tech leaders conduct direct portfolio reviews and guide student technical readiness.",
      image: "/images/mentor_guidance.jpg",
      tag: "Mentors",
    },
    {
      title: "Vetted Corporate Placement",
      subtitle: "Employer Hiring Pipeline",
      description: "Recruiters search student cohorts filtered by verified tech stacks and project achievements.",
      image: "/images/employer_hiring.jpg",
      tag: "Employers",
    },
  ]

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection 
        title="Transforming Students Into"
        highlightedWord="Industry-Ready Professionals"
        subtitle="Catalyst connects students, mentors, employers, and institutions through a unified digital career ecosystem designed to improve employability and industry engagement."
        badge="ICT Career Development and Employability Platform"
        ctaText="Join Catalyst"
        secondaryCtaText="Explore Opportunities"
        visual={visualEcosystem}
      />

      {/* 2. Platform Users Section */}
      <section className="relative w-full py-20 md:py-28 border-b border-border/40 flex justify-center items-center overflow-hidden">
        {/* Subtle background ambient blob */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-2xl pointer-events-none transform-gpu" />

        <Container className="relative z-10">
          <div className="space-y-14">
            <SectionHeading 
              title="Platform Users" 
              subtitle="Tailored interfaces providing specialized workspaces for each actor in the career ready pipeline."
              badge="Ecosystem Roles"
            />
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              <UserRoleCard 
                title="Students" 
                subtitle="Build verified profiles, request mentor calls, and submit applications directly to companies."
                items={studentItems}
                icon={Users}
                ctaText="Register as Student"
                ctaHref="/register?role=student"
              />
              <UserRoleCard 
                title="Mentors" 
                subtitle="Guide student projects, verify skill badges, and hold session appointments."
                items={mentorItems}
                icon={GraduationCap}
                ctaText="Join as Mentor"
                ctaHref="/register?role=mentor"
              />
              <UserRoleCard 
                title="Employers" 
                subtitle="Create job openings, query student talent pools, and filter by vetted project stacks."
                items={employerItems}
                icon={Building2}
                ctaText="Partner with us"
                ctaHref="/register?role=employer"
              />
              <UserRoleCard 
                title="Institutions" 
                subtitle="Audit placement metrics, approve company registry requests, and monitor student metrics."
                items={institutionItems}
                icon={School}
                ctaText="Departmental Login"
                ctaHref="/login?role=admin"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Visual Experience & Real Impact Gallery Section */}
      <section className="relative w-full py-20 md:py-28 border-b border-border/40 bg-slate-900 text-white overflow-hidden bg-dot-pattern">
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[220px] bg-accent/10 blur-2xl rounded-full pointer-events-none animate-blob transform-gpu" />
        <div className="absolute bottom-10 right-10 w-[280px] h-[180px] bg-indigo-500/10 blur-2xl rounded-full pointer-events-none animate-blob-reverse transform-gpu" />

        <Container className="relative z-10">
          <div className="space-y-14">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent shadow-sm">
                <Sparkles className="size-3.5 text-accent animate-pulse" />
                <span>Real Platform Impact</span>
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                Empowering ICT Employability
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Bridging classroom learning, industry mentorship, and corporate recruiting in real-world environments.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {showcasePhotos.map((item) => (
                <motion.div 
                  key={item.title}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl flex flex-col justify-between transform-gpu"
                >
                  {/* Photo Container with Next.js Image optimization */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest text-accent bg-slate-950/80 backdrop-blur-md border border-accent/30 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1 font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 4. Core Features Section */}
      <section className="relative w-full py-20 md:py-28 border-b border-border/40 bg-slate-50/60 dark:bg-slate-900/40 flex justify-center items-center overflow-hidden bg-dot-pattern">
        {/* Subtle background ambient blob */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none transform-gpu" />

        <Container className="relative z-10">
          <div className="space-y-14">
            <SectionHeading 
              title="Comprehensive Career Development Features" 
              subtitle="Catalyst integrates academic tracking and professional placement into a single platform."
              badge="Platform Core"
            />
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {features.map((feat) => (
                <FeatureCard 
                  key={feat.title}
                  title={feat.title}
                  description={feat.description}
                  icon={feat.icon}
                  color={feat.color}
                  bulletPoints={feat.bullets}
                  href={`/${feat.title.toLowerCase().replace(" ", "")}`}
                />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 5. Impact Section */}
      <section className="relative w-full py-20 md:py-28 border-b border-border/40 flex justify-center items-center overflow-hidden">
        {/* Background ambient blob */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none transform-gpu" />

        <Container className="relative z-10">
          <div className="space-y-14">
            <SectionHeading 
              title="Measurable Student Career Outcomes" 
              subtitle="Empowering departments with analytics to verify placement, skill gains, and corporate relationships."
              badge="Outcome Metrics"
            />
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {metrics.map((metric) => (
                <MetricCard 
                  key={metric.title}
                  title={metric.title}
                  value={metric.value}
                  changeText={metric.changeText}
                  changeType={metric.changeType}
                  metricLabel={metric.metricLabel}
                  progressValue={metric.progressValue}
                  footerText={metric.footerText}
                />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 6. Call To Action Section */}
      <CTASection 
        title="Ready to Accelerate Career Employability?"
        subtitle="Register today to initialize your student dashboard profile, verify corporate partnership accounts, or join our academic mentors directory."
        ctaText="Join Catalyst Now"
        ctaHref="/register"
        secondaryCtaText="Contact Support"
        secondaryCtaHref="/contact"
      />
    </div>
  )
}
