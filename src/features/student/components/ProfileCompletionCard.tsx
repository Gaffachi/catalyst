import * as React from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

interface ProfileCompletionCardProps {
  completion: number
}

export function ProfileCompletionCard({ completion }: ProfileCompletionCardProps) {
  const steps = [
    { label: "Account Setup", completed: true },
    { label: "Role Configuration", completed: true },
    { label: "Stepper Profile Details", completed: true },
    { label: "Project Repos Linked", completed: completion >= 85 },
    { label: "Mentor Sessions Booked", completed: completion >= 90 },
  ]

  return (
    <Card className="border border-border/60 bg-card shadow-sm h-full flex flex-col justify-between p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold text-foreground">
            Profile Completion
          </h3>
          <span className="text-[10px] font-bold text-accent bg-orange-50 px-2 py-0.5 rounded-full uppercase">
            {completion}% Done
          </span>
        </div>

        {/* Progress Slider */}
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-orange-600 rounded-full transition-all duration-500" 
            style={{ width: `${completion}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="space-y-2 pt-2">
          {steps.map((step) => (
            <div 
              key={step.label} 
              className="flex items-center justify-between text-xs select-none"
            >
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                {step.label}
              </span>
              {step.completed ? (
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="size-4 text-slate-300 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
