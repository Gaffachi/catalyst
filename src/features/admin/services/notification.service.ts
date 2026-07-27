import { mockAnnouncements } from "./mockData"
import { PlatformAnnouncement } from "../types/admin.types"

let announcementsStore: PlatformAnnouncement[] = [...mockAnnouncements]

export class NotificationService {
  static async getAnnouncements(): Promise<PlatformAnnouncement[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...announcementsStore]), 150)
    })
  }

  static async createAnnouncement(
    data: Omit<PlatformAnnouncement, "id" | "date" | "author">
  ): Promise<PlatformAnnouncement[]> {
    return new Promise((resolve) => {
      const newAnn: PlatformAnnouncement = {
        ...data,
        id: `ann-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        author: "Dr. Kwesi Appiah (Admin)",
      }
      announcementsStore = [newAnn, ...announcementsStore]
      setTimeout(() => resolve([...announcementsStore]), 150)
    })
  }
}
