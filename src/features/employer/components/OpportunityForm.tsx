import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Opportunity } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

const opportunitySchema = z.object({
  title: z.string().min(3, "Title is required"),
  type: z.enum(["INTERNSHIP", "GRADUATE_PROGRAM", "FULL_TIME", "CONTRACT"]),
  experienceLevel: z.enum(["Entry Level", "Junior", "Mid Level", "Internship"]),
  workMode: z.enum(["On-site", "Hybrid", "Remote"]),
  location: z.string().min(2, "Location is required"),
  deadline: z.string().min(1, "Deadline date is required"),
  salaryRange: z.string().min(2, "Salary or stipend is required"),
  skillsString: z.string().min(2, "Enter at least one skill (comma separated)"),
  description: z.string().min(20, "Description must be at least 20 characters"),
})

type OpportunityFormData = z.infer<typeof opportunitySchema>

interface OpportunityFormProps {
  onSubmit: (data: Omit<Opportunity, "id" | "companyId" | "companyName" | "postedDate" | "applicantCount">) => void
  onCancel: () => void
}

export function OpportunityForm({ onSubmit, onCancel }: OpportunityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: "",
      type: "FULL_TIME",
      experienceLevel: "Junior",
      workMode: "Hybrid",
      location: "Accra, Ghana",
      deadline: "2026-09-01",
      salaryRange: "GHS 8,000 / month",
      skillsString: "React, Node.js, SQL, Git",
      description: "",
    },
  })

  const handleFormSubmit = (data: OpportunityFormData) => {
    const requiredSkills = data.skillsString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    onSubmit({
      title: data.title,
      type: data.type,
      experienceLevel: data.experienceLevel,
      workMode: data.workMode,
      location: data.location,
      deadline: data.deadline,
      salaryRange: data.salaryRange,
      requiredSkills,
      description: data.description,
      applicationRequirements: ["Resume / CV", "GitHub Portfolio"],
      status: "Active",
    })
  }

  return (
    <Card className="p-6 border border-orange-200 bg-orange-50/15 shadow-md space-y-4 select-none">
      <div className="flex justify-between items-center border-b border-orange-200/60 pb-3">
        <h3 className="font-heading text-base font-bold text-slate-800 flex items-center gap-2">
          <Plus className="size-4 text-accent" />
          Create New Career Opportunity
        </h3>
        <button onClick={onCancel} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
          <X className="size-4.5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Position Title</label>
            <Input {...register("title")} placeholder="E.g. Junior Backend Engineer" className="h-9 text-xs bg-background" />
            {errors.title && <p className="text-[10px] text-rose-600 font-semibold">{errors.title.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Opportunity Type</label>
            <select {...register("type")} className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none">
              <option value="INTERNSHIP">INTERNSHIP</option>
              <option value="GRADUATE_PROGRAM">GRADUATE_PROGRAM</option>
              <option value="FULL_TIME">FULL_TIME</option>
              <option value="CONTRACT">CONTRACT</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Experience Level</label>
            <select {...register("experienceLevel")} className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none">
              <option value="Internship">Internship</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid Level">Mid Level</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Work Mode</label>
            <select {...register("workMode")} className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none">
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Location</label>
            <Input {...register("location")} className="h-9 text-xs bg-background" />
            {errors.location && <p className="text-[10px] text-rose-600 font-semibold">{errors.location.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Application Deadline</label>
            <Input type="date" {...register("deadline")} className="h-9 text-xs bg-background" />
            {errors.deadline && <p className="text-[10px] text-rose-600 font-semibold">{errors.deadline.message}</p>}
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Salary / Stipend Range</label>
            <Input {...register("salaryRange")} placeholder="E.g. GHS 8,000 - GHS 12,000 / month" className="h-9 text-xs bg-background" />
            {errors.salaryRange && <p className="text-[10px] text-rose-600 font-semibold">{errors.salaryRange.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase text-[10px]">Required Tech Skills (comma separated)</label>
          <Input {...register("skillsString")} placeholder="Node.js, TypeScript, PostgreSQL, Docker" className="h-9 text-xs bg-background" />
          {errors.skillsString && <p className="text-[10px] text-rose-600 font-semibold">{errors.skillsString.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase text-[10px]">Role Description & Requirements</label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Describe the opportunity responsibility, tech stack, and ideal candidate profile..."
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-sm focus-visible:outline-none"
          />
          {errors.description && <p className="text-[10px] text-rose-600 font-semibold">{errors.description.message}</p>}
        </div>

        <div className="flex justify-end gap-2.5 pt-2">
          <Button type="button" onClick={onCancel} variant="outline" className="h-9 rounded-xl font-bold text-xs cursor-pointer border-slate-200">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white h-9 rounded-xl font-bold text-xs cursor-pointer border-0">
            Publish Opportunity
          </Button>
        </div>
      </form>
    </Card>
  )
}
