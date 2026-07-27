import { MentorshipSession } from "../types/student.types"
import { mockMentorSessions } from "./mockData"

export class MentorshipService {
  static async getSessions(): Promise<MentorshipSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...mockMentorSessions]
  }

  static async bookSession(session: Omit<MentorshipSession, "id" | "status">): Promise<MentorshipSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newSession: MentorshipSession = {
      id: `sess-${Math.random().toString(36).substr(2, 9)}`,
      status: "Scheduled",
      ...session,
    }
    mockMentorSessions.push(newSession)
    return [...mockMentorSessions]
  }
}
