import { mockAdminReports } from "./mockData"
import { AdminReport } from "../types/admin.types"

export class ReportService {
  static async getReports(): Promise<AdminReport[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockAdminReports]), 150)
    })
  }
}
