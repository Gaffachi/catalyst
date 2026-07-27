import { mockOpportunities } from "./mockData"
import { Opportunity } from "../types/employer.types"

let opportunitiesStore: Opportunity[] = [...mockOpportunities]

export class OpportunityService {
  static async getOpportunities(): Promise<Opportunity[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...opportunitiesStore]), 150)
    })
  }

  static async getOpportunityById(id: string): Promise<Opportunity | null> {
    return new Promise((resolve) => {
      const found = opportunitiesStore.find((o) => o.id === id) || null
      setTimeout(() => resolve(found), 100)
    })
  }

  static async createOpportunity(data: Omit<Opportunity, "id" | "companyId" | "companyName" | "postedDate" | "applicantCount">): Promise<Opportunity[]> {
    return new Promise((resolve) => {
      const newOpp: Opportunity = {
        ...data,
        id: `opp-${Date.now()}`,
        companyId: "comp-hubtel",
        companyName: "Hubtel Ghana",
        postedDate: new Date().toISOString().split("T")[0],
        applicantCount: 0,
      }
      opportunitiesStore = [newOpp, ...opportunitiesStore]
      setTimeout(() => resolve([...opportunitiesStore]), 200)
    })
  }

  static async updateOpportunity(id: string, data: Partial<Opportunity>): Promise<Opportunity[]> {
    return new Promise((resolve) => {
      opportunitiesStore = opportunitiesStore.map((o) => o.id === id ? { ...o, ...data } : o)
      setTimeout(() => resolve([...opportunitiesStore]), 200)
    })
  }

  static async closeOpportunity(id: string): Promise<Opportunity[]> {
    return new Promise((resolve) => {
      opportunitiesStore = opportunitiesStore.map((o) => o.id === id ? { ...o, status: "Closed" } : o)
      setTimeout(() => resolve([...opportunitiesStore]), 150)
    })
  }
}
