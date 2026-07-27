import { mockMentorVerifications, mockEmployerVerifications } from "./mockData"
import { MentorVerification, EmployerVerification } from "../types/admin.types"

let mentorVerificationsStore: MentorVerification[] = [...mockMentorVerifications]
let employerVerificationsStore: EmployerVerification[] = [...mockEmployerVerifications]

export class VerificationService {
  static async getMentorVerifications(): Promise<MentorVerification[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mentorVerificationsStore]), 150)
    })
  }

  static async updateMentorVerificationStatus(
    id: string,
    status: MentorVerification["status"]
  ): Promise<MentorVerification[]> {
    return new Promise((resolve) => {
      mentorVerificationsStore = mentorVerificationsStore.map((m) =>
        m.id === id ? { ...m, status } : m
      )
      setTimeout(() => resolve([...mentorVerificationsStore]), 150)
    })
  }

  static async getEmployerVerifications(): Promise<EmployerVerification[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...employerVerificationsStore]), 150)
    })
  }

  static async updateEmployerVerificationStatus(
    id: string,
    status: EmployerVerification["status"]
  ): Promise<EmployerVerification[]> {
    return new Promise((resolve) => {
      employerVerificationsStore = employerVerificationsStore.map((e) =>
        e.id === id ? { ...e, status } : e
      )
      setTimeout(() => resolve([...employerVerificationsStore]), 150)
    })
  }
}
