"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PortfolioProject } from "../types/student.types"
import { FolderGit, GitBranch, Globe, CheckCircle2, Plus } from "lucide-react"

interface PortfolioCardProps {
  portfolio: PortfolioProject[]
  onAddProject: (project: { title: string; description: string; techStack: string[]; githubUrl?: string; liveUrl?: string }) => void
}

export function PortfolioCard({ portfolio, onAddProject }: PortfolioCardProps) {
  const [showAddForm, setShowAddForm] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [skillsRaw, setSkillsRaw] = React.useState("")
  const [githubUrl, setGithubUrl] = React.useState("")
  const [liveUrl, setLiveUrl] = React.useState("")
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !skillsRaw) return

    const techStack = skillsRaw.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
    onAddProject({
      title,
      description,
      techStack,
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
    })

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setShowAddForm(false)
      setTitle("")
      setDescription("")
      setSkillsRaw("")
      setGithubUrl("")
      setLiveUrl("")
    }, 1500)
  }

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-6">
      
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <h3 className="font-heading text-sm font-bold text-foreground">
          Academic & Technical Portfolio
        </h3>
        <Button 
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-8 rounded-lg text-xs cursor-pointer select-none"
        >
          <Plus className="size-3.5 mr-1" />
          Add Project
        </Button>
      </div>

      {/* 2. Add Project Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-4 rounded-xl border border-orange-200 bg-orange-50/20 dark:bg-slate-900/40 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Link New Codebase Project</h4>
          
          {success && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
              Project successfully added to portfolio!
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Project Title</label>
            <Input 
              type="text" 
              required 
              placeholder="E.g. Distributed System Dashboard"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="h-8 text-xs bg-background"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Project Description</label>
            <textarea 
              rows={2} 
              required
              placeholder="E.g. A monitoring tool analyzing database performance metadata..."
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Technologies Used (comma separated)</label>
            <Input 
              type="text" 
              required 
              placeholder="React, TypeScript, SQL"
              value={skillsRaw} 
              onChange={(e) => setSkillsRaw(e.target.value)} 
              className="h-8 text-xs bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">GitHub Repository URL</label>
              <Input 
                type="url" 
                placeholder="https://github.com/..."
                value={githubUrl} 
                onChange={(e) => setGithubUrl(e.target.value)} 
                className="h-8 text-xs bg-background"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Live Demo URL</label>
              <Input 
                type="url" 
                placeholder="https://demo.com"
                value={liveUrl} 
                onChange={(e) => setLiveUrl(e.target.value)} 
                className="h-8 text-xs bg-background"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button 
              size="sm" 
              variant="outline" 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="h-7 text-[10px] border-slate-200"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              type="submit" 
              className="bg-slate-900 text-white hover:bg-slate-800 border-0 h-7 text-[10px]"
            >
              Link Project
            </Button>
          </div>
        </form>
      )}

      {/* 3. Projects list */}
      <div className="space-y-4 select-none">
        {portfolio.map((proj) => (
          <div key={proj.id} className="p-4 rounded-xl border border-border/60 bg-slate-50/20 hover:border-slate-300 transition-colors flex gap-4 items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent shrink-0">
              <FolderGit className="size-5" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                  {proj.title}
                </h4>
                {proj.mentorReviewStatus === "Verified" ? (
                  <Badge className="bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-[9px] uppercase shrink-0">
                    <CheckCircle2 className="size-3 mr-1 inline" />
                    Vetted by Mentor
                  </Badge>
                ) : proj.mentorReviewStatus === "Needs Adjustment" ? (
                  <Badge className="bg-rose-50 border-rose-200 text-rose-700 font-semibold px-2 py-0.5 rounded-full text-[9px] uppercase shrink-0">
                    Needs Review
                  </Badge>
                ) : (
                  <Badge className="bg-slate-50 border-slate-200 text-slate-500 font-semibold px-2 py-0.5 rounded-full text-[9px] uppercase shrink-0">
                    Pending Review
                  </Badge>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal max-w-2xl">
                {proj.description}
              </p>
              
              <div className="flex flex-wrap gap-1 pt-1">
                {proj.techStack.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary"
                    className="text-[9px] font-semibold border-slate-200 bg-slate-100/60"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-2 text-[10px] font-bold text-slate-500">
                {proj.githubUrl && (
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <GitBranch className="size-3.5" />
                    Codebase Repo
                  </a>
                )}
                {proj.liveUrl && (
                  <a 
                    href={proj.liveUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <Globe className="size-3.5" />
                    Live Demo
                  </a>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

    </Card>
  )
}
