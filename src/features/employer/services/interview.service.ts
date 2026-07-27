import { mockInterviews } from "./mockData"
import { Interview } from "../types/employer.types"

let interviewsStore: Interview[] = [...mockInterviews]

export class InterviewService {
  static async getInterviews(): Promise<Interview[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...interviewsStore]), 150)
    })
  }

  static async scheduleInterview(data: Omit<Interview, "id" | "status">): Promise<Interview[]> {
    return new Promise((resolve) => {
      const newInterview: Interview = {
        ...data,
        id: `int-${Date.now()}`,
        status: "Scheduled",
      }
      interviewsStore = [newInterview, ...interviewsStore]
      setTimeout(() => resolve([...interviewsStore]), 200)
    })
  }

  static async updateInterviewStatus(id: string, status: Interview["status"]): Promise<Interview[]> {
    return new Promise((resolve) => {
      interviewsStore = interviewsStore.map((item) => 
        item.id === id ? { ...item, status } : item
      )
      setTimeout(() => resolve([...interviewsStore]), 150)
    })
  }
}
