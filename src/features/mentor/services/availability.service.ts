import { MentorAvailability } from "../types/mentor.types"
import { mockMentorAvailability } from "./mockData"

export class AvailabilityService {
  static async getAvailability(): Promise<MentorAvailability> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return { ...mockMentorAvailability }
  }

  static async updateAvailability(availability: Partial<MentorAvailability>): Promise<MentorAvailability> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    Object.assign(mockMentorAvailability, availability)
    return { ...mockMentorAvailability }
  }
}
