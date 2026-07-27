import { mockApplications } from "./mockData"
import { EmployerApplication, ApplicationStage } from "../types/employer.types"

let applicationsStore: EmployerApplication[] = [...mockApplications]

export class ApplicationService {
  static async getApplications(): Promise<EmployerApplication[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...applicationsStore]), 150)
    })
  }

  static async updateApplicationStage(id: string, stage: ApplicationStage): Promise<EmployerApplication[]> {
    return new Promise((resolve) => {
      applicationsStore = applicationsStore.map((app) => 
        app.id === id ? { ...app, stage } : app
      )
      setTimeout(() => resolve([...applicationsStore]), 150)
    })
  }
}
