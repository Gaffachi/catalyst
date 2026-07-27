"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/common/Container"
import { Sparkles } from "lucide-react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex-1 flex flex-col justify-center items-center py-12 md:py-20 min-h-[calc(100vh-14rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50/80 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden bg-dot-pattern">
      
      {/* Background ambient glowing blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/15 blur-[120px] rounded-full pointer-events-none animate-blob" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none animate-blob-reverse" />
      <div className="absolute top-10 left-10 w-[300px] h-[200px] bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

      <Container className="relative z-10 max-w-md w-full">
        
        {/* Auth Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-3 text-center mb-7 select-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-orange-600 text-white shadow-lg shadow-accent/25 border border-white/20">
            <Sparkles className="size-6 animate-pulse" />
          </div>
          <div>
            <span className="font-heading text-sm font-black tracking-widest text-foreground uppercase">
              CATALYST
            </span>
          </div>
        </motion.div>

        {/* Render child form pages */}
        {children}

      </Container>
    </div>
  )
}
