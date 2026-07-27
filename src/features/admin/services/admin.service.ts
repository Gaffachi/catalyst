import { mockAdminSettings } from "./mockData"
import { AnalyticsService } from "./analytics.service"
import { AdminSettings } from "../types/admin.types"

let settingsStore: AdminSettings = { ...mockAdminSettings }

export class AdminService {
  static async getDashboardStats() {
    return AnalyticsService.getAnalytics()
  }

  static async getSettings(): Promise<AdminSettings> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...settingsStore }), 100)
    })
  }

  static async updateSettings(updated: Partial<AdminSettings>): Promise<AdminSettings> {
    return new Promise((resolve) => {
      settingsStore = { ...settingsStore, ...updated }
      setTimeout(() => resolve({ ...settingsStore }), 150)
    })
  }
}
