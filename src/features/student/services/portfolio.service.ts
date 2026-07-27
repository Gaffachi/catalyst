import { PortfolioProject } from "../types/student.types"
import { mockProjects } from "./mockData"

export class PortfolioService {
  static async getProjects(): Promise<PortfolioProject[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...mockProjects]
  }

  static async addProject(project: Omit<PortfolioProject, "id" | "mentorReviewStatus">): Promise<PortfolioProject[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newProj: PortfolioProject = {
      id: `proj-${Math.random().toString(36).substr(2, 9)}`,
      mentorReviewStatus: "Pending",
      ...project,
    }
    mockProjects.push(newProj)
    return [...mockProjects]
  }
}
