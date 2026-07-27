"use client"

import * as React from "react"
import { MentorDashboardHeader } from "@/features/mentor/components/MentorDashboardHeader"
import { AvailabilityCalendar } from "@/features/mentor/components/AvailabilityCalendar"
import { AvailabilityService } from "@/features/mentor/services/availability.service"
import { MentorAvailability } from "@/features/mentor/types/mentor.types"
import { Loader2 } from "lucide-react"

export default function MentorAvailabilityPage() {
  const [availability, setAvailability] = React.useState<MentorAvailability | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const loadAvailability = React.useCallback(async () => {
    try {
      const data = await AvailabilityService.getAvailability()
      setAvailability(data)
    } catch (err) {
      console.error("Failed to load availability:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadAvailability()
  }, [loadAvailability])

  const handleSaveAvailability = async (updatedAvailability: MentorAvailability) => {
    try {
      const data = await AvailabilityService.updateAvailability(updatedAvailability)
      setAvailability(data)
    } catch (err) {
      console.error("Failed to update availability:", err)
    }
  }

  if (isLoading || !availability) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading calendar availability slots...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header Info */}
      <MentorDashboardHeader 
        title="Schedule Working Hours"
        subtitle="Specify shift hours, break times, and week day active selections for student booking."
      />

      {/* Interactive Settings Card Component */}
      <AvailabilityCalendar 
        availability={availability}
        onSave={handleSaveAvailability}
      />

    </div>
  )
}
