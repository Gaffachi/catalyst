"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MentorDashboardHeader } from "@/features/mentor/components/MentorDashboardHeader"
import { MentorService } from "@/features/mentor/services/mentor.service"
import { MentorProfile } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, Link2, GitFork, Check } from "lucide-react"

// Zod Schema Validation
const mentorProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  industry: z.string().min(2, "Industry is required"),
  specialization: z.string().min(2, "Specialization is required"),
  experienceYears: z.number().min(1, "Experience must be greater than 0"),
  company: z.string().min(2, "Company name is required"),
  linkedinUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").or(z.literal("")),
})

type ProfileFormValues = z.infer<typeof mentorProfileSchema>

export default function MentorProfilePage() {
  const [profile, setProfile] = React.useState<MentorProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const loadProfile = React.useCallback(async () => {
    try {
      const data = await MentorService.getProfile()
      setProfile(data)
    } catch (err) {
      console.error("Failed to load mentor profile:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(mentorProfileSchema),
  })

  // Prefill form values once loaded
  React.useEffect(() => {
    if (profile) {
      setValue("name", profile.name)
      setValue("bio", profile.bio)
      setValue("industry", profile.industry)
      setValue("specialization", profile.specialization)
      setValue("experienceYears", profile.experienceYears)
      setValue("company", profile.company)
      setValue("linkedinUrl", profile.linkedinUrl || "")
      setValue("githubUrl", profile.githubUrl || "")
    }
  }, [profile, setValue])

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const updated = await MentorService.updateProfile(values)
      setProfile(updated)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (err) {
      console.error("Failed to save profile details:", err)
    }
  }

  if (isLoading || !profile) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading advisor profile sheets...
        </span>
      </div>
    )
  }

  // Generate initials for avatar representation
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header welcome */}
      <MentorDashboardHeader 
        title="Auditor Profile"
        subtitle="Manage your professional summary credentials, social links, and expertise badges."
      />

      {/* Main card form layout */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 select-none">
        
        {/* Upper card: Avatar view */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/15 to-orange-600/5 text-accent flex items-center justify-center font-black text-lg border border-orange-100 shrink-0">
            {initials}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading text-base font-extrabold text-slate-800 dark:text-slate-100">{profile.name}</h3>
            <span className="text-xs text-muted-foreground block font-semibold">{profile.specialization} at {profile.company}</span>
            <span className="text-[10px] text-accent bg-orange-50 px-2 py-0.5 rounded-full uppercase font-bold shrink-0">{profile.experienceYears} Years Exp</span>
          </div>
        </Card>

        {/* Form elements card details */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Name */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase">Full Name</span>
              <input
                type="text"
                {...register("name")}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg bg-background"
              />
              {errors.name && <span className="text-[10px] text-rose-500 font-bold">{errors.name.message}</span>}
            </div>

            {/* Current Company */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase">Company Name</span>
              <input
                type="text"
                {...register("company")}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg bg-background"
              />
              {errors.company && <span className="text-[10px] text-rose-500 font-bold">{errors.company.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Industry */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase">Primary Industry</span>
              <input
                type="text"
                {...register("industry")}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg bg-background"
              />
              {errors.industry && <span className="text-[10px] text-rose-500 font-bold">{errors.industry.message}</span>}
            </div>

            {/* Specialization */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase">Specialization Domain</span>
              <input
                type="text"
                {...register("specialization")}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg bg-background"
              />
              {errors.specialization && <span className="text-[10px] text-rose-500 font-bold">{errors.specialization.message}</span>}
            </div>

            {/* Years of Exp */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase">Years of Experience</span>
              <input
                type="number"
                {...register("experienceYears", { valueAsNumber: true })}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg bg-background"
              />
              {errors.experienceYears && <span className="text-[10px] text-rose-500 font-bold">{errors.experienceYears.message}</span>}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-bold text-slate-455 uppercase">Professional Bio</span>
            <textarea
              {...register("bio")}
              className="w-full p-3 border border-slate-200 rounded-lg bg-background h-24 leading-relaxed"
            />
            {errors.bio && <span className="text-[10px] text-rose-500 font-bold">{errors.bio.message}</span>}
          </div>

          {/* Social references */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-border/20">
            {/* LinkedIn */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                <Link2 className="size-3.5" />
                LinkedIn Profile URL
              </span>
              <input
                type="text"
                {...register("linkedinUrl")}
                placeholder="https://linkedin.com/in/username"
                className="w-full h-9 px-3 border border-slate-200 rounded-lg bg-background"
              />
              {errors.linkedinUrl && <span className="text-[10px] text-rose-500 font-bold">{errors.linkedinUrl.message}</span>}
            </div>

            {/* GitHub */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                <GitFork className="size-3.5" />
                GitHub Profile URL
              </span>
              <input
                type="text"
                {...register("githubUrl")}
                placeholder="https://github.com/username"
                className="w-full h-9 px-3 border border-slate-200 rounded-lg bg-background"
              />
              {errors.githubUrl && <span className="text-[10px] text-rose-500 font-bold">{errors.githubUrl.message}</span>}
            </div>
          </div>

        </Card>

        {/* Skill verification static display cards */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expertise Skill Badges</span>
            <span className="text-[9px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">Vetted</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="px-2.5 py-1 text-xs border-slate-200 bg-slate-50/20 font-bold">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Form controls save triggers */}
        <div className="flex justify-end gap-3 items-center">
          {showSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
              <Check className="size-4" />
              Credentials Saved!
            </span>
          )}
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-900 hover:bg-slate-800 text-white border-0 h-10 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-3.5 mr-2" />
                Save Profile Credentials
              </>
            )}
          </Button>
        </div>

      </form>

    </div>
  )
}
