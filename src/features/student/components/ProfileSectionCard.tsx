import * as React from "react"
import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface ProfileSectionCardProps {
  title: string
  icon: LucideIcon
  children: React.ReactNode
}

export function ProfileSectionCard({ title, icon: Icon, children }: ProfileSectionCardProps) {
  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-border/40 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 shrink-0">
          <Icon className="size-4.5" />
        </div>
        <h3 className="font-heading text-sm font-bold text-foreground">
          {title}
        </h3>
      </div>
      <div className="space-y-4 pt-1">
        {children}
      </div>
    </Card>
  )
}
