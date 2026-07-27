import { mockPartnerships } from "./mockData"
import { Partnership } from "../types/admin.types"

let partnershipsStore: Partnership[] = [...mockPartnerships]

export class PartnershipService {
  static async getPartnerships(): Promise<Partnership[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...partnershipsStore]), 150)
    })
  }

  static async addPartnership(
    data: Omit<Partnership, "id" | "joinedDate">
  ): Promise<Partnership[]> {
    return new Promise((resolve) => {
      const newPartner: Partnership = {
        ...data,
        id: `part-${Date.now()}`,
        joinedDate: new Date().toISOString().split("T")[0],
      }
      partnershipsStore = [newPartner, ...partnershipsStore]
      setTimeout(() => resolve([...partnershipsStore]), 150)
    })
  }

  static async updatePartnershipStatus(
    id: string,
    status: Partnership["status"]
  ): Promise<Partnership[]> {
    return new Promise((resolve) => {
      partnershipsStore = partnershipsStore.map((p) => (p.id === id ? { ...p, status } : p))
      setTimeout(() => resolve([...partnershipsStore]), 150)
    })
  }
}
