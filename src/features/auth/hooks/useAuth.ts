"use client"

import { useAuthStore } from "@/store/use-auth-store"

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const profileStatus = useAuthStore((state) => state.profileStatus)

  const login = useAuthStore((state) => state.login)
  const registerUser = useAuthStore((state) => state.registerUser)
  const logout = useAuthStore((state) => state.logout)
  const updateUser = useAuthStore((state) => state.updateUser)
  const setOnboardingStatus = useAuthStore((state) => state.setOnboardingStatus)

  return {
    user,
    isAuthenticated,
    isLoading,
    profileStatus,
    login,
    registerUser,
    logout,
    updateUser,
    setOnboardingStatus,
  }
}
