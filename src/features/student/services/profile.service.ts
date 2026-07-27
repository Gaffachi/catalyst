import { StudentProfile } from "../types/student.types"
import { mockStudentProfile } from "./mockData"

export class ProfileService {
  static async getProfile(): Promise<StudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { ...mockStudentProfile }
  }

  static async updateProfile(data: Partial<StudentProfile>): Promise<StudentProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    Object.assign(mockStudentProfile, data)
    return { ...mockStudentProfile }
  }
}
