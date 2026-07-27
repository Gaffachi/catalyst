"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "./Container"
import { Sparkles, ArrowRight } from "lucide-react"

interface HeroSectionProps {
  title: string
  highlightedWord?: string
  subtitle: string
  badge?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  visual?: React.ReactNode
}

export function HeroSection({
  title,
  highlightedWord,
  subtitle,
  badge,
  ctaText,
  ctaHref = "/register",
  secondaryCtaText,
  secondaryCtaHref = "/features",
  visual,
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section className="relative w-full py-16 md:py-28 flex justify-center items-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-border/40 bg-dot-pattern">
      
      {/* Dynamic Background Ambient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-accent/15 to-orange-400/10 blur-3xl rounded-full pointer-events-none animate-blob" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-gradient-to-br from-indigo-500/10 to-accent/15 blur-2xl rounded-full pointer-events-none animate-blob-reverse" />
      <div className="absolute top-10 left-10 w-[300px] h-[200px] bg-gradient-to-br from-amber-500/10 to-accent/10 blur-2xl rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className={`grid grid-cols-1 ${visual ? "lg:grid-cols-12" : ""} gap-12 lg:gap-8 items-center max-w-6xl mx-auto`}>
          
          {/* Main text area */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`${visual ? "lg:col-span-7" : "text-center max-w-3xl mx-auto"} space-y-6 flex flex-col ${visual ? "items-start text-left" : "items-center"}`}
          >
            {badge && (
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-accent shadow-sm transition-all duration-300 hover:border-accent/50 hover:bg-accent/15">
                  <Sparkles className="size-3.5 text-accent animate-pulse" />
                  <span>{badge}</span>
                </span>
              </motion.div>
            )}

            <motion.h1 
              variants={itemVariants} 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
            >
              {title}{" "}
              {highlightedWord && (
                <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent block sm:inline drop-shadow-xs">
                  {highlightedWord}
                </span>
              )}
            </motion.h1>

            <motion.p 
              variants={itemVariants} 
              className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl font-normal"
            >
              {subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
              {ctaText && (
                <Link href={ctaHref} className="w-full sm:w-auto">
                  <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="group w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-8 py-5 h-auto rounded-xl shadow-lg shadow-accent/25 border-0 cursor-pointer transition-all duration-200">
                      <span>{ctaText}</span>
                      <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
              )}
              {secondaryCtaText && (
                <Link href={secondaryCtaHref} className="w-full sm:w-auto">
                  <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full sm:w-auto font-semibold text-sm px-8 py-5 h-auto rounded-xl border-border/80 bg-background/80 backdrop-blur-sm hover:bg-muted/80 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition-all duration-200">
                      {secondaryCtaText}
                    </Button>
                  </motion.div>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Visual element column */}
          {visual && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}
