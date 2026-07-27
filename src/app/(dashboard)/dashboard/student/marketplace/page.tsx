"use client"

import * as React from "react"
import { MarketplaceService } from "@/features/student/services/marketplace.service"
import { ProfileService } from "@/features/student/services/profile.service"
import { Opportunity, StudentProfile } from "@/features/student/types/student.types"
import { MarketplaceStats } from "@/features/student/components/MarketplaceStats"
import { OpportunityCategoryStats } from "@/features/student/components/OpportunityCategoryStats"
import { EmploymentReadinessCard } from "@/features/student/components/EmploymentReadinessCard"
import { RecommendedOpportunities } from "@/features/student/components/RecommendedOpportunities"
import { OpportunityFilter } from "@/features/student/components/OpportunityFilter"
import { OpportunityCard } from "@/features/student/components/OpportunityCard"
import { Loader2, Briefcase } from "lucide-react"

export default function StudentMarketplacePage() {
  const [opportunities, setOpportunities] = React.useState<Opportunity[]>([])
  const [recommendations, setRecommendations] = React.useState<Opportunity[]>([])
  const [profile, setProfile] = React.useState<StudentProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Filter States
  const [searchQuery, setSearchQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("All")
  const [workModeFilter, setWorkModeFilter] = React.useState("All")
  const [experienceFilter, setExperienceFilter] = React.useState("All")
  const [locationFilter, setLocationFilter] = React.useState("")
  const [skillsFilter, setSkillsFilter] = React.useState("")

  const loadData = React.useCallback(async () => {
    try {
      const opps = await MarketplaceService.getOpportunities()
      const recs = await MarketplaceService.getRecommendedOpportunities()
      const prof = await ProfileService.getProfile()
      
      setOpportunities(opps)
      setRecommendations(recs)
      setProfile(prof)
    } catch (err) {
      console.error("Failed to load marketplace data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const handleApply = async (id: string) => {
    try {
      const updated = await MarketplaceService.applyOpportunity(id)
      setOpportunities(updated)
      
      // Reload recommendations and profile status to synchronize applied states
      const recs = await MarketplaceService.getRecommendedOpportunities()
      const prof = await ProfileService.getProfile()
      setRecommendations(recs)
      setProfile(prof)
    } catch (err) {
      console.error("Failed to apply to opportunity:", err)
    }
  }

  // Filter Logic
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = typeFilter === "All" || opp.type === typeFilter
    
    const matchesWorkMode = workModeFilter === "All" || opp.workMode === workModeFilter
    
    const matchesExperience = experienceFilter === "All" || opp.experienceLevel === experienceFilter
    
    const matchesLocation = 
      !locationFilter || 
      opp.location.toLowerCase().includes(locationFilter.toLowerCase())
    
    const matchesSkills = 
      !skillsFilter || 
      opp.requiredSkills.some((s) => s.toLowerCase().includes(skillsFilter.toLowerCase()))

    return matchesSearch && matchesType && matchesWorkMode && matchesExperience && matchesLocation && matchesSkills
  })

  // Dynamic distribution stats calculation
  const internshipsCount = opportunities.filter((o) => o.type === "INTERNSHIP").length
  const gradProgramsCount = opportunities.filter((o) => o.type === "GRADUATE_PROGRAM").length
  const fullTimeCount = opportunities.filter((o) => o.type === "FULL_TIME").length
  const contractsCount = opportunities.filter((o) => o.type === "CONTRACT").length

  // Eligibility thresholds calculation
  const eligibleInternships = opportunities.filter((o) => o.type === "INTERNSHIP" && o.matchScore >= 70).length
  const eligibleGradPrograms = opportunities.filter((o) => o.type === "GRADUATE_PROGRAM" && o.matchScore >= 70).length
  const eligibleFullTime = opportunities.filter((o) => o.type === "FULL_TIME" && o.matchScore >= 70).length

  // KPI Metrics counts
  const totalCount = opportunities.length
  const matchingCount = opportunities.filter((o) => o.matchScore >= 80).length
  const submittedCount = opportunities.filter((o) => o.applicationStatus !== "Apply Now").length
  const interviewCount = opportunities.filter((o) => o.applicationStatus === "Interview").length
  const offerCount = opportunities.filter((o) => o.applicationStatus === "Offer" || o.applicationStatus === "Accepted").length

  if (isLoading) {
    return (
      <div className="min-h-[450px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading career intelligence marketplace...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* 1. Header description info */}
      <div className="border-b border-border/40 pb-4">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Career Marketplace
        </h1>
        <p className="text-xs text-muted-foreground">
          Discover vetted roles matched to your readiness index scorecard.
        </p>
      </div>

      {/* 2. Career Intelligence KPI Section */}
      <MarketplaceStats 
        totalCount={totalCount}
        matchingCount={matchingCount}
        submittedCount={submittedCount}
        interviewCount={interviewCount}
        offerCount={offerCount}
      />

      {/* 3. Personalized matching recommendations */}
      <RecommendedOpportunities 
        recommendations={recommendations}
        onApply={handleApply}
      />

      {/* 4. Category and eligibility grid splits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OpportunityCategoryStats 
          internshipsCount={internshipsCount}
          gradProgramsCount={gradProgramsCount}
          fullTimeCount={fullTimeCount}
          contractsCount={contractsCount}
        />
        <EmploymentReadinessCard 
          score={profile?.readinessScore || 0}
          eligibleInternships={eligibleInternships}
          eligibleGradPrograms={eligibleGradPrograms}
          eligibleFullTime={eligibleFullTime}
        />
      </div>

      {/* 5. Search filters controls */}
      <div className="space-y-4 pt-4 border-t border-border/30">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-heading text-sm font-bold text-foreground">
            Explore Openings
          </h3>
          <p className="text-[10px] text-muted-foreground">
            Filter all available corporate roles by work formats, locations, and technology stacks.
          </p>
        </div>

        <OpportunityFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          workModeFilter={workModeFilter}
          setWorkModeFilter={setWorkModeFilter}
          experienceFilter={experienceFilter}
          setExperienceFilter={setExperienceFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          skillsFilter={skillsFilter}
          setSkillsFilter={setSkillsFilter}
        />

        {/* 6. Active Grid list cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard 
              key={opp.id} 
              opportunity={opp} 
              onApply={handleApply} 
            />
          ))}

          {filteredOpportunities.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-border bg-slate-50/10 text-muted-foreground select-none">
              <Briefcase className="size-8 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-bold">No opportunities found.</p>
              <p className="text-[10px] text-slate-400">Try adjusting your advanced filter criteria or keyword search queries.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
