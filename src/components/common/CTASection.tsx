"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "./Container"
import { Sparkles, ArrowRight } from "lucide-react"

interface CTASectionProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export function CTASection({
  title,
  subtitle,
  ctaText,
  ctaHref = "/register",
  secondaryCtaText,
  secondaryCtaHref = "/features",
}: CTASectionProps) {
  return (
    <section className="relative w-full py-20 md:py-28 flex justify-center items-center bg-slate-950 text-white overflow-hidden border-t border-border/20 bg-dot-pattern">
      {/* Background ambient glowing blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-accent/20 blur-[130px] rounded-full pointer-events-none animate-blob" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[250px] bg-amber-500/15 blur-[110px] rounded-full pointer-events-none animate-blob-reverse" />

      <Container className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center"
        >
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-orange-600 text-white shadow-lg shadow-accent/30 border border-white/20">
            <Sparkles className="size-6 animate-pulse" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {title}
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto pt-4">
            <Link href={ctaHref} className="w-full sm:w-auto">
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="group w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-8 py-5 h-auto rounded-xl shadow-xl shadow-accent/30 border-0 cursor-pointer transition-all duration-200">
                  <span>{ctaText}</span>
                  <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
            {secondaryCtaText && (
              <Link href={secondaryCtaHref} className="w-full sm:w-auto">
                <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full sm:w-auto text-white border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 font-semibold text-sm px-8 py-5 h-auto rounded-xl cursor-pointer backdrop-blur-xs transition-all duration-200">
                    {secondaryCtaText}
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
