"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/use-auth-store"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, profileStatus, isLoading } = useAuthStore()
  const [isHydrated, setIsHydrated] = React.useState(false)

  // Wait for store to hydrate from localstorage to avoid SSR mismatch
  React.useEffect(() => {
    setIsHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!isHydrated) return

    // 1. If not authenticated, redirect public visitors attempting dashboard links to /login
    if (!isAuthenticated && pathname.startsWith("/dashboard")) {
      router.push("/login")
      return
    }

    // 2. If authenticated but role not selected, send directly to Onboarding select wizard
    if (isAuthenticated && !user?.role && pathname !== "/onboarding") {
      router.push("/onboarding")
      return
    }

    // 3. If onboarding is complete and they attempt to revisit /onboarding, redirect them
    if (isAuthenticated && user?.role && profileStatus === "completed" && pathname === "/onboarding") {
      router.push(`/dashboard/${user.role}`)
      return
    }

    // 4. Multi-tenant role specific path check redirects
    if (isAuthenticated && user?.role) {
      const role = user.role

      // If opening another dashboard group, redirect to own dashboard
      if (pathname.startsWith("/dashboard/student") && role !== "student") {
        router.push(`/dashboard/${role}`)
      } else if (pathname.startsWith("/dashboard/mentor") && role !== "mentor") {
        router.push(`/dashboard/${role}`)
      } else if (pathname.startsWith("/dashboard/employer") && role !== "employer") {
        router.push(`/dashboard/${role}`)
      } else if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
        router.push(`/dashboard/${role}`)
      }
    }
  }, [isHydrated, isAuthenticated, user, profileStatus, pathname, router])

  if (!isHydrated || isLoading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center py-24 select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">Verifying secure session...</span>
      </div>
    )
  }

  return <>{children}</>
}
