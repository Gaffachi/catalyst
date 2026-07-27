import { MentorshipSession } from "../types/mentor.types"
import { mockMentorshipSessions } from "./mockData"

export class SessionService {
  static async getSessions(): Promise<MentorshipSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [...mockMentorshipSessions]
  }

  static async rescheduleSession(
    id: string, 
    date: string, 
    time: string
  ): Promise<MentorshipSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    const session = mockMentorshipSessions.find((s) => s.id === id)
    if (session) {
      session.date = date
      session.time = time
      session.status = "Upcoming"
    }
    return [...mockMentorshipSessions]
  }

  static async cancelSession(id: string, notes?: string): Promise<MentorshipSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const session = mockMentorshipSessions.find((s) => s.id === id)
    if (session) {
      session.status = "Cancelled"
      if (notes) session.notes = notes
    }
    return [...mockMentorshipSessions]
  }

  static async completeSession(id: string, notes: string): Promise<MentorshipSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    const session = mockMentorshipSessions.find((s) => s.id === id)
    if (session) {
      session.status = "Completed"
      session.notes = notes
    }
    return [...mockMentorshipSessions]
  }

  static async scheduleSession(session: Omit<MentorshipSession, "id" | "status">): Promise<MentorshipSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newSession: MentorshipSession = {
      ...session,
      id: `session-${mockMentorshipSessions.length + 1}`,
      status: "Upcoming"
    }
    mockMentorshipSessions.push(newSession)
    return [...mockMentorshipSessions]
  }
}
