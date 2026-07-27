import { mockEmployerSettings } from "./mockData"
import { AnalyticsService } from "./analytics.service"
import { EmployerSettings } from "../types/employer.types"

let settingsStore: EmployerSettings = { ...mockEmployerSettings }

export class EmployerService {
  static async getDashboardStats() {
    return AnalyticsService.getAnalytics()
  }

  static async getSettings(): Promise<EmployerSettings> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...settingsStore }), 100)
    })
  }

  static async updateSettings(updated: Partial<EmployerSettings>): Promise<EmployerSettings> {
    return new Promise((resolve) => {
      settingsStore = { ...settingsStore, ...updated }
      setTimeout(() => resolve({ ...settingsStore }), 150)
    })
  }
}
