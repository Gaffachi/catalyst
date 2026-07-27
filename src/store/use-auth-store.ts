import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User, UserRole, OnboardingStatus } from "@/features/auth/types/auth.types"

interface AuthStore {
  user: User | null
  profileStatus: OnboardingStatus | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, role?: UserRole) => Promise<User>
  registerUser: (email: string, name: string) => Promise<User>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
  setOnboardingStatus: (status: OnboardingStatus) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      profileStatus: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, role?: UserRole) => {
        set({ isLoading: true })
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        let userRole: UserRole = "student"
        let name = "Alex Johnson"

        // Mock accounts mapping
        if (email === "student@catalyst.edu") {
          userRole = "student"
          name = "Alex Student"
        } else if (email === "mentor@catalyst.edu") {
          userRole = "mentor"
          name = "Sarah Mentor"
        } else if (email === "employer@catalyst.edu") {
          userRole = "employer"
          name = "John Employer"
        } else if (email === "admin@catalyst.edu") {
          userRole = "admin"
          name = "Platform Coordinator"
        } else if (role) {
          userRole = role
        }

        const mockUser: User = {
          id: `usr-${Math.random().toString(36).substr(2, 9)}`,
          name,
          email,
          role: userRole,
        }

        set({
          user: mockUser,
          isAuthenticated: true,
          profileStatus: userRole === "admin" ? "completed" : "completed", // Admin is pre-completed
          isLoading: false,
        })

        return mockUser
      },

      registerUser: async (email: string, name: string) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 800))

        const newUser: User = {
          id: `usr-${Math.random().toString(36).substr(2, 9)}`,
          name,
          email,
          role: null, // Select role next
        }

        set({
          user: newUser,
          isAuthenticated: true,
          profileStatus: "uncompleted",
          isLoading: false,
        })

        return newUser
      },

      logout: async () => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 400))
        set({
          user: null,
          isAuthenticated: false,
          profileStatus: null,
          isLoading: false,
        })
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },

      setOnboardingStatus: (status) => {
        set({ profileStatus: status })
      },
    }),
    {
      name: "catalyst-auth-session",
    }
  )
)
