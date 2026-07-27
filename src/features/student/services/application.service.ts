import { Application } from "../types/student.types"
import { mockApplications } from "./mockData"

export class ApplicationService {
  static async getApplications(): Promise<Application[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...mockApplications]
  }
}
