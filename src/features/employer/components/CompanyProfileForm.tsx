import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CompanyProfile } from "../types/employer.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, X } from "lucide-react"

const companySchema = z.object({
  name: z.string().min(2, "Company name is required"),
  industry: z.string().min(2, "Industry is required"),
  companySize: z.string().min(2, "Company size is required"),
  location: z.string().min(2, "Location is required"),
  website: z.string().url("Must be a valid URL (e.g. https://company.com)"),
  contactEmail: z.string().email("Must be a valid email address"),
  contactPhone: z.string().min(5, "Contact phone is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
})

type CompanyFormData = z.infer<typeof companySchema>

interface CompanyProfileFormProps {
  company: CompanyProfile
  onSubmit: (data: CompanyFormData) => void
  onCancel: () => void
}

export function CompanyProfileForm({ company, onSubmit, onCancel }: CompanyProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company.name,
      industry: company.industry,
      companySize: company.companySize,
      location: company.location,
      website: company.website,
      contactEmail: company.contactEmail,
      contactPhone: company.contactPhone,
      description: company.description,
    },
  })

  return (
    <Card className="p-6 border border-orange-200 bg-orange-50/10 shadow-md space-y-4 select-none">
      <div className="flex justify-between items-center border-b border-orange-200/60 pb-3">
        <h3 className="font-heading text-base font-bold text-slate-800">
          Edit Corporate Profile Information
        </h3>
        <button onClick={onCancel} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
          <X className="size-4.5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Company Name</label>
            <Input {...register("name")} className="h-9 text-xs bg-background" />
            {errors.name && <p className="text-[10px] text-rose-600 font-semibold">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Industry</label>
            <Input {...register("industry")} className="h-9 text-xs bg-background" />
            {errors.industry && <p className="text-[10px] text-rose-600 font-semibold">{errors.industry.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Company Size</label>
            <Input {...register("companySize")} className="h-9 text-xs bg-background" placeholder="E.g. 100-250 Employees" />
            {errors.companySize && <p className="text-[10px] text-rose-600 font-semibold">{errors.companySize.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Headquarters Location</label>
            <Input {...register("location")} className="h-9 text-xs bg-background" />
            {errors.location && <p className="text-[10px] text-rose-600 font-semibold">{errors.location.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Website URL</label>
            <Input {...register("website")} className="h-9 text-xs bg-background" />
            {errors.website && <p className="text-[10px] text-rose-600 font-semibold">{errors.website.message}</p>}
          </div>

          <div className="space-y-1 sm:col-span-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Contact Email</label>
            <Input {...register("contactEmail")} className="h-9 text-xs bg-background" />
            {errors.contactEmail && <p className="text-[10px] text-rose-600 font-semibold">{errors.contactEmail.message}</p>}
          </div>

          <div className="space-y-1 sm:col-span-1">
            <label className="font-bold text-slate-600 uppercase text-[10px]">Contact Phone</label>
            <Input {...register("contactPhone")} className="h-9 text-xs bg-background" />
            {errors.contactPhone && <p className="text-[10px] text-rose-600 font-semibold">{errors.contactPhone.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase text-[10px]">Company Overview & Mission</label>
          <textarea
            {...register("description")}
            rows={3}
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-sm focus-visible:outline-none"
          />
          {errors.description && <p className="text-[10px] text-rose-600 font-semibold">{errors.description.message}</p>}
        </div>

        <div className="flex justify-end gap-2.5 pt-2">
          <Button type="button" onClick={onCancel} variant="outline" className="h-9 rounded-xl font-bold text-xs cursor-pointer border-slate-200">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white h-9 rounded-xl font-bold text-xs cursor-pointer border-0">
            <Save className="size-3.5 mr-1.5" />
            Save Profile
          </Button>
        </div>
      </form>
    </Card>
  )
}
