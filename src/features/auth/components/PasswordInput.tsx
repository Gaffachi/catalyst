"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export const PasswordInput = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative group">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "pr-10 transition-all duration-200 focus-visible:ring-accent/40 focus-visible:border-accent",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none p-1 rounded-md transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={showPassword ? "eye-off" : "eye"}
              initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
              transition={{ duration: 0.15 }}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
