import { Message } from "@/features/mentor/types/mentor.types"

const mockAdminMessages: Message[] = [
  {
    id: "msg-adm-1",
    senderId: "mentor-dr-sarah",
    senderName: "Dr. Sarah Johnson (Mentor)",
    recipientId: "admin-master",
    content: "Hello Admin, I have submitted my updated credentials for verification. Could you please review my profile?",
    timestamp: "2026-07-23T10:15:00Z",
    isUnread: false,
  },
  {
    id: "msg-adm-2",
    senderId: "admin-master",
    senderName: "Admin Console",
    recipientId: "mentor-dr-sarah",
    content: "Thank you Dr. Johnson. We have received your documents and will complete the review within 24 hours.",
    timestamp: "2026-07-23T10:45:00Z",
    isUnread: false,
  },
  {
    id: "msg-adm-3",
    senderId: "emp-paystack",
    senderName: "Paystack Africa (Employer)",
    recipientId: "admin-master",
    content: "Greetings Administrator, we posted 3 new graduate rotational listings today. Kindly approve them for the marketplace.",
    timestamp: "2026-07-24T06:20:00Z",
    isUnread: true,
  },
  {
    id: "msg-adm-4",
    senderId: "partner-ashesi",
    senderName: "Ashesi University (Partner)",
    recipientId: "admin-master",
    content: "Good morning! We would like to schedule a coordination call to extend our Catalyst internship program partnership.",
    timestamp: "2026-07-24T07:10:00Z",
    isUnread: true,
  },
]

export class AdminMessageService {
  static async getMessages(): Promise<Message[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockAdminMessages]), 150)
    })
  }

  static async sendMessage(content: string, recipientId: string = "emp-paystack"): Promise<Message[]> {
    return new Promise((resolve) => {
      const newMsg: Message = {
        id: `msg-adm-${Date.now()}`,
        senderId: "admin-master",
        senderName: "Admin Console",
        recipientId,
        content,
        timestamp: new Date().toISOString(),
        isUnread: false,
      }
      mockAdminMessages.push(newMsg)
      setTimeout(() => resolve([...mockAdminMessages]), 200)
    })
  }
}
