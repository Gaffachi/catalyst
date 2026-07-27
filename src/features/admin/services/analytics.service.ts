import { mockPlatformAnalytics } from "./mockData"
import { PlatformAnalytics } from "../types/admin.types"

export class AnalyticsService {
  static async getAnalytics(): Promise<PlatformAnalytics> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...mockPlatformAnalytics }), 150)
    })
  }
}
