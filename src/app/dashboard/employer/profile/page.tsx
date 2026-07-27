"use client"

import * as React from "react"
import { CompanyService } from "@/features/employer/services/company.service"
import { CompanyProfile } from "@/features/employer/types/employer.types"
import { CompanyProfileCard } from "@/features/employer/components/CompanyProfileCard"
import { CompanyProfileForm } from "@/features/employer/components/CompanyProfileForm"
import { Loader2 } from "lucide-react"

export default function CompanyProfilePage() {
  const [company, setCompany] = React.useState<CompanyProfile | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const loadCompany = React.useCallback(async () => {
    try {
      const data = await CompanyService.getProfile()
      setCompany(data)
    } catch (err) {
      console.error("Failed to load company profile:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadCompany()
  }, [loadCompany])

  const handleUpdate = async (values: Partial<CompanyProfile>) => {
    setIsLoading(true)
    try {
      const updated = await CompanyService.updateProfile(values)
      setCompany(updated)
      setIsEditing(false)
    } catch (err) {
      console.error("Failed to update company profile:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !company) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading company profile...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-border/40 pb-4 select-none">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Corporate Profile
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage your organization details, verification status, and public brand presence for student recruitment.
        </p>
      </div>

      {isEditing ? (
        <CompanyProfileForm
          company={company}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <CompanyProfileCard company={company} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  )
}
