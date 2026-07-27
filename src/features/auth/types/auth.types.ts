export type UserRole = "student" | "mentor" | "employer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole | null;
}

export type OnboardingStatus = "uncompleted" | "onboarding" | "completed";

export interface AuthState {
  user: User | null;
  profileStatus: OnboardingStatus | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
