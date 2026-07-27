import { AdminProfile } from "../types/admin.profile.types"

const mockAdminProfile: AdminProfile = {
  id: "admin-master",
  name: "Dr. Kwesi Appiah",
  email: "admin@catalyst.edu.gh",
  roleTitle: "Lead Platform Administrator & Coordinator",
  department: "Academic Partnerships & Career Services",
  joinedDate: "January 15, 2024",
  avatarInitials: "KA",
  phone: "+233 24 555 0192",
  location: "Accra, Ghana",
  lastLogin: "Today at 08:30 AM",
}

export class AdminProfileService {
  static async getProfile(): Promise<AdminProfile> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...mockAdminProfile }), 150)
    })
  }

  static async updateProfile(updated: Partial<AdminProfile>): Promise<AdminProfile> {
    return new Promise((resolve) => {
      Object.assign(mockAdminProfile, updated)
      setTimeout(() => resolve({ ...mockAdminProfile }), 200)
    })
  }
}
