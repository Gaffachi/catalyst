"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "./Container"
import { Sparkles, Menu, X } from "lucide-react"
import { AuthNavbar } from "./AuthNavbar"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // Render AuthNavbar on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/onboarding"
  if (isAuthPage) {
    return <AuthNavbar />
  }

  // Hide public navbar on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all duration-200 shadow-2xs">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-foreground hover:opacity-90 transition-opacity group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-orange-600 text-white shadow-md shadow-accent/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="size-5" />
            </div>
            <span className="font-heading text-xl font-extrabold tracking-tight">
              Catalyst
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-semibold transition-colors duration-200 py-1 ${
                    isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-semibold text-xs rounded-xl hover:bg-muted/80 cursor-pointer">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-white font-semibold text-xs px-5 py-2.5 h-auto rounded-xl shadow-md shadow-accent/20 border-0 cursor-pointer">
                  Join Catalyst
                </Button>
              </motion.div>
            </Link>
          </div>

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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-4 overflow-hidden"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-semibold transition-colors hover:text-accent ${
                      isActive ? "text-accent" : "text-muted-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-center rounded-xl font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold border-0">
                  Join Catalyst
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
