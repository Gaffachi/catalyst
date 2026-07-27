"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { LoginForm } from "@/features/auth/components/LoginForm"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <Card className="border border-border/80 bg-card/95 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-950/5 dark:shadow-black/40 rounded-2xl p-6 sm:p-8 overflow-hidden relative">
        {/* Subtle top gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-orange-500 to-amber-500" />

        <CardHeader className="p-0 mb-6 space-y-1.5">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Sign In
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground leading-relaxed">
            Enter your registered email and password credentials.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <LoginForm />
        </CardContent>
      </Card>
    </motion.div>
  )
}
