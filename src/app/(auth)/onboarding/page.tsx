"use client"

import * as React from "react"
import { useAuthStore } from "@/store/use-auth-store"
import { RoleSelector } from "@/features/auth/components/RoleSelector"
import { StepperWizard } from "@/features/auth/components/StepperWizard"
import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { UserRole } from "@/features/auth/types/auth.types"

function OnboardingContent() {
  const { user, updateUser, setOnboardingStatus } = useAuthStore()

  const handleSelectRole = (role: UserRole) => {
    updateUser({ role })
    setOnboardingStatus("onboarding")
  }

  // If user role is not selected, show role selector
  if (user && !user.role) {
    return <RoleSelector onSelectRole={handleSelectRole} />
  }

  // If user role is selected, show role specific stepper wizard
  if (user && user.role) {
    return <StepperWizard role={user.role} />
  }

  return null
}

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <div className="w-full">
        <OnboardingContent />
      </div>
    </AuthGuard>
  )
}
