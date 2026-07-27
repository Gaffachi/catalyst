"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthStore } from "@/store/use-auth-store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  studentOnboardingSchema, 
  mentorOnboardingSchema, 
  employerOnboardingSchema 
} from "../schemas/auth.schema"
import { UserRole } from "../types/auth.types"
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

interface StepperWizardProps {
  role: UserRole
}

export function StepperWizard({ role }: StepperWizardProps) {
  const router = useRouter()
  const { user, setOnboardingStatus, updateUser } = useAuthStore()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [direction, setDirection] = React.useState(1) // 1 for next, -1 for back

  // Configure target Zod schemas and default values based on role
  const schema = 
    role === "student" 
      ? studentOnboardingSchema 
      : role === "mentor" 
      ? mentorOnboardingSchema 
      : employerOnboardingSchema

  const {
    register,
    handleSubmit,
    formState: { errors: rawErrors, isValid },
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      bio: "",
      linkedinUrl: "",
      githubUrl: "",
      institution: "",
      major: "",
      level: "",
      graduationYear: "",
      skills: "",
      careerGoal: "",
      company: "",
      title: "",
      specialty: "",
      availableDays: "",
      companyName: "",
      website: "",
      scale: "",
      sector: "",
      regNumber: "",
    },
  })

  const errors = rawErrors as Record<string, { message?: string }>

  // Steps counts per role
  const totalSteps = role === "student" ? 4 : 3

  // Submits form final state
  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Onboarding completed dataset:", data)
    // Update local user session name or details if needed
    if (user) {
      updateUser({ role })
    }
    // Update Zustand state
    setOnboardingStatus("completed")
    // Push to role dashboard
    router.push(`/dashboard/${role}`)
  }

  // Validates step limits before moving forward
  const handleNext = async () => {
    type FormFieldName =
      | "bio"
      | "linkedinUrl"
      | "githubUrl"
      | "institution"
      | "major"
      | "level"
      | "graduationYear"
      | "skills"
      | "careerGoal"
      | "company"
      | "title"
      | "specialty"
      | "availableDays"
      | "companyName"
      | "website"
      | "scale"
      | "sector"
      | "regNumber"

    let fieldsToValidate: FormFieldName[] = []

    if (role === "student") {
      if (currentStep === 1) fieldsToValidate = ["bio", "linkedinUrl", "githubUrl"]
      else if (currentStep === 2) fieldsToValidate = ["institution", "major", "level", "graduationYear"]
      else if (currentStep === 3) fieldsToValidate = ["skills"]
    } else if (role === "mentor") {
      if (currentStep === 1) fieldsToValidate = ["bio", "company", "title"]
      else if (currentStep === 2) fieldsToValidate = ["specialty"]
    } else if (role === "employer") {
      if (currentStep === 1) fieldsToValidate = ["companyName", "website", "scale"]
      else if (currentStep === 2) fieldsToValidate = ["sector"]
    }

    const stepValid = await trigger(fieldsToValidate)
    if (stepValid) {
      setDirection(1)
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handleBack = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 30 : -30,
      opacity: 0,
    }),
  }

  return (
    <Card className="p-6 sm:p-8 max-w-xl mx-auto border border-border/80 bg-card/95 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-950/5 rounded-3xl overflow-hidden relative">
      
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-orange-500 to-amber-500" />

      {/* 1. Header Progress indicator */}
      <div className="space-y-4 mb-8 pt-1">
        <div className="flex items-center justify-between text-xs font-bold select-none">
          <span className="flex items-center gap-1.5 text-foreground uppercase tracking-widest font-heading">
            <Sparkles className="size-3.5 text-accent" />
            <span>{role} Onboarding</span>
          </span>
          <span className="text-accent bg-accent/10 px-3 py-1 rounded-full font-bold">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="flex gap-2 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-border/50">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const isCompleted = idx + 1 <= currentStep
            return (
              <div 
                key={idx}
                className="h-full flex-1 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700/60"
              >
                <motion.div
                  initial={false}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent to-orange-500 rounded-full"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Onboarding Forms Multi-step routing block */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="space-y-4 min-h-[220px]"
          >
            {/* STUDENT ROLE FLOW */}
            {role === "student" && (
              <>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Personal Bio Summary</h3>
                      <p className="text-xs text-muted-foreground">Briefly write your goals and technical skill targets.</p>
                    </div>
                    <div className="space-y-1.5">
                      <textarea 
                        className="flex w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent"
                        rows={3}
                        placeholder="E.g. Technical-focused student targeting cloud platforms..."
                        {...register("bio")}
                      />
                      {errors.bio && <p className="text-[10px] font-bold text-destructive">{errors.bio.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">LinkedIn URL</label>
                      <Input placeholder="https://linkedin.com/in/username" {...register("linkedinUrl")} />
                      {errors.linkedinUrl && <p className="text-[10px] font-bold text-destructive">{errors.linkedinUrl.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GitHub Profile URL</label>
                      <Input placeholder="https://github.com/username" {...register("githubUrl")} />
                      {errors.githubUrl && <p className="text-[10px] font-bold text-destructive">{errors.githubUrl.message}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Academic Information</h3>
                      <p className="text-xs text-muted-foreground">Details about your current tertiary enrollment.</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">University / Institution</label>
                      <Input placeholder="E.g. University of Science and Technology" {...register("institution")} />
                      {errors.institution && <p className="text-[10px] font-bold text-destructive">{errors.institution.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Major Study</label>
                      <Input placeholder="E.g. B.Sc in Information Technology" {...register("major")} />
                      {errors.major && <p className="text-[10px] font-bold text-destructive">{errors.major.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Current Level</label>
                        <Input placeholder="E.g. 400" {...register("level")} />
                        {errors.level && <p className="text-[10px] font-bold text-destructive">{errors.level.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Graduation Year</label>
                        <Input placeholder="E.g. 2026" {...register("graduationYear")} />
                        {errors.graduationYear && <p className="text-[10px] font-bold text-destructive">{errors.graduationYear.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Technical Skill Tags</h3>
                      <p className="text-xs text-muted-foreground">Provide comma-separated skill identifiers.</p>
                    </div>
                    <div className="space-y-1.5">
                      <Input placeholder="React, TypeScript, Tailwind CSS, Python" {...register("skills")} />
                      {errors.skills && <p className="text-[10px] font-bold text-destructive">{errors.skills.message}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Target Career Goals</h3>
                      <p className="text-xs text-muted-foreground">Describe the internship role or career start you want.</p>
                    </div>
                    <div className="space-y-1.5">
                      <textarea 
                        className="flex w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent"
                        rows={4}
                        placeholder="Seeking a Frontend Developer role with focus on responsive layout styling..."
                        {...register("careerGoal")}
                      />
                      {errors.careerGoal && <p className="text-[10px] font-bold text-destructive">{errors.careerGoal.message}</p>}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* MENTOR ROLE FLOW */}
            {role === "mentor" && (
              <>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Professional Background</h3>
                      <p className="text-xs text-muted-foreground">Details about your active corporate title.</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company Name</label>
                      <Input placeholder="E.g. Meta / Google" {...register("company")} />
                      {errors.company && <p className="text-[10px] font-bold text-destructive">{errors.company.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Job Title</label>
                      <Input placeholder="E.g. Senior Frontend Architect" {...register("title")} />
                      {errors.title && <p className="text-[10px] font-bold text-destructive">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Short Bio</label>
                      <textarea 
                        className="flex w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent"
                        rows={3}
                        placeholder="10+ years styling UI platforms. Glad to guide student portfolios."
                        {...register("bio")}
                      />
                      {errors.bio && <p className="text-[10px] font-bold text-destructive">{errors.bio.message}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Specialties & Topics</h3>
                      <p className="text-xs text-muted-foreground">Provide comma-separated expert fields.</p>
                    </div>
                    <div className="space-y-1.5">
                      <Input placeholder="UI/UX, System Design, CI/CD, React" {...register("specialty")} />
                      {errors.specialty && <p className="text-[10px] font-bold text-destructive">{errors.specialty.message}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Availability Profile</h3>
                      <p className="text-xs text-muted-foreground">List preferred times or session formats.</p>
                    </div>
                    <div className="space-y-1.5">
                      <Input placeholder="Mondays, Wednesdays, 2:00 PM – 5:00 PM GMT" {...register("availableDays")} />
                      {errors.availableDays && <p className="text-[10px] font-bold text-destructive">{errors.availableDays.message}</p>}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* EMPLOYER ROLE FLOW */}
            {role === "employer" && (
              <>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Company Profile</h3>
                      <p className="text-xs text-muted-foreground">Core parameters about your corporate registry.</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company Name</label>
                      <Input placeholder="E.g. Stripe Inc." {...register("companyName")} />
                      {errors.companyName && <p className="text-[10px] font-bold text-destructive">{errors.companyName.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company Website</label>
                      <Input placeholder="https://stripe.com" {...register("website")} />
                      {errors.website && <p className="text-[10px] font-bold text-destructive">{errors.website.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company Size / Scale</label>
                      <Input placeholder="E.g. 1000+ employees" {...register("scale")} />
                      {errors.scale && <p className="text-[10px] font-bold text-destructive">{errors.scale.message}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Industry Sector</h3>
                      <p className="text-xs text-muted-foreground">E.g. Financial Tech, EdTech, Cloud Operations.</p>
                    </div>
                    <div className="space-y-1.5">
                      <Input placeholder="E.g. Financial Technology & SaaS Infrastructure" {...register("sector")} />
                      {errors.sector && <p className="text-[10px] font-bold text-destructive">{errors.sector.message}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">Verification Credentials</h3>
                      <p className="text-xs text-muted-foreground">Provide licensing or institutional registration codes.</p>
                    </div>
                    <div className="space-y-1.5">
                      <Input placeholder="E.g. SEC-REG-1234567" {...register("regNumber")} />
                      {errors.regNumber && <p className="text-[10px] font-bold text-destructive">{errors.regNumber.message}</p>}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 3. Stepper wizard controls */}
        <div className="pt-6 border-t border-border/40 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={currentStep === 1}
            onClick={handleBack}
            className="px-5 py-2.5 h-auto rounded-xl border-border cursor-pointer select-none transition-all duration-200 hover:bg-muted"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 h-auto rounded-xl bg-slate-900 text-white hover:bg-slate-800 border-0 cursor-pointer select-none transition-all duration-200 shadow-md"
            >
              Continue
              <ArrowRight className="size-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!isValid}
              className="px-6 py-2.5 h-auto rounded-xl bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25 border-0 cursor-pointer select-none transition-all duration-200"
            >
              Complete Onboarding
              <CheckCircle2 className="size-4 ml-2 animate-bounce" />
            </Button>
          )}
        </div>

      </form>
    </Card>
  )
}
