"use client"

import * as React from "react"
import { PortfolioService } from "@/features/student/services/portfolio.service"
import { PortfolioProject } from "@/features/student/types/student.types"
import { ProjectCard } from "@/features/student/components/ProjectCard"
import { ProjectForm } from "@/features/student/components/ProjectForm"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, FolderGit } from "lucide-react"

export default function StudentPortfolioPage() {
  const [projects, setProjects] = React.useState<PortfolioProject[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showAddForm, setShowAddForm] = React.useState(false)

  React.useEffect(() => {
    async function loadData() {
      try {
        const data = await PortfolioService.getProjects()
        setProjects(data)
      } catch (err) {
        console.error("Failed to load portfolio projects:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAddProject = async (values: Omit<PortfolioProject, "id" | "mentorReviewStatus">) => {
    setIsLoading(true)
    try {
      const updated = await PortfolioService.addProject(values)
      setProjects(updated)
      setShowAddForm(false)
    } catch (err) {
      console.error("Failed to add project:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && projects.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading portfolio projects...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border/40 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Project Portfolio
          </h1>
          <p className="text-xs text-muted-foreground">
            Showcase your codebase projects and submit them for mentor review.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-semibold text-xs cursor-pointer select-none"
        >
          <Plus className="size-3.5 mr-1.5" />
          Add Project
        </Button>
      </div>

      {/* Add Project Form Widget */}
      {showAddForm && (
        <div className="animate-in fade-in duration-200">
          <ProjectForm 
            onSubmit={handleAddProject} 
            onCancel={() => setShowAddForm(false)} 
          />
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {projects.length === 0 && (
          <div className="md:col-span-2 p-12 text-center rounded-2xl border border-dashed border-border/80 bg-slate-50/10 text-muted-foreground select-none">
            <FolderGit className="size-8 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-bold">No projects linked yet.</p>
            <p className="text-[10px] text-slate-400">Click &quot;Add Project&quot; above to link your first codebase project.</p>
          </div>
        )}
      </div>

    </div>
  )
}
