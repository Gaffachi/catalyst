"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "./Container"
import { Sparkles } from "lucide-react"

export function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  // Hide footer on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  return (
    <footer className="w-full border-t border-border/40 bg-muted/30 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white shadow-sm shadow-accent/10">
                <Sparkles className="size-4" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                Catalyst
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              A comprehensive ICT Career Development and Employability Platform. 
              Connecting university students, mentors, and employers to facilitate 
              portfolio showcases, internship coordination, and career ready milestones.
            </p>
          </div>

          {/* Site Navigation Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-accent transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">ICT PM Course Project</span>
              </li>
              <li>
                <span className="text-muted-foreground">Academic Portal Integration</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Catalyst Platform. All rights reserved.</p>
          <p className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
          </p>
        </div>
      </Container>
    </footer>
  )
}
