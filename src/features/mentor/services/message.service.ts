import { Message } from "../types/mentor.types"
import { mockMessages } from "./mockData"

export class MessageService {
  static async getMessages(): Promise<Message[]> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return [...mockMessages]
  }

  static async sendMessage(recipientId: string, content: string): Promise<Message[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const newMessage: Message = {
      id: `msg-${mockMessages.length + 1}`,
      senderId: "mentor-sarah",
      senderName: "Sarah Johnson",
      recipientId,
      content,
      timestamp: new Date().toISOString(),
      isUnread: false
    }
    mockMessages.push(newMessage)
    return [...mockMessages]
  }

  static async markAsRead(senderId: string): Promise<Message[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    mockMessages.forEach((msg) => {
      if (msg.senderId === senderId && msg.recipientId === "mentor-sarah") {
        msg.isUnread = false
      }
    })
    return [...mockMessages]
  }
}
