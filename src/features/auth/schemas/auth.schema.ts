import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

// Student Onboarding Steps
export const studentOnboardingSchema = z.object({
  // Step 1: Personal Details
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL.").or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid GitHub URL.").or(z.literal("")),
  // Step 2: Academic
  institution: z.string().min(2, "Institution is required."),
  major: z.string().min(2, "Major is required."),
  level: z.string().min(1, "Level is required."),
  graduationYear: z.string().regex(/^[0-9]{4}$/, "Must be a 4-digit year."),
  // Step 3: Skills
  skills: z.string().min(2, "Please enter at least one skill."),
  // Step 4: Goals
  careerGoal: z.string().min(5, "Please state your career target."),
})

// Mentor Onboarding Steps
export const mentorOnboardingSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  company: z.string().min(2, "Company name is required."),
  title: z.string().min(2, "Job title is required."),
  specialty: z.string().min(2, "Please enter your specialty tags."),
  availableDays: z.string().min(2, "Please enter your availability."),
})

// Employer Onboarding Steps
export const employerOnboardingSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  website: z.string().url("Please enter a valid company website URL."),
  scale: z.string().min(1, "Company size is required."),
  sector: z.string().min(2, "Industry sector is required."),
  regNumber: z.string().min(3, "Registration / verification details are required."),
})
