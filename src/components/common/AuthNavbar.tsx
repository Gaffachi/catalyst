"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "./Container"
import { Sparkles, Menu, X } from "lucide-react"

export function AuthNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-200 select-none">
      <Container>
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-orange-600 text-white shadow-md shadow-accent/20">
              <Sparkles className="size-5" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Catalyst
            </span>
          </Link>

          {/* Navigation Items (Home, Features, Contact) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Placeholder column on desktop for centering styling */}
          <div className="hidden md:block w-[100px]" />

          {/* Mobile Menu Toggle */}
          <button
            className="flex md:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/40 bg-background px-4 py-4 space-y-4 animate-in fade-in-50 duration-200">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
