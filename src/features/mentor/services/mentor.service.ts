import { MentorProfile, MentorSettings } from "../types/mentor.types"
import { mockMentorProfile, mockMentorSettings } from "./mockData"

export class MentorService {
  static async getProfile(): Promise<MentorProfile> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return { ...mockMentorProfile }
  }

  static async updateProfile(profile: Partial<MentorProfile>): Promise<MentorProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    Object.assign(mockMentorProfile, profile)
    return { ...mockMentorProfile }
  }

  static async getSettings(): Promise<MentorSettings> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return { ...mockMentorSettings }
  }

  static async updateSettings(settings: Partial<MentorSettings>): Promise<MentorSettings> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    Object.assign(mockMentorSettings, settings)
    return { ...mockMentorSettings }
  }
}
