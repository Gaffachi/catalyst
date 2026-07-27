"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/use-auth-store"
import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  UserCheck, 
  Building2, 
  CheckSquare, 
  Handshake, 
  BarChart3, 
  FileText, 
  Bell, 
  Settings, 
  User,
  MessageSquare,
  LogOut, 
  Menu, 
  X 
} from "lucide-react"

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  // Grouped Sidebar navigation sections
  const sideNavSections = [
    {
      category: "Governance & Users",
      items: [
        { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Feed", href: "/dashboard/admin/feed", icon: MessageSquare },
        { name: "My Profile", href: "/dashboard/admin/profile", icon: User },
        { name: "User Management", href: "/dashboard/admin/users", icon: Users },
        { name: "Students", href: "/dashboard/admin/students", icon: GraduationCap },
      ]
    },
    {
      category: "Verifications & Moderation",
      items: [
        { name: "Mentor Verification", href: "/dashboard/admin/mentors", icon: UserCheck },
        { name: "Employer Verification", href: "/dashboard/admin/employers", icon: Building2 },
        { name: "Opportunity Approvals", href: "/dashboard/admin/opportunities", icon: CheckSquare },
      ]
    },
    {
      category: "Partnerships & Communication",
      items: [
        { name: "Partnerships", href: "/dashboard/admin/partnerships", icon: Handshake },
        { name: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
        { name: "Messages", href: "/dashboard/admin/messages", icon: MessageSquare },
      ]
    },
    {
      category: "Intelligence & Settings",
      items: [
        { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
        { name: "Reports", href: "/dashboard/admin/reports", icon: FileText },
        { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
      ]
    }
  ]

  return (
    <AuthGuard>
      <div className="flex-1 flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-950/20">
        
        {/* 1. Desktop Sidebar Navigation (Hidden on Mobile, Sticky) */}
        <aside className="hidden md:flex flex-col w-64 sticky top-0 h-screen border-r border-border/40 bg-white dark:bg-slate-900/60 shrink-0 select-none">
          {/* Sidebar Brand Header */}
          <div className="flex h-16 items-center px-6 border-b border-border/40 gap-2 font-heading font-extrabold tracking-tight text-foreground select-none shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-orange-600 text-white shadow-sm">
              <Sparkles className="size-4" />
            </div>
            <span>Admin Console</span>
          </div>

          {/* Navigation Links Grouped */}
          <nav className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
            {sideNavSections.map((section) => (
              <div key={section.category} className="space-y-1">
                <span className="px-3 text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  {section.category}
                </span>
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-orange-50/60 text-accent dark:bg-slate-800"
                          : "text-slate-600 hover:text-foreground hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer Logout */}
          <div className="p-4 border-t border-border/40 shrink-0">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start rounded-xl text-xs font-bold text-slate-500 hover:text-destructive hover:bg-rose-50/40 cursor-pointer"
            >
              <LogOut className="size-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* 2. Mobile Header Bar (Sticky Top, Hidden on Desktop) */}
        <header className="md:hidden sticky top-0 z-40 w-full border-b border-border/40 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 h-14 select-none">
          <div className="flex items-center gap-2 font-heading font-extrabold text-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-accent to-orange-600 text-white shadow-sm">
              <Sparkles className="size-3.5" />
            </div>
            <span className="text-sm">Admin Console</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-foreground focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </header>

        {/* Mobile Menu Panel Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-14 bottom-0 z-30 bg-background/95 backdrop-blur-sm p-4 space-y-6 flex flex-col justify-between animate-in fade-in duration-200 select-none overflow-y-auto">
            <nav className="space-y-4">
              {sideNavSections.map((section) => (
                <div key={section.category} className="space-y-1">
                  <span className="px-3 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    {section.category}
                  </span>
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-orange-50/60 text-accent dark:bg-slate-800"
                            : "text-slate-600 hover:text-foreground hover:bg-slate-50 dark:text-slate-400"
                        }`}
                      >
                        <Icon className="size-4.5 shrink-0" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </nav>
            <div className="pt-4 border-t border-border/40 pb-6 shrink-0">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
                variant="ghost"
                className="w-full justify-center rounded-xl text-xs font-bold text-destructive hover:bg-rose-50 cursor-pointer"
              >
                <LogOut className="size-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* 3. Main Content Container Area */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-grow p-4 sm:p-8">
            {children}
          </div>
        </main>

      </div>
    </AuthGuard>
  )
}
