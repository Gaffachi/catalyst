"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { loginSchema } from "../schemas/auth.schema"
import { PasswordInput } from "./PasswordInput"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/use-auth-store"
import { AlertCircle, ArrowRight, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { z } from "zod"

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const [errorMsg, setErrorMsg] = React.useState("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setErrorMsg("")
    try {
      const user = await login(data.email)
      
      // Determine redirection endpoint based on role
      if (user.role === "student") {
        router.push("/dashboard/student")
      } else if (user.role === "mentor") {
        router.push("/dashboard/mentor")
      } else if (user.role === "employer") {
        router.push("/dashboard/employer")
      } else if (user.role === "admin") {
        router.push("/dashboard/admin")
      } else {
        router.push("/onboarding")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message)
      } else {
        setErrorMsg("Failed to authenticate. Check credentials.")
      }
    }
  }

  const fillMock = (email: string) => {
    setValue("email", email)
    setValue("password", "password123")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  }

  return (
    <motion.form 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-4"
    >
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center gap-2.5 overflow-hidden"
          >
            <AlertCircle className="size-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presentation Mock Logins Interactive Quick-Fill Box */}
      <motion.div variants={itemVariants} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border/80 text-[11px] text-muted-foreground space-y-2 select-none">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
          <Sparkles className="size-3.5 text-accent" />
          <span>Presentation Mock Logins (Click to Auto-fill):</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {[
            { role: "Student", email: "student@catalyst.edu" },
            { role: "Mentor", email: "mentor@catalyst.edu" },
            { role: "Employer", email: "employer@catalyst.edu" },
            { role: "Admin", email: "admin@catalyst.edu" },
          ].map((mock) => (
            <button
              key={mock.email}
              type="button"
              onClick={() => fillMock(mock.email)}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-border/60 hover:border-accent hover:text-accent font-mono text-[10px] text-slate-600 dark:text-slate-400 cursor-pointer transition-all duration-150 shadow-2xs"
            >
              <span className="font-bold text-accent mr-1">{mock.role}:</span>
              {mock.email}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants} className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Email address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@catalyst.edu"
          className={`transition-all duration-200 focus-visible:ring-accent/40 focus-visible:border-accent ${
            errors.email ? "border-destructive focus-visible:ring-destructive/30" : ""
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-[10px] font-bold text-destructive">{errors.email.message}</p>
        )}
      </motion.div>

      {/* Password */}
      <motion.div variants={itemVariants} className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Password
          </label>
          <span className="text-[10px] font-bold text-accent hover:underline cursor-pointer select-none">
            Forgot Password?
          </span>
        </div>
        <PasswordInput
          id="password"
          className={errors.password ? "border-destructive focus-visible:ring-destructive/30" : ""}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-[10px] font-bold text-destructive">{errors.password.message}</p>
        )}
      </motion.div>

      {/* Remember session */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 pt-1 select-none">
        <input
          type="checkbox"
          id="rememberMe"
          className="size-4 rounded border-slate-300 accent-accent cursor-pointer transition-transform duration-150 active:scale-95"
          {...register("rememberMe")}
        />
        <label htmlFor="rememberMe" className="text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
          Remember me for 30 days
        </label>
      </motion.div>

      {/* Submit */}
      <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-5 h-auto rounded-xl shadow-lg shadow-slate-900/10 border-0 cursor-pointer flex items-center justify-center gap-2 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin text-accent" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Footer Registration Link */}
      <motion.div variants={itemVariants} className="text-center pt-2 text-xs text-muted-foreground select-none">
        Don&apos;t have an account?{" "}
        <Link href="/register">
          <span className="font-bold text-accent hover:underline inline-flex items-center gap-0.5 cursor-pointer">
            Create Account <ArrowRight className="size-3" />
          </span>
        </Link>
      </motion.div>
    </motion.form>
  )
}
