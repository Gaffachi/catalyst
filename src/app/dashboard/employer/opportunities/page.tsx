"use client"

import * as React from "react"
import { OpportunityService } from "@/features/employer/services/opportunity.service"
import { Opportunity } from "@/features/employer/types/employer.types"
import { OpportunityCard } from "@/features/employer/components/OpportunityCard"
import { OpportunityForm } from "@/features/employer/components/OpportunityForm"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Briefcase } from "lucide-react"

export default function OpportunityManagementPage() {
  const [opportunities, setOpportunities] = React.useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showCreateForm, setShowCreateForm] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"ALL" | "INTERNSHIP" | "GRADUATE_PROGRAM" | "FULL_TIME" | "CONTRACT">("ALL")

  const loadOpportunities = React.useCallback(async () => {
    try {
      const data = await OpportunityService.getOpportunities()
      setOpportunities(data)
    } catch (err) {
      console.error("Failed to load opportunities:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadOpportunities()
  }, [loadOpportunities])

  const handleCreateOpp = async (values: Omit<Opportunity, "id" | "companyId" | "companyName" | "postedDate" | "applicantCount">) => {
    setIsLoading(true)
    try {
      const updated = await OpportunityService.createOpportunity(values)
      setOpportunities(updated)
      setShowCreateForm(false)
    } catch (err) {
      console.error("Failed to create opportunity:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseOpp = async (id: string) => {
    const updated = await OpportunityService.closeOpportunity(id)
    setOpportunities(updated)
  }

  const filteredOpps = opportunities.filter((o) => {
    if (activeTab === "ALL") return true
    return o.type === activeTab
  })

  if (isLoading && opportunities.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading opportunity listings...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-4 select-none">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Opportunity Management
          </h1>
          <p className="text-xs text-muted-foreground">
            Publish and manage internships, graduate rotational programs, full-time positions, and contract roles.
          </p>
        </div>

        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-bold text-xs cursor-pointer shrink-0"
        >
          <Plus className="size-4 mr-1.5" />
          Create Opportunity
        </Button>
      </div>

      {/* Form overlay */}
      {showCreateForm && (
        <div className="animate-in slide-in-from-top-3 duration-250">
          <OpportunityForm
            onSubmit={handleCreateOpp}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {/* Type Filter tabs */}
      <div className="flex items-center gap-1.5 shrink-0 border border-slate-200 dark:border-slate-800 p-1 rounded-xl bg-white dark:bg-slate-900 w-full sm:w-auto justify-center select-none">
        {[
          { id: "ALL", name: "All Types" },
          { id: "INTERNSHIP", name: "Internships" },
          { id: "GRADUATE_PROGRAM", name: "Graduate Programs" },
          { id: "FULL_TIME", name: "Full Time" },
          { id: "CONTRACT", name: "Contract" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
              activeTab === tab.id ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpps.map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} onCloseOpportunity={handleCloseOpp} />
        ))}

        {filteredOpps.length === 0 && (
          <div className="col-span-full p-12 text-center border border-dashed border-border rounded-2xl bg-slate-50/10 text-muted-foreground select-none">
            <Briefcase className="size-8 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-bold">No opportunities match this filter.</p>
            <p className="text-[10px] text-slate-400">Click &quot;Create Opportunity&quot; to publish your first position.</p>
          </div>
        )}
      </div>
    </div>
  )
}
