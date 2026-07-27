import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, ArrowUpRight } from "lucide-react"

interface SkillProgressCardProps {
  skills: string[]
}

export function SkillProgressCard({ skills }: SkillProgressCardProps) {
  const learningPaths = [
    { name: "Advanced System Integration", platform: "ICT Department Core" },
    { name: "TypeScript and Enterprise Architectures", platform: "Sponsor Platform Course" },
  ]

  return (
    <Card className="border border-border/60 bg-card shadow-sm h-full flex flex-col justify-between p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold text-foreground">
            Current Skill Competencies
          </h3>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase">
            {skills.length} Tags
          </span>
        </div>

        {/* Badges Grid */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary"
              className="px-2 py-1 text-[11px] font-semibold border-slate-200"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Recommended paths */}
        <div className="border-t border-border/40 mt-4 pt-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <GraduationCap className="size-4 text-accent" />
            <span>Recommended Learning Paths</span>
          </div>
          <div className="space-y-2">
            {learningPaths.map((path) => (
              <div 
                key={path.name} 
                className="p-2.5 rounded-lg border border-border/50 bg-slate-50/20 hover:border-slate-300 transition-colors flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <h4 className="text-[11px] font-bold text-foreground line-clamp-1">
                    {path.name}
                  </h4>
                  <p className="text-[9px] text-muted-foreground">
                    {path.platform}
                  </p>
                </div>
                <ArrowUpRight className="size-3 text-muted-foreground shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </Card>
  )
}
