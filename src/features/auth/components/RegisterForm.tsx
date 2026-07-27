"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { registerSchema } from "../schemas/auth.schema"
import { PasswordInput } from "./PasswordInput"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/use-auth-store"
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { z } from "zod"

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const { registerUser, isLoading } = useAuthStore()
  const [errorMsg, setErrorMsg] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMsg("")
    try {
      await registerUser(data.email, data.name)
      // Redirect to onboarding stepper where role is chosen
      router.push("/onboarding")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message)
      } else {
        setErrorMsg("Failed to register account.")
      }
    }
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

      {/* Name */}
      <motion.div variants={itemVariants} className="space-y-1.5">
        <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Full name
        </label>
        <Input
          id="name"
          placeholder="your full name"
          className={`transition-all duration-200 focus-visible:ring-accent/40 focus-visible:border-accent ${
            errors.name ? "border-destructive focus-visible:ring-destructive/30" : ""
          }`}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-[10px] font-bold text-destructive">{errors.name.message}</p>
        )}
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants} className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Email address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
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
        <label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Password
        </label>
        <PasswordInput
          id="password"
          className={errors.password ? "border-destructive focus-visible:ring-destructive/30" : ""}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-[10px] font-bold text-destructive">{errors.password.message}</p>
        )}
      </motion.div>

      {/* Confirm Password */}
      <motion.div variants={itemVariants} className="space-y-1.5">
        <label htmlFor="confirmPassword" className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Confirm password
        </label>
        <PasswordInput
          id="confirmPassword"
          className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive/30" : ""}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-[10px] font-bold text-destructive">{errors.confirmPassword.message}</p>
        )}
      </motion.div>

      {/* Submit */}
      <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-1">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-5 h-auto rounded-xl shadow-lg shadow-slate-900/10 border-0 cursor-pointer flex items-center justify-center gap-2 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin text-accent" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Continue to Role Setup</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Footer login redirect link */}
      <motion.div variants={itemVariants} className="text-center pt-2 text-xs text-muted-foreground select-none">
        Already have an account?{" "}
        <Link href="/login">
          <span className="font-bold text-accent hover:underline inline-flex items-center gap-0.5 cursor-pointer">
            Sign In <ArrowRight className="size-3" />
          </span>
        </Link>
      </motion.div>
    </motion.form>
  )
}
