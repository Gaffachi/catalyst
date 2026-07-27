import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PortfolioProject } from "../types/student.types"
import { GitBranch, Globe, CheckCircle2, AlertCircle } from "lucide-react"

interface ProjectCardProps {
  project: PortfolioProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Style review status badge
  const getReviewBadge = (status: PortfolioProject["mentorReviewStatus"]) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-[9px] uppercase"><CheckCircle2 className="size-3 mr-1 inline" />Verified</Badge>
      case "Needs Adjustment":
        return <Badge className="bg-rose-50 border-rose-200 text-rose-700 font-semibold px-2 py-0.5 rounded-full text-[9px] uppercase"><AlertCircle className="size-3 mr-1 inline" />Needs Review</Badge>
      case "Pending":
      default:
        return <Badge className="bg-slate-50 border-slate-200 text-slate-500 font-semibold px-2 py-0.5 rounded-full text-[9px] uppercase">Pending Review</Badge>
    }
  }

  return (
    <Card className="p-5 border border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-[210px] select-none">
      <div className="space-y-3">
        {/* Title and Badge */}
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-1">
            <h4 className="font-heading text-sm font-bold text-foreground line-clamp-1">
              {project.title}
            </h4>
            <span className="text-[10px] text-muted-foreground">
              Status: {project.status}
            </span>
          </div>
          {getReviewBadge(project.mentorReviewStatus)}
        </div>

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal line-clamp-2">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="text-[9px] font-semibold border-slate-200 bg-slate-100/60 px-1.5 py-0"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex gap-4 pt-3 border-t border-border/40 text-[10px] font-bold text-slate-500">
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1 hover:text-foreground"
          >
            <GitBranch className="size-3.5" />
            Codebase Repo
          </a>
        )}
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1 hover:text-foreground"
          >
            <Globe className="size-3.5" />
            Live Demo
          </a>
        )}
      </div>
    </Card>
  )
}
