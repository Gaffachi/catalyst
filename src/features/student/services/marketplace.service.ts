import { Opportunity } from "../types/student.types"
import { mockInternships, mockApplications } from "./mockData"

export class MarketplaceService {
  // Retrieve all active opportunities
  static async getOpportunities(): Promise<Opportunity[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...mockInternships]
  }

  // Retrieve personalized recommended opportunities (sorted by match score descending)
  static async getRecommendedOpportunities(): Promise<Opportunity[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    // Filter opportunities with a matchScore of 80% or higher and sort by matchScore desc
    return [...mockInternships]
      .filter((opp) => opp.matchScore >= 80)
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  // Apply to a specific opportunity in the marketplace
  static async applyOpportunity(id: string): Promise<Opportunity[]> {
    await new Promise((resolve) => setTimeout(resolve, 350))
    const opp = mockInternships.find((o) => o.id === id)
    if (opp && opp.applicationStatus === "Apply Now") {
      opp.applicationStatus = "Applied"
      opp.applied = true
      
      // Seed a record in the applications tracker database slice
      mockApplications.push({
        id: `app-${Math.random().toString(36).substr(2, 9)}`,
        companyName: opp.company,
        role: opp.title,
        appliedDate: new Date().toISOString().split("T")[0],
        status: "Applied",
        opportunityType: opp.type,
      })
    }
    return [...mockInternships]
  }
}
