"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, Building2, Users, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserRole } from "../types/auth.types"

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>("student")

  const rolesList = [
    {
      id: "student" as UserRole,
      title: "Student",
      description: "Build verified profile, showcase projects, and connect with mentors & companies",
      icon: Users,
    },
    {
      id: "mentor" as UserRole,
      title: "Mentor",
      description: "Guide students through professional development, sessions, and skill validations",
      icon: GraduationCap,
    },
    {
      id: "employer" as UserRole,
      title: "Employer",
      description: "Source verified student talent, post internships, and review technical portfolios",
      icon: Building2,
    },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="space-y-6 max-w-lg mx-auto p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/95 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-950/5 relative overflow-hidden"
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-orange-500 to-amber-500" />

      <div className="text-center space-y-2 pt-1">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Choose Your Platform Role
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
          Select the role matching your platform objectives to customize your onboarding flow.
        </p>
      </div>

      {/* Role selection card grid */}
      <div className="space-y-3.5">
        {rolesList.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id

          return (
            <motion.div
              key={role.id}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedRole(role.id)}
              className={`relative p-4.5 sm:p-5 rounded-2xl border flex items-center justify-between cursor-pointer select-none transition-all duration-200 ${
                isSelected
                  ? "border-accent bg-accent/5 dark:bg-accent/10 shadow-md shadow-accent/10 ring-1 ring-accent/30"
                  : "border-border/70 bg-card/80 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border shrink-0 transition-all duration-200 ${
                  isSelected 
                    ? "bg-accent border-accent text-white shadow-md shadow-accent/30" 
                    : "bg-slate-50 border-border/50 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-0.5 flex items-center gap-2">
                    <span>{role.title}</span>
                    {isSelected && (
                      <span className="text-[10px] font-extrabold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px]">
                    {role.description}
                  </p>
                </div>
              </div>
              
              {/* Animated Check indicator */}
              <div className="shrink-0 pl-2">
                <AnimatePresence mode="wait">
                  {isSelected ? (
                    <motion.div
                      key="selected"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="h-6 w-6 rounded-full bg-accent text-white flex items-center justify-center shadow-xs"
                    >
                      <CheckCircle2 className="size-4" />
                    </motion.div>
                  ) : (
                    <div className="h-6 w-6 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-transparent">
                      <CheckCircle2 className="size-4 opacity-0" />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Confirm Button */}
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
        <Button
          type="button"
          disabled={!selectedRole}
          onClick={() => selectedRole && onSelectRole(selectedRole)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-5 h-auto rounded-xl shadow-lg shadow-slate-900/10 border-0 cursor-pointer flex items-center justify-center gap-2 transition-all duration-200"
        >
          <span>Confirm Role & Continue</span>
          <ArrowRight className="size-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
