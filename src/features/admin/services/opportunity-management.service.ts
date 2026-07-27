import { mockOpportunityApprovals } from "./mockData"
import { OpportunityApproval } from "../types/admin.types"

let approvalsStore: OpportunityApproval[] = [...mockOpportunityApprovals]

export class OpportunityManagementService {
  static async getOpportunityApprovals(): Promise<OpportunityApproval[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...approvalsStore]), 150)
    })
  }

  static async updateApprovalStatus(
    id: string,
    status: OpportunityApproval["status"]
  ): Promise<OpportunityApproval[]> {
    return new Promise((resolve) => {
      approvalsStore = approvalsStore.map((o) => (o.id === id ? { ...o, status } : o))
      setTimeout(() => resolve([...approvalsStore]), 150)
    })
  }
}
