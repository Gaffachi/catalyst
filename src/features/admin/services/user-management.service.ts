import { mockUsers } from "./mockData"
import { UserAccount, AccountStatus } from "../types/admin.types"

let usersStore: UserAccount[] = [...mockUsers]

export class UserManagementService {
  static async getUsers(): Promise<UserAccount[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...usersStore]), 150)
    })
  }

  static async updateUserStatus(id: string, status: AccountStatus): Promise<UserAccount[]> {
    return new Promise((resolve) => {
      usersStore = usersStore.map((u) => (u.id === id ? { ...u, status } : u))
      setTimeout(() => resolve([...usersStore]), 150)
    })
  }
}
