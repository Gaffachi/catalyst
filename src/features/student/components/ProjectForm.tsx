"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  techStackRaw: z.string().min(2, "Specify at least one tech skill tag"),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["In Progress", "Completed"]),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  onSubmit: (values: { title: string; description: string; techStack: string[]; githubUrl?: string; liveUrl?: string; status: "In Progress" | "Completed" }) => void
  onCancel: () => void
}

export function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      techStackRaw: "",
      githubUrl: "",
      liveUrl: "",
      status: "Completed",
    },
  })

  const onFormSubmit = (data: ProjectFormValues) => {
    const techStack = data.techStackRaw.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
    onSubmit({
      title: data.title,
      description: data.description,
      techStack,
      githubUrl: data.githubUrl || undefined,
      liveUrl: data.liveUrl || undefined,
      status: data.status,
    })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="p-5 rounded-xl border border-orange-200 bg-orange-50/20 space-y-4 max-w-lg select-none">
      <h4 className="text-xs font-bold text-slate-800">Add Project Showcase</h4>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500">Project Title</label>
        <Input 
          type="text" 
          placeholder="E.g. Distributed Audit System"
          {...register("title")} 
          className={`h-9 text-xs bg-background ${errors.title ? "border-rose-400 focus-visible:ring-rose-200" : ""}`}
        />
        {errors.title && <p className="text-[10px] text-rose-500 font-medium">{errors.title.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500">Project Description</label>
        <textarea 
          rows={2} 
          placeholder="Describe target objectives, methods, and results..."
          {...register("description")} 
          className={`flex w-full rounded-lg border bg-background px-3 py-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 ${
            errors.description ? "border-rose-400 focus-visible:ring-rose-250" : "border-input focus-visible:ring-ring/40"
          }`}
        />
        {errors.description && <p className="text-[10px] text-rose-500 font-medium">{errors.description.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500">Technologies Used (comma separated)</label>
        <Input 
          type="text" 
          placeholder="Next.js, Tailwind CSS, PostgreSQL"
          {...register("techStackRaw")} 
          className={`h-9 text-xs bg-background ${errors.techStackRaw ? "border-rose-400 focus-visible:ring-rose-200" : ""}`}
        />
        {errors.techStackRaw && <p className="text-[10px] text-rose-500 font-medium">{errors.techStackRaw.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500">GitHub Repository URL</label>
          <Input 
            type="text" 
            placeholder="https://github.com/..."
            {...register("githubUrl")} 
            className={`h-9 text-xs bg-background ${errors.githubUrl ? "border-rose-400" : ""}`}
          />
          {errors.githubUrl && <p className="text-[10px] text-rose-500 font-medium">{errors.githubUrl.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500">Live Demo URL</label>
          <Input 
            type="text" 
            placeholder="https://demo.com"
            {...register("liveUrl")} 
            className={`h-9 text-xs bg-background ${errors.liveUrl ? "border-rose-400" : ""}`}
          />
          {errors.liveUrl && <p className="text-[10px] text-rose-500 font-medium">{errors.liveUrl.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500">Project Status</label>
        <select 
          {...register("status")}
          className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-xs shadow-sm"
        >
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      <div className="flex gap-2 justify-end">
        <Button size="sm" variant="outline" type="button" onClick={onCancel} className="h-7 text-[10px]">
          Cancel
        </Button>
        <Button size="sm" type="submit" className="bg-slate-900 text-white hover:bg-slate-800 border-0 h-7 text-[10px]">
          Link Project
        </Button>
      </div>
    </form>
  )
}
