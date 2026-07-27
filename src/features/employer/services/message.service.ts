import { Message } from "@/features/mentor/types/mentor.types"

let employerMessagesStore: Message[] = [
  {
    id: "msg-emp-1",
    senderId: "cand-alex-mensah",
    senderName: "Alex Mensah",
    recipientId: "comp-hubtel",
    content: "Good day, I submitted my application for the Junior Backend Engineer role and attached my verified GitHub portfolio.",
    timestamp: "2026-07-22T09:30:00Z",
    isUnread: true,
  },
  {
    id: "msg-emp-2",
    senderId: "comp-hubtel",
    senderName: "Hubtel Recruitment Team",
    recipientId: "cand-alex-mensah",
    content: "Hi Alex! We reviewed your mentor-approved codebase projects and would like to invite you for a technical screen.",
    timestamp: "2026-07-22T10:15:00Z",
    isUnread: false,
  },
  {
    id: "msg-emp-3",
    senderId: "cand-abena-owusu",
    senderName: "Abena Owusu",
    recipientId: "comp-hubtel",
    content: "Hello Hubtel team, thank you for scheduling my DevOps intern system design interview for July 29th.",
    timestamp: "2026-07-23T14:00:00Z",
    isUnread: false,
  },
]

export class EmployerMessageService {
  static async getMessages(): Promise<Message[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...employerMessagesStore]), 150)
    })
  }

  static async sendMessage(content: string, recipientId: string): Promise<Message[]> {
    return new Promise((resolve) => {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: "comp-hubtel",
        senderName: "Hubtel Recruitment Team",
        recipientId,
        content,
        timestamp: new Date().toISOString(),
        isUnread: false,
      }
      employerMessagesStore = [...employerMessagesStore, newMsg]
      setTimeout(() => resolve([...employerMessagesStore]), 150)
    })
  }
}
